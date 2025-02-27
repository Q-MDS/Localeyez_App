import React, { useState, useEffect, useReducer} from "react";
import DbUtils from "../../../services/DbUtils";
import Toast from 'react-native-toast-message';
import { shopperProfilePic } from "../../../services/api_upload";
import { delShpProfilePic } from "../../../services/api_helper";
import MainStyles from "../../../assets/styles/MainStyles";
import { useFocusEffect } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { IconTextIcon } from "../../../components/IconTextIcon";
import { TopNavBack } from "../../../components/TopNavBack";
import { Platform, TouchableOpacity, SafeAreaView, ScrollView, View, Alert, StyleSheet } from "react-native";
import { Layout, Text, Avatar, Divider, Icon } from "@ui-kitten/components";
import { IconText } from "../../../components/IconText";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../components/ButtonSecondary";

const initialState = { 
	email: null,
	firstName: null,
	lastName: null,
	profilePic: null,
	verified: 0
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
	const [shopperId, setShopperId] = useState(0);
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
		const getToken = await DbUtils.getItem('shopper_token');

		setToken(JSON.parse(getToken));
	}

	const getShopperId = async () => 
	{
		const id = await DbUtils.getItem('shopper_id');
		
		setShopperId(JSON.parse(id));
	}

	const getProfile = async () => 
    {
        const profile = await DbUtils.getItem('shopper_profile')
        .then((profile) => 
        {
			console.log('Profile ZZZZ: ', profile);
			dispatch(
			{
				type: 'PROFILE_HOME',
				payload: 
				{
					email: JSON.parse(profile).email,
					firstName: JSON.parse(profile).first_name,
					lastName: JSON.parse(profile).last_name,
					profilePic: JSON.parse(profile).profile_pic,
					verified: JSON.parse(profile).verified
				},
			});
        });
    }

	useEffect(() => 
	{
		const fetchData = async () => 
		{
			await getToken();
			await getShopperId();
			
			setIsReady(true);
		};

		fetchData();
	}, []);

	const updProfile = async (key, newValue) => 
    {
        const profileDataString = await DbUtils.getItem('shopper_profile');
        const profileData = JSON.parse(profileDataString);
      
        profileData[key] = newValue;
      
        await DbUtils.setItem('shopper_profile', JSON.stringify(profileData));
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

	useFocusEffect(React.useCallback(() => 
	{
		getProfile();
	}, []));

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
			}
		});
	};

	const uploadFile = async (imageType, base64Data) => 
	{
		const formData = new FormData();
  		formData.append('shopper_id', shopperId);
  		formData.append('image_type', imageType);
  		formData.append('image', base64Data);

		try 
		{
			const response = await shopperProfilePic(token, formData);
			console.log('Image response:', response.status);
			if (response.status)
			{
				// Get the url of the uploaded image
				// Update shopper_profile
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
        props.navigation.navigate('LoginUser');
    }

    const handleCloseAccount = () => 
    {
        props.navigation.navigate('ShopperAccClose');
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
			shopper_id: shopperId,
		}];

		let record = JSON.stringify(data);
		await delShpProfilePic(token, record)
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

	const handlePricingPlan = () => 
	{
		props.navigation.navigate('Subscribe');
		// const isAndroid = Platform.OS === 'android';
		// const isIOS = Platform.OS === 'ios';

		// if (isAndroid) 
		// {
		// 	// Android
		// 	props.navigation.navigate('AndroidHome');
		// } 
		// else if (isIOS) 
		// {
		// 	// iPhone
		// 	props.navigation.navigate('AppleHome');
		// }
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
			<TopNavBack title="Back: Search Page" alignment="start" navigation={props.navigation} pops={1} />
			<ScrollView style={{  flex: 1 }}>
			<Layout style={ [MainStyles.column_container, {paddingTop: 12}] }>
				<View>
					<TouchableOpacity onPress={chooseDisplayImage} style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
						{state.profilePic == '' || state.profilePic == null ? (
							<Avatar source={require('../../../assets/images/list_icon.png')} style={{ width: 96, height: 96 }} />
						) : (
							<Avatar source={{ uri: state.profilePic }} style={{ width: 96, height: 96 }} />
						)}
					</TouchableOpacity>
					{state.profilePic && 
					<TouchableOpacity onPress={handleDeleteProfilePic} style={{ position: 'absolute', top: 60, left: 210, opacity: 0.5, padding: 5, borderColor: 'black', borderWidth: 0 }} >
						<Icon name="trash-2-outline" fill="#220622" style={{  width: 24, height: 24 }} />
					</TouchableOpacity>
					}
					<Text style={[MainStyles.title_a18, { width: '100%', textAlign: 'center', fontWeight: 'bold', marginTop: 15 }]}>{`${state.firstName === null ? "-" : state.firstName} ${state.lastName === null ? "-" : state.lastName}`}</Text>
					<Text style={[MainStyles.title_a14, { width: '100%', textAlign: 'center', marginTop: 5 }]}>{state.email}</Text>
					<Divider style={{ height: 20, backgroundColor: 'transparent' }} />
					{state.verified == 1 && (
						<TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} onPress={() => props.navigation.navigate('ShopperVerified')}>
							{/* <IconText title="Verified Member" iconname="checkmark-circle-2" textalign="center" fontsize={15} width={20} status="basic" /> */}
							<Icon name="checkmark-circle-2" fill="#612bc1" style={{ width: 24, height: 24, marginEnd: 10 }} />
							<Text style={[MainStyles.title_a18]}>Verified Member BBBB</Text>
						</TouchableOpacity>
					)}
					<Divider style={{ height: 1, backgroundColor: '#DEDDE7', width: '100%', marginTop: 20, marginBottom: 20 }} />
				</View>
			
			<View>
				{/* <Layout style={[MainStyles.layout_container, style={paddingStart: 15, paddingEnd: 15} ]}> */}
				<IconTextIcon title="Edit Profile" status="basic" iconLeft="person-outline" iconRight="chevron-right-outline" navigation={props.navigation} onpress="ShopperAccEdit" />
				<Divider style={{ height: 30, backgroundColor: 'transparent' }} />
				<IconTextIcon title="Edit Interests" status="basic" iconLeft="heart-outline" iconRight="chevron-right-outline" navigation={props.navigation} onpress="ShopperAccIntHome" />
				<Divider style={{ height: 25, backgroundColor: 'transparent' }} />
				
				{state.verified == 0 ? 

				<TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={handlePricingPlan}>
					<Icon style={styles.icon} fill='#5D5A88' name="pricetags-outline"  />
					<Text style={[MainStyles.title_a14, { textAlign: 'left', flex: 1, paddingStart: 10, fontWeight: 'normal' }]}>Pricing Plan</Text>
					<Icon style={styles.icon} fill='#5D5A88' name="chevron-right-outline"  />
				</TouchableOpacity>
				:
					<IconTextIcon title="Pricing Plan" status="basic" iconLeft="pricetags-outline" iconRight="chevron-right-outline" navigation={props.navigation} onpress="ShopperAccPlanMem" />
				}
				<Divider style={{ height: 25, backgroundColor: 'transparent' }} />
				<IconTextIcon title="Security" status="basic" iconLeft="shield-outline" iconRight="chevron-right-outline" navigation={props.navigation} onpress="ShopperAccSecurity" />
				<Divider style={{ height: 25, backgroundColor: 'transparent' }} />
				<IconTextIcon title="Privacy Policy" status="basic" iconLeft="lock-outline" iconRight="chevron-right-outline" type={1} navigation={props.navigation} onpress="PrivacyPolicy" />
				<Divider style={{ height: 1, backgroundColor: '#DEDDE7', width: '100%', marginTop: 25 }} />
			</View>

				<View style={{ flex: 1, marginTop: 25 }} />
				<Layout style={{ flexDirection: 'column', justifyContent: 'flex-end', flex: 1, width: '100%' }} >
					<ButtonPrimary name="Sign Out" width="100%" onpress={handleLogout} />
					<View style={{ marginTop: 15 }} />
					<ButtonSecondary name="Close Account" width="100%" onpress={handleCloseAccount} />
				</Layout>
			</Layout>
			</ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create(
{
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	text: {
		fontSize: 16,
		margin: 2,
	},
	icon: {
		width: 32,
		height: 32,
		},
});

export default Home;