import React from 'react';
import {View, Image} from 'react-native';
import { Icon, TopNavigation, TopNavigationAction, Layout, Text, Card } from '@ui-kitten/components';

export const TopNavShpDashboard = (props) => 
{
    const gotoNotification = () => 
    {
        props.navigation.navigate('ShopperNotiList');
    };

    const gotoAccount = () => 
    {
        props.navigation.navigate('ShopperAccHome');
    };

    const NotiIcon = (props) => ( <Icon {...props} name='bell-outline' fill='#220622' style={{ width: 32, height: 32, }} /> );
    const AccountIcon = (props) => ( <Icon {...props} name='person' fill='#220622' style={{ width: 32, height: 32, }} /> );

    const NotiAction = () => ( <TopNavigationAction icon={NotiIcon} onPress={gotoNotification} /> );
    const AccountAction = () => ( <TopNavigationAction icon={AccountIcon} onPress={gotoAccount} /> );

    return (
        <>
        <Card style={{ backgroundColor: '#E7DFF6', marginBottom: 0 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../assets/images/icon_logo.png')} />
                <Text style={{ color: '#220622', marginLeft: 10, fontSize: 19 }}>Stay in the know, live in the now.</Text>
            </View>
        </Card>
        <TopNavigation
        title={(evaProps) => <Layout style={{ flexDirection: 'row' }}><Text {...evaProps} style={{color: '#131141', fontSize: 20}}>Hello, </Text><Text {...evaProps} style={{color: '#220622', fontSize: 20, fontWeight: 'bold'}}>{props.title}</Text></Layout>}
        alignment="start"
        style={{ paddingStart: 20 }}
        accessoryRight={
        <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
            <NotiAction />
            <AccountAction />
        </Layout>}
        />
        </>
    );
};