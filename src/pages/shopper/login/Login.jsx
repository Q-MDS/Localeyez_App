import React, { useState, useEffect, useReducer } from 'react';
import Purchases from 'react-native-purchases';
import { cancelSubscription } from '../../../services/api_helper';
import { useFocusEffect } from '@react-navigation/native';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../components/TopNavBack';
import DbUtils from '../../../services/DbUtils';
import Toast from 'react-native-toast-message';
import { loginShopper } from '../../../services/auth';
import { InputLabelEmail } from '../../../components/InputLabelEmail';
import { InputLabelPassword } from '../../../components/InputLabelPassword';
import { Checkbox } from '../../../components/Checkbox';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { SafeAreaView, ScrollView, View, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Layout, Text, Card } from '@ui-kitten/components';
import LogoLand from '../../../assets/images/LogoLand';

const initialState = {
	// credOne: "Harry@gmail.com",a
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
	const [remember, setRemember] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [subscribed, setSubscribed] = useState(0);
	const [subscriptionStatus, setSubscriptionStatus] = useState(null);
	const [profile, setProfile] = useState(null);

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
		const profile = await DbUtils.getItem('shopper_profile');
        
		if(profile !== null)
		{
			const profileData = JSON.parse(profile);
			setProfile(profile);

			setSubscribed(profileData.subscribed);

			if (profile === null)
			{
				dispatch(
				{
					type: 'SHOPPER_LOGIN',
					payload: 
					{
						credOne: '',
						credTwo: '',
					},
				});
			} 
			else 
			{
				dispatch(
				{
					type: 'SHOPPER_LOGIN',
					payload: 
					{
						credOne: JSON.parse(profile).email,
						credTwo: '',
					},
				});
			}
		}
	}

	const getCustomerInfo = async () => 
	{
		try 
		{
			const customerInfo = await Purchases.getCustomerInfo();
			
			return customerInfo.activeSubscriptions;
		} 
		catch (error) 
		{
			console.error('Failed to fetch customer info:', error);
			return null;
		}
	}

	const simpleAlert = (title, message) => 
	{
		Alert.alert(
			title,
			message,
			[
				{ text: 'OK' },
			],
			{ cancelable: false },
		);
	}

	useFocusEffect(React.useCallback(() => 
	{
		const loginCheck = async() =>
		{
			checkRememberedLogin();
		}
		loginCheck();

		getProfile();
	}, []));

	const fetchSubscriptionStatus = async () => 
	{
		const status = await getCustomerInfo();
		
		setSubscriptionStatus(status.length);
		setIsLoading(false);
	};

    const handleLogin = async () => 
    {
		await fetchSubscriptionStatus();
        
		setIsLoading(true);

		// Auth on server
		const res = await loginShopper(state.credOne, state.credTwo);
		const status = res.status;
		const credType = res.cred_type;

		if (status)
		{
			await DbUtils.clear();

			if (credType === '1')
			{
				const shopperId = res.shopper_id;
				const token = res.token;
				const subscribed = res.subscribed;
				const shopperProfile = res.shopper_profile;
				const shopperSectors = res.shopper_sectors;

				// console.log('Login 1:', token);
				// console.log('Login 2:', shopperProfile);
				// console.log('Subscribed:', subscribed);

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
				
				let jsonSubscribed = JSON.stringify(subscribed);
				await DbUtils.setItem('subscribed', jsonSubscribed);
				
				let jsonToken = JSON.stringify(token);
				await DbUtils.setItem('shopper_token', jsonToken);

				let jsonShopperProfile = JSON.stringify(shopperProfile);
				await DbUtils.setItem('shopper_profile', jsonShopperProfile);

				// let jsonSectors = JSON.stringify(shopperSectors);
				// await DbUtils.setItem('shopper_sectors', jsonSectors);
				await DbUtils.setItem('shopper_sectors', shopperSectors);

				// Set remember me
				if (remember)
				{
					rememberMe(state.credOne, state.credTwo);
				}
				else
				{
					forgetMe();
				}

				setIsLoading(false);
				
				console.log('Subscription status: ', subscriptionStatus, subscribed);
				
				if (subscribed == 1)
				{
					if (subscriptionStatus === null || subscriptionStatus === undefined || subscriptionStatus === 0)
					{
						simpleAlert('Subscription Status Error', '\nPlease check your subscription status. You may need to resubscribe. \n\nWhen you tap OK, you will be logged in as a Free user.');
						
						const params = { shopper_id: shopperId };
						await cancelSubscription(token, params);
						
						DbUtils.setItem('subscribed', '0');
						if (profile !== null)
						{
							profile.subscribed = 0;
							DbUtils.setItem('shopper_profile', JSON.stringify(profile));
						}
						props.navigation.navigate('ShopperHome');
					} 
					else 
					{
						console.log('SUBSCRIPTION IS OK: GOTO HOME');
						props.navigation.navigate('ShopperHome');
					}
				}
				else 
				{
					console.log('DONT APPLT TO THIS DUDE');
					
					props.navigation.navigate('ShopperHome');
				}
			} 
			else if (credType === '0' || credType === '2')
			{
				Toast.show({
					type: 'error',
					position: 'bottom',
					text1: 'Not a valid user login',
					text2: 'Please try login as a business.',
					visibilityTime: 2000,
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
				visibilityTime: 2000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		}
		setIsLoading(false);
    }

	const checkRememberedLogin = async () =>
	{
		try 
		{
			const username = await DbUtils.getItem('remshp_cred_one');
			const password = await DbUtils.getItem('remshp_cred_two');
			const busRemember = await DbUtils.getItem('remshp_business');

			if (busRemember !== null)
			{
				if (busRemember === "1")
				{
					setRemember(true);
				} 
				else 
				{
					setRemember(false);
				}
			}
			else
			{
				setRemember(false);
			}

			if (username !== null && password !== null)
			{
				// Log the user in
				state.credOne = username;
				state.credTwo = password;
				handleLogin();
			} 
			else 
			{
				// No remembered login
			}
		}
		catch(error)
		{
			// There was an error
		}
	}

	const rememberMe = async (username, password) => 
	{
		try 
		{
			await DbUtils.setItem('remshp_cred_one', username);
			await DbUtils.setItem('remshp_cred_two', password);
			await DbUtils.setItem('remshp_business', "1");
		} catch (error) {
			// Error saving data
		}
	};

	const forgetMe = async () =>
	{
		try
		{
			await DbUtils.removeItem('remshp_cred_one');
			await DbUtils.removeItem('remshp_cred_two');
			await DbUtils.setItem('remshp_business', "0");
		}
		catch (error)
		{
		// Error removing data
		}
	};

	const handleRememberMe = () => 
	{
		setRemember(!remember);
	}

    const handleReset = () => 
    {
		props.navigation.navigate('ShopperForgot');
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
			<View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 20, flex: 1 }}>
				<Layout style={[MainStyles.column_container]}>
					<ScrollView style={{ width: '100%' }}>
						<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
							<LogoLand />
						</View>
						<Text style={[MainStyles.title_a24, {textAlign: 'center', marginBottom: 40, color: '#000000', marginTop: 15}]}>Login as a User</Text>
						<Card style={{ backgroundColor: 'white', borderRadius: 10, marginBottom: 10 }}>
							<View style={{ position: 'relative' }} >
								<InputLabelEmail label="Username" name="credOne" value={state.credOne} onChange={handleInputChange} placeholder="Enter username" status="basic" mb={20} bg={errors.userName ? '#ffe6e6' : '#f2f2f2'} />
								{errors.userName && <Text style={styles.error}>{errors.userName}</Text>}
							</View>
							<View style={{ position: 'relative' }} >
								<InputLabelPassword label="Password" name="credTwo" value={state.credTwo} onChange={handleInputChange} placeholder="Enter password" status="basic" bg={errors.password ? '#ffe6e6' : '#f2f2f2'} />
								{errors.password && <Text style={styles.error}>{errors.password}</Text>}
							</View>
						</Card>
						<Card style={{ backgroundColor: 'white', borderRadius: 10, marginBottom: 20 }}>
							<Layout style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }} >
								<Layout >
									<Checkbox checked={remember} onChange={handleRememberMe}  label="Remember me" />
								</Layout>
								<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1, width: '100%' }} >
									<Text style={{ fontSize: 13, color: '#000000' }}>Forgot passord?&nbsp;</Text>
									<TouchableOpacity onPress={handleReset}>
										<Text status="primary" style={{ fontSize: 13 }}>Reset</Text>
									</TouchableOpacity>
								</Layout>
							</Layout>
						</Card>
						<ButtonPrimary name="Login" onpress={validateForm}/>
						<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 40 }} >
							<Text style={{ fontSize: 15, color: '#000000' }}>Don't have an account? &nbsp;</Text>
							<TouchableOpacity onPress={handleSignup} accessibilityLabel='Tap to signup' >
								<Text status="primary" style={{ fontSize: 15, fontWeight: 'bold', textDecorationLine: 'underline' }}>Sign up</Text>
							</TouchableOpacity>
						</Layout>
					</ScrollView>
				</Layout>
			</View>
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