import React, { useState } from 'react';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavArrowTitle } from '../../../components/TopNavArrowTitle';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { InputLabelEmail } from '../../../components/InputLabelEmail';
import { InputLabel } from '../../../components/InputLabel';
import { InputLabelPassword } from '../../../components/InputLabelPassword';
import TextTwo from '../../../components/TextTwo';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Layout, Avatar } from '@ui-kitten/components';


const StepOne = (props) => 
{
    const [email, setEmail] = useState('');

    const handleNext = () => 
    {
        props.navigation.navigate('SignupBusinessStepTwo');
    }

    const handleLogin = () => 
    {
        props.navigation.navigate('LoginBusiness');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Create your Account" alignment="start" navigation={props.navigation} />
            {/* <DividerTop /> */}
            {/* <ScrollView> */}
                <Layout style={MainStyles.layout_container}>
                    <View style={{ marginTop: 25 }} />
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                        <Avatar source={require('../../../assets/images/list_icon.png')} style={{ width: 82, height: 82 }} />
                    </View>
                    <View style={{ marginTop: 35 }} />
                    <InputLabelEmail label="Email" value={email} setValue={setEmail} placeholder="Enter email" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="First Name" placeholder="E.g. John" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Last Name" placeholder="E.g. Barron" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabelPassword placeholder="Enter password" label="Password" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabelPassword placeholder="Confirm password" label="Confirm Password" />
                    <View style={{ marginTop: 25 }} />
                    <ButtonPrimary name="Next" width="100%" onpress={handleNext}/>
                    <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 15 }} >
                        <TextTwo title="Already have an account? " textalign="center" />
                        <TouchableOpacity onPress={handleLogin}>
                            <TextTwo title="Login" textalign="center" fontweight="bold" underline="underline" width="100%" />
                        </TouchableOpacity>
                    </Layout>
                </Layout>
            {/* </ScrollView> */}
        </SafeAreaView>
    );
};

export default StepOne;