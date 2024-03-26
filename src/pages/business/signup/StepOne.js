import React, { useState, useEffect } from 'react';
import DbUtils from '../../../services/DbUtils'; 
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
    const [profileExists, setProfileExists] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    const chkProfile = async () => 
    {
        const isProfile = await DbUtils.checkData('business_profile');

        if (!isProfile)
        {
            createProfile();
        } 
        else 
        {
            setProfileExists(true);
        }
    }

    const createProfile = async () => 
    {
        const profileData = {
            email: 'john@doe.com',
            first_name: 'John',
            last_name: 'Doe',
            password: 'password',
            contact_number: '1234567890',
            company_name: 'Company Name',
            location: [{address_one: '123 Main St', address_two: '', city: 'City', province: 'Province', zip: '12345'}],
            business_bio: 'Business Bio', 
            isLocal: true,
            sm_x: "http://x.com",   
            sm_inst: "http://inst.com",   
            sm_fb: "http://fb.com",   
            sm_linkedin: "http://linkedin.com",   
            sm_www: "http://www.website.com",   
        }
        let stringified = JSON.stringify(profileData);
        DbUtils.setItem('business_profile', stringified);
    }

    const getProfile = async () => 
    {
        const profile = await DbUtils.getItem('business_profile');
        setEmail(JSON.parse(profile).email);
        setFirstName(JSON.parse(profile).first_name);
        setLastName(JSON.parse(profile).last_name);
        console.log('profile step 1: ', profile);
    }

    const updProfile = async (key, newValue) => 
    {
        const profileDataString = await DbUtils.getItem('business_profile');
        const profileData = JSON.parse(profileDataString);
      
        profileData[key] = newValue;
      
        await DbUtils.setItem('business_profile', JSON.stringify(profileData));
    };

    useEffect(() => 
    {
        chkProfile();
    }, []);

    useEffect(() => 
    {
        if (profileExists)
        {
            getProfile();
        }
    }, [profileExists === true]);

    const handleNext = () => 
    {
        updProfile('email', email);
        updProfile('first_name', firstName);
        updProfile('last_name', lastName);

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
                    <InputLabel label="First Name" value={firstName} setValue={setFirstName} placeholder="E.g. John" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Last Name" value={lastName} setValue={setLastName} placeholder="E.g. Barron" />
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