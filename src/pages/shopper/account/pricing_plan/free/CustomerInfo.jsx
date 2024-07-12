import React, { useState, useEffect } from 'react';
import { subscription } from "../../../../../services/api_stripe";
import DbUtils from '../../../../../services/DbUtils';
import { TopNavArrowTitle } from '../../../../../components/TopNavArrowTitle';
import { SafeAreaView, ScrollView, TextInput, Button, Alert, StyleSheet } from "react-native";
import { Layout, Text } from '@ui-kitten/components';
import {InputLabel} from '../../../../../components/InputLabel';
import {ButtonPrimary} from '../../../../../components/ButtonPrimary';
import { ButtonSecondary } from '../../../../../components/ButtonSecondary';

const CustomerInfo = (props) => 
{
	const [form, setForm] = useState({firstName: '', lastName: '', email: '', shopper_id: ''});
	const [shopperId, setShopperId] = useState(0);
	const [isReady, setIsReady] = useState(false);
	const [clientSecret, setClientSecret] = useState('');
	const [gotSecret, setGotSecret] = useState(false);

	const getShopperId = async () => 
	{
		const id = await DbUtils.getItem('shopper_id');
		
		form.shopper_id = JSON.parse(id);
	}

	const getProfile = async () => 
	{
		const profile = await DbUtils.getItem('shopper_profile')
		.then((profile) => 
		{
			form.email = JSON.parse(profile).email;
			form.firstName = JSON.parse(profile).first_name;
			form.lastName = JSON.parse(profile).last_name;
			
		});
	}

	useEffect(() => 
	{
		const fetchData = async () => 
		{
			await getShopperId();
			await getProfile();
			
			setIsReady(true);
		};

		fetchData();
	}, []);

	const initializePaymentSheet = async () => 
	{
		console.log('KKASDLASKDALS: ', form);
		const data = { first_name: form.firstName, last_name: form.lastName, email: form.email, shopper_id: form.shopper_id};
		try 
		{
			const res = await subscription(data);
			
			const clientSecret = res.latest_invoice.payment_intent.client_secret;
			setClientSecret(clientSecret);
			setGotSecret(true);
			console.log('PaymentIntent:', res.latest_invoice.payment_intent.client_secret);
		} 
		catch(error)
		{
			Alert.alert('Internal server error.', error.message);
		}
		
	};

	const handleFirstNameChange = (text) => 
	{
		setForm(prevForm => ({ ...prevForm, firstName: text }));
	};

	const handleLastNameChange = (text) => 
	{
		setForm(prevForm => ({ ...prevForm, firstName: text }));
	};

	const handleEmailChange = (text) => 
	{
		setForm(prevForm => ({ ...prevForm, firstName: text }));
	};

	const handleSubmit = async () => 
	{
		console.log('Build and pass secret to Stripe');
		// Do some basic validation
		await initializePaymentSheet();
		
	}

	useEffect(() => 
	{
		if (gotSecret)
		{
			if (clientSecret != '')
			{
				props.navigation.navigate('ShopperAccPlanFreeCardDet', { cs: clientSecret });
			}
			else 
			{
				Alert.alert('Internal server error.', 'Stripe error.');
			}
		} 
		else 
		{
			// Get secret never completed
		}
	}, [gotSecret]);

	const handleCancel = () => 
	{
		props.navigation.navigate('ShopperAccPlanFree');
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
        	<TopNavArrowTitle title="Pricing Plan: Customer Details" alignment="start" navigation={props.navigation} />
			<Layout style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 25 }}>
				<Text category="h1" status="primary" style={{ textAlign: "center", marginBottom: 10 }}>Pricing Plan</Text>
				<Text category="h4" style={{ width: '100%', marginTop: 0, marginBottom: 20, textAlign: 'center' }}>Upgrade Subscription</Text>
				<Text category="s1" style={{ width: '100%', marginTop: 0, marginBottom: 30, textAlign: 'center', fontWeight: 'bold' }}>Please complete following:</Text>
				<Text category="s1" style={{ width: '100%', marginTop: 0, marginBottom: 5, textAlign: 'left' }}>First Name</Text>
				<TextInput value={form.firstName} onChangeText={handleFirstNameChange} placeholder="First Name" style={styles.input} />
				<Text category="s1" style={{ width: '100%', marginTop: 15, marginBottom: 5, textAlign: 'left' }}>Last Name</Text>
				<TextInput value={form.lastName} onChangeText={handleLastNameChange} placeholder="Last Name" style={styles.input} />
				<Text category="s1" style={{ width: '100%', marginTop: 15, marginBottom: 5, textAlign: 'left' }}>Email</Text>
				<TextInput value={form.email} onChangeText={handleEmailChange} placeholder="Email" style={styles.input} />
				<Layout style={{ width: '100%', marginTop: 40 }} >
					<ButtonPrimary name="Submit" width="100%" onpress={handleSubmit} />
					<ButtonSecondary name="Cancel" width="100%" marginTop={15} onpress={handleCancel} />
				</Layout>
			</Layout>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	input: {
		width: '100%',
		height: 50,
		paddingStart: 10,
		borderWidth: 0,
		fontSize: 15,
		color: '#000000',
		backgroundColor: '#f2f2f2',
	},
});

export default CustomerInfo;
