import React, { useState, useEffect, useReducer } from 'react';
import DbUtils from '../../../services/DbUtils';
import { login } from '../../../services/auth';
import Toast from 'react-native-toast-message';
import { SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { TitleOne } from '../../../components/TitleOne';
import { InputLabelEmail } from '../../../components/InputLabelEmail';
import { InputLabelPassword } from '../../../components/InputLabelPassword';
import { Checkbox } from '../../../components/Checkbox';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { Layout } from '@ui-kitten/components';
import TextTwo from '../../../components/TextTwo';
import { InputLabel } from '../../../components/InputLabel';

const initialState = {
	// credOne: 'Harry@gmail.com',
	// credTwo: '123456',
	credOne: 'admin@localeyez.net',
	credTwo: '123456',
};

function reducer(state: any, action: { type: any; payload: any; }) 
{
	switch (action.type) 
	{
	  case 'BUSINESS_LOGIN':
		return { ...state, ...action.payload };
	  default:
		throw new Error();
	}
}

const Login = (props: any) => 
{
	const [state, dispatch] = useReducer(reducer, initialState);

	function handleInputChange(name: any, newValue: any) 
	{
		dispatch(
		{
			type: 'BUSINESS_LOGIN',
			payload: {...state, [name]: newValue}
		});
	}

	const getProfile = async () => 
	{
		const profile = await DbUtils.getItem('business_profile')
		.then((profile:any) => 
		{
			console.log('Profile:', profile);
			if (profile === null) return;
			dispatch(
			{
				type: 'BUSINESS_LOGIN',
				payload: 
				{
					credOne: JSON.parse(profile).email,
				},
			});
		});
	}

	useEffect(() => 
	{
		getProfile();
	}, []);

    const handleLogin = async () => 
    {
		// Clear the local storage
		await DbUtils.clear();

		// Auth on server
		try {
			const res = await login(state.credOne, state.credTwo);
			const status = res.status;
			const credType = res.cred_type;

			if (status)
			{
				if (credType === '0')
				{
					const businessId = res.business_id;
					const token = res.token;
					const businessProfile = res.business_profile;
					const businessSectors = res.business_sectors;
					console.log('FRAKFRAK', businessSectors);
					const promotions = res.promotions;
					const events = res.events;
		
					console.log('Token at login:', token);
		
					Toast.show({
						type: 'success',
						position: 'bottom',
						text1: 'Login accepted',
						text2: 'Going to the business dashboard',
						visibilityTime: 1000,
						autoHide: true,
						topOffset: 30,
						bottomOffset: 40,
					});
		
					let jsonBusinessId = JSON.stringify(businessId);
					await DbUtils.setItem('business_id', jsonBusinessId);
					
					let jsonToken = JSON.stringify(token);
					await DbUtils.setItem('token', jsonToken);
		
					let jsonBusinessProfile = JSON.stringify(businessProfile);
					await DbUtils.setItem('business_profile', jsonBusinessProfile);
	
					await DbUtils.setItem('business_sectors', businessSectors);
		
					let jsonPromotions = JSON.stringify(promotions);
					await DbUtils.setItem('promotions', jsonPromotions);
		
					let jsonEvents = JSON.stringify(events);
					await DbUtils.setItem('events', jsonEvents);
		
					props.navigation.navigate('BusinessDashboard');
				}
				else 
				{
					const token = res.token;
					let jsonToken = JSON.stringify(token);
					await DbUtils.setItem('admin_token', jsonToken); 
					props.navigation.navigate('AdminNewBusinessHome');
				}
			} 
			else 
			{
				console.log('Went here', res);
				if (res == "AxiosError: Request failed with status code 404")
				{
					Toast.show({
						type: 'error',
						position: 'bottom',
						text1: 'Network error',
						text2: 'Please check your internet connection.',
						visibilityTime: 4000,
						autoHide: true,
						topOffset: 30,
						bottomOffset: 40,
					});
				} 
				else 
				{
					Toast.show({
						type: 'error',
						position: 'bottom',
						text1: 'Invalid login details',
						text2: 'Please try again.',
						visibilityTime: 4000,
						autoHide: true,
						topOffset: 30,
						bottomOffset: 40,
					});
				}
			}
		} 
		catch (error)
		{
			Toast.show({
				type: 'error',
				position: 'bottom',
				text1: 'Error',
				text2: 'An unknown error occured, please contact support',
				visibilityTime: 4000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		}
    }

    const handleRememberMe = () => 
    {
        console.log('Remember me...');
    }

    const handleReset = () => 
    {
        console.log('Reset password...');
    }

    const handleSignup = () => 
    {
        props.navigation.navigate('SignupBusinessStepOne');
    }

    return (
        <SafeAreaView style={{flex: 1}}>
			
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                 <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', width: '100%'}}>
					<View style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
						<Image source={require('../../../assets/images/app_pic_3.png')} style={{ objectFit: 'contain' }} />
					</View>
					
                    <ScrollView style={{ width: '100%', padding: 24 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ marginTop: 0 }} />
                            <TitleOne title="Login as a Business" status="basic" />
                            <View style={{ marginTop: 25 }} />
                            <InputLabelEmail label="Email" name="credOne" value={state.credOne} onChange={handleInputChange} status="basic" placeholder="Enter email" />
                            <View style={{ marginTop: 25 }} />
							<InputLabelPassword label="Password" name="credTwo" value={state.credTwo} onChange={handleInputChange} status="basic" placeholder="Enter password" />
                            <View style={{ marginTop: 15 }} />
                            <Layout style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }} >
                                <Layout style={{ flex: 1 }} >
                                <Checkbox label="Remember me" />
                                </Layout>
                                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1, width: '100%' }} >
                                    <TextTwo title="Forgot password?&nbsp;" textalign="right" status="basic" />
                                    <TouchableOpacity onPress={handleReset}>
                                        <TextTwo title="Reset" underline="underline" textalign="right" status="primary" />
                                    </TouchableOpacity>
                                </Layout>
                            </Layout>
                            <View style={{ marginTop: 35 }} />
                            <ButtonPrimary name="Login" onpress={handleLogin}/>
                            <View style={{ marginTop: 15 }} />
                            <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                                <TextTwo title="Don't have an account? " textalign="center" status="basic" />
                                <TouchableOpacity onPress={handleSignup} >
                                    <TextTwo title="Sign up" fontweight="bold" underline="underline" status="primary" />
                                </TouchableOpacity>
                            </Layout>
                        </View>
                    </ScrollView> 
                </View>
            </Layout>
        </SafeAreaView>
    );
};

export default Login;