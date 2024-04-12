import React, { useState, useEffect } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import DbUtils from '../../../../../services/DbUtils';
import MainStyles from '../../../../../assets/styles/MainStyles';
import { updBusinessProfile } from '../../../../../services/api_helper';
import { TopNavArrowTitle } from '../../../../../components/TopNavArrowTitle';
import { TabsBusProf } from '../../../../../components/TabsBusProf';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';
import { TitleFour } from '../../../../../components/TitleFour';
import TextTwo from '../../../../../components/TextTwo';
import { InputLabel } from '../../../../../components/InputLabel';
import { InputMultiline } from '../../../../../components/InputMultiline';
import { Label } from '../../../../../components/Label';
import { ButtonPrimary } from '../../../../../components/ButtonPrimary';
import CustomIcon from '../../../../../components/CustomIcon';
import { InputPhoneNumber } from '../../../../../components/InputPhoneNumber';


const Edit = (props) => 
{
    const [selectedIndex, setSelectedIndex] = React.useState(0);
	const [displayImage, setDisplayImage] = useState(null);
	const [bannerImage, setBannerImage] = useState(null);
	const [businessId, setBusinessId] = useState('');
	const [token, setToken] = useState('');
	const [companyName, setCompanyName] = useState('');
	const [businessBio, setBusinessBio] = useState('');
	const [addressOne, setAddressOne] = useState('');
    const [addressTwo, setAddressTwo] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [contactNumber, setContactNumber] = useState('');
	const [xUrl, setXUrl] = useState('');
    const [instgramUrl, setInstagramUrl] = useState('');
    const [facebookUrl, setFacebookUrl] = useState('');
    const [linkedinUrl, setLinkedinUrl] = useState('');
    const [wwwUrl, setWwwUrl] = useState('');

	const getProfile = async () => 
    {
        const profile = await DbUtils.getItem('business_profile');
		const parsedProfile = JSON.parse(profile);

		setCompanyName(parsedProfile.company_name);
		setBusinessBio(parsedProfile.business_bio);
		setAddressOne(parsedProfile.location[0].address_one);
		setAddressTwo(parsedProfile.location[0].address_two);
		setCity(parsedProfile.location[0].city);
		setProvince(parsedProfile.location[0].province);
		setZipCode(parsedProfile.location[0].zip);
		setContactNumber(parsedProfile.contact_number);
		setXUrl(parsedProfile.sm_x);
		setInstagramUrl(parsedProfile.sm_inst);
		setFacebookUrl(parsedProfile.sm_fb);
		setLinkedinUrl(parsedProfile.sm_linkedin);
		setWwwUrl(parsedProfile.sm_www);
		setDisplayImage(parsedProfile.displayImage);
		setBannerImage(parsedProfile.bannerImage);
		// setIsLoading(false);

        console.log('Business Edit Profile: ', parsedProfile.bannerImage);
    }

	const getBusniessId = async () => 
	{
		const id = await DbUtils.getItem('business_id');
		
		setBusinessId(id);
	}

	const getToken = async () => 
	{
		const token = await DbUtils.getItem('token');
		
		setToken(token);
	}

	const chooseDisplayImage = () => 
	{
		let options = {
		  mediaType: 'photo',
		  maxWidth: 640,
		  maxHeight: 360,
		  quality: 1,
		};
	
		launchImageLibrary(options, response => 
		{
		  if (response.didCancel) {
			console.log('User cancelled image picker');
		  } else if (response.error) {
			console.log('ImagePicker Error: ', response.error);
		  } else {
			setDisplayImage(response.assets[0].uri);
		  }
		});
	};

	const chooseBannerImage = () => 
	{
		let options = {
		  mediaType: 'photo',
		  maxWidth: 640,
		  maxHeight: 360,
		  quality: 1,
		};
	
		launchImageLibrary(options, response => 
		{
		  if (response.didCancel) {
			console.log('User cancelled image picker');
		  } else if (response.error) {
			console.log('ImagePicker Error: ', response.error);
		  } else {
			setBannerImage(response.assets[0].uri);
		  }
		});
	};

	useFocusEffect(React.useCallback(() => 
	{
		setSelectedIndex(0);
	}, []));

	useEffect(() => 
	{
		const fetchProfile = async () => 
		{
			await getProfile();
			await getBusniessId();
			await getToken();
		};

		fetchProfile();
	}, []);

	useEffect(() => 
	{
		console.log('Go on, update displayImage in async-storage');

		const updateDisplayImage = async () => 
		{
			await updProfile('displayImage', displayImage);
		};

		updateDisplayImage();
		
	}, [displayImage]);

	useEffect(() => 
	{
		console.log('Go on, update bannerImage in async-storage');

		const updateBannerImage = async () => 
		{
			await updProfile('bannerImage', bannerImage);
		};

		updateBannerImage();

	}, [bannerImage]);

    if (selectedIndex === 0) 
    {
        console.log('Goto Business Sectors');
    }
    
    if (selectedIndex === 1) 
    {
        props.navigation.navigate('BusProfSectorsEdit', {selectedIndex: 1});
    }

	const updProfile = async (key, newValue) => 
    {
        const profileDataString = await DbUtils.getItem('business_profile');
        const profileData = JSON.parse(profileDataString);
      
        profileData[key] = newValue;
      
        await DbUtils.setItem('business_profile', JSON.stringify(profileData));
    };

    const handleSubmit = async () => 
    {
        console.log('Submit Changes');
		await updProfile('company_name', companyName);
		await updProfile('contact_number', contactNumber);
		await updProfile('location', [{ address_one: addressOne, address_two: addressTwo, city: city, province: province, zip: zipCode }]);
		await updProfile('business_bio', businessBio);
		await updProfile('sm_x', xUrl);
		await updProfile('sm_inst', instgramUrl);
		await updProfile('sm_fb', facebookUrl);
		await updProfile('sm_linkedin', linkedinUrl);
		await updProfile('sm_www', wwwUrl);

		// Will need to send this to the server
		const data = {
			business_id: businessId,
			company_name: companyName,
			contact_number: contactNumber,
			location: [{ address_one: addressOne, address_two: addressTwo, city: city, province: province, zip: zipCode }],
			business_bio: businessBio,
			sm_x: xUrl,
			sm_inst: instgramUrl,
			sm_fb: facebookUrl,
			sm_linkedin: linkedinUrl,
			sm_www: wwwUrl,
			display_image: displayImage,
			banner_image: bannerImage,
		}

		try 
		{
			const res = await updBusinessProfile(token, data);
			console.log('Res: ', res);
		}
		catch (error)
		{
			console.log('Error updating business profile: ', error);
		}

        props.navigation.navigate('BusProfProHome');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <TopNavArrowTitle title="Edit Profile" alignment="start" navigation={props.navigation} goBackTo="BusProfProHome" />
        <TabsBusProf selected={0} value={selectedIndex} onchange={setSelectedIndex} />
            <ScrollView style={{ width: '100%' }}>
                <Layout style={[MainStyles.layout_container, {backgroundColor: '#fff'}]}>
                    <TitleFour title="Upload Display Picture" mb={10} />
					<TouchableOpacity onPress={chooseDisplayImage} style={{ width: '100%' }}>
						<Layout style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: '#b8b7c8', borderWidth: 1, borderRadius: 10, padding: 20 }} >
							<Icon name="upload-outline" fill="#B2AEDB" style={{ width: 48, height: 48 }} />
							<TextTwo title="Add an image for the banner of your promotion" textalign="center" fontsize={13} mb={10} />
							<TextTwo title="Image specification 640 x 360px" textalign="center" fontsize={12} />
							<TextTwo title="Image size: max 5MB" textalign="center" fontsize={12} />
							{displayImage && <Image source={{ uri: displayImage }} style={{ width: '100%', height: 200, marginTop: 15, borderRadius: 8 }} onLoadStart={() => console.log('Loading image...')} onLoad={() => console.log('Image loaded')} onError={(error) => console.log('Error loading image', error)} />}
						</Layout>
					</TouchableOpacity>
                    <TitleFour title="Upload Banner Picture" mt={15} mb={10} />
					<TouchableOpacity onPress={chooseBannerImage} style={{ width: '100%' }}>
						<Layout style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: '#b8b7c8', borderWidth: 1, borderRadius: 10, padding: 20 }} >
							<Icon name="upload-outline" fill="#B2AEDB" style={{ width: 48, height: 48 }} />
							<TextTwo title="Add an image for the banner of your promotion" textalign="center" fontsize={13} mb={10} />
							<TextTwo title="Image specification 640 x 360px" textalign="center" fontsize={12} />
							<TextTwo title="Image size: max 5MB" textalign="center" fontsize={12} />
							{bannerImage && <Image source={{ uri: bannerImage }} style={{ width: '100%', height: 200, marginTop: 15, borderRadius: 8 }} onLoadStart={() => console.log('Loading image...')} onLoad={() => console.log('Image loaded')} onError={(error) => console.log('Error loading image', error)} />}
						</Layout>
					</TouchableOpacity>
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Company Name" value={companyName} setValue={setCompanyName} placeholder="Company name" />
                    <View style={{ marginTop: 15 }} />
					<Label title="Contact Number" textalign="left" fontweight="bold" mb={5} />
                    <InputPhoneNumber value={contactNumber} setValue={setContactNumber} placeholder="(123) 456 7890" />
                    <View style={{ marginTop: 15 }} />
					<Label title="Location" textalign="left" fontweight="bold" mb={5} />
					<InputLabel label="" value={addressOne} setValue={setAddressOne} placeholder="Address Line 1" />
					<InputLabel label="" value={addressTwo} setValue={setAddressTwo} placeholder="Address Line 2" mt={5} />
					<InputLabel label="" value={city} setValue={setCity} placeholder="City" mt={5} />
					<InputLabel label="" value={province} setValue={setProvince} placeholder="Province" mt={5} />
					<InputLabel label="" value={zipCode} setValue={setZipCode} placeholder="Zip Code" mt={5} />
                    <View style={{ marginTop: 15 }} />
                    <InputMultiline label="Business Bio" value={businessBio} setValue={setBusinessBio} placeholder={`Write a description up to 120 characters`} />
                    <View style={{ marginTop: 15 }} />
                    <View style={{ marginTop: 15 }} />
                    <Label title="Connect Your Social Media (optional)" textalign="left" fontweight="bold" mb={5} />
                    <CustomIcon name="twitter" style={{ width: 32, color: '#B2AEDB' }} />
                    <InputLabel value={xUrl} setValue={setXUrl} placeholder="Write Facebook URL here" />
                    <View style={{ marginTop: 10 }} />
                    <CustomIcon name="instagram" style={{ width: 32, color: '#B2AEDB' }} />
                    <InputLabel value={instgramUrl} setValue={setInstagramUrl} placeholder="Write Instagram URL here" />
                    <View style={{ marginTop: 10 }} />
                    <CustomIcon name="facebook-square" style={{ width: 32, color: '#B2AEDB' }} />
                    <InputLabel value={facebookUrl} setValue={setFacebookUrl} placeholder="Write Facebook URL here" />
                    <View style={{ marginTop: 10 }} />
                    <CustomIcon name="linkedin-square" style={{ width: 32, color: '#B2AEDB' }} />
                    <InputLabel value={linkedinUrl} setValue={setLinkedinUrl} placeholder="Write Linkedin URL here" />
                    <View style={{ marginTop: 10 }} />
                    <Icon name="globe-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                    <InputLabel value={wwwUrl} setValue={setWwwUrl} placeholder="Write Website URL here" />
                    <View style={{ marginTop: 25 }} />
                    <ButtonPrimary name="Submit Changes" width="100%" onpress={handleSubmit}/>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Edit;