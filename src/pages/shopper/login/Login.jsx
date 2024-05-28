import React, { useState, useEffect, useReducer } from 'react';
import DbUtils from '../../../services/DbUtils';
import Toast from 'react-native-toast-message';
import { loginShopper } from '../../../services/auth';
import { TitleOne } from '../../../components/TitleOne';
import { InputLabelEmail } from '../../../components/InputLabelEmail';
import { InputLabelPassword } from '../../../components/InputLabelPassword';
import { Checkbox } from '../../../components/Checkbox';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity  } from 'react-native';
import { Layout } from '@ui-kitten/components';
import TextTwo from '../../../components/TextTwo';

const initialState = {
	credOne: "Peter@gmail.com",
	credTwo: "123456",
};

function reducer(state, action) 
{
	switch (action.type) 
	{
	  case 'SHOPPER_LOGIN':
		return { ...state, ...action.payload };
	  default:
		throw new Error();
	}
}

const Login = (props) => 
{
	const [state, dispatch] = useReducer(reducer, initialState);

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'SHOPPER_LOGIN',
			payload: {...state, [name]: newValue}
		});
	}

	const getProfile = async () => 
	{
		const profile = await DbUtils.getItem('shopper_profile')
        .then((profile) => 
        {
			console.log('Profile:', profile);
			if (profile === null) return;
			dispatch(
			{
				type: 'SHOPPER_LOGIN',
				payload: 
				{
					credOne: JSON.parse(profile).email,
				},
			});
        });
	}

	useEffect(() => {
		getProfile();
	}, []);

    const handleLogin = async () => 
    {
        await DbUtils.clear();

		// Auth on server
		const res = await loginShopper(state.credOne, state.credTwo);
		const status = res.status;

		if (status)
		{
			const shopperId = res.shopper_id;
			const token = res.token;
			const shopperProfile = res.shopper_profile;
			const shopperSectors = res.shopper_sectors;

			console.log('Login 1:', token);
			console.log('Login 2:', shopperProfile);

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
			
			let jsonShopperId = JSON.stringify(shopperId);
			await DbUtils.setItem('shopper_id', jsonShopperId);
        	
			let jsonToken = JSON.stringify(token);
			await DbUtils.setItem('shopper_token', jsonToken);

			let jsonShopperProfile = JSON.stringify(shopperProfile);
        	await DbUtils.setItem('shopper_profile', jsonShopperProfile);

			// let jsonSectors = JSON.stringify(shopperSectors);
        	// await DbUtils.setItem('shopper_sectors', jsonSectors);
        	await DbUtils.setItem('shopper_sectors', shopperSectors);

			props.navigation.navigate('ShopperHome');
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

    const handleReset = () => 
    {
        console.log('Reset password...');
    }

    const handleSignup = () => 
    {
        props.navigation.navigate('SignupUserStepOne');
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
            
                {/* <View style={{ flexDirection: 'column', flex: 1, alignItems: 'space-between', justifyContent: 'center', width: '100%'}}> */}
					<View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', width: '100%' }}>
						<Image source={require('../../../assets/images/app_pic_4.png')} style={{ width: '100%', objectFit: 'cover' }} />
					</View>
                    <ScrollView style={{ flex: 1, width: '100%' }}>
                        <View style={{ padding: 24 }}>
                            <TitleOne title="Login as a User" status="basic" />
                            <View style={{ marginTop: 25 }} />
                            <InputLabelEmail label="Email" name="credOne" value={state.credOne} onChange={handleInputChange} placeholder="Enter email" status="basic" />
                            <View style={{ marginTop: 25 }} />
                            <InputLabelPassword label="Password" name="credTwo" value={state.credTwo} onChange={handleInputChange} placeholder="Enter password" status="basic" />
                            <View style={{ marginTop: 15 }} />
                            <Layout style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }} >
                                <Layout >
                                	<Checkbox label="Remember me" />
                                </Layout>
                                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1, width: '100%', height: 50 }} >
                                    <TextTwo title="Forgot password?&nbsp;" textalign="right" status="basic" />
                                    <TouchableOpacity onPress={handleReset}>
                                        <TextTwo title="Reset" underline="underline" textalign="right" status="primary" />
                                    </TouchableOpacity>
                                </Layout>
                            </Layout>
                            <View style={{ marginTop: 15 }} />
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
                {/* </View> */}
            </Layout>
        </SafeAreaView>
    )
}

export default Login;