import React from 'react';
import { Layout } from '@ui-kitten/components';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { SafeAreaView, View } from 'react-native';

const Menu = (props: any) => 
{
    const handleAdminLogin = () =>
    {
        props.navigation.navigate('AdminLogin');
    }

    const handleBusinessLogin = () =>
    {
        props.navigation.navigate('OnboardingStart');
    }

    const handleUserLogin = () =>
    {
        props.navigation.navigate('OnboardingStart');
    }

    return (
    <SafeAreaView style={{flex: 1}}>
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <ButtonPrimary name="Admin Login" onpress={handleAdminLogin}/>
            <ButtonPrimary name="Business Login" onpress={handleBusinessLogin}/>
            <ButtonPrimary name="User Login" onpress={handleUserLogin}/>
            </View>
        </Layout>
    </SafeAreaView>
    )
}

export default Menu