import React, { useContext, useState } from 'react';
import { AuthContext } from '../services/AuthContext';
import { TitleOne } from '../components/TitleOne';
import { InputLabelEmail } from '../components/InputLabelEmail';
import { InputLabelPassword } from '../components/InputLabelPassword';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { SafeAreaView, ScrollView, View, Image  } from 'react-native';
import { Layout } from '@ui-kitten/components';

interface User {
    // Define your user properties here
    id: string;
    name: string;
    // etc.
  }

const Login = (props: any) => 
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doLogin, token, credType, credName } = useContext(AuthContext);

    const handleLogin = () => 
    {
        doLogin(email, password)
        .then((response: any) => 
        {
            const responseCode = response.code;

            if (responseCode === 200)
            {
                let credType = response.data.cred_type;

                switch(credType)
                {
                    case '0':
                        props.navigation.navigate('AdminNewBusinessHome');
                    break;
                    case '1':
                        props.navigation.navigate('BusProfProHome');
                    break;
                    case '2':
                        props.navigation.navigate('ShopperHome');
                    break;
                }
            }
            else if(responseCode === 401)
            {
                console.log('Invalid Credentials');
            }
            else 
            {
                console.log('Server/Unknown Error (500)');
            }
        })
        .catch((error: Error) => 
        {
            // Handle login error
        });
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            
                <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', width: '100%'}}>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 250, width: '100%' }}>
                        <Image source={require('../assets/images/pic_holder.png')} style={{ width: 112, height: 112 }} />
                    </View>
                    <ScrollView style={{ width: '100%', padding: 30 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginTop: 40 }} />
                        <TitleOne title="Localeyez Login" />
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