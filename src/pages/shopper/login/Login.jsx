import React, { useState, useEffect, useReducer } from 'react';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../components/TopNavBack';
import DbUtils from '../../../services/DbUtils';
import Toast from 'react-native-toast-message';
import { loginShopper } from '../../../services/auth';
import { InputLabelEmail } from '../../../components/InputLabelEmail';
import { InputLabelPassword } from '../../../components/InputLabelPassword';
import { Checkbox } from '../../../components/Checkbox';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { SafeAreaView, ScrollView, View, TouchableOpacity, StyleSheet  } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

const initialState = {
	// credOne: "Harry@gmail.com",
	// credTwo: "1",
	credOne: "",
	credTwo: "",
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
	const [errors, setErrors] = useState({ userName: '', password: '' });

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
		const credType = res.cred_type;

		if (status)
		{
			if (credType === '1')
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
			else if (credType === '0' || credType === '2')
			{
				Toast.show({
					type: 'error',
					position: 'bottom',
					text1: 'Not a valid user login',
					text2: 'Please try login as a business.',
					visibilityTime: 4000,
					autoHide: true,
					topOffset: 30,
					bottomOffset: 40,
				});
			}
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

	const validateForm = () => 
	{
		let tempErrors = {};

		if (!state.credOne)
		{
			tempErrors = { ...tempErrors, userName: 'Username is required' };
		}
		else if (!/\S+@\S+\.\S+/.test(state.credOne))
		{
			tempErrors = { ...tempErrors, userName: 'Email address is not valid' };
		}
		if (!state.credTwo)
		{
			tempErrors = { ...tempErrors, password: 'Password is required' };
		}
		
		setErrors(tempErrors);

		if (Object.keys(tempErrors).length === 0)
		{
			handleLogin();
		}
	}

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
			<TopNavBack navigation={props.navigation} pops={1} />
            <Layout style={[MainStyles.column_container, { paddingTop: 100}]}>
				<ScrollView style={{ flex: 1, width: '100%' }}>
					<Text style={MainStyles.title_one}>Login as a User</Text>
						<View style={{ position: 'relative' }} >
							<InputLabelEmail label="Username" name="credOne" value={state.credOne} onChange={handleInputChange} placeholder="Enter username" status="basic" mb={20} bg={errors.userName ? '#ffe6e6' : '#f2f2f2'} />
							{errors.userName && <Text style={styles.error}>{errors.userName}</Text>}
						</View>
						<View style={{ position: 'relative' }} >
							<InputLabelPassword label="Password" name="credTwo" value={state.credTwo} onChange={handleInputChange} placeholder="Enter password" status="basic" bg={errors.password ? '#ffe6e6' : '#f2f2f2'} />
							{errors.password && <Text style={styles.error}>{errors.password}</Text>}
						</View>
						<Layout style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginTop: 20 }} >
							{/*<Layout >
								<Checkbox label="Remember me" />
							</Layout>
							 <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1, width: '100%', height: 50 }} >
								<Text style={{ fontSize: 13, color: '#000000' }}>Forgot passord?&nbsp;</Text>
								<TouchableOpacity onPress={handleReset}>
									<Text status="primary" style={{ fontSize: 13 }}>Reset</Text>
								</TouchableOpacity>
							</Layout> */}
						</Layout>
						<ButtonPrimary name="Login" marginTop={20} onpress={validateForm}/>
						<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 50 }} >
							<Text style={{ fontSize: 15, color: '#000000' }}>Don't have an account? &nbsp;</Text>
							<TouchableOpacity onPress={handleSignup} >
								<Text status="primary" style={{ fontSize: 15, fontWeight: 'bold', textDecorationLine: 'underline' }}>Sign up</Text>
							</TouchableOpacity>
						</Layout>
				</ScrollView>
            </Layout>
        </SafeAreaView>
    )
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

export default Login;