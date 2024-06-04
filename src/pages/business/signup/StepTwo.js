import React, { useState, useEffect, useReducer } from 'react';
import DbUtils from '../../../services/DbUtils'; 
import CustomIcon from '../../../components/CustomIcon';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../components/TopNavBack';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { InputLabel } from '../../../components/InputLabel';
import { InputMultiline } from '../../../components/InputMultiline';
import { Label } from '../../../components/Label';
import { SafeAreaView, ScrollView, View, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { Layout, Icon, Toggle, Text } from '@ui-kitten/components';
import { InputPhoneNumber } from '../../../components/InputPhoneNumber';
import { InputOnly } from '../../../components/InputOnly';

const initialState = {
	email: null,
	contactNumber: null,
	companyName: null,
	addressOne: null,
	addressTwo: null,
	city: null,
	province: null,
	zipCode: null,
	businessBio: null,
	xUrl: null,
	instagramUrl: null,
	facebookUrl: null,
	linkedinUrl: null,
	wwwUrl: null,
	isLocal: null,
};

function reducer(state, action) 
{
	switch (action.type) 
	{
	  case 'SET_SIGNUP_TWO':
		return { ...state, ...action.payload };
	  default:
		throw new Error();
	}
}

const StepTwo = (props) => 
{
	const [state, dispatch] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(true);
	const [errors, setErrors] = useState({ contactNumber: '', company: '', addressOne: '', addressTwo: '', city: '', province: '', businessBio: '' });

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'SET_SIGNUP_TWO',
			payload: {...state, [name]: newValue}
		});
	}

    const getProfile = async () => 
    {
        const profile = await DbUtils.getItem('business_profile')
        .then((profile) => 
        {
			dispatch(
			{
				type: 'SET_SIGNUP_TWO',
				payload: 
				{
					contactNumber: JSON.parse(profile).contact_number,
					companyName: JSON.parse(profile).company_name,
					addressOne: JSON.parse(profile).loc_add_one,
					addressTwo: JSON.parse(profile).loc_add_two,
					city: JSON.parse(profile).loc_city,
					province: JSON.parse(profile).loc_province,
					zipCode: JSON.parse(profile).loc_zip_code,
					isLocal: JSON.parse(profile).is_local,
					businessBio: JSON.parse(profile).business_bio,
					xUrl: JSON.parse(profile).sm_x,
					instagramUrl: JSON.parse(profile).sm_inst,
					facebookUrl: JSON.parse(profile).sm_fb,
					linkedinUrl: JSON.parse(profile).sm_linkedin,
					wwwUrl: JSON.parse(profile).sm_www,
				},
			});
            // setContactNumber(JSON.parse(profile).contact_number);
            // setCompanyName(JSON.parse(profile).company_name);
            // setAddressOne(JSON.parse(profile).location[0].address_one);
            // setAddressTwo(JSON.parse(profile).location[0].address_two);
            // setCity(JSON.parse(profile).location[0].city);
            // setProvince(JSON.parse(profile).location[0].province);
            // setZipCode(JSON.parse(profile).location[0].zip);
            // setBusinessBio(JSON.parse(profile).business_bio);
            // setXUrl(JSON.parse(profile).sm_x);
            // setInstagramUrl(JSON.parse(profile).sm_inst);
            // setFacebookUrl(JSON.parse(profile).sm_fb);
            // setLinkedinUrl(JSON.parse(profile).sm_linkedin);
            // setWwwUrl(JSON.parse(profile).sm_www);
            // setIsLocal(JSON.parse(profile).isLocal);

            setIsLoading(false);
        });
    }

    const updProfile = async (key, newValue) => 
    {
        const profileDataString = await DbUtils.getItem('business_profile');
        const profileData = JSON.parse(profileDataString);
      
        profileData[key] = newValue;
      
        await DbUtils.setItem('business_profile', JSON.stringify(profileData));
    };

    // const updProfileLocation = async (key, subKey, newValue) => 
    // {
    //     const profileDataString = await DbUtils.getItem('business_profile');
    //     const profileData = JSON.parse(profileDataString);

    //     profileData['location'][0][subKey] = newValue;
      
    //     await DbUtils.setItem('business_profile', JSON.stringify(profileData));
    // };

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
        await updProfile('contact_number', state.contactNumber);
        await updProfile('company_name', state.companyName);
        await updProfile('loc_add_one', state.addressOne);
        await updProfile('loc_add_two', state.addressTwo);
        await updProfile('loc_city', state.city);
        await updProfile('loc_province', state.province);
        await updProfile('loc_zip_code', state.zipCode);
        await updProfile('business_bio', state.businessBio);
        await updProfile('is_local', state.isLocal);
        await updProfile('sm_x', state.xUrl);
        await updProfile('sm_inst', state.instagramUrl);
        await updProfile('sm_fb', state.facebookUrl);
        await updProfile('sm_linkedin', state.linkedinUrl);
        await updProfile('sm_www', state.wwwUrl);
        
        props.navigation.navigate('SignupBusinessStepThree');
    }

	const validateForm = () => 
	{
		let tempErrors = {};

		if (!state.contactNumber)
		{
			tempErrors = { ...tempErrors, contactNumber: 'Required' };
		}
		if (!state.companyName)
		{
			tempErrors = { ...tempErrors, companyName: 'Company Name is required' };
		}
		if (!state.addressOne)
		{
			tempErrors = { ...tempErrors, addressOne: 'Address line 1 is required' };
		}
		if (!state.addressTwo)
		{
			tempErrors = { ...tempErrors, addressTwo: 'Address line 2 is required' };
		}
		if (!state.city)
		{
			tempErrors = { ...tempErrors, city: 'City is required' };
		}
		if (!state.province)
		{
			tempErrors = { ...tempErrors, province: 'Provinceis required' };
		}
		if (!state.businessBio)
		{
			tempErrors = { ...tempErrors, businessBio: 'Business bio is required' };
		}
		setErrors(tempErrors);

		if (Object.keys(tempErrors).length === 0)
		{
			handleNext();
		}
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavBack title="Business details" alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView style={{ flex: 1, width: '100%' }}>
                <Layout style={MainStyles.column_container}>

					<View style={{ position: 'relative' }} >
                    	<Label title="Contact Number (for business)" textalign="left" mb={5} status="basic" fontsize={16} />
						<InputPhoneNumber name="contactNumber" value={state.contactNumber} onChange={handleInputChange} status="basic" placeholder="Contact Number" bg={errors.contactNumber ? '#ffe6e6' : '#f2f2f2'} />
						{errors.contactNumber && <Text style={styles.error}>{errors.contactNumber}</Text>}
					</View>

                    <View style={{ position: 'relative', marginTop: 15 }} >
						<InputLabel label="Company" name="companyName" value={state.companyName} onChange={handleInputChange} status="basic" placeholder="Company name" bg={errors.companyName ? '#ffe6e6' : '#f2f2f2'} />
						{errors.companyName && <Text style={styles.error}>{errors.companyName}</Text>}
					</View>
					
					<View style={{ marginTop: 15 }} />
                    <InputLabel label="Location" placeholder="Address line 1" name="addressOne" value={state.addressOne} onChange={handleInputChange} status="basic" bg={errors.addressOne ? '#ffe6e6' : '#f2f2f2'} />
                    <View style={{ marginTop: 5 }} />
                    <InputOnly placeholder="Address line 2" name="addressTwo" value={state.addressTwo} onChange={handleInputChange} status="basic" bg={errors.addressTwo ? '#ffe6e6' : '#f2f2f2'} />
                    <View style={{ marginTop: 5 }} />
                    <InputOnly placeholder="City" name="city" value={state.city} onChange={handleInputChange} bg={errors.city ? '#ffe6e6' : '#f2f2f2'} />
                    <View style={{ marginTop: 5 }} />
                    <InputOnly placeholder="Province" name="province" value={state.province} onChange={handleInputChange} bg={errors.province ? '#ffe6e6' : '#f2f2f2'} />
                    <View style={{ marginTop: 5 }} />
                    <InputOnly placeholder="ZIP Code" name="zipCode" value={state.zipCode} onChange={handleInputChange} bg='#f2f2f2' />
					
                    <View style={{ position: 'relative', marginTop: 15 }} >
						<InputMultiline label="Business Bio" name="businessBio" value={state.businessBio} onChange={handleInputChange} status="basic" placeholder="Write a short description up to 120 characters about your business" bg={errors.businessBio ? '#ffe6e6' : '#f2f2f2'} />
						{errors.businessBio && <Text style={styles.error}>{errors.businessBio}</Text>}
					</View>
					
					<View style={{ marginTop: 15 }} />
                    <Label title="Are a small & local business?" textalign="left" mb={5} status="basic" fontsize={16} />
                    <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
                        <Toggle
                            checked={state.isLocal}
                            onChange={() => setIsLocal(!state.isLocal)}
                            >
                            <Text category='p2' status="basic">{state.isLocal ? 'Yes' : 'No'}</Text>
                        </Toggle>
                    </Layout>
                    <View style={{ marginTop: 15 }} />
                    <Label title="Connect Your Social Media (optional)" textalign="left" mt={15} mb={5} status="basic" fontsize={16} />
                    
					<View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginTop: 10, marginBottom: 5 }} >
						<Image source={require('../../../assets/images/x_logo.png')} style={{ width: 36, height: 36 }} />
					</View>
                    <InputOnly name="xUrl" value={state.xUrl} onChange={handleInputChange} marginTop={60} status="basic" placeholder="Write X URL here" bg='#f2f2f2' />
					
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginTop: 10, marginBottom: 5 }} >
						<Image source={require('../../../assets/images/insta_logo.png')} style={{ width: 32, height: 32 }} />
					</View>
                    <InputOnly name="instagramUrl" value={state.instagramUrl} onChange={handleInputChange} status="basic" placeholder="Write Instagram URL here" bg='#f2f2f2' />
                    
					<View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginTop: 10, marginBottom: 5 }} >
						<Image source={require('../../../assets/images/fb_logo.png')} style={{ width: 38, height: 38 }} />
					</View>
                    <InputOnly name="facebookUrl" value={state.facebookUrl} onChange={handleInputChange} status="basic" placeholder="Write Facebook URL here" bg='#f2f2f2' />

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginTop: 10, marginBottom: 5 }} >
						<Image source={require('../../../assets/images/link_logo.png')} style={{ width: 32, height: 32 }} />
					</View>
                    <InputOnly name="linkedinUrl" value={state.linkedinUrl} onChange={handleInputChange} status="basic" placeholder="Write Linkedin URL here" bg='#f2f2f2' />

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginTop: 10, marginBottom: 5 }} >
						<Image source={require('../../../assets/images/www_logo.png')} style={{ width: 32, height: 32 }} />
					</View>
                    <InputOnly name="wwwUrl" value={state.wwwUrl} onChange={handleInputChange} status="basic" placeholder="Write Website URL here" bg='#f2f2f2' />

                    <View style={{ marginTop: 25 }} />
                    <ButtonPrimary name="Next" width="100%" onpress={validateForm}/>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
	error: {
		position: 'absolute',
		top: 1,
		right: 0,
		textAlign: 'right',
        width: '100%',
        color: 'red',
        opacity: 0.5,
		fontSize: 12,
    },
});

export default StepTwo;