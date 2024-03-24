import React from "react";
import MainStyles from "../../../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../../../components/TopNavArrowTitle";
import TextTwo from "../../../../../components/TextTwo";
import { SafeAreaView, Image } from "react-native";
import { Layout } from "@ui-kitten/components";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";

const CardDetailsConfirm = (props) => 
{
    const handleGoBack= () => 
    {
        props.navigation.navigate('ShopperAccHome');
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Pricing Plan" alignment="start" navigation={props.navigation} goBackTo="ShopperAccHome" />
                {/* <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 250, width: '100%' }}>
                    <Image source={require('../../../../../assets/images/card_update_confirm.png')} style={{ width: 112, height: 112 }} />
                </View> */}
            <Layout style={[MainStyles.layout_container, { justifyContent: 'center', alignItems: 'center', paddingStart: 40, paddingEnd: 40, flex: 1 } ]}>
                <Image source={require('../../../../../assets/images/card_update_confirm.png')} style={{ width: 112, height: 112 }} />
                <TextTwo title="Your Card Details Have Been Updated" textalign="center" fontsize={28} mb={10} mt={50} />
                {/* <Text category="h4" status="primary" style={{ marginTop: 15, width: '100%', textAlign: 'center' }}>Your Card Details Have Been Updated</Text> */}
                <ButtonPrimary name="Go Back To Settings" width="100%" marginTop={50} onpress={handleGoBack} />
            </Layout>
        </SafeAreaView>
    );
};

export default CardDetailsConfirm;
