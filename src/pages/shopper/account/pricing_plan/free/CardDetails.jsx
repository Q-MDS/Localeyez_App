import React, { useState, useEffect } from "react";
import DbUtils from "../../../../../services/DbUtils";
import { PlatformPayButton, isPlatformPaySupported, PlatformPay, useApplePay, ApplePayButton } from '@stripe/stripe-react-native';
import {presentApplePay} from '@stripe/stripe-react-native';
import { confirmPlatformPayPayment } from '@stripe/stripe-react-native';
import { subscription } from "../../../../../services/api_stripe";
import {subscribed} from "../../../../../services/api_helper";
import { TopNavArrowTitle } from "../../../../../components/TopNavArrowTitle";
import { TopNavBack } from "../../../../../components/TopNavBack";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../../../components/ButtonSecondary";
import { SafeAreaView, ScrollView, Button, Alert } from "react-native";
import { Layout, Text, Card } from "@ui-kitten/components";
import {CardField, useStripe, PaymentSheetError} from '@stripe/stripe-react-native';
import StripeLogo from '../../../../../assets/images/StripeLogo';
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconText } from "../../../../../components/IconText";

const CardDetails = (props) => 
{
	const [isApplePaySupported, setIsApplePaySupported] = useState(false);
	const [form, setform] = useState({name: 'Mr Bean', email: 'mr.bean@gmail.com', shopper_id: '111'});
	const { initPaymentSheet, presentPaymentSheet } = useStripe();
	const [token, setToken] = useState('');
	const [clientSecret, setClientSecret] = useState('');
	const [shopperId, setShopperId] = useState('');
	const [subscriptionId, setSubscriptionId] = useState('');
	const [customerId, setCustomerId] = useState('');
	const [priceId, setPriceId] = useState('');
	const [prodId, setProdId] = useState('');

	// const {presentApplePay} = useStripe();

	useEffect(() => 
	{
		(async function () 
		{
		  setIsApplePaySupported(await isPlatformPaySupported());
		// setIsApplePaySupported(true);
		})();
	}, [isPlatformPaySupported]);

	const getToken = async () => 
	{
		const getToken = await DbUtils.getItem('shopper_token');

		setToken(JSON.parse(getToken));
	}
	
	useEffect(() => 
	{
		getToken();
		setClientSecret(props.route.params.cs);
		setShopperId(props.route.params.shopperId);
		setSubscriptionId(props.route.params.subscriptionId);
		setCustomerId(props.route.params.customerId);
		setPriceId(props.route.params.priceId);
		setProdId(props.route.params.prodId);
	}, []);

	useEffect(() => 
	{
		const initializePaymentSheet = async () => 
		{
			console.log('Frakkers 1');
			const {error} = await initPaymentSheet({
				paymentIntentClientSecret: clientSecret,
				returnURL: 'stripe-example://payment-sheet',
				// Set `allowsDelayedPaymentMethods` to true if your business handles
				// delayed notification payment methods like US bank accounts.
				allowsDelayedPaymentMethods: true,
				merchantDisplayName: 'LocalEyez Ltd.',
			});
		  if (error) {
			// Handle error
			console.log('Frakkers 2', error);
		  }
		};
		console.log('Client Secret ZZZ:', clientSecret);
		if (clientSecret != '')
		{
			initializePaymentSheet();
		}
	  }, [clientSecret, initPaymentSheet]);

	const initializePaymentSheet = async () => 
	{
		// Call your backend to create a new PaymentIntent and get its client secret
		const data = { name: form.name, email: form.email, shopper_id: form.shopper_id};
		// const test = await subscription(data);
		// console.log('Test:', test);
		// return;

		const res = await subscription(data);
		const clientSecret = res.latest_invoice.payment_intent.client_secret;
		setClientSecret(clientSecret);
		console.log('PaymentIntent:', res.latest_invoice.payment_intent.client_secret);
	  
		/*const { error } = await initPaymentSheet({
		  customerId: customer,
		  customerEphemeralKeySecret: ephemeralKey,
		  paymentIntentClientSecret: paymentIntent,
		  merchantDisplayName: 'Your Merchant Name',
		});
	  
		if (!error) {
		  const { error: presentError } = await presentPaymentSheet();
		  if (!presentError) {
			// Handle successful payment here
		  } else {
			// Handle payment error here
		  }
		}*/
	};

	const updProfile = async (key, newValue) => 
	{
		const profileDataString = await DbUtils.getItem('shopper_profile');
		const profileData = JSON.parse(profileDataString);
		
		profileData[key] = newValue;
		
		await DbUtils.setItem('shopper_profile', JSON.stringify(profileData));
	};

	const handleCheckout = async () => 
	{
		const {error} = await presentPaymentSheet();
		if (error) {
			if (error.code === PaymentSheetError.Failed) {
			// Handle failed
			Alert.alert("There was a server error. Please try again later!", error.message);
			} else if (error.code === PaymentSheetError.Canceled) {
			// Handle canceled
			Alert.alert("Payment was cancelled!");
			}
		} else {
			// Payment succeeded
			// Alert.alert("Payment was successful!");
			updateShopper();
		}
	}

	const pay = async () => 
	{
		// const clientSecret = await fetchPaymentIntentClientSecret()
		const { error } = await confirmPlatformPayPayment(
		clientSecret,
		{
			applePay: {
			cartItems: [
				{
				label: 'Localeyez Member monthly subscription fee',
				amount: '10.00',
				paymentType: PlatformPay.PaymentType.Immediate,
				},
				{
				label: 'Total',
				amount: '10.00',
				paymentType: PlatformPay.PaymentType.Immediate,
				},
			],
			merchantCountryCode: 'US',
			currencyCode: 'USD',
			requiredShippingAddressFields: [
				PlatformPay.ContactField.PostalAddress,
			],
			requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
			},
		}
		);
		if (error) {
		// handle error
		} else {
		Alert.alert('Success', 'Check the logs for payment intent details.');
		console.log(JSON.stringify(paymentIntent, null, 2));
		}
	}

	const handleApplePayPress = async () => 
	{
		const { error } = await confirmPlatformPayPayment(
		clientSecret,
		{
			applePay: {
			cartItems: [
				{
				label: 'Monthly Localeyez subscription',
				amount: '10.00',
				paymentType: PlatformPay.PaymentType.Immediate,
				},
				{
				label: 'Localeyez',
				amount: '10.00',
				paymentType: PlatformPay.PaymentType.Immediate,
				},
				
			],
			requestPayerName: true,
			merchantCountryCode: 'US',
			merchantName: 'Localeyez',
			merchantDisplayName: 'Localeyez',
			currencyCode: 'USD',
			requiredShippingAddressFields: [
				PlatformPay.ContactField.PostalAddress,
			],
			requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
			},
		}
		);
		if (error) {
			if (error.code === PaymentSheetError.Failed) 
			{
				// Handle stripe/server error
				Alert.alert("There was a server error. Please try again later!", error.message);
			} 
			else if (error.code === PaymentSheetError.Canceled) 
			{
				// Handle canceled
				Alert.alert("Payment was cancelled!", error.message);
			}
		} 
		else 
		{
			updateShopper();
		}
	};

	// const handleApplePayPress = async () => {
	// 	const {error, paymentMethod} = await presentApplePay({
	// 	  cartItems: [
	// 		{label: 'Product Name', amount: '10.00'},
	// 		{label: 'Tax', amount: '2.00'},
	// 	  ],
	// 	  country: 'US',
	// 	  currency: 'USD',
	// 	  shippingMethods: [
	// 		// Define shipping methods if applicable
	// 	  ],
	// 	  requiredShippingAddressFields: ['emailAddress', 'postalAddress'],
	// 	  requiredBillingContactFields: ['name'],
	// 	  merchantName: 'Your Merchant Name',
	// 	});
	
	// 	if (error) {
	// 	  // Handle error
	// 	  console.error(error);
	// 	} else {
	// 	  // Process the payment with the paymentMethod
	// 	}
	//   };

	const updateShopper = async () => 
	{
		const data = { shopper_id: shopperId, stripe_sub_id: subscriptionId, stripe_cust_id: customerId, stripe_price_id: priceId, stripe_prod_id: prodId };
		console.log('Update Shopper:', data);
		await subscribed(token, data)
		.then((res) => 
		{
			updProfile('verified', "1");
			Alert.alert(
				'Payment was successful!',
				'Thank you for your subscription', // Optional Alert message
				[
				  {
					text: 'OK',
					onPress: () => {
					  // Code to execute after tapping OK
					  // For example, navigate to another page
					  props.navigation.navigate('ShopperAccHome');
					},
				  },
				],
				{ cancelable: false } // This prevents the alert from being dismissed by tapping outside of it
			  );

			// Shopper profile - update verified to 1
			
		});

	}

    const handleClose = () => 
    {
        props.navigation.navigate('ShopperAccHome');
    }

	const handleTerms = () => 
	{
		props.navigation.navigate('Terms');
	}

	const handlePrivacy = () => 
	{
		props.navigation.navigate('PrivacyPolicy');
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavBack title={`Back`} alignment="start" navigation={props.navigation} pops={1} />
			<ScrollView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 25 }}>
			<Text category="h1" status="primary" style={{ textAlign: "center", marginBottom: 10 }}>Pricing Plan</Text>
            <Text category="h4" style={{ width: '100%', marginTop: 0, marginBottom: 10, textAlign: 'center' }}>Upgrade Subscription</Text>
			{isApplePaySupported ? 
			(
				<Text category="s1" style={{ width: '100%', marginTop: 0, marginBottom: 30, textAlign: 'center', fontWeight: 'bold' }}>Please review your subscription details below before proceeding with Apple Pay.</Text>
			) 
			: 
			(
				<Text category="s1" style={{ width: '100%', marginTop: 0, marginBottom: 30, textAlign: 'center', fontWeight: 'bold' }}>Please review your subscription details below before proceeding with Stripe.</Text>
			)
			}
			<Card style={{width: '100%'}}>
			<Text category="s1" style={{ paddingTop: 10, paddingBottom: 10, flex: 1 }}>Subscription Details</Text>
			<Layout style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
				<Text category="p1" style={{ paddingBottom: 10, flex: 1 }}>Localeyez Member monthly subscription fee</Text>
			</Layout>
			<Layout style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
				<Text category="p1" style={{ paddingBottom: 10, flex: 1 }}>$10 per month</Text>
			</Layout>
			<Layout style={{ flexDirection: 'row', alignItems: 'center', width: '100%', borderTopColor: 'black', borderTopWidth: 1, paddingTop: 10 }}>
				<Text category="p1" style={{ fontWeight: 'bold' }}>Total: $10/month</Text>
			</Layout>
			</Card>
			<Layout style={{ marginTop: 15, marginBottom: 25}}>
				<Text category="p2">Please note: If you wish to cancel your subscription, go to Account Details • Pricing Plan • Cancel Subscription.</Text>
				<Text category="p2" style={{marginTop: 10}}>By subscribing, you agree to our Terms and Conditions and Privacy Policy.</Text>
				<TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}} onPress={handleTerms}>
					<IconText title="Terms and Conditions" iconname="lock-outline" fontsize={14} width={20} status="basic" />
				</TouchableOpacity>
				<TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} onPress={handlePrivacy}>
					<IconText title="Privacy Policy" iconname="lock-outline" fontsize={14} width={20} status="basic" style={{backgroundColor:'red'}} />
				</TouchableOpacity>
			</Layout>
			
			{isApplePaySupported ? (
				<PlatformPayButton
				onPress={handleApplePayPress}
				type={PlatformPay.ButtonType.Pay}
 				appearance={PlatformPay.ButtonStyle.Black}
				borderRadius={4}
				style={{
					width: '100%',
					height: 50,
				}}
				/>
				
			)
			:
			(
				<Layout>
					<StripeLogo />
					<ButtonPrimary name="Subscribe" width="100%" marginTop={10} onpress={handleCheckout} />
				</Layout>
			)}
			
			<ButtonSecondary name="Cancel" width="100%" marginTop={15} onpress={handleClose} />
            </Layout>
			{/* <Button
				title="Subscribe"
				color={'#5cb85c'}
				style={{width: "50%"}}
				onPress={async () => {
				const {error} = await presentPaymentSheet();
				if (error) {
					if (error.code === PaymentSheetError.Failed) {
					// Handle failed
					Alert.alert("There was a server error. Please try again later!", error.message);
					} else if (error.code === PaymentSheetError.Canceled) {
					// Handle canceled
					Alert.alert("Payment was cancelled!");
					}
				} else {
					// Payment succeeded
					Alert.alert("Payment was successful!");
				}
				}}
			/> */}
			</ScrollView> 	
        </SafeAreaView>
    );
}

export default CardDetails;