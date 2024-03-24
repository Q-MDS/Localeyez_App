import React from "react";
import { SafeAreaView, View } from "react-native";
import { Layout } from "@ui-kitten/components";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../components/ButtonSecondary";
import { TitleThree } from "../../../components/TitleThree";

const ContactConfirm = (props) => 
{
    const handleContinue = () => 
    {
        props.navigation.navigate('BusProfProHome');
    }

    const handleDiscard = () => 
    {
        props.navigation.navigate('ContactForm');
    }
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Layout style={{ flexDirection: 'column', width: "100%", padding: 40, paddingTop: 80, position: 'absolute', bottom: 0, borderTopStartRadius: 40, borderTopEndRadius: 40 }} >
                 <TitleThree title="We will be in contact with you soon via email." textalign='center' />
                <View style={{ marginTop: 50 }} />
                <ButtonPrimary name="Goto Home Page" onpress={handleContinue} />
                <View style={{ marginTop: 15 }} />
                <ButtonSecondary name="Go Back to Contact Admin" onpress={handleDiscard} />
            </Layout>
        </SafeAreaView>
    );
};

export default ContactConfirm;