import React, { useState, useEffect, useReducer } from "react";
import DbUtils from "../../../../services/DbUtils";
import { useFocusEffect } from '@react-navigation/native';
import { businessProfilePic } from "../../../../services/api_upload";
import { delBusProfilePic } from "../../../../services/api_helper";
import Toast from 'react-native-toast-message';
import { launchImageLibrary } from 'react-native-image-picker';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { IconTextIcon } from "../../../../components/IconTextIcon";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../../components/ButtonSecondary";
import { ButtonText } from "../../../../components/ButtonText";
import { SafeAreaView, TouchableOpacity, View, Alert } from "react-native";
import { Layout, Text, Avatar, Divider, Icon } from "@ui-kitten/components";

const initialState = { 
	email: null,
	firstName: null,
	lastName: null,
	profilePic: null
};

function reducer(state, action) 
{
	switch (action.type) 
	{
	  case 'PROFILE_HOME':
		return { ...state, ...action.payload };
	  default:
		throw new Error();
	}
}

const Home = (props) => 
{
	const [state, dispatch] = useReducer(reducer, initialState);

    const [token, setToken] = useState('');
	const [businessId, setBusinessId] = useState(0);
	const [isReady, setIsReady] = useState(false);

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'PROFILE_HOME',
			payload: {...state, [name]: newValue}
		});
	}

	const getToken = async () => 
	{
		await DbUtils.getItem('token').then((getToken) => 
		{
			console.log('Token:', getToken);
			setToken(JSON.parse(getToken));
		})

	}

	const getBusinessId = async () => 
	{
		await DbUtils.getItem('business_id')
		.then((id) => 
		{
			console.log('ID:', id);
			setBusinessId(JSON.parse(id));
		});
		
	}

	const getProfile = async () => 
    {
        const profile = await DbUtils.getItem('business_profile')
        .then((profile) => 
        {
			dispatch(
			{
				type: 'PROFILE_HOME',
				payload: 
				{
					email: JSON.parse(profile).email,
					firstName: JSON.parse(profile).first_name,
					lastName: JSON.parse(profile).last_name,
					profilePic: JSON.parse(profile).profile_pic
				},
			});
        });
    }

	useFocusEffect(React.useCallback(() => 
	{
		const fetchData = async () => 
		{
			await getToken();
			await getBusinessId();
			
			setIsReady(true);
		};

		fetchData();
	}, []));
	
	const updProfile = async (key, newValue) => 
    {
        const profileDataString = await DbUtils.getItem('business_profile');
        const profileData = JSON.parse(profileDataString);
      
        profileData[key] = newValue;
      
        await DbUtils.setItem('business_profile', JSON.stringify(profileData));
    };

	useEffect(() => 
    {
		const fetchData = async () => 
		{
			try 
			{
				getProfile();

				setIsReady(false);
			} 
			catch (error) 
			{
				Toast.show({
					type: 'error',
					position: 'bottom',
					text1: 'There was an error fetching your profile data.',
					text2: 'Please try again.',
					visibilityTime: 4000,
					autoHide: true,
					topOffset: 30,
					bottomOffset: 40,
				});
			}
		};

		if (isReady) 
		{
			fetchData();
		}
    }, [[isReady]]);

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
				handleInputChange('profilePic', response.assets[0].uri);

				const imageType = response.assets[0].type;
				const base64Data = response.assets[0].base64;
				uploadFile(imageType, base64Data);
				// updProfile('profile_pic', response.assets[0].uri);;
			}
		});
	};

	const uploadFile = async (imageType, base64Data) => 
	{
		const formData = new FormData();
  		formData.append('business_id', businessId);
  		formData.append('image_type', imageType);
  		formData.append('image', base64Data);

		try 
		{
			const response = await businessProfilePic(token, formData);
			
			if (response.status)
			{
				const fileLink = response.data;
				updProfile('profile_pic', fileLink);
			}
			
		} 
		catch (error) 
		{
			console.error(error);
		}
	}

    const handleLogout = () => 
    {
        props.navigation.navigate('LoginBusiness');
    }

    const handleCloseAccount = () => 
    {
        props.navigation.navigate('BusDashAccClose');
    }

	const handleDeleteProfilePic = () => 
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
				{ text: "OK", onPress: () => deleteImage() }
			]
		);
	}

	const deleteImage = async () => 
	{
		// Update AS profile
		// Update server profile
		handleInputChange('profilePic', "");
		updProfile('profile_pic', "");

		const data = [{
			business_id: businessId,
		}];

		let record = JSON.stringify(data);
		await delBusProfilePic(token, record)
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavBack title="Account details" alignment="start" navigation={props.navigation} pops={1} />
			{/* <Layout style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop:40, paddingBottom: 30 }}> */}
			<Layout style={ MainStyles.column_container}>
				<View>
					<TouchableOpacity onPress={chooseDisplayImage} style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
					{state.profilePic == '' || state.profilePic == null ? (
						<Avatar source={require('../../../../assets/images/list_icon.png')} style={{ width: 96, height: 96 }} />
					) : (
						<Avatar source={{ uri: state.profilePic }} style={{ width: 96, height: 96 }} />
					)}
					</TouchableOpacity>
					{state.profilePic && 
					<TouchableOpacity onPress={handleDeleteProfilePic} style={{ position: 'absolute', top: 60, left: 210, opacity: 0.5, padding: 5, borderColor: 'black', borderWidth: 0 }} >
						<Icon name="trash-2-outline" fill="#220622" style={{  width: 24, height: 24 }} />
					</TouchableOpacity>
					}
					<Text  style={[MainStyles.title_a12, { width: '100%', textAlign: 'center', marginTop: 5 }]}>Tap on image to add/change</Text>
					<Text style={[MainStyles.title_a18, { width: '100%', textAlign: 'center', fontWeight: 'bold', marginTop: 15 }]}>{`${state.firstName === null ? "-" : state.firstName} ${state.lastName === null ? "-" : state.lastName}`}</Text>
					<Text style={[MainStyles.title_a14, { width: '100%', textAlign: 'center', marginTop: 5 }]}>{state.email}</Text>

				</View>
			
				<View style={{ height: 1, backgroundColor: '#deded7', marginTop:30, marginBottom: 30 }} />
		
				<View>
					<IconTextIcon title="Edit Profile" status="basic" fontsize={16} iconLeft="person-outline" iconRight="chevron-right-outline" navigation={props.navigation} onpress="BusDashAccEdit" />
					<Divider style={{ height: 25, backgroundColor: 'transparent' }} />
					<IconTextIcon title="Pricing Plan" status="basic" fontsize={16} iconLeft="pricetags-outline" iconRight="chevron-right-outline" navigation={props.navigation} onpress="BusDashAccPricing" />
					<Divider style={{ height: 25, backgroundColor: 'transparent' }} />
					<IconTextIcon title="Security" status="basic" fontsize={16} iconLeft="shield-outline" iconRight="chevron-right-outline" navigation={props.navigation} onpress="BusDashAccSecurity" />
					<Divider style={{ height: 25, backgroundColor: 'transparent' }} />
					<IconTextIcon title="Privacy Policy" status="basic" fontsize={16} iconLeft="lock-outline" iconRight="chevron-right-outline" type={0} navigation={props.navigation} onpress="PrivacyPolicy" />
				</View>
				<View style={{ flex: 1 }} />
				<Layout style={{ flexDirection: 'column', justifyContent: 'center', flex: 1, width: '100%' }} >
					<ButtonPrimary name="Sign Out" width="100%" onpress={handleLogout} />
					<ButtonText name="Close Account" width="100%" onpress={handleCloseAccount} />
				</Layout>
			</Layout>
        </SafeAreaView>

    );
};

export default Home;