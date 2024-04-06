import React, { useState, useEffect } from 'react';
import DbUtils from '../../../services/DbUtils'; 
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavArrowTitle } from '../../../components/TopNavArrowTitle';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { InputLabelEmail } from '../../../components/InputLabelEmail';
import { InputLabel } from '../../../components/InputLabel';
import { InputPassword } from '../../../components/InputPassword';
import TextTwo from '../../../components/TextTwo';
import { SafeAreaView, ScrollView, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Layout, Avatar } from '@ui-kitten/components';

const StepOne = (props) => 
{
    const [profileExists, setProfileExists] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // const chkProfile = async () => 
    // {
    //     // await DbUtils.clear();
    //     const isProfile = await DbUtils.checkData('business_profile');

    //     if (!isProfile)
    //     {
    //         createProfile();
    //     } 
    //     else 
    //     {
    //         setProfileExists(true);
    //     }
    // }

    const createProfile = async () => 
    {
        const profileData = {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            contact_number: '',
            company_name: '',
            location: [{address_one: '', address_two: '', city: '', province: '', zip: ''}],
            business_bio: '', 
            isLocal: true,
            sm_x: '',   
            sm_inst: '',   
            sm_fb: '',   
            sm_linkedin: '',   
            sm_www: '',
			shoppingData: [],
			travelData: [],
			healthData: [],
			entertainmentData: [],
			educationData: [],
			propertyData: [],
			servicesData: [],
			communityData: [],
			displayIamge: '',
			bannerImage: ''
        }
        let stringified = JSON.stringify(profileData);
        await DbUtils.setItem('business_profile', stringified);

		setIsLoading(false);
		setProfileExists(true);
    }

    const getProfile = async () => 
    {
        const profile = await DbUtils.getItem('business_profile')
        .then((profile) => 
        {
            setEmail(JSON.parse(profile).email);
            setFirstName(JSON.parse(profile).first_name);
            setLastName(JSON.parse(profile).last_name);
            setPassword(JSON.parse(profile).password);

            setIsLoading(false);
        });
    }

    const updProfile = async (key, newValue) => 
    {
        const profileDataString = await DbUtils.getItem('business_profile');
        const profileData = JSON.parse(profileDataString);
      
        profileData[key] = newValue;
        // console.log('key: ', key, ' newValue: ', newValue, ' profileData: ', profileData);
      
        await DbUtils.setItem('business_profile', JSON.stringify(profileData));
    };

    useEffect(() => 
    {
        // chkProfile();
		createProfile();
    }, []);

    useEffect(() => 
    {
        if (profileExists)
        {
            getProfile();
        }
    }, [profileExists === true]);

    const handleNext = async () => 
    {
        await updProfile('email', email);
        await updProfile('first_name', firstName);
        await updProfile('last_name', lastName);
        await updProfile('password', password);

        props.navigation.navigate('SignupBusinessStepTwo');
    }

    const handleLogin = () => 
    {
        props.navigation.navigate('LoginBusiness');
    }

    if (isLoading) 
    {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Create your Account" alignment="start" navigation={props.navigation} />
            {/* <DividerTop /> */}
            <ScrollView>
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
					<InputPassword label="Password" value={password} setValue={setPassword} placeholder="Enter Password" />
                    <View style={{ marginTop: 15 }} />
					<InputPassword label="Confirm Password" placeholder=" Confirm Password" />
                    <View style={{ marginTop: 25 }} />
                    <ButtonPrimary name="Next" width="100%" onpress={handleNext}/>
                    <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 15 }} >
                        <TextTwo title="Already have an account? " textalign="center" />
                        <TouchableOpacity onPress={handleLogin}>
                            <TextTwo title="Login" textalign="center" fontweight="bold" underline="underline" width="100%" />
                        </TouchableOpacity>
                    </Layout>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default StepOne;