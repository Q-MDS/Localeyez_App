import React, { useState, useEffect, useReducer } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../components/TopNavBack';
import DbUtils from '../../../services/DbUtils';
import { login } from '../../../services/auth';
import Toast from 'react-native-toast-message';
import { Text, Card } from '@ui-kitten/components';
import { SafeAreaView, View, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { InputLabelEmail } from '../../../components/InputLabelEmail';
import { InputLabelPassword } from '../../../components/InputLabelPassword';
import { Checkbox } from '../../../components/Checkbox';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { Layout } from '@ui-kitten/components';
import LogoLand from '../../../assets/images/LogoLand';

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
	const [remember, setRemember] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

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
			if (profile === null)
			{
				dispatch(
				{
					type: 'BUSINESS_LOGIN',
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
					type: 'BUSINESS_LOGIN',
					payload: 
					{
						credOne: JSON.parse(profile).email,
						credTwo: '',
					},
				});
			}
		});
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

    const handleLogin = async () => 
    {
		// Clear the local storage
		await DbUtils.clear();
		setIsLoading(true);

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
					
					const businessHours = businessProfile.business_hours;
					
					const businessSectors = res.business_sectors;
					
					const promotions = res.promotions;
					const events = res.events;
					const rating = res.rating;
		
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
	
					let jsonBusinessSectors = JSON.stringify(businessSectors);
					await DbUtils.setItem('business_sectors', jsonBusinessSectors);
		
					let jsonPromotions = JSON.stringify(promotions);
					await DbUtils.setItem('promotions', jsonPromotions);
		
					let jsonEvents = JSON.stringify(events);
					await DbUtils.setItem('events', jsonEvents);

					let jsonRating = JSON.stringify(rating);
					await DbUtils.setItem('rating', jsonRating);

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
					props.navigation.navigate('BusinessDashboard');
				}
				else if (credType === '2')
				{
					const token = res.token;
					let jsonToken = JSON.stringify(token);
					await DbUtils.setItem('admin_token', jsonToken); 
					props.navigation.navigate('AdminNewBusinessHome');
				}
				else 
				{
					Toast.show({
						type: 'error',
						position: 'bottom',
						text1: 'Not a valid business login',
						text2: 'Please try login as a user.',
						visibilityTime: 2000,
						autoHide: true,
						topOffset: 30,
						bottomOffset: 40,
					});
				}
			} 
			else 
			{
				if (res == "AxiosError: Request failed with status code 404")
				{
					Toast.show({
						type: 'error',
						position: 'bottom',
						text1: 'Network error',
						text2: 'Please check your internet connection.',
						visibilityTime: 2000,
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
						visibilityTime: 2000,
						autoHide: true,
						topOffset: 30,
						bottomOffset: 40,
					});
				}
			}
			setIsLoading(false);
		} 
		catch (error)
		{
			Toast.show({
				type: 'error',
				position: 'bottom',
				text1: 'Error',
				text2: 'An unknown error occured, please contact support',
				visibilityTime: 2000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		}
    }

	const checkRememberedLogin = async () =>
	{
		try 
		{
			const username = await DbUtils.getItem('rem_cred_one');
			const password = await DbUtils.getItem('rem_cred_two');
			const busRemember = await DbUtils.getItem('rem_business');

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

	const rememberMe = async (username: string, password: string) => 
	{
		try 
		{
		  await DbUtils.setItem('rem_cred_one', username);
		  await DbUtils.setItem('rem_cred_two', password);
		  await DbUtils.setItem('rem_business', "1");
		} catch (error) {
		  // Error saving data
		}
	};

	const forgetMe = async () =>
	{
		try
		{
			await DbUtils.removeItem('rem_cred_one');
			await DbUtils.removeItem('rem_cred_two');
			await DbUtils.setItem('rem_business', "0");
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
		props.navigation.navigate('BusinessForgot');
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
					<View style={{ width: '100%', backgroundColor: 'white' }} />
						<Layout style={[MainStyles.column_container]}>
							<ScrollView style={{ width: '100%' }}>
								<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
									<LogoLand />
								</View>
								<Text style={[MainStyles.title_a24, {textAlign: 'center', marginBottom: 40, color: '#000000', marginTop: 15}]}>Login as a Business</Text>
								<Card style={{ backgroundColor: 'white', borderRadius: 10, marginBottom: 10 }}>
									<View style={{ position: 'relative' }} >
										<InputLabelEmail label="Username" name="credOne" value={state.credOne} onChange={handleInputChange} status="basic" placeholder="Enter username" mb={20} bg={errors.userName ? '#ffe6e6' : '#f2f2f2'} />
										{errors.userName && <Text style={styles.error}>{errors.userName}</Text>}
									</View>
									<View style={{ position: 'relative' }} >
										<InputLabelPassword label="Password" name="credTwo" value={state.credTwo} onChange={handleInputChange} status="basic" placeholder="Enter password" bg={errors.password ? '#ffe6e6' : '#f2f2f2'} />
										{errors.password && <Text style={styles.error}>{errors.password}</Text>}
									</View>
								</Card>
								<Card style={{ backgroundColor: 'white', borderRadius: 10, marginBottom: 20 }}>
									<Layout style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }} >
										<Layout style={{ flex: 1 }} >
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
								<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 50 }} >
									<Text style={{ fontSize: 15, color: '#000000' }}>Don't have an account? &nbsp;</Text>
									<TouchableOpacity onPress={handleSignup} >
										<Text status="primary" style={{ fontSize: 15, fontWeight: 'bold', textDecorationLine: 'underline' }}>Sign up</Text>
									</TouchableOpacity>
								</Layout>
							</ScrollView> 
							</Layout>
							</View>
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