import React from 'react';
import { Icon, TopNavigation, TopNavigationAction, Layout, Text } from '@ui-kitten/components';

export const TopNavBusDashboard = (props) => 
{
    const gotoNotification = () => 
    {
        props.navigation.navigate('BusDashNoti');
    };

    const gotoAccount = () => 
    {
        props.navigation.navigate('BusDashAccHome');
    };

    const NotiIcon = (props) => ( <Icon {...props} name='bell-outline' fill='#220622' style={{ width: 32, height: 32, }} /> );
    const AccountIcon = (props) => ( <Icon {...props} name='person' fill='#220622' style={{ width: 32, height: 32, }} /> );

    const NotiAction = () => ( <TopNavigationAction icon={NotiIcon} onPress={gotoNotification} /> );
    const AccountAction = () => ( <TopNavigationAction icon={AccountIcon} onPress={gotoAccount} /> );

    return (
        <TopNavigation
        title={(evaProps) => <Layout style={{ flexDirection: 'row' }}><Text {...evaProps} style={{color: '#131141', fontSize: 20}}>Hello, </Text><Text {...evaProps} style={{color: '#612bc1', fontSize: 20, fontWeight: 'bold'}}>{props.title}</Text></Layout>}
        alignment="start"
        style={{ paddingStart: 20 }}
        accessoryRight={
        <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
            <NotiAction />
            <AccountAction />
        </Layout>}
        />
    );
};