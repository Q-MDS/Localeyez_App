import React from "react";
import MainStyles from "../../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../../components/TopNavBack";
import {TextIcon} from "../../../../../components/TextIcon";
import { SafeAreaView, ScrollView } from "react-native";
import { Layout, Text, Divider, Avatar } from "@ui-kitten/components";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";

const Home = (props) => 
{
    const handleUpgrade = () => 
    {
        props.navigation.navigate('ShopperAccPlanFreeUpgrade');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TopNavBack title={`Pricing Plan`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView style={{ flex: 1 }}>
            <Layout style={[MainStyles.layout_container, { justifyContent: 'flex-start', alignItems: 'center' } ]}>
			<Text category="h1" status="primary" style={{ textAlign: "center", marginBottom: 10 }}>Pricing Plan</Text>
            <Text category="h4" style={{ width: '100%', marginTop: 0, marginBottom: 20, textAlign: 'center' }}>Subscription Type</Text>
				<Avatar source={require('../../../../../assets/images/price_plan_member.png')} style={{ width: 96, height: 96 }} />
                <Text category="p1" status="primary" style={{ marginTop: 15 }}>$0/month</Text>
                <Text category="h6" status="primary" style={{ fontWeight: 'bold', marginTop: 5 }}>Free Account</Text>
                <Text category="h4" style={{ width: '100%', marginTop: 40, marginBottom: 10}}>Features</Text>
                <Divider style={{width: "100%"}} />
                <TextIcon title="Access to events" iconname="checkmark-circle-2" width={32} mt={15} mb={15} />
                <Divider style={{width: "100%"}} />
                <TextIcon title="Review Businesses" iconname="checkmark-circle-2" width={32} mt={15} mb={15} />
                <Divider style={{width: "100%"}} />
				<Layout style={{ flexDirection: 'row', alignItems: 'flex-end', width: '100%', flex: 1, paddingBottom: 40 }}>
                	<ButtonPrimary name="Upgrade Subscription" width="100%" marginTop={25} onpress={handleUpgrade} />
				</Layout>
            </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;