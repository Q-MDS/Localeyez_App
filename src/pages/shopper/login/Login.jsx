import React, { useState } from 'react';
import { TitleOne } from '../../../components/TitleOne';
import { InputLabelEmail } from '../../../components/InputLabelEmail';
import { InputLabelPassword } from '../../../components/InputLabelPassword';
import { Checkbox } from '../../../components/Checkbox';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity  } from 'react-native';
import { Layout } from '@ui-kitten/components';
import TextTwo from '../../../components/TextTwo';

const Login = (props) => 
{
    const [email, setEmail] = useState('');

    const handleLogin = () => 
    {
        console.log('Login as a business...');
        props.navigation.navigate('ShopperHome');
    }

    const handleReset = () => 
    {
        console.log('Reset password...');
    }

    const handleSignup = () => 
    {
        props.navigation.navigate('SignupUserStepOne');
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            
                <View style={{ flexDirection: 'column', flex: 1, alignItems: 'space-between', justifyContent: 'center', width: '100%'}}>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 250, width: '100%' }}>
                        <Image source={require('../../../assets/images/pic_holder.png')} style={{ width: 112, height: 112 }} />
                    </View>
                    <ScrollView style={{ width: '100%', padding: 30 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ marginTop: 20 }} />
                            <TitleOne title="Login as a User" />
                            <View style={{ marginTop: 25 }} />
                            <InputLabelEmail label="Email" value={email} setValue={setEmail} placeholder="Enter email" />
                            <View style={{ marginTop: 25 }} />
                            <InputLabelPassword label="Password" placeholder="Enter password" />
                            <View style={{ marginTop: 15 }} />
                            <Layout style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }} >
                                <Layout style={{ flex: 1 }} >
                                <Checkbox label="Remember me" />
                                </Layout>
                                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1, width: '100%', height: 50 }} >
                                    <TextTwo title="Forgot password?&nbsp;" textalign="right" />
                                    <TouchableOpacity onPress={handleReset}>
                                        <TextTwo title="Reset" underline="underline" textalign="right" />
                                    </TouchableOpacity>
                                </Layout>
                            </Layout>
                            <View style={{ marginTop: 15 }} />
                            <ButtonPrimary name="Login" onpress={handleLogin}/>
                            <View style={{ marginTop: 25 }} />
                            <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                                <TextTwo title="Don't have an account? " textalign="center" />
                                <TouchableOpacity onPress={handleSignup} >
                                    <TextTwo title="Sign up" fontweight="bold" underline="underline" />
                                </TouchableOpacity>
                            </Layout>
                        </View>
                    </ScrollView>
                </View>
            </Layout>
        </SafeAreaView>
    )
}

export default Login;