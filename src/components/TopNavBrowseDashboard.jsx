import React from 'react';
import { Alert } from 'react-native';
import { Icon, TopNavigation, TopNavigationAction, Layout, Text } from '@ui-kitten/components';

export const TopNavBrowseDashboard = (props) => 
{
    const gotoNotification = () => 
    {
        props.navigation.navigate('ShopperNotiList');
    };

    const gotoRegister = () => 
    {
        props.navigation.navigate('BrowseRegister');
    };

	const handleMsgNotification = () => 
	{
		Alert.alert(
			"Feature",
			"View notifications of events and promotions from businesses.\n\nSignup to enable this feature.",
			[
				{
				text: "Ok",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
				},
				{ text: "Read More", onPress: () => gotoRegister() }
			]
		);
	}

	const handleMsgAccount = () => 
	{
		Alert.alert(
			"Feature",
			"Manage your account options:\n\n- Edit profile\n- Business sectors that interest you\n- Change password\n- Privacy policy\n- Close Account\n- Sign out\n\nSignup to enable this feature.",
			[
				{
				text: "Ok",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
				},
				{ text: "Read More", onPress: () => gotoRegister() }
			]
		);
	}

	const handleBack = () => 
	{
		props.navigation.goBack();
	}

    const BackIcon = (props) => ( <Icon {...props} name='arrow-back-outline' fill='#220622' style={{ width: 32, height: 32, }} /> );
    const NotiIcon = (props) => ( <Icon {...props} name='bell-outline' fill='#220622' style={{ width: 32, height: 32, }} /> );
    const AccountIcon = (props) => ( <Icon {...props} name='person' fill='#220622' style={{ width: 32, height: 32, }} /> );

    const BackAction = () => ( <TopNavigationAction icon={BackIcon} onPress={handleBack} /> );
    const NotiAction = () => ( <TopNavigationAction icon={NotiIcon} onPress={handleMsgNotification} /> );
    const AccountAction = () => ( <TopNavigationAction icon={AccountIcon} onPress={handleMsgAccount} /> );

    return (
		<>
        <TopNavigation
        title={(evaProps) => <Layout style={{ flexDirection: 'row', alignItems: 'center' }}><BackAction/><Text {...evaProps} style={{color: '#131141', fontSize: 20}}>Browse Businesses</Text></Layout>}
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