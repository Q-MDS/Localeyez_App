import React from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../components/TopNavArrowTitle";
import { SafeAreaView } from "react-native";
import { Layout, Avatar, Text } from "@ui-kitten/components";

const Verified = (props) => 
{
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Verified Member" alignment="start" navigation={props.navigation} goBackTo="ShopperAccHome" />
            <Layout style={[MainStyles.layout_container, { justifyContent: 'center', alignItems: 'center' } ]}>
                <Layout style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop:40, paddingBottom: 30 }}>
                    <Avatar source={require('../../../assets/images/list_icon.png')} style={{ width: 128, height: 128 }} />
                    <Text category="h6" status="primary" style={{ fontWeight: 'bold', marginTop: 15 }}>Rebecca Shapiro</Text>
                    <Text category="p1" status="primary">rebeccashapiro@gmail.com</Text>
                    <Text category="p2" status="primary" style={{ marginTop: 50 }}>Show this to businesses offering discounts</Text>
                </Layout>
            </Layout>
        </SafeAreaView>
    );
};

export default Verified;