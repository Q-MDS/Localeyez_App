import React, { useState, useEffect, useReducer } from 'react';
import DbUtils from '../../../services/DbUtils';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavArrowTitle } from '../../../components/TopNavArrowTitle';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { InputLabelEmail } from '../../../components/InputLabelEmail';
import { InputLabel } from '../../../components/InputLabel';
import { InputLabelPassword } from '../../../components/InputLabelPassword';
import TextTwo from '../../../components/TextTwo';
import { SafeAreaView, ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Layout, Avatar, Select, SelectItem, IndexPath, Icon } from '@ui-kitten/components';
import { InputLabelNumpad } from '../../../components/InputLabelNumpad';
import { Label } from '../../../components/Label';
import { InputPhoneNumber } from '../../../components/InputPhoneNumber';
import DropdownSingle from '../../../components/DropdownSingle';
import { MultiSelect } from 'react-native-element-dropdown';

const initialState = {
	email: null,
	firstName: null,
	lastName: null,
	contactNumber: null,
	credOne: null,
	confirm: null,
	geoRange: '30km radius',
};

function reducer(state, action) 
{
	switch (action.type) 
	{
	  case 'SHOPPER_SIGNUP_ONE':
		return { ...state, ...action.payload };
	  default:
		throw new Error();
	}
}

const radius = [ { label: '5km radius', value: '5' }, { label: '10km radius', value: '10' }, { label: '15km radius', value: '15' }, { label: '20km radius', value: '20' }, { label: '25km radius', value: '25' }, { label: '30km radius', value: '30' }, { label: '35km radius', value: '35' }, { label: '40km radius', value: '40' }, { label: '45km radius', value: '45' }, { label: '50km radius', value: '50' }];

const StepOne = (props) => 
{
	const [state, dispatch] = useReducer(reducer, initialState);
	const [profileExists, setProfileExists] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'SHOPPER_SIGNUP_ONE',
			payload: {...state, [name]: newValue}
		});
	}

	const chkProfile = async () => 
	{
		const profile = await DbUtils.getItem('shopper_profile')
		.then((profile) => 
		{
			if (profile === null) 
			{
				createProfile();
			} 
			else 
			{
				setIsLoading(false);
				setProfileExists(true);
			}
		});
	}

    const createProfile = async () => 
    {
        const profileData = 
		{
			remote_id: 0,
            email: '',
            first_name: '',
            last_name: '',
            contact_number: '',
            cred_one: '',
            cred_two: '',
            geo_range: '',
			verified: '0',
			profile_pic: '',
        }
		let profileDataString = JSON.stringify(profileData);
		await DbUtils.setItem('shopper_profile', profileDataString);

		const profileSectors = 
		{
			fashion: [],
			home: [],
			groceries: [],
			shoppingOpt1: false,
			shoppingOpt2: false,
			shoppingOpt3: false,
			accomodation:[],
			transport: [],
			travelOpt1: false,
			sport: [],
			doctor: [],
			healthOpt1: false,
			healthOpt2: false,
			healthOpt3: false,
			eat: [],
			activities: [],
			entEvent: [],
			eduEvent: [],
			learn: [],
			employment: [],
			propertyOpt1: false,
			propertyOpt2: false,
			propertyOpt3: false,
			propertyOpt4: false,
			serHome: [],
			serSelf: [],
			serFin: [],
			serPub: [],
			servicesOpt1: false,
			community: [],
			communityOpt1: false,
			communityOpt2: false,
			communityOpt3: false,
			communityOpt4: false,
		}
        
        let profileSectorsString = JSON.stringify(profileSectors);
		await DbUtils.setItem('shopper_sectors', profileSectorsString);

		setIsLoading(false);
		setProfileExists(true);
    }

    const getProfile = async () => 
    {
        const profile = await DbUtils.getItem('shopper_profile')
        .then((profile) => 
        {
			dispatch(
			{
				type: 'SHOPPER_SIGNUP_ONE',
				payload: 
				{
					email: JSON.parse(profile).email,
					firstName: JSON.parse(profile).first_name,
					lastName: JSON.parse(profile).last_name,
					contactNumber: JSON.parse(profile).contact_number,
					credOne: JSON.parse(profile).cred_one,
					credTwo: JSON.parse(profile).cred_two,
					confirmPassword: JSON.parse(profile).password,
					geoRange: JSON.parse(profile).geo_range
				},
			});

            setIsLoading(false);
        });
    }

    const updProfile = async (key, newValue) => 
    {
        const profileDataString = await DbUtils.getItem('shopper_profile');
        const profileData = JSON.parse(profileDataString);
      
        profileData[key] = newValue;
      
        await DbUtils.setItem('shopper_profile', JSON.stringify(profileData));
    };

    useEffect(() => 
    {
        chkProfile();
		// createProfile();
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
		await updProfile('email', state.email);
        await updProfile('first_name', state.firstName);
        await updProfile('last_name', state.lastName);
        await updProfile('contact_number', state.contactNumber);
        await updProfile('cred_one', state.email);
        await updProfile('cred_two', state.credTwo);
        await updProfile('geo_range', state.geoRange);

        props.navigation.navigate('SignupUserStepTwo');
    }

    const handleLogin = () => 
    {
        props.navigation.navigate('LoginUser');
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
                    	<InputLabelEmail label="Email" name="email" value={state.email} onChange={handleInputChange} placeholder="Enter email" />
                    <View style={{ marginTop: 15 }} />
                    	<InputLabel label="First Name" name="firstName" value={state.firstName} onChange={handleInputChange} placeholder="E.g. John" />
                    <View style={{ marginTop: 15 }} />
                    	<InputLabel label="Last Name" name="lastName" value={state.lastName} onChange={handleInputChange} placeholder="E.g. Barron" />
                    <View style={{ marginTop: 15 }} />
					<Label title="Phone Number" fontweight="bold" />
						<InputPhoneNumber name="contactNumber" value={state.contactNumber} onChange={handleInputChange} placeholder="(123) 456 7890" />
                    <View style={{ marginTop: 15 }} />
                    	<InputLabelPassword placeholder="Enter password" name="credTwo" value={state.credTwo} onChange={handleInputChange} label="Password" />
                    <View style={{ marginTop: 15 }} />
                    	<InputLabelPassword placeholder="Confirm password" name="confirm" value={state.confirm} onChange={handleInputChange} label="Confirm Password" />
                    <View style={{ marginTop: 25 }} />
                    <Label title="Geo-Location Range" fontweight="bold" />
					<View style={{ flex: 1, width: '100%' }} >
						<DropdownSingle name="geoRange" data={radius} value={state.geoRange} onChange={handleInputChange} />
					</View>
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
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 25
    },
    select: {
      flex: 1,
      margin: 2,
      marginStart: 0
    },
  });

export default StepOne;