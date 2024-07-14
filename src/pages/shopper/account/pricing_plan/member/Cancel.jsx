import React, { useState, useEffect } from "react";
import DbUtils from "../../../../../services/DbUtils";
import { cancelSubscription } from "../../../../../services/api_helper";
import MainStyles from "../../../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../../../components/TopNavArrowTitle";
import { SafeAreaView, View, Image, Alert } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../../../components/ButtonSecondary";

const Cancel = (props) => 
{
	const [token, setToken] = useState('');
	const [shopperId, setShopperId] = useState(0);
	const [isCancelled, setIsCancelled] = useState(false);

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

	useEffect(() => 
	{
		const fetchData = async () => 
		{
			await getToken();
			await getShopperId();
		};

		fetchData();
	}, []);

	const updProfile = async (key, newValue) => 
	{
		const profileDataString = await DbUtils.getItem('shopper_profile');
		const profileData = JSON.parse(profileDataString);
		
		profileData[key] = newValue;
		
		await DbUtils.setItem('shopper_profile', JSON.stringify(profileData))
		.then(() => 
		{
			setIsCancelled(true);
		});
	};
	
	const cancelSub = async () => 
	{
        try 
		{
			const params = { shopper_id: shopperId };
            const response = await cancelSubscription(token, params);
			const status = response.status;
			console.log('Subscription cancelled:', status);
			if (status)
			{
				await updProfile('verified', "0");
			}
        } 
		catch (error) 
		{
            console.error('Error cancelling subscription:', error);
            // Handle error, possibly show an alert to the user
        }
    };

    const handleCancel = () => 
    {
        // props.navigation.navigate('ShopperAccPlanMemCancel');
		Alert.alert(
			'Confirm Cancellation', // Alert Title
			'Are you sure you want to cancel your subscription?', // Alert Message
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancellation aborted'),
					style: 'cancel',
				},
				{ 
					text: 'Yes, Cancel it', 
					onPress: () => 
					{
						cancelSub();
					} 
				},
			],
			{ cancelable: false }
		);
    }

    const handleGoBack= () => 
    {
        props.navigation.navigate('ShopperAccPlanMem');
    }

	useEffect(() => 
	{
		if (isCancelled) 
		{
			Alert.alert(
				'Cancellation was successful!',
				'Your subscription has been cancelled.',
				[
					{
					text: 'OK',
					onPress: () => 
					{
						props.navigation.navigate('ShopperAccHome');
					},
					},
				],
				{ cancelable: false }
				);
		}
	}, [isCancelled]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Pricing Plan" alignment="start" navigation={props.navigation} goBackTo="ShopperAccHome" />
            <Layout style={[MainStyles.layout_container, { alignItems: 'center' } ]}>
				<View style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
					<Image source={require('../../../../../assets/images/localeyez_logo_p.png')} style={{ objectFit: 'contain' }} />
				</View>
                <View style={{ flexDirection: 'column', flex: 1, alignItems: 'space-between', justifyContent: 'center', width: '100%', paddingStart: 20, paddingEnd: 20 }}>
                    <Text category="h5" status="primary" style={{ fontWeight: 'bold', marginTop: 15, width: '100%', textAlign: 'center' }}>Are you sure you want to cancel your subscription?</Text>
                    <Text category="p1" status="primary" style={{ marginTop: 15, width: '100%', textAlign: 'center' }}>If you cancel the subscription, you will loose access to amazing discounts from businesses around you.</Text>
                    <View style={{ marginTop: 50 }} />
                    <ButtonPrimary name="Cancel Subscription" width="100%" onpress={handleCancel} />
                    <View style={{ marginTop: 15 }} />
                    <ButtonSecondary name="Go Back" width="100%" onpress={handleGoBack} />
                </View>

            </Layout>
        </SafeAreaView>
    );
};

export default Cancel;