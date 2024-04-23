import React, { useState, useEffect, useReducer } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import DbUtils from '../../../../../services/DbUtils';
import { businessDisplayImage } from '../../../../../services/api_upload';
import { businessBannerImage } from '../../../../../services/api_upload';
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

const initialState = {
	businessId: null,
	displayImage: null,
	bannerImage: null,
	email: null,
	contactNumber: null,
	companyName: null,
	addressOne: null,
	addressTwo: null,
	city: null,
	province: null,
	zipCode: null,
	businessBio: null,
	xUrl: null,
	instagramUrl: null,
	facebookUrl: null,
	linkedinUrl: null,
	wwwUrl: null,
	isLocal: null,
};

function reducer(state, action) 
{
	switch (action.type) 
	{
	  case 'EDIT_BUS_PROFILE':
		return { ...state, ...action.payload };
	  default:
		throw new Error();
	}
}

const Edit = (props) => 
{
	const [state, dispatch] = useReducer(reducer, initialState);

    const [selectedIndex, setSelectedIndex] = React.useState(0);
	const [businessId, setBusinessId] = useState('');
	const [token, setToken] = useState('');

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'EDIT_BUS_PROFILE',
			payload: {...state, [name]: newValue}
		});
	}

	const getProfile = async () => 
    {
        const profile = await DbUtils.getItem('business_profile')
		.then((profile) => 
        {
			dispatch(
			{
				type: 'EDIT_BUS_PROFILE',
				payload: 
				{
					businessId: JSON.parse(profile).id,
					displayImage: JSON.parse(profile).display_image,
					bannerImage: JSON.parse(profile).banner_image,
					email: JSON.parse(profile).email,
					contactNumber: JSON.parse(profile).contact_number,
					companyName: JSON.parse(profile).company_name,
					addressOne: JSON.parse(profile).loc_add_one,
					addressTwo: JSON.parse(profile).loc_add_two,
					city: JSON.parse(profile).loc_city,
					province: JSON.parse(profile).loc_province,
					zipCode: JSON.parse(profile).loc_zip_code,
					businessBio: JSON.parse(profile).business_bio,
					xUrl: JSON.parse(profile).sm_x,
					instagramUrl: JSON.parse(profile).sm_inst,
					facebookUrl: JSON.parse(profile).sm_fb,
					linkedinUrl: JSON.parse(profile).sm_linkedin,
					wwwUrl: JSON.parse(profile).sm_www,
					isLocal: JSON.parse(profile).is_local,
				},
			});
        });
    }

	const getBusniessId = async () => 
	{
		const id = await DbUtils.getItem('business_id');
		
		setBusinessId(JSON.parse(id));
	}

	const getToken = async () => 
	{
		const token = await DbUtils.getItem('token');
		
		setToken(JSON.parse(token));
	}

	const chooseDisplayImage = () => 
	{
		let options = {
		  mediaType: 'photo',
		  maxWidth: 640,
		  maxHeight: 360,
		  quality: 1,
		  includeBase64: true,
		};
	
		launchImageLibrary(options, response => 
		{
			if (response.didCancel) 
			{
				console.log('User cancelled image picker');
			} 
			else if (response.error) 
			{
				console.log('ImagePicker Error: ', response.error);
			} 
			else 
			{
				// handleInputChange('displayImage', response.assets[0].uri);

				const imageType = response.assets[0].type;
				const base64Data = response.assets[0].base64;
				uploadDisplayImage(imageType, base64Data);
		  	}
		});
	};

	const uploadDisplayImage = async (imageType, base64Data) => 
	{
		const formData = new FormData();
  		formData.append('business_id', businessId);
  		formData.append('image_type', imageType);
  		formData.append('image', base64Data);

		try 
		{
			const response = await businessDisplayImage(token, formData);
			
			if (response.status)
			{
				const fileLink = response.data;
				handleInputChange('displayImage', fileLink);
				// await updProfile('display_image', fileLink);
			}
		} 
		catch (error) 
		{
			console.error(error);
		}
	}

	const chooseBannerImage = () => 
	{
		let options = {
		  mediaType: 'photo',
		  maxWidth: 640,
		  maxHeight: 360,
		  quality: 1,
		  includeBase64: true,
		};
	
		launchImageLibrary(options, response => 
		{
		  	if (response.didCancel) 
		  	{
				console.log('User cancelled image picker');
		  	}			 
			else if (response.error) 
			{
				console.log('ImagePicker Error: ', response.error);
			} 
			else 
			{
				// handleInputChange('bannerImage', response.assets[0].uri);

				const imageType = response.assets[0].type;
				const base64Data = response.assets[0].base64;
				uploadBannerImage(imageType, base64Data);
			}
		});
	};

	const uploadBannerImage = async (imageType, base64Data) => 
	{
		const formData = new FormData();
  		formData.append('business_id', businessId);
  		formData.append('image_type', imageType);
  		formData.append('image', base64Data);

		try 
		{
			const response = await businessBannerImage(token, formData);
			
			if (response.status)
			{
				const fileLink = response.data;
				
				handleInputChange('bannerImage', fileLink);
				// await updProfile('banner_image', fileLink);
			}
			
		} 
		catch (error) 
		{
			console.error(error);
		}
	}

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
		const updateDisplayImage = async () => 
		{
			await updProfile('display_image', state.displayImage);
		};

		updateDisplayImage();
		
	}, [state.displayImage]);

	useEffect(() => 
	{
		const updateBannerImage = async () => 
		{
			await updProfile('banner_image', state.bannerImage);
		};

		updateBannerImage();

	}, [state.bannerImage]);

    // if (selectedIndex === 0) 
    // {
    //     console.log('Goto Business Sectors');
    // }
    
    // if (selectedIndex === 1) 
    // {
    //     props.navigation.navigate('BusProfSectorsEdit', {selectedIndex: 1});
    // }
	const handleGotoProfile = (index) => 
	{
		setSelectedIndex(index);

		if (selectedIndex === 0) 
		{
			props.navigation.navigate('BusProfSectorsEdit', {selectedIndex: 1});
			
		}
		
		if (selectedIndex === 1) 
		{
			console.log('Goto Business Profile');
			props.navigation.navigate('BusProfEdit', {selectedIndex: 0});
		}
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
		await updProfile('company_name', state.companyName);
		await updProfile('contact_number', state.contactNumber);
		await updProfile('loc_add_one', state.addressOne);
		await updProfile('loc_add_two', state.addressTwo);
		await updProfile('loc_city', state.city);
		await updProfile('loc_province', state.province);
		await updProfile('loc_zip_code', state.zipCode);
		await updProfile('business_bio', state.businessBio);
		await updProfile('sm_x', state.xUrl);
		await updProfile('sm_inst', state.instagramUrl);
		await updProfile('sm_fb', state.facebookUrl);
		await updProfile('sm_linkedin', state.linkedinUrl);
		await updProfile('sm_www', state.wwwUrl);
		// await updProfile('display_image', state.displayImage);
		// await updProfile('banner_image', state.bannerImage);

		// Will need to send this to the server
		const data = {
			business_id: businessId,
			company_name: state.companyName,
			contact_number: state.contactNumber,
			loc_add_one: state.addressOne,
			loc_add_two: state.addressTwo,
			loc_city: state.city,
			loc_province: state.province,
			loc_zip_code: state.zipCode,
			business_bio: state.businessBio,
			sm_x: state.xUrl,
			sm_inst: state.instagramUrl,
			sm_fb: state.facebookUrl,
			sm_linkedin: state.linkedinUrl,
			sm_www: state.wwwUrl,
			display_image: state.displayImage,
			banner_image: state.bannerImage,
		}

		try 
		{
			const res = await updBusinessProfile(token, data);
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
        <TabsBusProf selected={0} value={selectedIndex} onchange={handleGotoProfile} />
            <ScrollView style={{ width: '100%' }}>
                <Layout style={[MainStyles.layout_container, {backgroundColor: '#fff'}]}>
                    <TitleFour title="Upload Display Picture" mb={10} />
					<TouchableOpacity onPress={chooseDisplayImage} style={{ width: '100%' }}>
						<Layout style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: '#b8b7c8', borderWidth: 1, borderRadius: 10, padding: 20 }} >
							<Icon name="upload-outline" fill="#B2AEDB" style={{ width: 48, height: 48 }} />
							<TextTwo title="Add an image for the banner of your promotion" textalign="center" fontsize={13} mb={10} />
							<TextTwo title="Image specification 640 x 360px" textalign="center" fontsize={12} />
							<TextTwo title="Image size: max 5MB" textalign="center" fontsize={12} />
							{state.displayImage && <Image source={{ uri: state.displayImage }} style={{ width: '100%', height: 200, marginTop: 15, borderRadius: 8 }} onLoadStart={() => console.log('Loading image...')} onLoad={() => console.log('Image loaded')} onError={(error) => console.log('Error loading image', error)} />}
						</Layout>
					</TouchableOpacity>
                    <TitleFour title="Upload Banner Picture" mt={15} mb={10} />
					<TouchableOpacity onPress={chooseBannerImage} style={{ width: '100%' }}>
						<Layout style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: '#b8b7c8', borderWidth: 1, borderRadius: 10, padding: 20 }} >
							<Icon name="upload-outline" fill="#B2AEDB" style={{ width: 48, height: 48 }} />
							<TextTwo title="Add an image for the banner of your promotion" textalign="center" fontsize={13} mb={10} />
							<TextTwo title="Image specification 640 x 360px" textalign="center" fontsize={12} />
							<TextTwo title="Image size: max 5MB" textalign="center" fontsize={12} />
							{state.bannerImage && <Image source={{ uri: state.bannerImage }} style={{ width: '100%', height: 200, marginTop: 15, borderRadius: 8 }} onLoadStart={() => console.log('Loading image...')} onLoad={() => console.log('Image loaded')} onError={(error) => console.log('Error loading image', error)} />}
						</Layout>
					</TouchableOpacity>
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Company Name" name="companyName" value={state.companyName} onChange={handleInputChange} placeholder="Company name" />
                    <View style={{ marginTop: 15 }} />
					<Label title="Contact Number" textalign="left" fontweight="bold" mb={5} />
                    <InputPhoneNumber name="contactNumber" value={state.contactNumber} onChange={handleInputChange} placeholder="(123) 456 7890" />
                    <View style={{ marginTop: 15 }} />
					<Label title="Location" textalign="left" fontweight="bold" mb={5} />
					<InputLabel name="addressOne" value={state.addressOne} onChange={handleInputChange} placeholder="Address Line 1" />
					<InputLabel name="addressTwo" value={state.addressTwo} onChange={handleInputChange} placeholder="Address Line 2" mt={5} />
					<InputLabel name="city" value={state.city} onChange={handleInputChange} placeholder="City" mt={5} />
					<InputLabel name="province" value={state.province} onChange={handleInputChange} placeholder="Province" mt={5} />
					<InputLabel name="zipCode" value={state.zipCode} onChange={handleInputChange} placeholder="Zip Code" mt={5} />
                    <View style={{ marginTop: 15 }} />
                    <InputMultiline label="Business Bio" name="businessBio" value={state.businessBio} onChange={handleInputChange} placeholder={`Write a description up to 120 characters`} />
                    <View style={{ marginTop: 15 }} />
                    <View style={{ marginTop: 15 }} />
                    <Label title="Connect Your Social Media (optional)" textalign="left" fontweight="bold" mb={5} />
                    <CustomIcon name="twitter" style={{ width: 32, color: '#B2AEDB' }} />
                    <InputLabel name="xUrl" value={state.xUrl} onChange={handleInputChange} placeholder="Write Facebook URL here" />
                    <View style={{ marginTop: 10 }} />
                    <CustomIcon name="instagram" style={{ width: 32, color: '#B2AEDB' }} />
                    <InputLabel name="instagramUrl" value={state.instagramUrl} onChange={handleInputChange} placeholder="Write Instagram URL here" />
                    <View style={{ marginTop: 10 }} />
                    <CustomIcon name="facebook-square" style={{ width: 32, color: '#B2AEDB' }} />
                    <InputLabel name="facebookUrl" value={state.facebookUrl} onChange={handleInputChange} placeholder="Write Facebook URL here" />
                    <View style={{ marginTop: 10 }} />
                    <CustomIcon name="linkedin-square" style={{ width: 32, color: '#B2AEDB' }} />
                    <InputLabel name="linkedinUrl" value={state.linkedinUrl} onChange={handleInputChange} placeholder="Write Linkedin URL here" />
                    <View style={{ marginTop: 10 }} />
                    <Icon name="globe-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                    <InputLabel name="wwwUrl" value={state.wwwUrl} onChange={handleInputChange} handleInputChange="Write Website URL here" />
                    <View style={{ marginTop: 25 }} />
                    <ButtonPrimary name="Submit Changes" width="100%" onpress={handleSubmit}/>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Edit;