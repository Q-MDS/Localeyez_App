import React, { useState, useReducer} from 'react';
import MainStyles from '../../../assets/styles/MainStyles';
import { resetPassword } from '../../../services/auth';
import { TopNavBack } from '../../../components/TopNavBack';
import { InputLabelEmail } from '../../../components/InputLabelEmail';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { ButtonText } from '../../../components/ButtonText';
import { SafeAreaView, ScrollView, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

const initialState = {
	email: '',
};

function reducer(state: any, action: { type: any; payload: any; }) 
{
	switch (action.type) 
	{
	  case 'FORGOT_PASSWORD':
		return { ...state, ...action.payload };
	  default:
		throw new Error();
	}
}

const Forgot = (props: any) => 
{
	const [state, dispatch] = useReducer(reducer, initialState);

	function handleInputChange(name: any, newValue: any) 
	{
		dispatch(
		{
			type: 'FORGOT_PASSWORD',
			payload: {...state, [name]: newValue}
		});
	}

	const showAlert = (title: string, message: string, nav: any) =>
	{
		Alert.alert(
			title,
			message,
			[
				{ text: 'OK', onPress: () => nav },
			],
			{ cancelable: false },
		);
	}

	const handleSubmit = async () => 
	{
		console.log('Put the weed in the coconut and light that shit up: ', state.email);
		try
		{
			if (state.email.trim() == '')
			{
				showAlert('Validation error', "Email address is required", '');
			}
			else
			{

			}
			const data = {email: state.email.trim(), type: 1};
			await resetPassword(data)
			.then((res) =>
			{
				console.log('Response: ', res);
				if (res.status)
				{
					showAlert('Success', res.message, props.navigation.navigate('LoginUser'));
				}
				else
				{
					showAlert('Error', res.message, '');
				}
				handleInputChange('', 'email');
			});
		}
		catch (error)
		{
			console.log('Error: ', error);
		}
	}

	const handleBack = () => 
	{
		props.navigation.navigate('LoginUser');
	}

  return (
	<SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
		<TopNavBack navigation={props.navigation} pops={1} />
		<Layout style={[MainStyles.column_container, { paddingTop: 100}]}>
			<ScrollView style={{ flex: 1, width: '100%' }}>
				<Text style={MainStyles.title_one}>Forgot Password</Text>
				<Text style={[MainStyles.title_a18, {marginBottom: 20 }]}>Enter your email address below and we'll send you a link to reset your password.</Text>
					<View style={{ position: 'relative' }} >
						<InputLabelEmail label="Email Address" name="email"  value={state.email} onChange={handleInputChange} placeholder="Enter email" status="basic" mb={20} bg={'#f2f2f2'} />
					</View>
					<ButtonPrimary name="Submit" marginTop={20} onpress={handleSubmit}/>
					<ButtonText name="Back to login" marginTop={15} onpress={handleBack} />
			</ScrollView>
		</Layout>
	</SafeAreaView>
  )
}

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

export default Forgot;
