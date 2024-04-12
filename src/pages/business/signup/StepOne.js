import React, { useState, useEffect, useReducer } from 'react';
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

const initialState = {
	email: null,
	firstName: null,
	lastName: null,
	password: null,
	confirmPassword: null,
};

function reducer(state, action) 
{
	switch (action.type) 
	{
	  case 'SET_SIGNUP_ONE':
		return { ...state, ...action.payload };
	  default:
		throw new Error();
	}
}

const StepOne = (props) => 
{
	const [state, dispatch] = useReducer(reducer, initialState);
    const [profileExists, setProfileExists] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
	const [isPasswordFocused, setIsPasswordFocused] = React.useState(false);
	const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = React.useState(false);

    function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'SET_SIGNUP_ONE',
			payload: {...state, [name]: newValue}
		});
	}

	const chkProfile = async () => 
	{
		const profile = await DbUtils.getItem('business_profile')
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
        const profileData = {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            contact_number: '',
            company_name: '',
            loc_add_one: '',
			loc_add_two: '',
			loc_city: '',
			loc_province: '',
			loc_zip_code: '',
            business_bio: '', 
            is_local: true,
            sm_x: '',   
            sm_inst: '',   
            sm_fb: '',   
            sm_linkedin: '',   
            sm_www: '',
			shopping_data: [],
			travel_data: [],
			health_data: [],
			entertainment_data: [],
			education_data: [],
			property_data: [],
			services_data: [],
			community_data: [],
			display_image: '',
			banner_image: ''
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
			dispatch(
			{
				type: 'SET_SIGNUP_ONE',
				payload: 
				{
					email: JSON.parse(profile).email,
					firstName: JSON.parse(profile).first_name,
					lastName: JSON.parse(profile).last_name,
					password: JSON.parse(profile).password,
					confirmPassword: JSON.parse(profile).password,
				},
			});


            // setEmail(JSON.parse(profile).email);
            // setFirstName(JSON.parse(profile).first_name);
            // setLastName(JSON.parse(profile).last_name);
            // setPassword(JSON.parse(profile).password);

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
        await updProfile('password', state.password);

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
                    <InputLabelEmail label="Email" name="email" value={state.email} onChange={handleInputChange} placeholder="Enter email" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="First Name" name="firstName" value={state.firstName} onChange={handleInputChange} placeholder="Enter first name" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Last Name" name="lastName" value={state.lastName} onChange={handleInputChange} placeholder="Enter last name" />
                    <View style={{ marginTop: 15 }} />
					<InputPassword 
					name="password"
					label="Password" 
					value={state.password} 
					onChange={handleInputChange}
					placeholder="Enter Password" 
					secureTextEntry={isPasswordFocused}
					isPassword={isPasswordFocused}
					onFocusPassword={() => setIsPasswordFocused(true)}
					onFocusConfirm={() =>setIsConfirmPasswordFocused(false)}
					/>
                    <View style={{ marginTop: 15 }} />
					<InputPassword 
					name="confirmPassword"
					label="Confirm Password" 
					value={state.confirmPassword}
					onChange={handleInputChange}
					placeholder=" Confirm Password" 
					secureTextEntry={isConfirmPasswordFocused}
					onFocusPassword={() => setIsPasswordFocused(false)}
					onFocusConfirm={() =>setIsConfirmPasswordFocused(true)}
					/>
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