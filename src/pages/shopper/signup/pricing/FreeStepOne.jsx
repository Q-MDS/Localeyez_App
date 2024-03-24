import React from "react";
import { TopNavArrowTitle } from "../../../../components/TopNavArrowTitle";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";
import { TextIcon } from "../../../../components/TextIcon";
import { SafeAreaView } from "react-native";
import { Divider, Layout, Text } from "@ui-kitten/components";

const FreeStepOne = (props) => 
{
    const handleGetStarted = () => 
    {
        props.navigation.navigate("SignupUserFreeTwo");
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Pricing Plan: Free Account" alignment="start" navigation={props.navigation} />
            <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 25 }}>
                <Text category="h1" status="primary" style={{ textAlign: "center", marginBottom: 10 }}>Pricing Plan</Text>
                <Text category="p1" status="primary" style={{textAlign: 'center'}}>Signup for free and get access to stay in the know of the events happening in your area.</Text>
                <Text category="h6" style={{textAlign: 'center', marginTop: 25}}>$0</Text>
                <Text category="h5" status="primary" style={{textAlign: 'center', marginBottom: 10}}>Free Account</Text>
                <ButtonPrimary name="Get Started" marginTop={15} width="100%" onpress={handleGetStarted} />
                <Text category="h4" style={{ width: '100%', marginTop: 25, marginBottom: 10}}>Features</Text>
                <Divider style={{width: "100%"}} />
                <TextIcon title="Access to events" iconname="checkmark-circle-2" width={32} mt={15} mb={15} />
                <Divider style={{width: "100%"}} />
                <TextIcon title="Review Businesses" iconname="checkmark-circle-2" width={32} mt={15} mb={15} />
                <Divider style={{width: "100%"}} />
            </Layout>
        </SafeAreaView>
    );
};

export default FreeStepOne;