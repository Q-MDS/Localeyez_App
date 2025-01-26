if (__DEV__) {
	require("./ReactotronConfig");
}

import React, {useEffect } from 'react';
import Purchases from 'react-native-purchases';
// import {StripeProvider} from '@stripe/stripe-react-native';
// import { withIAPContext } from "react-native-iap";
import { AuthProvider } from './src/services/AuthContext';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/navigation.component';
import { default as theme } from './custom-theme.json';
import Toast from 'react-native-toast-message';
import { Platform } from 'react-native';

const App = () => {

    useEffect(() => {
        // Set log level to verbose for debugging
        Purchases.setLogLevel(Purchases.LOG_LEVEL.VERBOSE);

        // Configure RevenueCat with the appropriate API key based on the platform
        if (Platform.OS === 'ios') {
            Purchases.configure({ apiKey: 'appl_ajvVftRGvImKwtvknCgToWoRIcI' });
        } else if (Platform.OS === 'android') {
            Purchases.configure({ apiKey: '<revenuecat_project_google_api_key>' });
        }
        // Purchases.configure({ apiKey: 'strp_nkawyhuxTTVipScoKgnBtbgjqeE' });
    }, []);
    
    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <AuthProvider>
                <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
                    <AppNavigator />
                </ApplicationProvider>
            </AuthProvider>
            <Toast />
        </>
    );
}

// export default withIAPContext(App);
export default App;

