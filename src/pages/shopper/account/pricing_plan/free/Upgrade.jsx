import React from "react";
import { TopNavArrowTitle } from "../../../../../components/TopNavArrowTitle";
import { TopNavBack } from "../../../../../components/TopNavBack";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";
import { TextIcon } from "../../../../../components/TextIcon";
import { SafeAreaView, ScrollView } from "react-native";
import { Divider, Layout, Text } from "@ui-kitten/components";

const Upgrade = (props) => 
{
    const handleGetStarted = () => 
    {
        // props.navigation.navigate("ShopperAccPlanFreeCardDet");
        props.navigation.navigate("CustomerInfo");
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TopNavBack title={`Pricing Plan: Free Account`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView style={{ flex: 1 }}>
                <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 25 }}>
                    <Text category="h1" status="primary" style={{ textAlign: "center", marginBottom: 10 }}>Pricing Plan</Text>
                    <Text category="h4" style={{ width: '100%', marginTop: 0, marginBottom: 20, textAlign: 'center' }}>Upgrade Subscription</Text>
                    <Text category="p1" status="primary" style={{textAlign: 'center'}}>A small amount a month can save you big time with access to stay in the know of the events happening in your area.</Text>
                    <Text category="h6" style={{textAlign: 'center', marginTop: 25}}>$10/month</Text>
                    <Text category="h5" status="primary" style={{textAlign: 'center', marginBottom: 10}}>Localeyez Member</Text>
                    <ButtonPrimary name="Get Started" marginTop={15} width="100%" onpress={handleGetStarted} />
                    <Text category="h4" style={{ width: '100%', marginTop: 25, marginBottom: 10}}>Features</Text>
                    <Divider style={{width: "100%"}} />
                    <TextIcon title="Access to events" iconname="checkmark-circle-2" width={32} mt={15} mb={15} />
                    <Divider style={{width: "100%"}} />
                    <TextIcon title="Review Businesses" iconname="checkmark-circle-2" width={32} mt={15} mb={15} />
                    <Divider style={{width: "100%"}} />
                    <TextIcon title="Access to Amazing Discounts" iconname="checkmark-circle-2" width={32} mt={15} mb={15} />
                    <Divider style={{width: "100%"}} />
                </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Upgrade;