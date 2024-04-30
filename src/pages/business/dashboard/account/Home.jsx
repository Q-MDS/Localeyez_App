import React, { useState, useEffect, useReducer } from "react";
import DbUtils from "../../../../services/DbUtils";
import { businessProfilePic } from "../../../../services/api_upload";
import Toast from 'react-native-toast-message';
import { launchImageLibrary } from 'react-native-image-picker';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { IconTextIcon } from "../../../../components/IconTextIcon";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../../components/ButtonSecondary";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Layout, Text, Avatar, Divider } from "@ui-kitten/components";

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
		const getToken = await DbUtils.getItem('token');

		setToken(JSON.parse(getToken));
	}

	const getBusinessId = async () => 
	{
		const id = await DbUtils.getItem('business_id');
		
		setBusinessId(JSON.parse(id));
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

	useEffect(() => 
	{
		const fetchData = async () => 
		{
			await getToken();
			await getBusinessId();
			
			setIsReady(true);
		};

		fetchData();
	}, []);

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

    return (
        <SafeAreaView style={{ flex: 1 }}>
			<TopNavBack title="Account details" alignment="start" navigation={props.navigation} pops={1} />
                    <Layout style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop:40, paddingBottom: 30 }}>
						<TouchableOpacity onPress={chooseDisplayImage} style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
						{state.profilePic == '' || state.profilePic == null ? (
							<Avatar source={require('../../../../assets/images/list_icon.png')} style={{ width: 96, height: 96 }} />
						) : (
							<Avatar source={{ uri: state.profilePic }} style={{ width: 96, height: 96 }} />
						)}
					</TouchableOpacity>
                        <Text category="h6" status="primary" style={{ fontWeight: 'bold', marginTop: 15 }}>{`${state.firstName} ${state.lastName}`}</Text>
                        <Text category="p1" status="primary">{state.email}</Text>
                    </Layout>
                    <Divider />
                <Layout style={[MainStyles.layout_container ]}>
                    <IconTextIcon title="Edit Personal Information" iconLeft="person-outline" iconRight="chevron-right-outline" navigation={props.navigation} onpress="BusDashAccEdit" />
                    <Divider style={{ height: 25, backgroundColor: 'transparent' }} />
                    <IconTextIcon title="Pricing Plan" iconLeft="pricetags-outline" iconRight="chevron-right-outline" navigation={props.navigation} onpress="BusDashAccPricing" />
                    <Divider style={{ height: 25, backgroundColor: 'transparent' }} />
                    <IconTextIcon title="Security" iconLeft="shield-outline" iconRight="chevron-right-outline" navigation={props.navigation} onpress="BusDashAccSecurity" />
                    <Divider style={{ height: 25, backgroundColor: 'transparent' }} />
                    <IconTextIcon title="Privacy Policy" iconLeft="lock-outline" iconRight="chevron-right-outline" type={0} navigation={props.navigation} onpress="PrivacyPolicy" />
                    <Layout style={{ flexDirection: 'column', justifyContent: 'center', flex: 1, width: '100%' }} >
                        <ButtonPrimary name="Sign Out" width="100%" onpress={handleLogout} />
                        <View style={{ marginTop: 15 }} />
                        <ButtonSecondary name="Close Account" width="100%" onpress={handleCloseAccount} />
                    </Layout>
                </Layout>
        </SafeAreaView>

    );
};

export default Home;