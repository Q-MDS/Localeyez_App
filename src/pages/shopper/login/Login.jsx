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
	credOne: null,
	credTwo: null,
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
    // const [email, setEmail] = useState('');

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'SHOPPER_LOGIN',
			payload: {...state, [name]: newValue}
		});
	}

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
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            
                <View style={{ flexDirection: 'column', flex: 1, alignItems: 'space-between', justifyContent: 'center', width: '100%'}}>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 250, width: '100%' }}>
                        <Image source={require('../../../assets/images/pic_holder.png')} style={{ width: 112, height: 112 }} />
                    </View>
                    <ScrollView style={{ width: '100%', padding: 30 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ marginTop: 20 }} />
                            <TitleOne title="Login as a User" />
                            <View style={{ marginTop: 25 }} />
                            <InputLabelEmail label="Email" name="credOne" value={state.credOne} onChange={handleInputChange} placeholder="Enter email" />
                            <View style={{ marginTop: 25 }} />
                            <InputLabelPassword label="Password" name="credTwo" value={state.credTwo} onChange={handleInputChange} placeholder="Enter password" />
                            <View style={{ marginTop: 15 }} />
                            <Layout style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }} >
                                <Layout style={{ flex: 1 }} >
                                <Checkbox label="Remember me" />
                                </Layout>
                                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1, width: '100%', height: 50 }} >
                                    <TextTwo title="Forgot password?&nbsp;" textalign="right" />
                                    <TouchableOpacity onPress={handleReset}>
                                        <TextTwo title="Reset" underline="underline" textalign="right" />
                                    </TouchableOpacity>
                                </Layout>
                            </Layout>
                            <View style={{ marginTop: 15 }} />
                            <ButtonPrimary name="Login" onpress={handleLogin}/>
                            <View style={{ marginTop: 25 }} />
                            <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                                <TextTwo title="Don't have an account? " textalign="center" />
                                <TouchableOpacity onPress={handleSignup} >
                                    <TextTwo title="Sign up" fontweight="bold" underline="underline" />
                                </TouchableOpacity>
                            </Layout>
                        </View>
                    </ScrollView>
                </View>
            </Layout>
        </SafeAreaView>
    )
}

export default Login;