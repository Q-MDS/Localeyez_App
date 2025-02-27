import React, { useState, useEffect } from 'react';
import RevenueCatUI from 'react-native-purchases-ui';
import Purchases from 'react-native-purchases';
import MainStyles from '../../../../../assets/styles/MainStyles';
import { Linking, SafeAreaView, View, Text } from 'react-native';

const Paywall = (props) => 
{
	useEffect(() => 
	{
		Purchases.setLogLevel(Purchases.LOG_LEVEL.VERBOSE);
		console.log('GGGGGGGG');
		
	}, []);

	const handleEulaPress = () => 
	{
		Linking.openURL('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'); // Replace with your URL
	};

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
			<RevenueCatUI.Paywall
			onDismiss={() => {
			console.log('Paywall dismissed');
			// Handle paywall dismissal
			}}
			onPurchase={(purchase) => {
			console.log('Purchase successful:', purchase);
			// Handle successful purchase
			}}
			onError={(error) => {
			console.error('Paywall error:', error);
			// Handle paywall error
			}}
		/>
		<Text style={[MainStyles.title_a11, { textAlign: 'center', fontWeight: 'bold', width: '100%', marginBottom: 10, color: '#612bc1' }]} onPress={handleEulaPress}>
			Apple Terms of Use (EULA)
		</Text>
	  </SafeAreaView>
	)
}

export default Paywall;