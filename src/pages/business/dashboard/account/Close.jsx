import React from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';

const CloseAccount = (props) => 
{
    const handleClose = () => 
    {
        props.navigation.navigate('LoginBusiness');
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <Layout style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 250, width: '100%' }}>
                    <Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 112, height: 112 }} />
                </View>
                <View style={{ flexDirection: 'column', flex: 1, alignItems: 'space-between', justifyContent: 'center', width: '100%', paddingStart: 30, paddingEnd: 30 }}>
                    <Text category="h5" status="primary" style={{ fontWeight: 'bold', marginTop: 15, width: '100%', textAlign: 'center' }}>Thank you for using Localeyez</Text>
                    <Text category="p1" status="primary" style={{ marginTop: 15, width: '100%', textAlign: 'center' }}>Closing the account is an action that cannot be reversed. Once closed, the email address is released and can be used for creating a new Localeyez account. Your previous data will not be stored.</Text>
                    <View style={{ marginTop: 50 }} />
                    <ButtonPrimary name="Delete Account" width="100%" onpress={handleClose} />
                </View>
            </Layout>
        </SafeAreaView>

    )
};

export default CloseAccount;