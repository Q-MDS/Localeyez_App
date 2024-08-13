import React, { useState, useReducer} from 'react';
import MainStyles from '../../../assets/styles/MainStyles';
import { resetPassword } from '../../../services/auth';
import { TopNavBack } from '../../../components/TopNavBack';
import { InputLabelEmail } from '../../../components/InputLabelEmail';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { ButtonSecondary } from '../../../components/ButtonSecondary';
import { ButtonText } from '../../../components/ButtonText';
import { SafeAreaView, ScrollView, View, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Layout, Text, Card } from '@ui-kitten/components';

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
	const [isLoading, setIsLoading] = useState(false);

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
		setIsLoading(true);
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

				setIsLoading(false);
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

	if (isLoading) 
		{
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			);
		}

  	return (
		<SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
			<TopNavBack navigation={props.navigation} pops={1} />
			<Layout style={[MainStyles.column_container, { paddingTop: 40}]}>
				<ScrollView style={{ flex: 1, width: '100%' }}>
					<Text style={[MainStyles.title_a28, {marginBottom: 10, color: '#000000', textAlign: 'center'}]}>Forgot Password ?</Text>
					<Text style={[MainStyles.title_a16, {marginBottom: 25, textAlign: 'center' }]}>Enter your email address below and we'll send you a link to reset your password.</Text>
					<Card style={{ backgroundColor: 'white', borderRadius: 10, marginBottom: 20 }}>
						<View style={{ position: 'relative' }} >
							<InputLabelEmail label="Email Address" name="email"  value={state.email} onChange={handleInputChange} placeholder="Enter email" status="basic" bg={'#f2f2f2'} />
						</View>
					</Card>
					<ButtonPrimary name="Submit" onpress={handleSubmit}/>
					<ButtonSecondary name="Back to login" marginTop={15} onpress={handleBack} />
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
