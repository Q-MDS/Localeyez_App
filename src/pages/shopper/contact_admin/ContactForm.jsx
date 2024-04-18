import React, { useState, useEffect, useReducer } from "react";
import DbUtils from "../../../services/DbUtils";
import Toast from 'react-native-toast-message';
import { businesSupport } from "../../../services/api_helper";
import MainStyles from "../../../assets/styles/MainStyles";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { SafeAreaView, View } from "react-native";
import { Layout, Divider, Text } from "@ui-kitten/components";
import { TitleOne } from "../../../components/TitleOne";
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <Layout style={[MainStyles.layout_container, {alignItems: 'center', backgroundColor: '#fff'}]}>
                <View style={{ marginTop: 50 }} />
                <TitleOne title="Contact Admin" />
                <Text category="p2" status="primary" style={{ textAlign: 'center', marginTop: 10, marginBottom: 20 }}>Please contact admin when you have an issue such as reporting a user, system issues etc.</Text>
                <View style={{ marginTop: 50 }} />
                <Text category="h6" status="primary" style={{ width: '100%' }}>Write a message to Admin</Text>
                <View style={{ marginTop: 15 }} />
                <InputMultiline name="message" value={state.message} onChange={handleInputChange} placeholder="Write your message here" style={{ marginTop: 10 }} />
                <ButtonPrimary name="Send Message" width="100%" marginTop={25} onpress={handleSendMessage}/>
            </Layout>
            <Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} />
            <BotNavShopper selected={3}/>
        </SafeAreaView>
    );
};

export default ContactForm;