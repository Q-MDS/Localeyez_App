import React, { useState, useEffect } from 'react';
import { TitleOne } from '../../../components/TitleOne';
import { InputLabelEmail } from '../../../components/InputLabelEmail';
import { InputLabelPassword } from '../../../components/InputLabelPassword';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { SafeAreaView, ScrollView, View, Image  } from 'react-native';
import { Layout } from '@ui-kitten/components';

const Login = (props) => 
{
    const [email, setEmail] = useState('');

    const handleLogin = () => 
    {
        props.navigation.navigate('AdminAllBusinessHome');
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
                        <View style={{ marginTop: 40 }} />
                        <TitleOne title="Login As Admin" />
                        <View style={{ marginTop: 25 }} />
                        <InputLabelEmail label="Email" value={email} setValue={setEmail} placeholder="Enter email" />
                        <View style={{ marginTop: 25 }} />
                        <InputLabelPassword label="Password" placeholder="Enter password" />
                        <View style={{ marginTop: 35 }} />
                        <ButtonPrimary name="Login" onpress={handleLogin}/>
                    </View>
                </ScrollView>
                </View>
            </Layout>
        </SafeAreaView>
    )
}

export default Login;