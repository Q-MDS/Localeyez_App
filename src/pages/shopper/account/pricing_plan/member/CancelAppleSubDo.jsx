import React, { useState, useEffect } from "react";
import Purchases from 'react-native-purchases';
import DbUtils from "../../../../../services/DbUtils";
import { cancelSubscription } from "../../../../../services/api_helper";
import MainStyles from "../../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../../components/TopNavBack";
import { Linking, SafeAreaView, ScrollView, View, Image, Alert } from "react-native";
import { Layout, Text, Icon, Card } from "@ui-kitten/components";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../../../components/ButtonSecondary";

const CancelAppleSubDo = (props) => 
{
	const [token, setToken] = useState('');
	const [shopperId, setShopperId] = useState(0);
	const [isCancelled, setIsCancelled] = useState(false);
	const [stepOne, setStepOne] = useState(false);
	const [stepTwo, setStepTwo] = useState(true);
	const [subscribed, setSubscribed] = useState(0);

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
		const profile = await DbUtils.getItem('shopper_profile');

		const profileData = JSON.parse(profile);

		setSubscribed(profileData.subscribed);
	}

	useEffect(() => 
	{
		const fetchData = async () => 
		{
			await getToken();
			await getShopperId();
			await getProfile();
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
	
	// Delete - used for android
	const cancelSub = async () => 
	{
        try 
		{
			const params = { shopper_id: shopperId };
            const response = await cancelSubscription(token, params);
			const status = response.status;
			const profile = response.shopper_profile;

			console.log('Subscription cancelled:', response);
			if (status)
			{
				DbUtils.setItem('shopper_profile', JSON.stringify(profile));
				
				await DbUtils.setItem('subscribed', '0');
				setSubscribed(0);

				await deleteSubscription();
			}
        } 
		catch (error) 
		{
            console.error('Error cancelling subscription:', error);
            // Handle error, possibly show an alert to the user
        }
    };

	const deleteSubscription = async () => 
	{
		const activeSubscriptions = await getCustomerInfo();

		if (activeSubscriptions.length > 0) 
		{
			// Cancel subscription
			await Purchases.cancelSubscription(activeSubscriptions[0]);
			console.log('Subscription cancelled');
		}
		else 
		{
			console.log('No active subscriptions');
		}
	}

	const getCustomerInfo = async () => 
	{
		try 
		{
			const customerInfo = await Purchases.getCustomerInfo();
			return customerInfo.activeSubscriptions;
		} 
		catch (error) 
		{
			console.error('Failed to fetch customer info:', error);
			return null;
		}
	}

    const handleCancel = () => 
    {
        // props.navigation.navigate('ShopperAccPlanMemCancel');
		Alert.alert(
			'Cancel Subscription', // Alert Title
			'If you cancelled your subscription on App Store the process is complete. If you changed your mind please contact support to restore your subscription status.', // Alert Message
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
		if (subscribed == 1)
		{
			// props.navigation.navigate('CancelAppleSub');
			props.navigation.goBack();
		} 
		else 
		{
			Alert.alert(
				'Cancel Subscription', // Alert Title
				'If you canceled your subscription on App Store the process is complete. If you changed your mind please contact support (support@localeyez.net) to restore your subscription status.', // Alert Message
				[
					{
						text: 'Ok',
						onPress: () => props.navigation.navigate('LoginUser'),
						style: 'cancel',
					},
				],
				{ cancelable: false }
			);
		}
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

	const handleManageSubscriptions = () => {
        Linking.openURL('https://apps.apple.com/account/subscriptions');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* <TopNavBack title={`Back`} alignment="start" navigation={props.navigation} pops={1} /> */}
            <ScrollView style={{ flex: 1 }}>
				<Layout style={[MainStyles.layout_container, { alignItems: 'center', paddingTop: 0 } ]}>
					<View style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
						<Image source={require('../../../../../assets/images/localeyez_logo_p.png')} style={{ objectFit: 'contain' }} />
					</View>
					<View style={{ flexDirection: 'column', alignItems: 'space-between', justifyContent: 'center', width: '100%', paddingStart: 20, paddingEnd: 20 }}>
						<Text category="h5" status="primary" style={{ fontWeight: 'bold', marginTop: 15, marginBottom: 20, width: '100%', textAlign: 'center' }}>To cancel your subscription is a 2 step process:</Text>
						<Card style={{ width: '100%' }}>
							<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', columnGap: 10, marginTop: 10 }} >
								<Text style={[MainStyles.title_a14, { textAlign: 'left', fontWeight: 'bold' }]}>Step 1:</Text>
							</View>
							<Text style={[MainStyles.title_a14, { textAlign: 'left', fontWeight: 'normal', marginTop: 10 }]}>Tap on Cancel Subscription to update your Localeyez subscription status.</Text>
							{subscribed == 0 ? 
							(
								<View style={{ width: '100%', marginTop: 15, borderColor: '#612bc1', paddingVertical: 10, borderWidth: 1, borderRadius: 5 }}>
									<Text style={{ fontSize: 16, textAlign: 'center' }}>Subscription not active</Text>
								</View>
							)
							: 
							(
								<ButtonPrimary name="Cancel Subscription" width="100%" marginTop={20} onpress={handleCancel} />
							)}
							
						</Card>
						<View style={{ marginTop: 15 }} />
						<Card style={{ width: '100% '}}>
							<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', columnGap: 10, marginTop: 10 }} >
								<Text style={[MainStyles.title_a14, { textAlign: 'left', fontWeight: 'bold' }]}>Step 2:</Text>
							</View>
							<Text style={[MainStyles.title_a14, { textAlign: 'left', fontWeight: 'normal', marginTop: 10 }]}>To cancel your subscription, please visit the App Store. Tap "Manage Subscriptions" to proceed.</Text>
							<ButtonPrimary name="Manage Subscriptions" width="100%" marginTop={20} onpress={handleManageSubscriptions} />
						</Card>
						<ButtonSecondary name="Go Back" width="100%" marginTop={20} onpress={handleGoBack} />
					</View>
				</Layout>
			</ScrollView>
        </SafeAreaView>
    );
};

export default CancelAppleSubDo;