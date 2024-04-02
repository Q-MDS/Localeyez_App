if (__DEV__) {
    import("./ReactotronConfig" /* webpackMode: "eager" */).then(() => console.log("Reactotron Configured"));
}
import React from 'react';
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
        <AuthProvider>
            <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
                <AppNavigator />
            </ApplicationProvider>
        </AuthProvider>
		<Toast />
    </>
);

export default App;
