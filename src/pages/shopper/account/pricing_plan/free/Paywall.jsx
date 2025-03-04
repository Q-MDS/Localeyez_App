import React, { useState, useEffect } from 'react';
import Purchases from 'react-native-purchases';
import RevenueCatUI from 'react-native-purchases-ui';
import PaywallProduct from '../../../../../components/Paywallproduct';
import DbUtils from '../../../../../services/DbUtils';
import { subscribe } from '../../../../../services/auth';
import MainStyles from '../../../../../assets/styles/MainStyles';
import { Platform, ActivityIndicator, Linking, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Modal, Image, View, Text } from 'react-native';
import { Card } from '@ui-kitten/components';
import PaywallTickPlain from '../../../../../assets/images/PaywallTickPlain';

const Paywall = (props) => 
{
	const [shopperId, setShopperId] = useState(0);
	const [currentSubscriptions, setCurrentSubscriptions] = useState([]);
	const [currentOffering, setCurrentOffering] = useState(null);
	const [activeProduct, setActiveProduct] = useState("MONTHLY");
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [managementURL, setManagementURL] = useState('');
	const [error, setError] = useState('');
	const [done, setDone] = useState(0);

	useEffect(() => 
	{
		fetchCurrentSubscriptions();

		const fetchOfferings = async () => 
		{
			await getShopperId();
			try 
			{
				const offerings = await Purchases.getOfferings();
				// console.log('Offerings:', JSON.stringify(offerings, null, 2));
				if (offerings.current) 
				{
					// Sort the offerings to put the monthly package first
					const sortedOfferings = offerings.current.availablePackages.sort((a, b) => 
					{
						if (a.identifier.includes('monthly')) return -1;
						if (b.identifier.includes('monthly')) return 1;
						return 0;
					});
					setCurrentOffering({ ...offerings.current, availablePackages: sortedOfferings });
					setDone(1);
				}
			} 
			catch (error) 
			{
				console.error('Error fetching offerings:', error);
			}
		};

		fetchOfferings();
	}, []);

	useEffect(() => 
	{
		if (done === 1)
		{
			setSelectedProduct(currentOffering.availablePackages[0]);
		}
	},[done]);

	const getShopperId = async () => 
	{
		const id = await DbUtils.getItem('shopper_id');
		
		setShopperId(JSON.parse(id));
	}

	const fetchCurrentSubscriptions = async () => 
	{
		try 
		{
			const customerInfo = await Purchases.getCustomerInfo();
			const activeSubscriptions = customerInfo.activeSubscriptions;
			setCurrentSubscriptions(activeSubscriptions);
		} 
		catch (e) 
		{
			console.error('Failed to fetch customer info:', e);
		}
	};

	const handleChangeProduct = (selected, active) => 
	{
		setSelectedProduct(selected);
		setActiveProduct(active);

		console.log('Selected Product:', selected, active);
	}

	const handleRestorePurchases = async () => 
	{
		try 
		{
			await Purchases.restorePurchases();
			alert('Purchases restored successfully');
		} 
		catch (error) 
		{
			if (error.code === 'E_USER_CANCELLED') 
				{
				console.log('User cancelled the restore purchases process');
			} 
		}
	};

	const handlePurchase = async () => 
	{
		const selectedIdentifier = selectedProduct.product.identifier;

		if (selectedIdentifier == currentSubscriptions)
		{
			alert('You are already subscribed to this plan');
			return;
		}
		else 
		{
			setLoading(true);
			try 
			{
				const purchaseInfo = await Purchases.purchasePackage(selectedProduct);
				// const purchaseInfo = {message: 'Purchase successful', customerInfo: {managementURL: 'https://apple.com/something'}};
				if (purchaseInfo)
				{
					const management_url = purchaseInfo.customerInfo.managementURL;
					// const management_url = 'https://apple.com/something';
					setManagementURL(management_url);

					// Updated server set subscribed = 1 in app_users and shopper_master
					await subscribeUser(purchaseInfo, management_url);

					// Update async subscribed
					DbUtils.setItem('subscribed', '1');

					// Update profile on server
					// const data = {remote_id: remoteId, profile: getProfile};
					// const sendProfileResult = await sendProfile(data);


					setShowModal(true);
				}
				else 
				{
					alert("There was an error with the purchase");
				}
				
			} 
			catch (error) 
			{
				console.error('Purchase error:', error);
				setError(error.message);
				setShowErrorModal(true);
			} 
			finally 
			{
				setLoading(false);
			}
		}
	};

	const registerUser = async (subscribed) => 
	{
		try 
		{
			const data = ds.getSignupData();
			data.subscribed = subscribed;
			const res = await register(data);
			console.log('RESPONSE: ', res);
			if (res.status)
			{
				// Success
				const remote_id = res.remote_id;
				
				updateProfile(remote_id);

				return remote_id;
			}
			else 
			{
				// Show that there wasa an error
				console.log(res.message);
			}
		} 
		catch (error) 
		{
			console.error("Booyaa: ", error);
		} 
		finally 
		{
			
		}
	}

	const updateProfile = (remote_id) => 
	{

	}

	const subscribeUser = async (purchaseInfo, managementUrl) => 
	{
		try 
		{
			const pi = JSON.stringify(purchaseInfo);
			
			const data = {token: 'b1o2o3yaa', shopper_id: shopperId, purchase_info: pi, management_url: managementUrl};
			const res = await subscribe(data);
			console.log('RESPONSE REGISTER: ', res);
			if (res.status)
			{
				// Success
				const shopperProfile = res.shopper_profile;
				console.log("Success: ", res.shopper_profile);
				DbUtils.setItem('shopper_profile', JSON.stringify(shopperProfile));
				
				return res.shopper_id;
			}
			else 
			{
				// Show that there wasa an error
				console.log(res.message);
			}
		} 
		catch (error) 
		{
			console.error("Error: ", error);
		} 
		finally 
		{
			
		}
	}

	const setProfileSubScribed = (subscribed) => 
	{
		// Set subscribed to 0
		DbProfile.signupSetSubscribed(subscribed)
		.then((result) => 
		{
			// const result = value as number;
			if (result == 1)
			{
				console.log('Subscribed has been updated');
			}
			else 
			{
				console.log('Set subscribed failed');
			}
		})
		.catch((error) => 
		{
			console.error('Failed to update profile:', error);
		});
	}

	const fetchProfile = async () => 
	{
		const res = await DbProfile.getProfile();
		console.log('Profile: ', res);
		return JSON.stringify(res);
	}

	const setWeekData = async () => 
	{
		const year = DateUtils.getCurrentYear();
		const week = DateUtils.getCurrentWeekNumber();
		const day = DateUtils.getCurrentDayOfWeek();

		ds.setYearNum(year);
		ds.setWeekNum(week);
		ds.setDayNum(day);
		const weekData = await DbWeeks.getRecord(year, week);
		console.log('YEar: ', year, 'Week: ', week, 'Day: ', day);
		console.log('AAA: ', weekData);
		if (weekData.rows.length > 0)
		{
			ds.setWeekInfo(JSON.stringify(weekData.rows.item(0)));
		} 
		else 
		{
			ds.setWeekInfo('none');
		}
	}

	const handleClose = () => 
	{
		// props.navigation.navigate('ChoosePlan');
		props.navigation.goBack();
	}

	const handleLetsStart = () => 
	{
		setShowModal(!showModal);

		props.navigation.navigate('LoginUser');
	}

	const handleRetry = () => 
	{
		setShowErrorModal(!showErrorModal);
	}

	const handleErrorClose = () =>	
	{
		setShowErrorModal(!showErrorModal);
		props.navigation.navigate('ChoosePlan');
	}

	const handlePrivacy = () => 
	{
		Linking.openURL('https://www.planoneapp.com/private-policy'); // Replace with your URL
	};

	const handleEulaPress = () => 
	{
		Linking.openURL('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'); // Replace with your URL
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<ScrollView>
				<View style={{ flexDirection: 'cplumn', alignItems: 'flex-start', width: '100%'}}>
					<Image source={require('../../../../../assets/images/paywall_top_pic.png')} style={{  width: '100%', objectFit: 'cover', backgroundColor: 'white', height: 240 }}/>
					<View style={{ position: 'relative', width: '100%', marginTop: 10, padding: 20}}>
						<TouchableOpacity style={{position: 'absolute', top: 0, right: 20, alignItems: 'center', justifyContent: 'center', borderColor: '#612bc1', borderWidth: 1, borderRadius: 20, width: 36, height: 36}} onPress={handleClose}>
							<View>
								<Text style={{  fontSize: 24, color: '#612bc1'}}>X</Text>
							</View>
						</TouchableOpacity>
						<Text style={[MainStyles.textBold, { fontSize: 42, color: '#000000', marginTop: 20 }]}>A small amount a month can save you big time</Text>
						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', columnGap: 10, width: '100%', marginTop: 20 }}>
							<PaywallTickPlain />
							<Text style={{fontSize: 18, color: '#000', flex: 1}}>Access to events and promotions</Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', columnGap: 10, width: '100%', marginTop: 10 }}>
							<PaywallTickPlain />
							<Text style={{fontSize: 18, color: '#000', flex: 1}}>Review businesses</Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', columnGap: 10, width: '100%', marginTop: 10 }}>
							<PaywallTickPlain />
							<Text style={{fontSize: 18, color: '#000', flex: 1}}>Access to amazing promotions</Text>
						</View>
						{currentOffering ? (
							currentOffering.availablePackages.map((pkg) => (
								<PaywallProduct key={pkg.identifier} pkg={pkg} activeProduct={activeProduct} onChangeProduct={(selected, active) => handleChangeProduct(selected, active)} loading={loading} />
							))
						) : (
							<Text>Loading...</Text>
						)}
						<TouchableOpacity onPress={handlePurchase}>
							<View style={[ styles.button, {marginTop: 20} ]}>
								{/* <Text style={{fontSize: 18, color: '#fff' }}>Continue</Text> */}
								{loading ? (
								<ActivityIndicator size="small" color="#fff" />
								) : (
								<Text style={{fontSize: 18, color: '#fff'}}>Continue</Text>
								)}
							</View>
						</TouchableOpacity>
						<TouchableOpacity style={{ padding: 10, marginTop: 10 }} onPress={handleEulaPress}>
							<Text style={{ textAlign: 'center', color: '#000' }}>This application is licensed under the Apple Standard End User License Agreement. For more details, please visit <Text style={{ color: '#612bc1', textDecorationLine: 'underline' }}>Apple's EULA.</Text></Text>
						</TouchableOpacity>
						<View style={{ height: 1, backgroundColor: '#00000040', width: '100%', marginTop: 10 }}></View>
						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, paddingStart: 10, paddingEnd: 10 }}>
							<TouchableOpacity onPress={handleRestorePurchases}>
								<Text style={{ color: '#000'}}>Restore purchases</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={handlePrivacy}>
								<Text style={{ color: '#612bc1'}}>Privacy policy</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
			<Modal
				visible={showModal}
				animationType="fade"
        		transparent={true}
				presentationStyle="overFullScreen"
				onRequestClose={() => 
				{
					handleLetsStart;
				}}
				>
				<View style={{
				flex: 1,
				justifyContent: 'center', // Center the modal vertically
				alignItems: 'center', // Center the modal horizontally
				backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a semi-transparent background
				}}>
				
					<View style={{
					width: '90%', // Control the width
					backgroundColor: 'white', // Assuming a white modal background
					borderRadius: 20, // Rounded corners
					}}>
						<Card disabled={true} style={{ flexGrow: 1, width: '100%', borderRadius: 20 }}>
							<View style={{ width: '100%', paddingTop: 30, paddingBottom: 30 }}>
								<Text style={{ fontSize: 28, textAlign: 'center', color: '#612bc1' }}>Subscription Successful</Text>
								<Text style={{ fontSize: 18, width: '100%', textAlign: 'center', marginBottom: 20 }}>Thank you for subscribing</Text>
								{Platform.OS === 'ios' ?
								(
									<View>
										<Text style={{ fontSize: 13, textAlign: 'center', marginBottom: 15 }}>Please visit: {managementURL} to manage your subscription.</Text>
										<Text style={{ fontSize: 13, textAlign: 'center' }}>View pricing plan under profile management for the link.</Text>
									</View>
								):(
								<></>
								)}
								
								<TouchableOpacity style={styles.button} onPress={ handleLetsStart }>
									<Text style={{ fontSize: 18, color: '#fff' }}>Ok</Text>
								</TouchableOpacity>
							</View>
						</Card>
					</View>
				</View>
			</Modal>
			<Modal
				visible={showErrorModal}
				animationType="fade"
        		transparent={true}
				presentationStyle="overFullScreen"
				onRequestClose={() => 
				{
					handleLetsStart;
				}}
				>
				<View style={{
				flex: 1,
				justifyContent: 'center', // Center the modal vertically
				alignItems: 'center', // Center the modal horizontally
				backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a semi-transparent background
				}}>
				
					<View style={{
					width: '90%', // Control the width
					backgroundColor: 'white', // Assuming a white modal background
					borderRadius: 20, // Rounded corners
					}}>
						<Card disabled={true} style={{ flexGrow: 1, width: '100%', borderRadius: 20 }}>
							<View style={{ width: '100%', paddingTop: 50, paddingBottom: 50 }}>
							<Text style={[ MainStyles.h1, MainStyles.textSerif, MainStyles.mb_2]}>Subscription Failed</Text>
								<Text style={[MainStyles.h3, MainStyles.w_100, { marginBottom: 20 }]}>Something went wrong !</Text>
								<Text style={[MainStyles.h4, MainStyles.w_100, { marginBottom: 20 }]}>{error}</Text>
								{Platform.OS === 'ios' ?
								(
									<View>
										<Text style={[MainStyles.h5]}>Tap on RETRY to close this message and try again else click on CLOSE to return to the select Free or Coaching options page.</Text>
										{/* <Text style={[MainStyles.h5]}>Link is available under Profile Management</Text> */}
									</View>
								):(
								<></>
								)}
								<TouchableOpacity style={[MainStyles.button_primary, MainStyles.mt_2]} onPress={ handleRetry }>
									<Text style={MainStyles.buttonText}>Retry</Text>
								</TouchableOpacity>
								<TouchableOpacity style={[MainStyles.button_primary, MainStyles.mt_2]} onPress={ handleErrorClose }>
									<Text style={MainStyles.buttonText}>Close</Text>
								</TouchableOpacity>
							</View>
						</Card>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	optionActive: {
        flexDirection: 'column', 
		alignItems: 'flex-start', 
		justifyContent: 'flex-start', 
		padding: 10, 
		width: '100%', 
		marginTop: 20, 
		borderRadius: 20, 
		borderColor: '#7B90AF', 
		borderWidth: 3,
		fontSize: 18,
    },
	optionInActive: {
        flexDirection: 'column', 
		alignItems: 'flex-start', 
		justifyContent: 'flex-start', 
		padding: 10, 
		width: '100%', 
		marginTop: 20, 
		borderRadius: 20, 
		borderColor: '#d9d9d9', 
		borderWidth: 1,
		fontSize: 18,
    },
	optionText: {
		fontSize: 18,
		color: '#fff',
		flex: 1
	},
	button: {
		backgroundColor: '#612bc1',
		borderRadius: 20,
		padding: 20,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
	},
});

export default Paywall;