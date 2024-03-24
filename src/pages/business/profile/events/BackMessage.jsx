import React from "react";
import { SafeAreaView, View } from "react-native";
import { Layout } from "@ui-kitten/components";
import TextTwo from "../../../../components/TextTwo";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../../components/ButtonSecondary";
import { TitleThree } from "../../../../components/TitleThree";

const BackMessage = (props) => 
{
    const handleContinue = () => 
    {
        props.navigation.navigate('BusProfEvtAdd');
    }

    const handleDiscard = () => 
    {
        props.navigation.navigate('BusProfProHome');
    }
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Layout style={{ flexDirection: 'column', width: "100%", padding: 40, paddingTop: 80, position: 'absolute', bottom: 0, borderTopStartRadius: 40, borderTopEndRadius: 40 }} >
                <TitleThree title="Are you sure you want to go back?" textalign='center' />
                <TextTwo title="If you go back, your event will be discarded." width="100%" mt={25} mb={25} textalign='center' />
                <ButtonPrimary name="Continue Event Details" onpress={handleContinue} />
                <View style={{ marginTop: 15 }} />
                <ButtonSecondary name="Discard Event" onpress={handleDiscard} />
            </Layout>
        </SafeAreaView>
    );
};

export default BackMessage;