import React from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { SafeAreaView, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import { ButtonText } from "../../../components/ButtonText";
import { ButtonSecondary } from "../../../components/ButtonSecondary";
import { TitleThree } from "../../../components/TitleThree";

const ContactConfirm = (props) => 
{
    const handleContinue = () => 
    {
        props.navigation.navigate('ShopperHome');
    }

    const handleDiscard = () => 
    {
        props.navigation.navigate('ShopperContactAdmin');
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

        // <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //     <Layout style={{ flexDirection: 'column', width: "100%", padding: 40, paddingTop: 80, position: 'absolute', bottom: 0, borderTopStartRadius: 40, borderTopEndRadius: 40 }} >
        //          <TitleThree title="We will be in contact with you soon via email." textalign='center' status="basic" />
        //         <View style={{ marginTop: 50 }} />
        //         <ButtonPrimary name="Goto Home Page" onpress={handleContinue} />
        //         <View style={{ marginTop: 15 }} />
        //         <ButtonSecondary name="Go Back to Contact Admin" onpress={handleDiscard} />
        //     </Layout>
        // </SafeAreaView>
    );
};

export default ContactConfirm;