import React from "react";
import MainStyles from "../../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../../components/TopNavBack";
import {TextIcon} from "../../../../../components/TextIcon";
import { SafeAreaView, ScrollView } from "react-native";
import { Layout, Avatar, Text, Divider } from "@ui-kitten/components";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../../../components/ButtonSecondary";

const Home = (props) => 
{
    const handleCancel = () => 
    {
        props.navigation.navigate('ShopperAccPlanMemCancel');
    }

    const handleClose = () => 
    {
        props.navigation.navigate('ShopperAccHome');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TopNavBack title={`Back`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView style={{ flex: 1 }}>
            <Layout style={[MainStyles.layout_container, { alignItems: 'center' } ]}>
                <Avatar source={require('../../../../../assets/images/price_plan_member.png')} style={{ width: 96, height: 96 }} />
                <Text category="p1" status="primary" style={{ marginTop: 15 }}>$10/month</Text>
                <Text category="h5" status="primary" style={{ fontWeight: 'bold', marginTop: 5 }}>Localeyez Member</Text>
                <Text category="h4" style={{ width: '100%', marginTop: 40, marginBottom: 10}}>Features</Text>
                <Divider style={{width: "100%"}} />
                <TextIcon title="Access to events" iconname="checkmark-circle-2" width={32} mt={15} mb={15} />
                <Divider style={{width: "100%"}} />
                <TextIcon title="Review Businesses" iconname="checkmark-circle-2" width={32} mt={15} mb={15} />
                <Divider style={{width: "100%"}} />
                <TextIcon title="Access to Amazing Discounts" iconname="checkmark-circle-2" width={32} mt={15} mb={15} />
                <Divider style={{width: "100%"}} />
                <ButtonPrimary name="Back" width="100%" marginTop={35} onpress={handleClose} />
                <ButtonSecondary name="Cancel Subscription" width="100%" marginTop={15} onpress={handleCancel} />
            </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;