import React from "react";
import { TopNavArrowTitle } from "../../../../../components/TopNavArrowTitle";
import { TitleTwo } from "../../../../../components/TitleTwo";
import TextOne from "../../../../../components/TextOne";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";
import { SafeAreaView, View, Image } from "react-native";
import { Layout } from "@ui-kitten/components";

const CardDetailsConfirm = (props) => 
{
    const handelGetStarted = () => 
    {
        props.navigation.navigate("ShopperAccHome");
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Registration complete" alignment="start" navigation={props.navigation} />
            <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 25 }}>
                <Image source={require('../../../../../assets/images/congrats.png')} style={{ width: 89, height: 92 }} />
                <View style={{ marginTop: 45 }} />
                <TitleTwo title="Congratulations!" />
                <View style={{ marginTop: 25 }} />
                <TextOne title="You are now a Localeyez member!" textAlign="center" />
                <ButtonPrimary name="Back To Settings" width="100%" marginTop={25} onpress={handelGetStarted}/>
            </Layout>
        </SafeAreaView>
    );
};

export default CardDetailsConfirm;