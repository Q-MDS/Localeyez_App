import React, { useState, useEffect } from "react";
import MainStyles from "../../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../../components/TopNavBack";
import DbUtils from "../../../../../services/DbUtils";
import {TextIcon} from "../../../../../components/TextIcon";
import { Linking, Platform, SafeAreaView, ScrollView } from "react-native";
import { Layout, Avatar, Text, Card } from "@ui-kitten/components";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../../../components/ButtonSecondary";

const Home = (props) => 
{
    const [managementURL, setManagementURL] = useState('');

    useEffect(() => 
    {
        const getManagementUrl = async () => 
        {
            const getProfile = await DbUtils.getItem('shopper_profile');

            const profile = JSON.parse(getProfile);

            setManagementURL(profile.management_url);
        }

        getManagementUrl();
    }, []);

    const handleManageSubscriptions = async () => 
    {
        const url = managementURL.toString();

        if (url && typeof url === 'string') 
        {
            const supported = await Linking.canOpenURL(url);
    
            if (supported) 
            {
                await Linking.openURL(url);
            } 
            else 
            {
                console.error('Don\'t know how to open this URL:', url);
            }
        } 
        else 
        {
            console.error('Invalid URL:', url);
        }
    }

    const handleCancel = () => 
    {
        const isAndroid = Platform.OS === 'android';
		const isIOS = Platform.OS === 'ios';

		if (isAndroid) 
		{
			// Android
            props.navigation.navigate('ShopperAccPlanMemCancel');
		} 
		else if (isIOS) 
        {
            // iPhone
            props.navigation.navigate('CancelAppleSub');
		}
    }

    const handleClose = () => 
    {
        props.navigation.navigate('ShopperAccHome');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TopNavBack title={`Back`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView style={{ flex: 1 }}>
            <Layout style={[MainStyles.layout_container, { alignItems: 'center', paddingTop: 0 } ]}>
                <Text category="h1" status="primary" style={{ textAlign: "center", marginBottom: 10 }}>Pricing Plan</Text>
                <Avatar source={require('../../../../../assets/images/price_plan_member.png')} style={{ width: 96, height: 96, marginTop: 20 }} />
                <Text category="s1" style={{ width: '100%', marginTop: 20, marginBottom: 5, textAlign: 'center' }}>Current Pricing Plan</Text>
                <Text category="h4" style={{ width: '100%', marginTop: 0, marginBottom: 5, textAlign: 'center' }}>Localeyez Verified Member</Text>

                {Platform.OS === 'ios' ?
                    (
                        <Card style={{ width: '100%', marginTop: 20 }}>
                            <Text category="s1" style={{ width: '100%', marginTop: 0, marginBottom: 5, textAlign: 'center' }}>Manage Subscription</Text>
                            {/* <Text style={{ fontSize: 14, marginTop: 15, textAlign: 'center' }}>Click <Text style={{ color: '#612bc1' }} onPress={() => Linking.openURL('https://apps.apple.com/account/subscriptions')}>here</Text> to manage your subscription.</Text> */}
                            <Text style={{ fontSize: 14, marginTop: 15, textAlign: 'center' }}>Click <Text style={{ color: '#612bc1' }} onPress={() => handleManageSubscriptions()}>here</Text> to manage your subscription.</Text>
                        </Card>
                    ) : 
                    (
                        <></>
                    )
                }
                

                <ButtonPrimary name="Back" width="100%" marginTop={25} onpress={handleClose} />
                <ButtonSecondary name="Cancel Subscription" width="100%" marginTop={15} onpress={handleCancel} />
            </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;