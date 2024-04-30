import React from "react";
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { SafeAreaView, View } from "react-native";
import { Layout } from "@ui-kitten/components";
import { InputLabelEmail } from "../../../../components/InputLabelEmail";
import { InputLabel } from "../../../../components/InputLabel";
import { InputLabelNumpad } from "../../../../components/InputLabelNumpad";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";

const Edit = (props) => 
{
    const handleSubmit = () => 
    {
        props.navigation.navigate('BusDashAccHome');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
			<TopNavBack title="Edit profile" alignment="start" navigation={props.navigation} pops={1} />
                <Layout style={[MainStyles.layout_container ]}>
                    <InputLabelEmail label="Email" placeholder="example@email.com" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="First Name" placeholder="John" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Last Name" placeholder="John" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabelNumpad label="Phone Number" placeholder="030 002 5588" />
                    <Layout style={{ flexDirection: 'column', justifyContent: 'flex-end', flex: 1, width: '100%', paddingBottom: 50 }} >
                        <ButtonPrimary name="Submit Changes" width="100%" onpress={handleSubmit} />
                    </Layout>
                </Layout>
        </SafeAreaView>
    )
}

export default Edit;