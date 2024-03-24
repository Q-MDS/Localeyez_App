import React from "react";
import { TopNavArrowTitle } from "../../../../../components/TopNavArrowTitle";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";
import { InputLabelNumpad } from "../../../../../components/InputLabelNumpad";
import { InputLabel } from "../../../../../components/InputLabel";
import { SafeAreaView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { Checkbox } from "../../../../../components/Checkbox";

const CardDetails = (props) => 
{
    const handleUpdate = () => 
    {
        props.navigation.navigate("ShopperAccPlanFreeCardDetDone");
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Change Card Details" alignment="start" navigation={props.navigation} />
            <Layout style={{ flexDirection: 'column', flex: 1, justifyContent: "center", alignItems: "center", padding: 25 }}>
                
                <View style={{  flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderColor: 'white', borderWidth: 1, width: '100%' }} >
                    <Text category="h1" status="primary" style={{ textAlign: "center", marginBottom: 20 }}>$10</Text>
                    <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }} >
                        <Image source={require('../../../../../assets/images/visa.png')}  />
                    </Layout>
                    <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', backgroundColor: "#f3f3f3", borderRadius: 10, padding: 10 }} >
                        <Text category="p2">Pay securely with your Bank Account using Visa or Mastercard.</Text>
                    </Layout>
                    <InputLabelNumpad label="Card Number" width="100%" mt={20} placeholder="xxxx-xxxx-xxxx-xxxx" />
                    <InputLabel label="Name on Card" width="100%"  mt={20} placeholder="Name on card" />
                    <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',  width: '100%', marginTop: 20 }}>
                        <View style={{ flex: 1}}><InputLabel label="Expiry" width="100%" placeholder="MM/YY" /></View>
                        <View style={{ width: 10 }} />
                        <View style={{ flex: 1}}><InputLabel label="CVV Code" width="100%" placeholder="xxx" /></View>
                    </Layout> 
                    <View style={{ marginTop: 10 }} />
                    <Checkbox label="Save card for furure payments" />
                    <ButtonPrimary name="Place Order" marginTop={25} width="100%" onpress={handleUpdate} />
                </View>
            </Layout>
        </SafeAreaView>
    );
}

export default CardDetails;