if (__DEV__) {
	require("./ReactotronConfig");
}

import React from 'react';
import {StripeProvider} from '@stripe/stripe-react-native';
// import { withIAPContext } from "react-native-iap";
import { AuthProvider } from './src/services/AuthContext';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/navigation.component';
import { default as theme } from './custom-theme.json';
import Toast from 'react-native-toast-message';

const App = () => (
    <>
        <IconRegistry icons={EvaIconsPack} />
		<StripeProvider publishableKey="pk_test_9VvzSCWXlvBTtzpWrciFHg5w00dVUMwe3x" merchantIdentifier="merchant.net.localeyez.app">
        <AuthProvider>
            <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
                <AppNavigator />
            </ApplicationProvider>
        </AuthProvider>
		</StripeProvider>
		<Toast />
    </>
);

// export default withIAPContext(App);
export default App;

