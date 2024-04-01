import React, { useState, useEffect } from 'react';
import DbUtils from '../../../services/DbUtils'; 
import CustomIcon from '../../../components/CustomIcon';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavArrowTitle } from '../../../components/TopNavArrowTitle';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { InputLabelNumpad } from '../../../components/InputLabelNumpad';
import { InputLabel } from '../../../components/InputLabel';
import { InputMultiline } from '../../../components/InputMultiline';
import { Label } from '../../../components/Label';
import { Checkbox } from '../../../components/Checkbox';
import { SafeAreaView, ScrollView, View, ActivityIndicator } from 'react-native';
import { Layout, Icon, Toggle, Text } from '@ui-kitten/components';
import { InputPhoneNumber } from '../../../components/InputPhoneNumber';

const StepTwo = (props) => 
{
    const [contactNumber, setContactNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [addressOne, setAddressOne] = useState('');
    const [addressTwo, setAddressTwo] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [businessBio, setBusinessBio] = useState('');
    const [xUrl, setXUrl] = useState('');
    const [instgramUrl, setInstagramUrl] = useState('');
    const [facebookUrl, setFacebookUrl] = useState('');
    const [linkedinUrl, setLinkedinUrl] = useState('');
    const [wwwUrl, setWwwUrl] = useState('');
    const [isLocal, setIsLocal] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const getProfile = async () => 
    {
        const profile = await DbUtils.getItem('business_profile')
        .then((profile) => 
        {
            setContactNumber(JSON.parse(profile).contact_number);
            setCompanyName(JSON.parse(profile).company_name);
            setAddressOne(JSON.parse(profile).location[0].address_one);
            setAddressTwo(JSON.parse(profile).location[0].address_two);
            setCity(JSON.parse(profile).location[0].city);
            setProvince(JSON.parse(profile).location[0].province);
            setZipCode(JSON.parse(profile).location[0].zip);
            setBusinessBio(JSON.parse(profile).business_bio);
            setXUrl(JSON.parse(profile).sm_x);
            setInstagramUrl(JSON.parse(profile).sm_inst);
            setFacebookUrl(JSON.parse(profile).sm_fb);
            setLinkedinUrl(JSON.parse(profile).sm_linkedin);
            setWwwUrl(JSON.parse(profile).sm_www);
            setIsLocal(JSON.parse(profile).isLocal);

            setIsLoading(false);
        });

        // console.log('profile step 2: ', profile);
    }

    const updProfile = async (key, newValue) => 
    {
        const profileDataString = await DbUtils.getItem('business_profile');
        const profileData = JSON.parse(profileDataString);
      
        profileData[key] = newValue;
        // console.log('key: ', key, ' newValue: ', newValue, ' profileData: ', profileData);
      
        await DbUtils.setItem('business_profile', JSON.stringify(profileData));
    };

    const updProfileLocation = async (key, subKey, newValue) => 
    {
        const profileDataString = await DbUtils.getItem('business_profile');
        const profileData = JSON.parse(profileDataString);

        profileData['location'][0][subKey] = newValue;
      
        await DbUtils.setItem('business_profile', JSON.stringify(profileData));
    };

    useEffect(() => 
    {
        getProfile();
    },[]);

    if (isLoading) 
    {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const handleNext = async () => 
    {
        await updProfile('contact_number', contactNumber);
        await updProfile('company_name', companyName);
        await updProfileLocation('location', 'address_one', addressOne);
        await updProfileLocation('location', 'address_two', addressTwo);
        await updProfileLocation('location', 'city', city);
        await updProfileLocation('location', 'province', province);
        await updProfileLocation('location', 'zip', zipCode);
        await updProfile('business_bio', businessBio);
        await updProfile('isLocal', isLocal);
        await updProfile('sm_x', xUrl);
        await updProfile('sm_inst', instgramUrl);
        await updProfile('sm_fb', facebookUrl);
        await updProfile('sm_linkedin', linkedinUrl);
        await updProfile('sm_www', wwwUrl);
        
        props.navigation.navigate('SignupBusinessStepThree');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Business Details" alignment="start" navigation={props.navigation} />
            {/* <DividerTop /> */}
            <ScrollView>
                <Layout style={MainStyles.layout_container}>
                    <View style={{ marginTop: 25 }} />
					<InputPhoneNumber value={contactNumber} setValue={setContactNumber} placeholder="(123) 456 7890" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Company" value={companyName} setValue={setCompanyName} placeholder="Company name" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabel placeholder="Address line 1" value={addressOne} setValue={setAddressOne} label="Location" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel placeholder="Address line 2" value={addressTwo} setValue={setAddressTwo} />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel placeholder="City" value={city} setValue={setCity} />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel placeholder="Province" value={province} setValue={setProvince} />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel placeholder="ZIP Code" value={zipCode} setValue={setZipCode} />
                    <View style={{ marginTop: 15 }} />
                    <InputMultiline placeholder="Write a short description up to 120 characters about your business" label="Business Bio" value={businessBio} setValue={setBusinessBio} />
                    <View style={{ marginTop: 15 }} />
                    <Label title="Are a small & local business?" textalign="left" fontweight="bold" mb={5} />
                    <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        {/* <Checkbox label="Yes" isChecked={!isLocal ? true : false} onChange={() => setIsLocal(true)} />
                        <Checkbox label="No" isChecked={isLocal ? true : false} onChange={() => setIsLocal(false)} /> */}
                        <Toggle
                            checked={isLocal}
                            onChange={() => setIsLocal(!isLocal)}
                            >
                            <Text category='p2'>{isLocal ? 'Yes' : 'No'}</Text>
                        </Toggle>
                    </Layout>
                    <View style={{ marginTop: 15 }} />
                    <Label title="Connect Your Social Media (optional)" textalign="left" fontweight="bold" mb={5} />
                    {/* <Icon name="twitter-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} /> */}
					<CustomIcon name="twitter" style={{ width: 32, color: '#B2AEDB' }} />
                    <InputLabel placeholder="Write X URL here" value={xUrl} setValue={setXUrl} />
                    <View style={{ marginTop: 10 }} />
					<CustomIcon name="instagram" style={{ width: 32, color: '#B2AEDB' }} />
                    <InputLabel placeholder="Write Instagram URL here" value={instgramUrl} setValue={setInstagramUrl} />
                    <View style={{ marginTop: 10 }} />
					<CustomIcon name="facebook-square" style={{ width: 32, color: '#B2AEDB' }} />
                    <InputLabel placeholder="Write Facebook URL here" value={facebookUrl} setValue={setFacebookUrl} />
                    <View style={{ marginTop: 10 }} />
					<CustomIcon name="linkedin-square" style={{ width: 32, color: '#B2AEDB' }} />
                    <InputLabel placeholder="Write Linkedin URL here" value={linkedinUrl} setValue={setLinkedinUrl} />
                    <View style={{ marginTop: 10 }} />
                    <Icon name="globe-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                    <InputLabel placeholder="Write Website URL here" value={wwwUrl} setValue={setWwwUrl} />
                    <View style={{ marginTop: 25 }} />
                    <ButtonPrimary name="Next" width="100%" onpress={handleNext}/>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default StepTwo;