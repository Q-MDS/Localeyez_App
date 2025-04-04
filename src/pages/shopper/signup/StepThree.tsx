import React, { useEffect, useState } from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import DbUtils from "../../../services/DbUtils";
import Toast from 'react-native-toast-message';
import { registerShopper } from "../../../services/auth";
import { TitleTwo } from "../../../components/TitleTwo";
import TextOne from "../../../components/TextOne";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import { SafeAreaView, View, Image, ActivityIndicator } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { TopNavBack } from "../../../components/TopNavBack";

const StepThree = (props:any) => 
{
	const [shopperProfile, setShopperProfile] = useState({} as any);
	const [shopperSectors, setShopperSectors] = useState([] as any);
	const [isLoading, setIsLoading] = useState(false);

	const fetchShopperProfile = async () => 
	{
		const data = await DbUtils.getItem('shopper_profile');
		setShopperProfile(data);
	}

	const fetchShopperSectors = async () => 
	{
		const data = await DbUtils.getItem('shopper_sectors');
		setShopperSectors(data);
	}

	useEffect(() => 
	{
		const fetchData = async () => 
		{
			await fetchShopperProfile();
			await fetchShopperSectors();
		};
	
		fetchData();
	}, []);

    const handelGetStarted = async () => 
    {
		// Fetch shopper_profile
		// console.log('shopperProfile:', shopperProfile);
		// Fetch shopper_sectore
		// console.log('shopperSectors:', shopperSectors);
		// Merge fetches.
		setIsLoading(true);
		const shopperData = [ {profile: shopperProfile}, {sectors: shopperSectors} ];
    	
		// Do api call
		try 
		{
			const res = await registerShopper(shopperData);
			console.log('res:', res);
			
			if (res.status)
			{
				const remoteId = res.data;
				const token = res.token;
				
				updProfile('remote_id', remoteId);
				updProfile('subscribed', 0);
				fetchShopperProfile();
				console.log('Signup completed successfully', remoteId);

				Toast.show({
					type: 'success',
					position: 'bottom',
					text1: 'Success',
					text2: 'Registration complete. Welcome to Localeyez!',
					visibilityTime: 2000,
					autoHide: true,
					topOffset: 30,
					bottomOffset: 40,
				});

				await DbUtils.setItem('shopper_id', JSON.stringify(remoteId));
				await DbUtils.setItem('shopper_token', JSON.stringify(token));
				await DbUtils.setItem('subscribed', '0');

				props.navigation.navigate("ShopperHome");
			}
		} 
		catch (error) 
		{
			Toast.show({
				type: 'error',
				position: 'bottom',
				text1: 'Oops! Something went wrong.',
				text2: 'There was an error with the signup process.',
				visibilityTime: 2000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		}
		setIsLoading(false);
    }

	const updProfile = async (key: string | number, newValue: any) => 
	{
		const profileDataString = await DbUtils.getItem('shopper_profile');
		const profileData = profileDataString ? JSON.parse(profileDataString) : {};
		
		profileData[key] = newValue;
		
		await DbUtils.setItem('shopper_profile', JSON.stringify(profileData));
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
			{/* <TopNavBack title={`Registration complete`} alignment="start" navigation={props.navigation} pops={1} /> */}
            <Layout style={[MainStyles.column_container, { paddingTop: 100, paddingBottom: 100}]}>
				<View style={{ flex: 1 }} />
				<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                	<Image source={require('../../../assets/images/congrats.png')} style={{ width: 89, height: 92 }} />
				</View>
				<View style={{ marginTop: 45 }} />
				<View>
					<Text style={[MainStyles.title_a24, { fontWeight: '600', textAlign: 'center'}]}>Registration Complete</Text>
					<View style={{ marginTop: 25 }} />
					<Text status="primary" style={[MainStyles.title_a16, { textAlign: 'center'}]}>You have successfully signed up to Localeyez!</Text>
				</View>
				<ButtonPrimary name="Get Started" width="100%" marginTop={40} onpress={handelGetStarted}/>
				<View style={{ flex: 1 }} />
            </Layout>
        </SafeAreaView>
    );
};

export default StepThree;