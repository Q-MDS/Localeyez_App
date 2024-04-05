import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { TitleOne } from '../../../components/TitleOne';
import { InputLabelEmail } from '../../../components/InputLabelEmail';
import { InputLabelPassword } from '../../../components/InputLabelPassword';
import { Checkbox } from '../../../components/Checkbox';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { Layout } from '@ui-kitten/components';
import TextTwo from '../../../components/TextTwo';

const Login = (props: any) => 
{
    const [credOne, setCredOne] = useState('business@gmail.com');
    const [credTwo, setCredTwo] = useState('123456');

    const handleLogin = () => 
    {
        props.navigation.navigate('BusinessDashboard');
    }

    const handleRememberMe = () => 
    {
        console.log('Remember me...');
    }

    const handleReset = () => 
    {
        console.log('Reset password...');
    }

    const handleSignup = () => 
    {
        props.navigation.navigate('SignupBusinessStepOne');
    }

    return (
        <SafeAreaView style={{flex: 1}}>
			<View>
				<Text style={{ color: '#000000' }}>Render section</Text>
			</View>
            {/* <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            
                <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', width: '100%'}}>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 250, width: '100%' }}>
                        <Image source={require('../../../assets/images/pic_holder.png')} style={{ width: 112, height: 112 }} />
                    </View>
                    <ScrollView style={{ width: '100%', padding: 30 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ marginTop: 20 }} />
                            <TitleOne title="Login as a Business" />
                            <View style={{ marginTop: 25 }} />
                            <InputLabelEmail label="Email" value={credOne} setValue={setCredOne} placeholder="Enter email" />
                            <View style={{ marginTop: 25 }} />
                            <InputLabelPassword label="Password" value={credTwo} setValue={setCredTwo} placeholder="Enter password" />
                            <View style={{ marginTop: 15 }} />
                            <Layout style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }} >
                                <Layout style={{ flex: 1 }} >
                                <Checkbox label="Remember me" />
                                </Layout>
                                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1, width: '100%' }} >
                                    <TextTwo title="Forgot password?&nbsp;" textalign="right" />
                                    <TouchableOpacity onPress={handleReset}>
                                        <TextTwo title="Reset" underline="underline" textalign="right" />
                                    </TouchableOpacity>
                                </Layout>
                            </Layout>
                            <View style={{ marginTop: 35 }} />
                            <ButtonPrimary name="Login" onpress={handleLogin}/>
                            <View style={{ marginTop: 15 }} />
                            <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                                <TextTwo title="Don't have an account? " textalign="center" />
                                <TouchableOpacity onPress={handleSignup} >
                                    <TextTwo title="Sign up" fontweight="bold" underline="underline" />
                                </TouchableOpacity>
                            </Layout>
                        </View>
                    </ScrollView>
                </View>
            </Layout> */}
        </SafeAreaView>
    );
};

export default Login;