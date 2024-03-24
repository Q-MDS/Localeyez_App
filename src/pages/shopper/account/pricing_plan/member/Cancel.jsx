import React from "react";
import MainStyles from "../../../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../../../components/TopNavArrowTitle";
import { SafeAreaView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../../../components/ButtonSecondary";

const Cancel = (props) => 
{
    const handleCancel = () => 
    {
        props.navigation.navigate('ShopperAccHome');
    }

    const handleGoBack= () => 
    {
        props.navigation.navigate('ShopperAccHome');
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Pricing Plan" alignment="start" navigation={props.navigation} goBackTo="ShopperAccHome" />
            <Layout style={[MainStyles.layout_container, { alignItems: 'center' } ]}>
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 250, width: '100%' }}>
                    <Image source={require('../../../../../assets/images/pic_holder.png')} style={{ width: 112, height: 112 }} />
                </View>
                <View style={{ flexDirection: 'column', flex: 1, alignItems: 'space-between', justifyContent: 'center', width: '100%', paddingStart: 20, paddingEnd: 20 }}>
                    <Text category="h5" status="primary" style={{ fontWeight: 'bold', marginTop: 15, width: '100%', textAlign: 'center' }}>Are you sure you want to cancel your subscription?</Text>
                    <Text category="p1" status="primary" style={{ marginTop: 15, width: '100%', textAlign: 'center' }}>If you cancel the subscription, you will loose access to amazing discounts from businesses around you.</Text>
                    <View style={{ marginTop: 50 }} />
                    <ButtonPrimary name="Cancel Subscription" width="100%" onpress={handleCancel} />
                    <View style={{ marginTop: 15 }} />
                    <ButtonSecondary name="Go Back" width="100%" onpress={handleGoBack} />
                </View>

            </Layout>
        </SafeAreaView>
    );
};

export default Cancel;