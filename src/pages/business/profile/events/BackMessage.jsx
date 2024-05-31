import React from "react";
import MainStyles from "../../../../assets/styles/MainStyles";
import { SafeAreaView, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import TextTwo from "../../../../components/TextTwo";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../../components/ButtonSecondary";
import { ButtonText } from "../../../../components/ButtonText";
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
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <Layout style={[MainStyles.column_container, { backgroundColor: '#f2f2f2', paddingStart: 0, paddingEnd: 0, paddingTop: 80, paddingBottom: 0}]}>
				<View style={{ flex: 1 }} />
				<View style={{ backgroundColor: 'white', padding: 30, width: '100%', borderTopStartRadius: 30, borderTopEndRadius: 30 }}>
					<Text style={[MainStyles.title_a28, {textAlign: 'center', marginBottom: 40 }]}>Are you sure you want to go back?</Text>
					<Text style={[MainStyles.title_a16, {textAlign: 'center', marginBottom: 40}]}>If you go back, your event will be discarded.</Text>
					<ButtonPrimary name="Continue Event Details" onpress={handleContinue} />
					<View style={{ marginTop: 15 }} />
					<ButtonText name="Discard Event" onpress={handleDiscard} />
				</View>
            </Layout>
        </SafeAreaView>
    );
};

export default BackMessage;