import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/navigation.component';
// import { default as theme } from './theme.json';
import { default as theme } from './custom-theme.json';

const App = () => (
    <>
        <IconRegistry icons={EvaIconsPack} />
        {/* <ApplicationProvider {...eva} theme={eva.light}> */}
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
            <AppNavigator />
        </ApplicationProvider>
    </>
);

export default App;
