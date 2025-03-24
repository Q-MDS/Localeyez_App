import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import { launchImageLibrary } from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import DbUtils from '../../../../../services/DbUtils';
import { businessDisplayImage } from '../../../../../services/api_upload';
import { businessBannerImage } from '../../../../../services/api_upload';
import { delBannerPic } from '../../../../../services/api_helper';
import { delLogoPic } from '../../../../../services/api_helper';
import MainStyles from '../../../../../assets/styles/MainStyles';
import { updBusinessProfile } from '../../../../../services/api_helper';
import { TopNavBack } from '../../../../../components/TopNavBack';
import { TabsBusProf } from '../../../../../components/TabsBusProf';
import { Linking, SafeAreaView, ScrollView, TouchableOpacity, View, Image, StyleSheet, Alert, ActivityIndicator, TextInput, Switch } from 'react-native';
import { Layout, Text, Card, Divider, Toggle } from '@ui-kitten/components';
import { InputLabel } from '../../../../../components/InputLabel';
import { InputMultiline } from '../../../../../components/InputMultiline';
import { Label } from '../../../../../components/Label';
import { ButtonPrimary } from '../../../../../components/ButtonPrimary';
import { InputPhoneNumber } from '../../../../../components/InputPhoneNumber';
import { InputOnly } from '../../../../../components/InputOnly';
import { InputZip } from '../../../../../components/InputZip';
import { InputNumpad } from '../../../../../components/InputNumpad';
import IconMap from '../../../../../assets/images/IconMap';
import IconGeo from '../../../../../assets/images/IconGeo';
import Toast from 'react-native-toast-message';

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
	businessHours: null,
	bookingsEnabled: null,
	bookingsMax: null,
	gpsLat: null,
	gpsLng: null
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
	const [isLoading, setIsLoading] = useState(true);
	const [hours, setHours] = useState([]);
	const [showGeoSetup, setShowGeoSetup] = useState(false);
	const [isGeoLocationEnabled, setGeoLocationEnabled] = useState(false);
	const [gpsCoords, setGpsCoords] = useState(null);

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
        const profile = await DbUtils.getItem('business_profile');
		
		// .then((profile) => 
        // {
		const record = JSON.parse(profile);
		dispatch(
		{
			type: 'EDIT_BUS_PROFILE',
			payload: 
			{
				businessId: record.id,
				displayImage: record.display_image,
				bannerImage: record.banner_image,
				email: record.email,
				contactNumber: record.contact_number,
				companyName: record.company_name,
				addressOne: record.loc_add_one,
				addressTwo: record.loc_add_two,
				city: record.loc_city,
				province: record.loc_province,
				zipCode: record.loc_zip_code,
				businessBio: record.business_bio,
				xUrl: record.sm_x,
				instagramUrl: record.sm_inst,
				facebookUrl: record.sm_fb,
				linkedinUrl: record.sm_linkedin,
				wwwUrl: record.sm_www,
				isLocal: record.is_local,
				businessHours: JSON.parse(record.business_hours),
				bookingsEnabled: record.bookings_enabled == 1 ? true : false,
				bookingsMax: record.bookings_max,
				gpsLat: record.loc_latitude,
				gpsLng: record.loc_longitude
			},
		});
		setHours(JSON.parse(record.business_hours));
        // });
		if (record.loc_latitude && record.loc_longitude)
		{
			setGpsCoords({latitude: record.loc_latitude, longitude: record.loc_longitude});
			setGeoLocationEnabled(true);
		}
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

			setIsLoading(false);
		};
console.log('StateL ', state);
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
		const getXUrl = state.xUrl ? state.xUrl : '';
		let xUrl = '';
		if (getXUrl.trim().length > 0)
		{
			const formattedHandle = getXUrl.startsWith('@') ? getXUrl.slice(1) : getXUrl;
    		xUrl = `https://x.com/${formattedHandle}`;
		} 
		const getInstaUrl = state.instagramUrl ? state.instagramUrl : '';
		let instagramUrl = '';
		if (getInstaUrl.trim().length > 0)
		{
			const formattedHandle = getInstaUrl.startsWith('@') ? getInstaUrl.slice(1) : getInstaUrl;
			instagramUrl = `https://www.instagram.com/${formattedHandle}`;
		}
		const getFbUrl = state.facebookUrl ? state.facebookUrl : '';
		let facebookUrl = '';
		if (getFbUrl.trim().length > 0)
		{
			const formattedHandle = getFbUrl.startsWith('@') ? getFbUrl.slice(1) : getFbUrl;
			facebookUrl = `https://www.facebook.com/${formattedHandle}`;
		}
		const getLinkedinUrl = state.linkedinUrl ? state.linkedinUrl : '';
		let linkedinUrl = '';
		if (getLinkedinUrl.trim().length > 0)
		{
			const formattedHandle = getLinkedinUrl.startsWith('@') ? getLinkedinUrl.slice(1) : getLinkedinUrl;
			linkedinUrl = `https://www.linkedin.com/${formattedHandle}`;
		}

		await updProfile('company_name', state.companyName);
		await updProfile('contact_number', state.contactNumber);
		await updProfile('loc_add_one', state.addressOne);
		await updProfile('loc_add_two', state.addressTwo);
		await updProfile('loc_city', state.city);
		await updProfile('loc_province', state.province);
		await updProfile('loc_zip_code', state.zipCode);
		await updProfile('business_bio', state.businessBio);
		await updProfile('sm_x', xUrl);
		await updProfile('sm_inst', instagramUrl);
		await updProfile('sm_fb', facebookUrl);
		await updProfile('sm_linkedin', linkedinUrl);
		await updProfile('sm_www', state.wwwUrl);
		await updProfile('business_hours', JSON.stringify(hours));
		await updProfile('bookings_max', state.bookingsMax);
		await updProfile('bookings_enabled', state.bookingsEnabled);
		await updProfile('loc_latitude', state.gpsLat);
		await updProfile('loc_longitude', state.gpsLng);
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
			business_hours: JSON.stringify(hours),
			bookings_max: state.bookingsMax,
			bookings_enabled: state.bookingsEnabled,
			gps_lat: state.gpsLat,
			gps_lng: state.gpsLng
		}

		try 
		{
			console.log('DATA: ', data);
			const res = await updBusinessProfile(token, data);
		}
		catch (error)
		{
			console.log('Error updating business profile: ', error);
		}

        props.navigation.navigate('BusProfProHome');
    }

	const handleDeleteBannerImage = async () => 
	{
		Alert.alert(
			"Delete Image",
			"Are you sure you want to delete this image?",
			[
				{
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
				},
				{ text: "OK", onPress: () => deleteBannerImage() }
			]
		);
	}

	const deleteBannerImage = async () => 
	{
		handleInputChange('bannerImage', "");

		const data = [{
			business_id: businessId,
		}];

		let record = JSON.stringify(data);
		await delBannerPic(token, record)
		.then((res) => 
		{
			console.log('Image deleted:', res);
			Toast.show({
				type: 'success',
				position: 'bottom',
				text1: 'Image deleted',
				visibilityTime: 1000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		});
	}

	const handleDeleteLogoImage = async () => 
	{
		Alert.alert(
			"Delete Image",
			"Are you sure you want to delete this image?",
			[
				{
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
				},
				{ text: "OK", onPress: () => deleteLogoImage() }
			]
		);
	}

	const deleteLogoImage = async () => 
	{
		handleInputChange('displayImage', "");

		const data = [{
			business_id: businessId,
		}];

		let record = JSON.stringify(data);
		await delLogoPic(token, record)
		.then((res) => 
		{
			console.log('Image deleted:', res);
			Toast.show({
				type: 'success',
				position: 'bottom',
				text1: 'Image deleted',
				visibilityTime: 1000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		});
	}

	const validateForm = () => 
	{
		console.log('Validate Me ', state.contactNumber, state.companyName, state.addressOne, state.addressTwo, state.city, state.province, state.businessBio);
		let tempErrors = {};

		// if (!state.contactNumber)
		// {
		// 	tempErrors = { ...tempErrors, contactNumber: 'Contact number is required' };
		// }
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
		else 
		{
			Alert.alert(
				"Validation error",
				"One or more fields are missing or invalid. Please check the form and try again.",
				[
					{
					text: "Ok",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel"
					}
				]
			);
		}
	}

	const handleTimeChange = (day, timeType, value) => 
	{
		const updatedHours = hours.map(hour => 
		hour.day === day ? { ...hour, [timeType]: value } : hour
		);
		setHours(updatedHours);
	};

	const handleTestUrl = (url) => 
	{
		if (url) 
		{
			Linking.openURL(url).catch(() => 
			{
				Alert.alert('Error', 'Failed to open the URL.');
		  	});
		} 
		else 
		{
		  Alert.alert('No URL', 'Please provide a valid URL to test.');
		}
	};

	const openMap = (addressOne, addressTwo, city, province, zipcode) => 
	{
		const address = `${addressOne}, ${addressTwo}, ${city}, ${province}, ${zipcode}`;
		const encodedAddress = encodeURIComponent(address);
		const url = `https://www.google.com/maps?q=${encodedAddress}`;
		console.log('GPS: ', encodedAddress);
		
		Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
	};

	const getGpsCoordinates = async (address) => 
	{
		try 
		{
			console.log('Fetching GPS coordinates for address:', address);
			const response = await axios.get('https://nominatim.openstreetmap.org/search', {
				params: {
					q: address,
					format: 'json',
					addressdetails: 1,
					limit: 1,
				},
				headers: {
					'User-Agent': 'Localeyez/1.0 (quintin@moderndaystrategy.com)',
				},
			});
	
			if (response.data && response.data.length > 0) {
				const { lat, lon } = response.data[0];
				state.gpsLat = lat;
				state.gpsLng = lon;
				
				return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
			} else {
				throw new Error('No results found for the given address.');
			}
		} catch (error) {
			console.error('Error fetching GPS coordinates:', error.message);
			return null;
		}
	};

	const handleShowGeoSetup = () => 
	{
		setShowGeoSetup(!showGeoSetup);
	}

	const handleGetGps = async () => 
	{
		const address = `${state.addressOne}+${state.addressTwo}+${state.city}+${state.province}`;
		const formattedAddress = address.replace(/ /g, '+');
		console.log('Address: ', formattedAddress);
		const gpsCoords = await getGpsCoordinates(formattedAddress);

		if (gpsCoords) 
		{
			setGpsCoords(gpsCoords);
			console.log('GPS Coordinates XXXX:', gpsCoords);
			handleInputChange('gpsLat', gpsCoords.latitude);
			handleInputChange('gpsLng', gpsCoords.longitude);
			//state.gpsLat = gpsCoords.latitude;
			//state.gpsLng = gpsCoords.longitude;
			console.log('State:', state);
			console.log('GPS Coordinates:', gpsCoords);
		} 
		else 
		{
			Alert.alert('Error', 'Unable to fetch GPS coordinates. Please check the address and try again.');
		}
	}

	const handleAccept = () => 
	{
		console.log('GPSCORDS: ', gpsCoords);

		// Alert.alert(
		// 	"Success",
		// 	"GPS coordinates have been saved successfully!",
		// 	[
		// 		{
		// 		text: "Ok",
		// 		onPress: () => console.log("Accept Pressed"),
		// 		style: "cancel"
		// 		}
		// 	]
		// );

		// state.zipCode = '4444';
		// handleInputChange('zipcode', '9999');
		// handleInputChange('gpsLat', gpsCoords.latitude);
		// handleInputChange('gpsLng', gpsCoords.longitude);
		state.gpsLat = gpsCoords.latitude;
		state.gpsLng = gpsCoords.longitude;
		console.log('State accept: ', state);
	}

	const handleRetry = () => 
	{
		Alert.alert(
			"Retry",
			"Please check that the address you entered is correct and then tap on GET GPS again. If you would like to set this up later, turn off \"Enable Geo-location\".",
			[
				{
				text: "Ok",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
				}
			]
		);
		setGpsCoords(null);
	}

	const toggleGeoLocation = () => 
	{
		setGeoLocationEnabled((previousState) => !previousState);
		if (isGeoLocationEnabled)
		{
			state.gpsLat = null;
			state.gpsLng = null;
			setGpsCoords(null);
		}	
	};

	if (isLoading) 
	{
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavBack title="Back: Business Profile" alignment="start" navigation={props.navigation} pops={1} />
			<Layout style={[{ paddingTop: 10, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff', marginBottom: 15}]}>
				{/* Page title */}
				<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginBottom: 10 }} />
				<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
					<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#612bc1', width: '100%' }}>Edit Business Profile</Text>
				</View>
				<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginTop: 5 }} />
			</Layout>
			<TabsBusProf selected={0} value={selectedIndex} onchange={handleGotoProfile} />


				<ScrollView style={{ width: '100%' }}>
					<Layout style={[MainStyles.column_container, {paddingStart: 20, paddingEnd: 20, paddingTop: 15}]}>
						{/* Upload display picture */}
						{/* <Card style={{ marginBottom: 10 }}> */}
							<Text style={{ color: '#612bc1', fontSize: 14, fontWeight: 'bold', marginTop: 0, marginBottom: 15 }}>Upload Display Picture</Text>
							<TouchableOpacity onPress={chooseDisplayImage} style={{ width: '100%', marginBottom: 10 }}>
								<Layout style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',backgroundColor: '#FAF9FD', borderColor: '#612bc1', borderWidth: 1, borderRadius: 10, borderStyle: 'dashed', padding: 20 }} >
									<Image source={require('../../../../../assets/images/icon_pic_upload.png')} style={{ width: 48, height: 48 }} />
									<Text style={[MainStyles.title_a16, { textAlign: 'center', color: '#612bc1', marginTop: 20, paddingStart: 40, paddingEnd: 40 }]}>Add an image for the logo of your business</Text>
									<Text style={[MainStyles.title_a14, { textAlign: 'center', color: '#612bc1', marginTop: 10 }]}>Image specification: square</Text>
									<Text style={[MainStyles.title_a14, { textAlign: 'center', color: '#612bc1' }]}>Image size: max 5MB</Text>
									{state.displayImage && <Image source={{ uri: state.displayImage }} style={{ width: '100%', height: 200, marginTop: 15, borderRadius: 8 }} onLoadStart={() => console.log('Loading image...')} onLoad={() => console.log('Image loaded')} onError={(error) => console.log('Error loading image', error)} />}
									{state.displayImage && 
										<>
										<View style={{ marginTop: 15 }} />
										<TouchableOpacity onPress={handleDeleteLogoImage}>
											<Text style={[MainStyles.title_a14, { width: '100%', textAlign: 'center', marginTop: 5, color: '#612BC1' }]}>Delete Image</Text>
										</TouchableOpacity>
										</>
									}
								</Layout>
							</TouchableOpacity>
						{/* </Card> */}
						{/* Upload banner picture */}
						{/* <Card style={{ marginBottom: 10 }}> */}
							<Text style={{ color: '#612bc1', fontSize: 14, fontWeight: 'bold', marginTop: 0, marginBottom: 15 }}>Upload Banner Picture</Text>
							<TouchableOpacity onPress={chooseBannerImage} style={{ width: '100%', marginBottom: 10 }}>
								<Layout style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',backgroundColor: '#FAF9FD', borderColor: '#612bc1', borderWidth: 1, borderRadius: 10, borderStyle: 'dashed', padding: 20 }} >
									<Image source={require('../../../../../assets/images/icon_pic_upload.png')} style={{ width: 48, height: 48 }} />
									<Text style={[MainStyles.title_a16, { textAlign: 'center', color: '#612bc1', marginTop: 20, paddingStart: 40, paddingEnd: 40 }]}>Add an banner image for your business profile</Text>
									<Text style={[MainStyles.title_a14, { textAlign: 'center', color: '#612bc1', marginTop: 10 }]}>Image specifications: 640 x 300px</Text>
									<Text style={[MainStyles.title_a14, { textAlign: 'center', color: '#612bc1' }]}>Image size: max 5MB</Text>
									{state.bannerImage && <Image source={{ uri: state.bannerImage }} style={{ width: '100%', height: 200, marginTop: 15, borderRadius: 8 }} onLoadStart={() => console.log('Loading image...')} onLoad={() => console.log('Image loaded')} onError={(error) => console.log('Error loading image', error)} />}
									{state.bannerImage && 
									<>
									<View style={{ marginTop: 15 }} />
									<TouchableOpacity onPress={handleDeleteBannerImage}>
										<Text style={[MainStyles.title_a14, { width: '100%', textAlign: 'center', marginTop: 5, color: '#612BC1' }]}>Delete Image</Text>
									</TouchableOpacity>
									</>
									}
								</Layout>
							</TouchableOpacity>
						{/* </Card> */}
						{/* Company name */}
						<Card style={{ marginBottom: 10 }}>
							<InputLabel label="Company Name *" name="companyName" value={state.companyName} onChange={handleInputChange} placeholder="Company name" status="basic" bg={errors.companyName ? '#ffe6e6' : '#f2f2f2'} />
							{errors.companyName && <Text style={styles.error}>{errors.companyName}</Text>}
						</Card>
						{/* Location */}
						<Card style={{ marginBottom: 10 }}>
							<View>
								<Label title="Location *" textalign="left" mb={5} status="basic" fontsize={14} fontweight='bold' />
								<InputOnly name="addressOne" value={state.addressOne} onChange={handleInputChange} placeholder="Address Line 1" bg={errors.addressOne ? '#ffe6e6' : '#f2f2f2'} />
								{/* {errors.addressOne && <Text style={styles.error}>{errors.addressOne}</Text>} */}
							</View>
							<View>
								<InputOnly name="addressTwo" value={state.addressTwo} onChange={handleInputChange} placeholder="Address Line 2" mt={5} bg={errors.addressTwo ? '#ffe6e6' : '#f2f2f2'} />
								{/* {errors.addressTwo && <Text style={styles.error}>{errors.addressTwo}</Text>} */}
							</View>
							<View>
								<InputOnly name="city" value={state.city} onChange={handleInputChange} placeholder="City" mt={5} bg={errors.city ? '#ffe6e6' : '#f2f2f2'} />
								{/* {errors.city && <Text style={styles.error}>{errors.city}</Text>} */}
							</View>
							<View>
								<InputOnly name="province" value={state.province} onChange={handleInputChange} placeholder="Province" mt={5} bg={errors.province ? '#ffe6e6' : '#f2f2f2'} />
								{/* {errors.province && <Text style={styles.error}>{errors.province}</Text>} */}
							</View>
							<View>
								<InputZip name="zipCode" value={state.zipCode} onChange={handleInputChange} placeholder="Zip Code" mt={5} bg={ '#f2f2f2'} />
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

								<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', columnGap: 5, marginTop: 10 }} onPress={() => openMap(state.addressOne, state.addressTwo, state.city, state.province, state.zipCode)}>
									<IconMap />
									<Text style={{ color: '#000', fontSize: 14 }}>View on map</Text>
								</TouchableOpacity>
								<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', columnGap: 5, marginTop: 10 }} onPress={handleShowGeoSetup}>
									<IconGeo />
									<Text style={{ color: '#000', fontSize: 14 }}>Geo location setup</Text>
								</TouchableOpacity>
							</View>
							{showGeoSetup && 
								<>
								<View style={{ height: 1, backgroundColor: '#ccc', marginTop: 10 }} ></View>
								<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
									<Text style={{ color: '#000', fontSize: 14, marginRight: 10 }}>Enable Geo-location:</Text>
									<Switch
									value={isGeoLocationEnabled}
									onValueChange={toggleGeoLocation}
									trackColor={{ false: '#767577', true: '#ccc' }}
									thumbColor={isGeoLocationEnabled ? '#612bc1' : '#f4f3f4'}
									/>
								</View>
								<View style={{ marginTop: 10 }}>
									<Label title="GPS Co-ordinates" textalign="left" mb={5} status="basic" fontsize={14} fontweight='bold' />
									<InputOnly name="gpsLat" value={state.gpsLat} onChange={handleInputChange} placeholder="GPS Latitude" bg={'#f2f2f2'} />
									<InputOnly name="gpsLng" value={state.gpsLng} onChange={handleInputChange} placeholder="GPS Longitude" mt={5} bg={'#f2f2f2'} />
								</View>
								{isGeoLocationEnabled && (
									<>
									<Text style={{ color: '#000', fontSize: 13, marginTop: 15, marginBottom: 15 }}>Tap on "Get GPS co-ordinates" to get the gps co-ordinates of the address you entered above.</Text>
									<ButtonPrimary name="Get GPS co-ordinates" width="100%" onpress={handleGetGps}/>
									{gpsCoords && (
										<View style={{ marginTop: 10 }}>
											<Text style={{ color: '#000', fontSize: 14, marginBottom: 10 }}>Map Preview:</Text>
											<MapView
												style={{ height: 300, width: '100%' }}
												initialRegion={{
												latitude: gpsCoords.latitude,
												longitude: gpsCoords.longitude,
												latitudeDelta: 0.01,
												longitudeDelta: 0.01,
												}}
												>
												<Marker coordinate={gpsCoords} title="Business Location" />
											</MapView>

											<View style={{ flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between', columnGap: 10, marginTop: 10 }}>
												<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1, height: 60, backgroundColor: '#612bc1', borderRadius: 30 }} onPress={handleAccept}>
													<Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Accept</Text>
												</TouchableOpacity>
												<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1, height: 60, backgroundColor: '#EFE7FD', borderRadius: 30 }} onPress={handleRetry}>
													<Text style={{ color: '#612bc1', fontSize: 14, fontWeight: 'bold' }}>Retry</Text>
												</TouchableOpacity>
											</View>
										</View>
									)}
									</>
								)}
								</>
								
							}
						</Card>
						{/* Contact number */}
						<Card style={{ marginBottom: 10 }}>
							<View>
								<Label title="Contact Number (for business)" textalign="left" mb={5} status="basic" fontsize={14} fontweight='bold' />
								<InputPhoneNumber name="contactNumber" value={state.contactNumber} onChange={handleInputChange} placeholder="Enter contact number" bg={errors.contactNumber ? '#ffe6e6' : '#f2f2f2'} />
								{errors.contactNumber && <Text style={styles.error}>{errors.contactNumber}</Text>}
							</View>
						</Card>
						{/* Business hours */}
						<Card style={{ marginBottom: 10 }}>
							<Text style={{ color: '#612bc1', fontSize: 14, fontWeight: 'bold', marginTop: 0, marginBottom: 15 }}>Business Hours</Text>
							<View>
							{hours.map(({ day, open, close }) => (
								<View key={day}>
									<View 
										style={{ 
											flexDirection: 'row', 
											alignItems: 'center', 
											justifyContent: 'space-between', 
											columnGap: 10, 
											borderBottomColor: '#efe7fd', 
											borderBottomWidth: 1, 
											paddingTop: 5, 
											paddingBottom: 5,
											borderTopWidth: day === 'Mon' ? 1 : 0, 
											borderTopColor: day === 'Mon' ? '#efe7fd' : 'transparent', 
											}}  
											key={day}
											>
										<Text style={{ width: 35, color: 'black' }}>{day}</Text>
										<Text style={{ width: 40, color: '#612bc1', fontSize: 14 }}>Open</Text>
										<TextInput
											placeholder="Open"
											value={open}
											style={{ backgroundColor: '#f2f2f2', color: 'black', borderColor: '#efe7fd', borderWidth: 1, flex: 1, textAlign: 'center' }}
											onChangeText={(value) => handleTimeChange(day, 'open', value)}
										/>
										<Text style={{ width: 40, color: '#612bc1', fontSize: 14 }}>Close</Text>
										<TextInput
											placeholder="Close"
											value={close}
											style={{ backgroundColor: '#f2f2f2', color: 'black', borderColor: '#efe7fd', borderWidth: 1, flex: 1, textAlign: 'center' }}
											onChangeText={(value) => handleTimeChange(day, 'close', value)}
										/>
									</View>
								</View>
							))}
							</View>
						</Card>

						{/* Boookings */}
						<Card style={{ marginBottom: 10 }}>
							<Label title="Bookings" textalign="left" mb={5} status="basic" fontsize={14} fontweight="bold" />
							<View>
								<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 0 }}>	
									<Text style={[MainStyles.title_a14, MainStyles.mb_0]}>Enable bookings</Text>
									<Toggle
										name="bookingsEnabled"
										checked={state.bookingsEnabled}
										// onChange={state.setChecked}
										onChange={() => handleInputChange('bookingsEnabled', !state.bookingsEnabled)}
										>
									</Toggle>
								</View>
								<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingBottom: 0}}>
									<Text style={[MainStyles.title_a14, MainStyles.mb_0]}>Maximum bookings per hour:</Text>
									<InputNumpad name="bookingsMax" value={state.bookingsMax} onChange={handleInputChange} placeholder="" mt={10} width={60} />
								</View>
							</View>
						</Card>


						{/* Business bio */}
						<Card style={{ marginBottom: 10 }}>
							<View>
								<InputMultiline label="Business Bio *" name="businessBio" value={state.businessBio} onChange={handleInputChange} placeholder={`Write a description up to 120 characters`} status="basic" bg={errors.businessBio ? '#ffe6e6' : '#f2f2f2'} />
								{errors.businessBio && <Text style={styles.error}>{errors.businessBio}</Text>}
							</View>
						</Card>
						{/* Social media */}
						<Card style={{ marginBottom: 20 }}>
							<Label title="Connect Your Social Media (optional)" textalign="left" mb={5} status="basic" fontsize={14} fontweight="bold" />
							<Text style={{ color: '#00000080', fontSize: 14, marginBottom: 20 }}>Use the "Test URL" button to verify the links</Text>
							<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
								<Image source={require('../../../../../assets/images/x_logo.png')} style={{ width: 36, height: 36 }} />
								<TouchableOpacity style={{ borderColor: '#612bc1', borderWidth: 1, borderRadius: 5, padding: 3 }} onPress={() => handleTestUrl(state.xUrl)}>
									<Text style={{ color: '#000', fontSize: 14 }}>Test URL</Text>
								</TouchableOpacity>
							</View>
							<InputOnly name="xUrl" value={state.xUrl} onChange={handleInputChange} placeholder="Write X username here" status="basic" bg='#f2f2f2'  />

							<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 10, marginBottom: 5 }} >
								<Image source={require('../../../../../assets/images/insta_logo.png')} style={{ width: 32, height: 32 }} />
								<TouchableOpacity style={{ borderColor: '#612bc1', borderWidth: 1, borderRadius: 5, padding: 3 }} onPress={() => handleTestUrl(state.instagramUrl)}>
									<Text style={{ color: '#000', fontSize: 14 }}>Test URL</Text>
								</TouchableOpacity>
							</View>
							<InputOnly name="instagramUrl" value={state.instagramUrl} onChange={handleInputChange} placeholder="Write Instagram username here" bg='#f2f2f2'  />

							<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 10, marginBottom: 5 }} >
								<Image source={require('../../../../../assets/images/fb_logo.png')} style={{ width: 38, height: 38 }} />
								<TouchableOpacity style={{ borderColor: '#612bc1', borderWidth: 1, borderRadius: 5, padding: 3 }} onPress={() => handleTestUrl(state.facebookUrl)}>
									<Text style={{ color: '#000', fontSize: 14 }}>Test URL</Text>
								</TouchableOpacity>
							</View>
							<InputOnly name="facebookUrl" value={state.facebookUrl} onChange={handleInputChange} placeholder="Write Facebook username here" bg='#f2f2f2'  />

							<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 10, marginBottom: 5 }} >
								<Image source={require('../../../../../assets/images/link_logo.png')} style={{ width: 32, height: 32 }} />
								<TouchableOpacity style={{ borderColor: '#612bc1', borderWidth: 1, borderRadius: 5, padding: 3 }} onPress={() => handleTestUrl(state.linkedinUrl)}>
									<Text style={{ color: '#000', fontSize: 14 }}>Test URL</Text>
								</TouchableOpacity>
							</View>
							<InputOnly name="linkedinUrl" value={state.linkedinUrl} onChange={handleInputChange} placeholder="Write Linkedin username here" bg='#f2f2f2'  />

							<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 10, marginBottom: 5 }} >
								<Image source={require('../../../../../assets/images/www_logo.png')} style={{ width: 32, height: 32 }} />
								<TouchableOpacity style={{ borderColor: '#612bc1', borderWidth: 1, borderRadius: 5, padding: 3 }} onPress={() => handleTestUrl(state.wwwUrl)}>
									<Text style={{ color: '#000', fontSize: 14 }}>Test URL</Text>
								</TouchableOpacity>
							</View>
							<InputOnly name="wwwUrl" value={state.wwwUrl} onChange={handleInputChange} placeholder="Enter full website address" handleInputChange="Write Website username here" bg='#f2f2f2'  />
						</Card>
						<ButtonPrimary name="Submit Changes" width="100%" onpress={validateForm}/>
					</Layout>
				</ScrollView>
			{/* </Layout> */}
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
	input: {
		height: 36,
		width: 50,
		margin: 12,
		marginEnd: 0,
		borderWidth: 1,
		borderColor: '#9a9a9a',
		padding: 10,
		borderRadius: 5,
		textAlign: 'center',
	}
});

export default Edit;