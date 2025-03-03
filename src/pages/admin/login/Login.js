import React, { useState, useEffect, useReducer } from 'react';
import DbUtils from '../../../services/DbUtils';
import Toast from 'react-native-toast-message';
import { loginAdmin } from '../../../services/api_admin';
import { TitleOne } from '../../../components/TitleOne';
import { InputLabelEmail } from '../../../components/InputLabelEmail';
import { InputLabelPassword } from '../../../components/InputLabelPassword';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { SafeAreaView, ScrollView, View, Image  } from 'react-native';
import { Layout } from '@ui-kitten/components';

const initialState = {
	credOne: null,
	credTwo: null,
};

function reducer(state, action) 
{
	switch (action.type) 
	{
	  case 'ADMIN_LOGIN':
		return { ...state, ...action.payload };
	  default:
		throw new Error();
	}
}

const Login = (props) => 
{
    const [state, dispatch] = useReducer(reducer, initialState);
	const [isExists, setIsExists] = useState(false);
	const [isReady, setIsReady] = useState(false);

	/**
	 * DELETE THIS LOGIN FILE: USING BUSINESS LOGIN 
	 * first time at screen
	 * Chk if token exists
	 * Y - autofill cred 1
	 * N - do nothing
	 * user enter c1 & c2
	 * goes to server 
	 * validate
	 * N - invalid creds msg
	 * Y - will receive token
	 * If got token: 
	 * ASync - admin_token
	 * ASync - cred_1
	 * Autofill username with cred 1
	 * User will still have to enter cred 2
	 * LOGIN
	 * 
	 */

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'ADMIN_LOGIN',
			payload: {...state, [name]: newValue}
		});
	}

	const chkExists = async () => 
	{
		const token = await DbUtils.getItem('admin_token');
		const credOne = await DbUtils.getItem('admin_cred_1');

		if (token !== null) 
		{
			setIsExists(true);
			dispatch(
			{
				type: 'ADMIN_LOGIN',
				payload: { credOne: credOne }
			});
		}
		else
		{
			setIsExists(false);
		}

		setIsReady(true);
	}

	useEffect(() => 
	{
		if (!isExists)
		{
			chkExists();
		}

	}, [isExists]);

	const handleLogin = async () => 
    {
        await DbUtils.clear();

		// Auth on server
		const res = await loginAdmin(state.credOne, state.credTwo);
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
				visibilityTime: 2000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		}
    }

    const handleLoginOld = () => 
    {
        props.navigation.navigate('AdminAllBusinessHome');
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
                        <View style={{ marginTop: 40 }} />
                        <TitleOne title="Login As Admin" />
                        <View style={{ marginTop: 25 }} />
                        <InputLabelEmail label="Username" name="credOne" value={state.credOne} onChange={handleInputChange} placeholder="Enter username" />
                        <View style={{ marginTop: 25 }} />
                        <InputLabelPassword label="Password" name="credTwo" value={state.credTwo} onChange={handleInputChange} placeholder="Enter password" />
                        <View style={{ marginTop: 35 }} />
                        <ButtonPrimary name="Login" onpress={handleLogin}/>
                    </View>
                </ScrollView>
                </View>
            </Layout>
        </SafeAreaView>
    )
}

export default Login;