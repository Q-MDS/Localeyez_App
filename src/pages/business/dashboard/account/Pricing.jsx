import React from "react";
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { SafeAreaView, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";

const Pricing = (props) => 
{
    const handleGoBack = () => 
    {
        props.navigation.navigate('BusDashAccHome'); 
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
			<TopNavBack title="Pricing plan" alignment="start" navigation={props.navigation} pops={1} />
                <Layout style={[MainStyles.layout_container ]}>
                    <Layout style={{ flexDirection: 'column', justifyContent: 'center', flex: 1, width: '100%', paddingBottom: 50 }} >
                        <Text category="h2" status="primary" style={{ fontWeight: 'bold', marginTop: 15, width: '100%', textAlign: 'center' }}>Pricing Plan</Text>
                        <Text category="p1" status="primary" style={{ marginTop: 15, width: '100%', textAlign: 'center' }}>Localeyez is running a free trial for businesses. We will notify you when your account will need to be upgraded,</Text>
                        <View style={{ marginTop: 60 }} />
                        <ButtonPrimary name="Go back to Account Details" width="100%" onpress={handleGoBack} />
                    </Layout>
                </Layout>
        </SafeAreaView>
    )
}

export default Pricing;