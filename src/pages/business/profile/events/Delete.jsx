import React from "react";
import { SafeAreaView, View } from "react-native";
import { Layout } from "@ui-kitten/components";
import TextTwo from "../../../../components/TextTwo";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../../components/ButtonSecondary";
import { TitleThree } from "../../../../components/TitleThree";

const Delete = (props) => 
{
    const handleContinue = () => 
    {
        props.navigation.navigate('BusProfProAdd');
    }

    const handleDiscard = () => 
    {
        props.navigation.navigate('BusProfProHome');
    }
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Layout style={{ flexDirection: 'column', width: "100%", padding: 40, paddingTop: 80, position: 'absolute', bottom: 0, borderTopStartRadius: 40, borderTopEndRadius: 40 }} >
                <TitleThree title="Are you sure you want to delete yout event?" textalign='center' />
                <TextTwo title="If you delete the event, all the event details will be discarded." width="100%" mt={25} mb={25} textalign='center' />
                <ButtonPrimary name="Delete Event" onpress={handleContinue} />
                <View style={{ marginTop: 15 }} />
                <ButtonSecondary name="Go Back" onpress={handleDiscard} />
            </Layout>
        </SafeAreaView>
    );
};

export default Delete;