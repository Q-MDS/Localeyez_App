import React, { useState, useEffect, useReducer } from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import DbUtils from "../../../services/DbUtils";
import Toast from 'react-native-toast-message';
import { businesSupport } from "../../../services/api_helper";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Layout, Divider, Text } from "@ui-kitten/components";
import { InputMultiline } from "../../../components/InputMultiline";
import { ButtonPrimary } from "../../../components/ButtonPrimary";

const initialState = {
	message: null,
};

function reducer(state, action) 
{
	switch (action.type) 
	{
	  case 'CONTACT_ADMIN':
		return { ...state, ...action.payload };
	  default:
		throw new Error();
	}
}

const ContactForm = (props) => 
{
    const [state, dispatch] = useReducer(reducer, initialState);
	const [token, setToken] = useState('');
	const [shopperId, setShopperId] = useState(0);
	const [errors, setErrors] = useState({ message: '' });

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'CONTACT_ADMIN',
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

    useEffect(() => 
	{
		const fetchData = async () => 
		{
			await getToken();
			await getShopperId();
		};

		fetchData();
	}, []);

    const handleSendMessage = async () => 
    {
		const data = [{
			contact_id: shopperId,
			contact_type: '1',
            message: state.message,
        }];

		// Send to server
		try 
		{
			const res = await businesSupport(token, data);
			console.log('res', res);
			if (res.status)
			{
				Toast.show({
					type: 'success',
					position: 'bottom',
					text1: 'Your message has been sent to support. We will get back to you soon.',
					text2: 'Please try again.',
					visibilityTime: 4000,
					autoHide: true,
					topOffset: 30,
					bottomOffset: 40,
				});
			}
		} 
		catch (error) 
		{
			Toast.show({
				type: 'error',
				position: 'bottom',
				text1: 'There was an error sending the message',
				text2: 'Please try again.',
				visibilityTime: 4000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		}
        props.navigation.navigate('ShopperContactConfirm');
    }

	const validateForm = () => 
	{
		let tempErrors = {};

		if (!state.message || state.message === '')
		{
			tempErrors = { ...tempErrors, message: 'Required' };
		}
		
		setErrors(tempErrors);

		if (Object.keys(tempErrors).length === 0)
		{
			handleSendMessage();
		}
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<ScrollView style={{ flex: 1, width: '100%' }}>
				<Layout style={[MainStyles.column_container]}>
				<View style={{ marginTop: 50 }} />
					<View>
						<Text style={[MainStyles.title_aaa, { textAlign: 'center' }]}>Contact Admin</Text>
						<Text style={[MainStyles.title_a14, { textAlign: 'center', marginTop: 20 }]}>Please contact admin when you have an issue such as reporting a user, system issues etc.</Text>
						<Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20, marginBottom: 20 }} />
						<View style={{ position: 'relative' }} >
						<InputMultiline label="Write a message to Admin" name="message" value={state.message} onChange={handleInputChange} height={300} placeholder="Write your message here" status="basic" style={{ marginTop: 20 }} bg={errors.message ? '#ffe6e6' : '#f2f2f2'} />
						{errors.message && <Text style={styles.error}>{errors.message}</Text>}
						</View>
						<ButtonPrimary name="Send Message" width="100%" marginTop={30} onpress={validateForm}/>
					</View>
				</Layout>
				<View style={{ flex: 1 }} />
				<Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} />
			</ScrollView>
		<BotNavShopper selected={3}/>
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
        color: 'red',
        opacity: 0.5,
		fontSize: 12,
    },
});

export default ContactForm;