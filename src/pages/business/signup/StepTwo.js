import React, { useState, useEffect, useReducer } from 'react';
import DbUtils from '../../../services/DbUtils'; 
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import CustomIcon from '../../../components/CustomIcon';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../components/TopNavBack';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { InputLabel } from '../../../components/InputLabel';
import { InputMultiline } from '../../../components/InputMultiline';
import { Label } from '../../../components/Label';
import { SafeAreaView, ScrollView, View, ActivityIndicator, TouchableOpacity, Image, StyleSheet, TextInput, Alert, Switch } from 'react-native';
import { Layout, Card, Toggle, Text, Divider } from '@ui-kitten/components';
import { InputPhoneNumber } from '../../../components/InputPhoneNumber';
import { InputOnly } from '../../../components/InputOnly';
import { ButtonSecondary } from '../../../components/ButtonSecondary';

const initialState = {
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
	gpsLatitude: null, 
	gpsLongitude: null
};

function reducer(state, action) 
{
	switch (action.type) 
	{
	  case 'SET_SIGNUP_TWO':
		return { ...state, ...action.payload };
	  default:
		throw new Error();
	}
}

const StepTwo = (props) => 
{
	const [state, dispatch] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(true);
	const [errors, setErrors] = useState({ contactNumber: '', company: '', addressOne: '', addressTwo: '', city: '', province: '', businessBio: '' });
	const [isGeoLocationEnabled, setGeoLocationEnabled] = useState(false);
	// const [gpsCoords, setGpsCoords] = useState(null);
	const [gpsCoords, setGpsCoords] = useState(null);
	
	const businessHours = [
		{ day: 'Mon', open: '08:00', close: '17:00' },
		{ day: 'Tue', open: '08:00', close: '17:00' },
		{ day: 'Wed', open: '08:00', close: '17:00' },
		{ day: 'Thu', open: '08:00', close: '17:00' },
		{ day: 'Fri', open: '08:00', close: '17:00' },
		{ day: 'Sat', open: '09:00', close: '14:00' },
		{ day: 'Sun', open: 'Closed', close: 'Closed' },
	];
	const [hours, setHours] = useState([]);
	
	const handleTimeChange = (day, timeType, value) => 
	{
		const updatedHours = hours.map(hour => 
		hour.day === day ? { ...hour, [timeType]: value } : hour
		);
		setHours(updatedHours);
	};

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'SET_SIGNUP_TWO',
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
				type: 'SET_SIGNUP_TWO',
				payload: 
				{
					contactNumber: JSON.parse(profile).contact_number,
					companyName: JSON.parse(profile).company_name,
					// addressOne: JSON.parse(profile).loc_add_one,
					addressOne: '15 Scott Street',
					// addressTwo: JSON.parse(profile).loc_add_two,
					addressTwo: 'Waverley',
					// city: JSON.parse(profile).loc_city,
					city: 'Johannesburg',
					// province: JSON.parse(profile).loc_province,
					province: 'Gauteng',
					// zipCode: JSON.parse(profile).loc_zip_code,
					zipCode: '2001',
					isLocal: JSON.parse(profile).is_local,
					businessBio: JSON.parse(profile).business_bio,
					xUrl: JSON.parse(profile).sm_x,
					instagramUrl: JSON.parse(profile).sm_inst,
					facebookUrl: JSON.parse(profile).sm_fb,
					linkedinUrl: JSON.parse(profile).sm_linkedin,
					wwwUrl: JSON.parse(profile).sm_www,
					businessHours: JSON.parse(profile).business_hours,
					gpsLatitude: '',
					gpsLongitude: ''
				},
			});
			
			setHours(businessHours);

            setIsLoading(false);
        });
    }

    const updProfile = async (key, newValue) => 
    {
        const profileDataString = await DbUtils.getItem('business_profile');
        const profileData = JSON.parse(profileDataString);
      
        profileData[key] = newValue;
      
        await DbUtils.setItem('business_profile', JSON.stringify(profileData));
    };

	const toggleGeoLocation = () => 
	{
		setGeoLocationEnabled((previousState) => !previousState);
		if (!isGeoLocationEnabled)
		{
			setGpsCoords(null);
		}	
	};

	// const getGpsCoordinates = async () => 
	// {
	// 	const address = `${state.addressOne}, ${state.city}, ${state.province}, ${state.zipCode}`;
	// 	const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your API key
	// 	const encodedAddress = encodeURIComponent(address);
	// 	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
	
	// 	try {
	// 	  setLoading(true);
	// 	  const response = await axios.get(url);
	// 	  if (response.data.status === 'OK') {
	// 		const location = response.data.results[0].geometry.location;
	// 		setGpsCoords({ latitude: location.lat, longitude: location.lng });
	// 		Alert.alert('Success', 'GPS coordinates acquired successfully!');
	// 	  } else {
	// 		Alert.alert('Error', 'Unable to get GPS coordinates. Please check the address.');
	// 	  }
	// 	} catch (error) {
	// 	  Alert.alert('Error', 'Something went wrong while fetching GPS coordinates.');
	// 	} finally {
	// 	  setLoading(false);
	// 	}
	//   };

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
				state.gpsLatitude = lat;
				state.gpsLongitude = lon;
				return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
			} else {
				throw new Error('No results found for the given address.');
			}
		} catch (error) {
			console.error('Error fetching GPS coordinates:', error.message);
			return null;
		}
	};

    // const updProfileLocation = async (key, subKey, newValue) => 
    // {
    //     const profileDataString = await DbUtils.getItem('business_profile');
    //     const profileData = JSON.parse(profileDataString);

    //     profileData['location'][0][subKey] = newValue;
      
    //     await DbUtils.setItem('business_profile', JSON.stringify(profileData));
    // };

    useEffect(() => 
    {
        getProfile();
    },[]);

    if (isLoading) 
    {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const handleNext = async () => 
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

        await updProfile('contact_number', state.contactNumber);
        await updProfile('company_name', state.companyName);
        await updProfile('loc_add_one', state.addressOne);
        await updProfile('loc_add_two', state.addressTwo);
        await updProfile('loc_city', state.city);
        await updProfile('loc_province', state.province);
        await updProfile('loc_zip_code', state.zipCode);
        await updProfile('business_bio', state.businessBio);
        await updProfile('is_local', state.isLocal);
        await updProfile('sm_x', xUrl);
        await updProfile('sm_inst', instagramUrl);
        await updProfile('sm_fb', facebookUrl);
        await updProfile('sm_linkedin', linkedinUrl);
        await updProfile('sm_www', state.wwwUrl);
        await updProfile('business_hours', JSON.stringify(hours));
		await updProfile('gps_lat', state.gpsLatitude);
		await updProfile('gps_lng', state.gpsLongitude);
        
        props.navigation.navigate('SignupBusinessStepThree');
    }

	const handleGetGps = async () =>
	{
		const address = `${state.addressOne}+${state.addressTwo}+${state.city}+${state.province}`;
		const formattedAddress = address.replace(/ /g, '+');
		
		const gpsCoords = await getGpsCoordinates(formattedAddress);

		if (gpsCoords) 
		{
			setGpsCoords(gpsCoords);
			state.gpsLatitude = gpsCoords.latitude;
			state.gpsLongitude = gpsCoords.longitude;
			console.log('State:', state);
			console.log('GPS Coordinates:', gpsCoords);
		} 
		else 
		{
			Alert.alert('Error', 'Unable to fetch GPS coordinates. Please check the address and try again.');
		}
	}

	const handleAccept = async () => 
	{
		await updProfile('gps_lat', state.gpsLatitude);
		await updProfile('gps_lng', state.gpsLongitude);

		Alert.alert(
			"Success",
			"GPS coordinates have been saved successfully!",
			[
				{
				text: "Ok",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
				}
			]
		);
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

	const validateForm = () => 
	{
		let tempErrors = {};

		// if (!state.contactNumber)
		// {
		// 	tempErrors = { ...tempErrors, contactNumber: 'Required' };
		// }
		if (!state.companyName)
		{
			tempErrors = { ...tempErrors, companyName: 'Required' };
		}
		if (!state.addressOne)
		{
			tempErrors = { ...tempErrors, addressOne: 'Required' };
		}
		if (!state.addressTwo)
		{
			tempErrors = { ...tempErrors, addressTwo: 'Required' };
		}
		if (!state.city)
		{
			tempErrors = { ...tempErrors, city: 'Required' };
		}
		if (!state.province)
		{
			tempErrors = { ...tempErrors, province: 'Required' };
		}
		if (!state.businessBio)
		{
			tempErrors = { ...tempErrors, businessBio: 'Required' };
		}
		setErrors(tempErrors);

		if (Object.keys(tempErrors).length === 0)
		{
			handleNext();
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavBack title="Back: Login information" alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView style={{ flex: 1, width: '100%' }}>
                <Layout style={[MainStyles.column_container, {paddingStart: 20, paddingEnd: 20, paddingTop: 15}]}>
					{/* Page title */}
					<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginBottom: 10 }} />
					<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#612bc1', width: '100%' }}>Company Information</Text>
					</View>
					<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginTop: 5 }} />
					<Card style={{ marginTop: 20, marginBottom: 10 }}>
						<View>
							<InputLabel label="Company Name*" name="companyName" value={state.companyName} onChange={handleInputChange} status="basic" placeholder="Company name" bg={errors.companyName ? '#efeaf9' : '#f2f2f2'} />
							{errors.companyName && <Text style={styles.error}>{errors.companyName}</Text>}
						</View>
					</Card>

					<Card style={{ marginBottom: 10 }}>
						<View>
							<InputLabel label="Location *" placeholder="Address line 1" name="addressOne" value={state.addressOne} onChange={handleInputChange} status="basic" bg={errors.addressOne ? '#efeaf9' : '#f2f2f2'} />
							{errors.addressOne && <Text style={styles.error}>{errors.addressOne}</Text>}
						</View>
						<View style={{ marginTop: 5 }} />
							<InputOnly placeholder="Address line 2" name="addressTwo" value={state.addressTwo} onChange={handleInputChange} status="basic" bg={errors.addressTwo ? '#efeaf9' : '#f2f2f2'} />
						<View style={{ marginTop: 5 }} />
							<InputOnly placeholder="City" name="city" value={state.city} onChange={handleInputChange} bg={errors.city ? '#efeaf9' : '#f2f2f2'} />
						<View style={{ marginTop: 5 }} />
							<InputOnly placeholder="Province" name="province" value={state.province} onChange={handleInputChange} bg={errors.province ? '#efeaf9' : '#f2f2f2'} />
						<View style={{ marginTop: 5 }} />
							<InputOnly placeholder="ZIP Code" name="zipCode" value={state.zipCode} onChange={handleInputChange} bg='#f2f2f2' />
					</Card>

					<Card style={{ marginBottom: 10 }}>
						<Label title="Enable geo-location" textalign="left" mb={5} status="basic" fontsize={14} fontweight='bold' />
						<Text style={{ color: '#000', fontSize: 11, marginTop: 0, marginBottom: 0 }}>- If you enable geo-location you will be prompted to get and accept the gps co-ordinates for your business address.</Text>
						<Text style={{ color: '#000', fontSize: 11, marginTop: 0, marginBottom: 0 }}>- If you disable geo-location your business will not be displayed in the results if a user has selected a <Text style={{ fontSize: 11, fontWeight: 'bold' }}>search radius</Text> however your business will be displayed if a user has selected a category search e.g. Shopping | Clothing</Text>
						
						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
							<Text style={{ color: '#000', fontSize: 14, marginRight: 10 }}>Enable Geo-location:</Text>
							<Switch
							value={isGeoLocationEnabled}
							onValueChange={toggleGeoLocation}
							trackColor={{ false: '#767577', true: '#ccc' }}
							thumbColor={isGeoLocationEnabled ? '#612bc1' : '#f4f3f4'}
							/>
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
											<Text style={{ color: '#612bc1', fontSize: 14, fontWeight: 'bold', borderRadius: 30 }}>Retry</Text>
										</TouchableOpacity>
									</View>
								</View>
							)}
							</>
						)}
					</Card>


					<Card style={{ marginBottom: 10 }}>
						<View>
							<Label title="Contact Number (for business)" textalign="left" mb={5} status="basic" fontsize={14} fontweight='bold' />
							<InputPhoneNumber name="contactNumber" value={state.contactNumber} onChange={handleInputChange} status="basic" placeholder="Contact Number" bg={errors.contactNumber ? '#efeaf9' : '#f2f2f2'} />
							{errors.contactNumber && <Text style={styles.error}>{errors.contactNumber}</Text>}
						</View>
					</Card>

					<Card style={{ marginBottom: 10 }}>
						<View>
							<InputMultiline label="Business Bio *" name="businessBio" value={state.businessBio} onChange={handleInputChange} status="basic" placeholder="Write a short description up to 120 characters about your business" bg={errors.businessBio ? '#efeaf9' : '#f2f2f2'} />
							{errors.businessBio && <Text style={styles.error}>{errors.businessBio}</Text>}
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

					<Card style={{ marginBottom: 10 }}>
						<Label title="Are you a local business?" textalign="left" mb={5} status="basic" fontweight="bold" />
						<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
							<Toggle
								checked={state.isLocal}
								onChange={() => setIsLocal(!state.isLocal)}
								>
								<Text category='p2' status="basic">{state.isLocal ? 'Yes' : 'No'}</Text>
							</Toggle>
						</Layout>
					</Card>

					<Card style={{ marginBottom: 20 }}>
						<Label title="Connect Your Social Media (optional)" textalign="left" mb={5} status="basic" fontsize={14} fontweight="bold" />
						
						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', columnGap: 10, marginTop: 10, marginBottom: 5 }} >
							<Image source={require('../../../assets/images/x_logo.png')} style={{ width: 36, height: 36 }} />
							<Text style={{ color: '#000', fontSize: 14, marginTop: 0, marginBottom: 0 }}>Only enter your X username.</Text>
						</View>
						<InputOnly name="xUrl" value={state.xUrl} onChange={handleInputChange} marginTop={60} status="basic" placeholder="Write X username here" bg='#f2f2f2' />
						
						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', columnGap: 10, marginTop: 10, marginBottom: 5 }} >
							<Image source={require('../../../assets/images/insta_logo.png')} style={{ width: 32, height: 32 }} />
							<Text style={{ color: '#000', fontSize: 14, marginTop: 0, marginBottom: 0 }}>Only enter your Instagram username.</Text>
						</View>
						<InputOnly name="instagramUrl" value={state.instagramUrl} onChange={handleInputChange} status="basic" placeholder="Write Instagram username here" bg='#f2f2f2' />
						
						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', columnGap: 10, width: '100%', marginTop: 10, marginBottom: 5 }} >
							<Image source={require('../../../assets/images/fb_logo.png')} style={{ width: 38, height: 38 }} />
							<Text style={{ color: '#000', fontSize: 14, marginTop: 0, marginBottom: 0 }}>Only enter your Facebook username.</Text>
						</View>
						<InputOnly name="facebookUrl" value={state.facebookUrl} onChange={handleInputChange} status="basic" placeholder="Write Facebook username here" bg='#f2f2f2' />

						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', columnGap: 10, width: '100%', marginTop: 10, marginBottom: 5 }} >
							<Image source={require('../../../assets/images/link_logo.png')} style={{ width: 32, height: 32 }} />
							<Text style={{ color: '#000', fontSize: 14, marginTop: 0, marginBottom: 0 }}>Only enter your Linkedin username.</Text>
						</View>
						<InputOnly name="linkedinUrl" value={state.linkedinUrl} onChange={handleInputChange} status="basic" placeholder="Write Linkedin username here" bg='#f2f2f2' />

						<View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginTop: 10, marginBottom: 5 }} >
							<Image source={require('../../../assets/images/www_logo.png')} style={{ width: 32, height: 32 }} />
						</View>
						<InputOnly name="wwwUrl" value={state.wwwUrl} onChange={handleInputChange} status="basic" placeholder="Write full website URL here" bg='#f2f2f2' />
					</Card>


                    <ButtonPrimary name="Next" width="100%" onpress={validateForm}/>
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
        color: '#b095e0',
		fontSize: 12,
    },
});

export default StepTwo;