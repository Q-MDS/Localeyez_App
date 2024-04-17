import React, { useEffect, useState } from "react";
import DbUtils from "../../../services/DbUtils";
import Toast from 'react-native-toast-message';
import { registerShopper } from "../../../services/auth";
import { TopNavArrowTitle } from "../../../components/TopNavArrowTitle";
import { TitleTwo } from "../../../components/TitleTwo";
import TextOne from "../../../components/TextOne";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import { SafeAreaView, View, Image } from "react-native";
import { Layout } from "@ui-kitten/components";

const StepThree = (props:any) => 
{
	const [shopperProfile, setShopperProfile] = useState({} as any);
	const [shopperSectors, setShopperSectors] = useState([] as any);

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
		console.log('shopperProfile:', shopperProfile);
		// Fetch shopper_sectore
		console.log('shopperSectors:', shopperSectors);
		// Merge fetches.
		const shopperData = [
			{profile: shopperProfile},
			{sectors: shopperSectors}
		];
    	console.log('mergedData:', shopperData);
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
				fetchShopperProfile();
				console.log('Signup completed successfully', remoteId);

				Toast.show({
					type: 'success',
					position: 'bottom',
					text1: 'Signup completed successfully.',
					text2: 'Registration complete. Welcome to Localeyez!',
					visibilityTime: 4000,
					autoHide: true,
					topOffset: 30,
					bottomOffset: 40,
				});

				await DbUtils.setItem('shopper_id', JSON.stringify(remoteId));
				await DbUtils.setItem('shopper_token', JSON.stringify(token));

				props.navigation.navigate("ShopperHome");
			}
		} 
		catch (error) 
		{
			Toast.show({
				type: 'error',
				position: 'bottom',
				text1: 'There was an error with the signup process.',
				text2: 'Please try again.',
				visibilityTime: 4000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		}
    }

	const updProfile = async (key: string | number, newValue: any) => 
	{
		const profileDataString = await DbUtils.getItem('shopper_profile');
		const profileData = profileDataString ? JSON.parse(profileDataString) : {};
		
		profileData[key] = newValue;
		
		await DbUtils.setItem('shopper_profile', JSON.stringify(profileData));
	};

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Registration complete" alignment="start" navigation={props.navigation} />
            <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 25 }}>
                <Image source={require('../../../assets/images/congrats.png')} style={{ width: 89, height: 92 }} />
                    <View style={{ marginTop: 45 }} />
                    <TitleTwo title="Registration Complete!" />
                    <View style={{ marginTop: 25 }} />
                    <TextOne title="You have successfully signed up to Localeyez!" textAlign="center" />
                    <ButtonPrimary name="Get Started" width="100%" marginTop={25} onpress={handelGetStarted}/>
            </Layout>
        </SafeAreaView>
    );
};

export default StepThree;