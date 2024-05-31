import React, { useState, useEffect, useReducer } from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import DbUtils from "../../../services/DbUtils";
import Toast from 'react-native-toast-message';
import { businesSupport } from "../../../services/api_helper";
import { BotNavBusiness } from "../../../components/BotNavBusiness";
import { SafeAreaView, ScrollView, View } from "react-native";
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
	const [businessId, setBusinessId] = useState('');

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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<ScrollView style={{ flex: 1, width: '100%' }}>
            <Layout style={[MainStyles.column_container]}>
                <View style={{ marginTop: 50 }} />
				<View>
					<Text style={[MainStyles.title_aaa, { textAlign: 'center' }]}>Contact Admin</Text>
					<Text style={[MainStyles.title_a14, { textAlign: 'center', marginTop: 20 }]}>Please contact admin when you have an issue such as reporting a user, system issues etc.</Text>
					<Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20, marginBottom: 20 }} />
					{/* <Text style={[MainStyles.title_a18, { textAlign: 'left', marginTop: 20 }]}>Write a message to Admin</Text> */}
					<InputMultiline label="Write a message to Admin" name="message" value={state.message} onChange={handleInputChange} height={300} placeholder="Write your message here" status="basic" style={{ marginTop: 20 }} />
					<ButtonPrimary name="Send Message" width="100%" marginTop={30} onpress={handleSendMessage}/>
				</View>
            </Layout>
			<View style={{ flex: 1 }} />
            <Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} />
			</ScrollView>
            <BotNavBusiness selected={3}/>
        </SafeAreaView>
    );
};

export default ContactForm;