import React from 'react';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavArrowTitle } from '../../../components/TopNavArrowTitle';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { InputLabelNumpad } from '../../../components/InputLabelNumpad';
import { InputLabel } from '../../../components/InputLabel';
import { InputMultiline } from '../../../components/InputMultiline';
import { Label } from '../../../components/Label';
import { Checkbox } from '../../../components/Checkbox';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';


const StepTwo = (props) => 
{
    const handleNext = () => 
    {
        props.navigation.navigate('SignupBusinessStepThree');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Business Details" alignment="start" navigation={props.navigation} />
            {/* <DividerTop /> */}
            <ScrollView>
                <Layout style={MainStyles.layout_container}>
                    <View style={{ marginTop: 25 }} />
                    <InputLabelNumpad label="Contact Number (for business)" placeholder="E.g. John" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Company" placeholder="E.g. Barron" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabel placeholder="Address line 1" label="Location" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel placeholder="Address line 2" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel placeholder="City" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel placeholder="Province" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel placeholder="ZIP Code" />
                    <View style={{ marginTop: 15 }} />
                    <InputMultiline placeholder="Write a short description up to 120 characters about your business" label="Business Bio" />
                    <View style={{ marginTop: 15 }} />
                    <Label title="Are a small & local business?" textalign="left" fontweight="bold" mb={5} />
                    <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox label="Yes" />
                        <Checkbox label="No" />
                    </Layout>
                    <View style={{ marginTop: 15 }} />
                    <Label title="Connect Your Social Media (optional)" textalign="left" fontweight="bold" mb={5} />
                    <Icon name="twitter-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                    <InputLabel placeholder="Write X URL here" />
                    <View style={{ marginTop: 10 }} />
                    <Icon name="linkedin-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                    <InputLabel placeholder="Write Instagram URL here" />
                    <View style={{ marginTop: 10 }} />
                    <Icon name="facebook-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                    <InputLabel placeholder="Write Facebook URL here" />
                    <View style={{ marginTop: 10 }} />
                    <Icon name="linkedin-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                    <InputLabel placeholder="Write Linkedin URL here" />
                    <View style={{ marginTop: 10 }} />
                    <Icon name="globe-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                    <InputLabel placeholder="Write Website URL here" />
                    <View style={{ marginTop: 25 }} />
                    <ButtonPrimary name="Next" width="100%" onpress={handleNext}/>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default StepTwo;