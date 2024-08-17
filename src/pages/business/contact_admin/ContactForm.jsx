import React, { useState, useEffect, useReducer } from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import DbUtils from "../../../services/DbUtils";
import Toast from 'react-native-toast-message';
import { businesSupport } from "../../../services/api_helper";
import { BotNavBusiness } from "../../../components/BotNavBusiness";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Layout, Divider, Text, Card } from "@ui-kitten/components";
import { InputMultiline } from "../../../components/InputMultiline";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import IconSupport from "../../../assets/images/IconSupport";

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
	const [businessId, setBusinessId] = useState('');
	const [errors, setErrors] = useState({ message: '' });

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'CONTACT_ADMIN',
			payload: {...state, [name]: newValue}
		});
	}

	const getBusniessId = async () => 
	{
		const id = await DbUtils.getItem('business_id');
		
		setBusinessId(JSON.parse(id));
	}

	const getToken = async () => 
	{
		const token = await DbUtils.getItem('token');
		
		setToken(JSON.parse(token));
	}

    useEffect(() => 
	{
		const fetchProfile = async () => 
		{
			await getBusniessId();
			await getToken();
		};

		fetchProfile();
	}, []);

    const handleSendMessage = async () => 
    {
		const data = [{
			contact_id: businessId,
			contact_type: '0',
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

        props.navigation.navigate('ContactConfirm');
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
			<Layout style={[MainStyles.layout_container, { paddingTop: 30, paddingStart: 20, paddingEnd: 20, backgroundColor: '#fff'}]}>
				<ScrollView style={{ width: '100%' }}>
					<Text style={[ MainStyles.title_aaa, { textAlign: 'left' }]}>Contact Admin</Text>
					<View style={{ flexDirection: 'column', marginTop: 0, alignItems: 'left', justifyContent: 'center', width: '100%' }} >
						<Text style={[MainStyles.title_a15, { textAlign: 'left', marginTop: 10, paddingEnd: 10 }]}>Please contact admin when you have an issue such as reporting a user, system issues etc.</Text>
					</View>
					{/* <Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginTop: 20, marginBottom: 20 }} /> */}
					{/* <Card style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 20, marginBottom: 20 }}> */}
						<View style={{ marginTop: 30, marginBottom: 20}}>
							<InputMultiline label="Write a message to Admin" name="message" value={state.message} onChange={handleInputChange} height={230} placeholder="Write your message here" status="basic" style={{ marginTop: 20 }} bg={errors.message ? '#ffe6e6' : '#f2f2f2'} />
							{errors.message && <Text style={styles.error}>{errors.message}</Text>}
						</View>
					{/* </Card> */}
					{/* <Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginTop: 20, marginBottom: 20 }} />/ */}
					<ButtonPrimary name="Send Message" width="100%" onpress={validateForm}/>
				</ScrollView>
			</Layout>
            <BotNavBusiness selected={3}/>
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