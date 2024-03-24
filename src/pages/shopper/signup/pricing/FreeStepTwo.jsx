import React from "react";
import { TopNavArrowTitle } from "../../../../components/TopNavArrowTitle";
import { TitleTwo } from "../../../../components/TitleTwo";
import TextOne from "../../../../components/TextOne";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";
import { SafeAreaView, View, Image } from "react-native";
import { Layout } from "@ui-kitten/components";

const FreeStepTwo = (props) => 
{
    const handelGetStarted = () => 
    {
        props.navigation.navigate("ShopperHome");
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Registration complete" alignment="start" navigation={props.navigation} />
            <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 25 }}>
                <Image source={require('../../../../assets/images/congrats.png')} style={{ width: 89, height: 92 }} />
                    <View style={{ marginTop: 45 }} />
                    <TitleTwo title="Registration Complete!" />
                    <View style={{ marginTop: 25 }} />
                    <TextOne title="You have successfully signed up to Localeyez!" textAlign="center" />
                    <ButtonPrimary name="Get Started" width="100%" marginTop={25} onpress={handelGetStarted}/>
            </Layout>

        </SafeAreaView>
    );
};

export default FreeStepTwo;