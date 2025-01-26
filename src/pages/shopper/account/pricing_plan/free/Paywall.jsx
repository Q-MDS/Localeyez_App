import React, { useState, useEffect } from 'react';
import RevenueCatUI from 'react-native-purchases-ui';
import Purchases from 'react-native-purchases';

const Paywall = (props) => 
{
	useEffect(() => 
	{
		Purchases.setLogLevel(Purchases.LOG_LEVEL.VERBOSE);
		console.log('GGGGGGGG');
		
	}, []);

	return (
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
	)
}

export default Paywall;