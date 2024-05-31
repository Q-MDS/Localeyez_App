import React from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { SafeAreaView, Image,  View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import { ButtonText } from "../../../components/ButtonText";
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
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <Layout style={[MainStyles.column_container, { backgroundColor: '#f2f2f2', paddingStart: 0, paddingEnd: 0, paddingTop: 80, paddingBottom: 0}]}>
				<View style={{ flex: 1 }} />
				<View style={{ backgroundColor: 'white', padding: 30, width: '100%', borderTopStartRadius: 30, borderTopEndRadius: 30 }}>
					<Text style={[MainStyles.title_a24, {textAlign: 'center', marginBottom: 40 }]}>We will be in contact with you soon via email.</Text>
					<ButtonPrimary name="Goto Home Page" onpress={handleContinue} />
					<View style={{ marginTop: 15 }} />
					<ButtonText name="Go Back to Contact Admin" onpress={handleDiscard} />
				</View>
            </Layout>
        </SafeAreaView>
    );
};

export default ContactConfirm;