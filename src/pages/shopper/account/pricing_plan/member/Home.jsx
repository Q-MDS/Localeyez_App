import React from "react";
import MainStyles from "../../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../../components/TopNavBack";
import {TextIcon} from "../../../../../components/TextIcon";
import { Platform, SafeAreaView, ScrollView } from "react-native";
import { Layout, Avatar, Text, Divider } from "@ui-kitten/components";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../../../components/ButtonSecondary";

const Home = (props) => 
{
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
                <Avatar source={require('../../../../../assets/images/price_plan_member.png')} style={{ width: 96, height: 96 }} />
                <Text category="s1" style={{ width: '100%', marginTop: 10, marginBottom: 5, textAlign: 'center' }}>Current Pricing Plan</Text>
					<Text category="h4" style={{ width: '100%', marginTop: 0, marginBottom: 5, textAlign: 'center' }}>Localeyez Verified Member</Text>
                <Text category="p1" status="primary" style={{ marginBottom: 10 }}>$10/month</Text>
                <Divider style={{width: "100%"}} />
                <TextIcon title="Access to events" iconname="checkmark-circle-2" width={32} mt={5}  />
                <Divider style={{width: "100%"}} />
                <TextIcon title="Access to promotions" iconname="checkmark-circle-2" width={32} mt={5}  />
                <Divider style={{width: "100%"}} />
                <TextIcon title="Review Businesses" iconname="checkmark-circle-2" width={32} mt={5} />
                <Divider style={{width: "100%"}} />
                <TextIcon title="Access to Amazing Discounts" iconname="checkmark-circle-2" width={32} mt={5}  />
                <Divider style={{width: "100%"}} />
                <ButtonPrimary name="Back" width="100%" marginTop={25} onpress={handleClose} />
                <ButtonSecondary name="Cancel Subscription" width="100%" marginTop={15} onpress={handleCancel} />
            </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;