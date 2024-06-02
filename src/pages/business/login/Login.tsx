import React, { useState, useEffect, useReducer } from 'react';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../components/TopNavBack';
import DbUtils from '../../../services/DbUtils';
import { login } from '../../../services/auth';
import Toast from 'react-native-toast-message';
import { Text } from '@ui-kitten/components';
import { SafeAreaView, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { InputLabelEmail } from '../../../components/InputLabelEmail';
import { InputLabelPassword } from '../../../components/InputLabelPassword';
import { Checkbox } from '../../../components/Checkbox';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { Layout } from '@ui-kitten/components';

const initialState = {
	// credOne: 'a@a.com,
	// credTwo: '123456',
	// credOne: 'admin@localeyez.net',
	// credTwo: '123456',
	credOne: '',
	credTwo: '',
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
	const [errors, setErrors] = useState<{ userName?: string, password?: string }>({});

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
					<Text style={MainStyles.title_one}>Login as a Business</Text>
					<View style={{ position: 'relative' }} >
						<InputLabelEmail label="Username" name="credOne" value={state.credOne} onChange={handleInputChange} status="basic" placeholder="Enter username" mb={20} bg={errors.userName ? '#ffe6e6' : '#f2f2f2'} />
						{errors.userName && <Text style={styles.error}>{errors.userName}</Text>}
					</View>
					<View style={{ position: 'relative' }} >
						<InputLabelPassword label="Password" name="credTwo" value={state.credTwo} onChange={handleInputChange} status="basic" placeholder="Enter password" bg={errors.password ? '#ffe6e6' : '#f2f2f2'} />
						{errors.password && <Text style={styles.error}>{errors.password}</Text>}
					</View>
					<Layout style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginTop: 20 }} >
						<Layout style={{ flex: 1 }} >
							<Checkbox label="Remember me" />
						</Layout>
						<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1, width: '100%' }} >
							<Text style={{ fontSize: 13, color: '#000000' }}>Forgot passord?&nbsp;</Text>
							<TouchableOpacity onPress={handleReset}>
								<Text status="primary" style={{ fontSize: 13 }}>Reset</Text>
							</TouchableOpacity>
						</Layout>
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

export default Login;