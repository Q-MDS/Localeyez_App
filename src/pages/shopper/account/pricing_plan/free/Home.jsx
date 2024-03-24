import React from "react";
import MainStyles from "../../../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../../../components/TopNavArrowTitle";
import {TextIcon} from "../../../../../components/TextIcon";
import { SafeAreaView } from "react-native";
import { Layout, Text, Divider } from "@ui-kitten/components";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";

const Home = (props) => 
{
    const handleUpgrade = () => 
    {
        props.navigation.navigate('ShopperAccPlanFreeUpgrade');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Pricing Plan" alignment="start" navigation={props.navigation} goBackTo="ShopperAccHome" />
            <Layout style={[MainStyles.layout_container, { justifyContent: 'center', alignItems: 'center' } ]}>
                <Text category="p1" status="primary" style={{ marginTop: 15 }}>$0</Text>
                <Text category="h6" status="primary" style={{ fontWeight: 'bold', marginTop: 5 }}>Free Account</Text>
                <Text category="h4" style={{ width: '100%', marginTop: 40, marginBottom: 10}}>Features</Text>
                <Divider style={{width: "100%"}} />
                <TextIcon title="Access to events" iconname="checkmark-circle-2" width={32} mt={15} mb={15} />
                <Divider style={{width: "100%"}} />
                <TextIcon title="Review Businesses" iconname="checkmark-circle-2" width={32} mt={15} mb={15} />
                <Divider style={{width: "100%"}} />
                <ButtonPrimary name="Upgrade Subscription" width="100%" marginTop={80} onpress={handleUpgrade} />
            </Layout>
        </SafeAreaView>
    );
};

export default Home;