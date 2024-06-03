import React, { useState, useEffect, useReducer } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import DbUtils from '../../../../../services/DbUtils';
import { businessDisplayImage } from '../../../../../services/api_upload';
import { businessBannerImage } from '../../../../../services/api_upload';
import MainStyles from '../../../../../assets/styles/MainStyles';
import { updBusinessProfile } from '../../../../../services/api_helper';
import { TopNavBack } from '../../../../../components/TopNavBack';
import { TabsBusProf } from '../../../../../components/TabsBusProf';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { InputLabel } from '../../../../../components/InputLabel';
import { InputMultiline } from '../../../../../components/InputMultiline';
import { Label } from '../../../../../components/Label';
import { ButtonPrimary } from '../../../../../components/ButtonPrimary';
import { InputPhoneNumber } from '../../../../../components/InputPhoneNumber';
import { InputOnly } from '../../../../../components/InputOnly';
import { InputZip } from '../../../../../components/InputZip';

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
	const [errors, setErrors] = useState({ contactNumber: '', companyName: '', addressOne: '', addressTwo: '', city: '', province: '', businessBio: '' });

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

	const validateForm = () => 
	{
		console.log('Validate Me ', state.contactNumber, state.companyName, state.addressOne, state.addressTwo, state.city, state.province, state.businessBio);
		let tempErrors = {};

		if (!state.contactNumber)
		{
			tempErrors = { ...tempErrors, contactNumber: 'Contact number is required' };
		}
		if (!state.companyName || state.companyName === '')
		{
			tempErrors = { ...tempErrors, companyName: 'Company name is required' };
		}
		if (!state.addressOne || state.addressOne === '')
		{
			tempErrors = { ...tempErrors, addressOne: 'Address line 1 is required' };
		}
		if (!state.addressTwo || state.addressTwo === '')
		{
			tempErrors = { ...tempErrors, addressTwo: 'Address line 2 is required' };
		}
		if (!state.city || state.city === '')
		{
			tempErrors = { ...tempErrors, city: 'City is required' };
		}
		if (!state.province || state.province === '')
		{
			tempErrors = { ...tempErrors, province: 'Province is required' };
		}
		if (!state.businessBio || state.businessBio === '')
		{
			tempErrors = { ...tempErrors, businessBio: 'Business bio is required' };
		}
		setErrors(tempErrors);

		if (Object.keys(tempErrors).length === 0)
		{
			handleSubmit();
		}
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
		<TopNavBack title="Edit profile" alignment="start" navigation={props.navigation} pops={1} />
        <TabsBusProf selected={0} value={selectedIndex} onchange={handleGotoProfile} />
            <ScrollView style={{ width: '100%' }}>
                <Layout style={[MainStyles.column_container, {backgroundColor: '#fff'}]}>
					<Text style={[MainStyles.title_a18, { textAlign: 'left', width: '100%', marginBottom: 10 }]}>Upload Display Picture</Text>
					<TouchableOpacity onPress={chooseDisplayImage} style={{ width: '100%' }}>
						<Layout style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',backgroundColor: '#FAF9FD', borderColor: '#612bc1', borderWidth: 1, borderRadius: 10, borderStyle: 'dashed', padding: 20 }} >
							<Image source={require('../../../../../assets/images/icon_pic_upload.png')} style={{ width: 48, height: 48 }} />
							<Text style={[MainStyles.title_a16, { textAlign: 'center', color: '#612bc1', marginTop: 20, paddingStart: 40, paddingEnd: 40 }]}>Add an image for the logo of your business</Text>
							<Text style={[MainStyles.title_a14, { textAlign: 'center', color: '#612bc1', marginTop: 10 }]}>Image specification: square</Text>
							<Text style={[MainStyles.title_a14, { textAlign: 'center', color: '#612bc1' }]}>Image size: max 5MB</Text>
							{state.displayImage && <Image source={{ uri: state.displayImage }} style={{ width: '100%', height: 200, marginTop: 15, borderRadius: 8 }} onLoadStart={() => console.log('Loading image...')} onLoad={() => console.log('Image loaded')} onError={(error) => console.log('Error loading image', error)} />}
						</Layout>
					</TouchableOpacity>
					<Text style={[MainStyles.title_a18, { textAlign: 'left', width: '100%', marginTop: 20, marginBottom: 10 }]}>Upload Banner Picture</Text>
					<TouchableOpacity onPress={chooseBannerImage} style={{ width: '100%' }}>
						<Layout style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',backgroundColor: '#FAF9FD', borderColor: '#612bc1', borderWidth: 1, borderRadius: 10, borderStyle: 'dashed', padding: 20 }} >
							<Image source={require('../../../../../assets/images/icon_pic_upload.png')} style={{ width: 48, height: 48 }} />
							<Text style={[MainStyles.title_a16, { textAlign: 'center', color: '#612bc1', marginTop: 20, paddingStart: 40, paddingEnd: 40 }]}>Add an banner image for your business profile</Text>
							<Text style={[MainStyles.title_a14, { textAlign: 'center', color: '#612bc1', marginTop: 10 }]}>Image specifications: 640 x 300px</Text>
							<Text style={[MainStyles.title_a14, { textAlign: 'center', color: '#612bc1' }]}>Image size: max 5MB</Text>
							{state.bannerImage && <Image source={{ uri: state.bannerImage }} style={{ width: '100%', height: 200, marginTop: 15, borderRadius: 8 }} onLoadStart={() => console.log('Loading image...')} onLoad={() => console.log('Image loaded')} onError={(error) => console.log('Error loading image', error)} />}
						</Layout>
					</TouchableOpacity>

                    <View style={{ position: 'relative', marginTop: 30 }} >
						<Label title="Contact Number" textalign="left" mb={5} status="basic" fontsize={16} />
						<InputPhoneNumber name="contactNumber" value={state.contactNumber} onChange={handleInputChange} placeholder="Enter contact number e.g.+27821112222" bg={errors.contactNumber ? '#ffe6e6' : '#f2f2f2'} />
						{errors.contactNumber && <Text style={styles.error}>{errors.contactNumber}</Text>}
					</View>

                    <View style={{ position: 'relative', marginTop: 15 }} >
                    	<InputLabel label="Company Name" name="companyName" value={state.companyName} onChange={handleInputChange} placeholder="Company name" status="basic" bg={errors.companyName ? '#ffe6e6' : '#f2f2f2'} />
						{errors.companyName && <Text style={styles.error}>{errors.companyName}</Text>}
					</View>

                    <View style={{ position: 'relat', marginTop: 15 }} >
						<Label title="Location" textalign="left" mb={5} status="basic" fontsize={16} />
						<InputOnly name="addressOne" value={state.addressOne} onChange={handleInputChange} placeholder="Address Line 1" bg={errors.addressOne ? '#ffe6e6' : '#f2f2f2'} />
						{/* {errors.addressOne && <Text style={styles.error}>{errors.addressOne}</Text>} */}
					</View>

					<View style={{ position: 'relative' }} >
						<InputOnly name="addressTwo" value={state.addressTwo} onChange={handleInputChange} placeholder="Address Line 2" mt={5} bg={errors.addressTwo ? '#ffe6e6' : '#f2f2f2'} />
						{/* {errors.addressTwo && <Text style={styles.error}>{errors.addressTwo}</Text>} */}
					</View>

					<View style={{ position: 'relative' }} >
						<InputOnly name="city" value={state.city} onChange={handleInputChange} placeholder="City" mt={5} bg={errors.city ? '#ffe6e6' : '#f2f2f2'} />
						{/* {errors.city && <Text style={styles.error}>{errors.city}</Text>} */}
					</View>

					<View style={{ position: 'relative' }} >
						<InputOnly name="province" value={state.province} onChange={handleInputChange} placeholder="Province" mt={5} bg={errors.province ? '#ffe6e6' : '#f2f2f2'} />
						{/* {errors.province && <Text style={styles.error}>{errors.province}</Text>} */}
					</View>

					<InputZip name="zipCode" value={state.zipCode} onChange={handleInputChange} placeholder="Zip Code" mt={5} bg={errors.email ? '#ffe6e6' : '#f2f2f2'} />

                    <View style={{ position: 'relative', marginTop: 15 }} >
                    	<InputMultiline label="Business Bio" name="businessBio" value={state.businessBio} onChange={handleInputChange} placeholder={`Write a description up to 120 characters`} status="basic" bg={errors.businessBio ? '#ffe6e6' : '#f2f2f2'} />
						{errors.businessBio && <Text style={styles.error}>{errors.businessBio}</Text>}
					</View>

                    <View style={{ marginTop: 15 }} />

					<Label title="Connect Your Social Media (optional)" textalign="left" mt={15} mb={5} fontsize={16} status="basic" />
					<View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }} >
						<Image source={require('../../../../../assets/images/x_logo.png')} style={{ width: 36, height: 36 }} />
					</View>
					<InputOnly name="xUrl" value={state.xUrl} onChange={handleInputChange} placeholder="Write X URL here" status="basic" />

					<View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginTop: 10, marginBottom: 5 }} >
						<Image source={require('../../../../../assets/images/insta_logo.png')} style={{ width: 32, height: 32 }} />
					</View>
                    <InputOnly name="instagramUrl" value={state.instagramUrl} onChange={handleInputChange} placeholder="Write Instagram URL here" />

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginTop: 10, marginBottom: 5 }} >
                    	<Image source={require('../../../../../assets/images/fb_logo.png')} style={{ width: 38, height: 38 }} />
					</View>
                    <InputOnly name="facebookUrl" value={state.facebookUrl} onChange={handleInputChange} placeholder="Write Facebook URL here" />

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginTop: 10, marginBottom: 5 }} >
						<Image source={require('../../../../../assets/images/link_logo.png')} style={{ width: 32, height: 32 }} />
					</View>
                    <InputOnly name="linkedinUrl" value={state.linkedinUrl} onChange={handleInputChange} placeholder="Write Linkedin URL here" />

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginTop: 10, marginBottom: 5 }} >
						<Image source={require('../../../../../assets/images/www_logo.png')} style={{ width: 32, height: 32 }} />
					</View>
                    <InputOnly name="wwwUrl" value={state.wwwUrl} onChange={handleInputChange} handleInputChange="Write Website URL here" />
                    <View style={{ marginTop: 25 }} />
                    <ButtonPrimary name="Submit Changes" width="100%" onpress={validateForm}/>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
	error: {
		position: 'absolute',
		top: 1,
		right: 0,
		textAlign: 'right',
        width: '100%',
        color: 'red',
        opacity: 0.5,
		fontSize: 12,
    },
});

export default Edit;