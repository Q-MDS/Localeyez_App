import React, { useState, useEffect, useReducer } from 'react';
import DbUtils from '../../../services/DbUtils';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../components/TopNavBack';
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
	const [isReady, setIsReady] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'SHOPPER_SIGNUP_ONE',
			payload: {...state, [name]: newValue}
		});
	}

	const clrprofile = async () => 
	{
		await DbUtils.removeItem('shopper_profile');
		await DbUtils.removeItem('shopper_sectors');
		
		setIsReady(true);
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
			fashion: [{label: "Clothing", value: false},
				{label: "Shoes", value: false},
				{label: "Accessories", value: false},
				{label: "Make-Up & Cosmetics", value: false},
				{label: "Bath & Body", value: false},
				{label: "Clothing Designers & Stylists", value: false},
				{label: "Hair Stylists & Products", value: false},
				{label: "Make-up artists", value: false},
				{label: "Skin and beauty Technicians", value: false},
				{label: "Costume Hire", value: false},],
			home: [
				{label: "Furniture", value: false},
				{label: "Fixtures and Fittings", value: false},
				{label: "Homeware and Décor", value: false}, 
				{label: "Electronics and appliances", value: false}
			],
			groceries: [
				{label: "Food & Beverage", value: false},
				{label: "Local Markets & homemade goods", value: false},
				{label: "Household goods", value: false},
			],
			shoppingOpt1: false,
			shoppingOpt2: false,
			shoppingOpt3: false,
			accomodation:[
				{label: "Hotels", value: false},
				{label: "Guest Lodges", value: false},
				{label: "BnB’s", value: false},
				{label: "Lodges", value: false},
				{label: "Villa’s and Private Homes", value: false},
				{label: "Backpackers", value: false},
				{label: "Other –eg houseboats", value: false},
			],
			transport: [
				{label: "Airlines", value: false},
				{label: "Train Services", value: false},
				{label: "Bus Services", value: false},
				{label: "Shuttle Services", value: false},
				{label: "Taxi’s", value: false},
				{label: "Car Hire", value: false},
				{label: "Chauffeur Services", value: false},
			],
			travelOpt1: false,
			sport: [
				{label: "Gyms", value: false},
				{label: "Sports Clubs", value: false},
				{label: "Spa’s", value: false},
				{label: "Outdoor activities", value: false},
			],
			doctor: [
				{label: "General Practitioners", value: false},
				{label: "Physicians", value: false},
				{label: "Physiotherapists", value: false},
				{label: "Chiropractors", value: false},
				{label: "Surgeons", value: false},
				{label: "Dental", value: false},
				{label: "Homeopathic", value: false},
				{label: "Mental Health", value: false},
				{label: "Peadiatric", value: false},
				{label: "Other Specialists", value: false},
			],
			healthOpt1: false,
			healthOpt2: false,
			healthOpt3: false,
			eat: [
				{label: "Restaurants", value: false},
				{label: "Bars", value: false},
				{label: "Clubs", value: false},
				{label: "Coffee Shops", value: false},
				{label: "Takeaways", value: false},
				{label: "Bakeries and Patisseries", value: false},
				{label: "Speciality foods", value: false},
				{label: "Catering and ready meals", value: false},
			],
			activities: [
				{label: "Movies", value: false},
				{label: "Entertainment Centres", value: false},
				{label: "Arts", value: false},
				{label: "Outdoor leisure", value: false},
				{label: "Event hire specialists", value: false},
				{label: "Venues", value: false},
				{label: "Event planners", value: false},
				{label: "Children", value: false},
			],
			entEvent: [
				{label: "Music", value: false},
				{label: "Arts", value: false},
			],
			eduEvent: [
				{label: "Preschools", value: false},
				{label: "Primary Schools", value: false},
				{label: "Secondary Schools", value: false},
				{label: "Tertiary Education", value: false},
			],
			learn: [
				{label: "Courses", value: false},
				{label: "E-learning", value: false},
			],
			employment: [
				{label: "Recruitment Agencies" , value: false },
			],
			propertyOpt1: false,
			propertyOpt2: false,
			propertyOpt3: false,
			propertyOpt4: false,
			serHome: [
				{label: "Building", value: false},
				{label: "Interiors", value: false},
				{label: "Plumbing", value: false},
				{label: "Electrical", value: false},
				{label: "Painting", value: false},
				{label: "Landscaping", value: false},
				{label: "Cleaning", value: false},
				{label: "Pest Control", value: false},
				{label: "Veterinary and Pet parlours", value: false},
				{label: "Security", value: false},
				{label: "Communications and connectivity", value: false},
			],
			serSelf: [
				{label: "Hair dressers and stylists", value: false},
				{label: "Beauty Spa’s", value: false},
			],
			serFin: [
				{label: "Banks", value: false},
				{label: "Bureau De change", value: false},
				{label: "Financial Management", value: false},
				{label: "Accountants", value: false},
				{label: "Insurance", value: false},
			],
			serPub: [
				{label: "Water", value: false},
				{label: "Electricity", value: false},
				{label: "Roads", value: false},
				{label: "Police", value: false},
				{label: "Fire department", value: false},
				{label: "Accident and Emergency", value: false},
			],
			servicesOpt1: false,
			community: [
				{label: "Children", value: false},
				{label: "Old Age Pensioners", value: false},
				{label: "Community Projects", value: false},
			],
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
		clrprofile();
        // chkProfile();
		// createProfile();
    }, []);

	useEffect(() => 
	{
		if (isReady)
		{
			createProfile();
		}
	}, [isReady]);

    // useEffect(() => 
    // {
    //     if (profileExists)
    //     {
    //         getProfile();
    //     }
    // }, [profileExists === true]);

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
			<TopNavBack title="Create your account" alignment="start" navigation={props.navigation} pops={1} />
            {/* <DividerTop /> */}
            <ScrollView>
                <Layout style={MainStyles.layout_container}>
                    <View style={{ marginTop: 25 }} />
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                        <Avatar source={require('../../../assets/images/list_icon.png')} style={{ width: 82, height: 82 }} />
                    </View>
                    <View style={{ marginTop: 35 }} />
                    	<InputLabelEmail label="Email" name="email" value={state.email} onChange={handleInputChange} status="basic" placeholder="Enter email" />
                    <View style={{ marginTop: 15 }} />
                    	<InputLabel label="First Name" name="firstName" value={state.firstName} onChange={handleInputChange} status="basic" placeholder="E.g. John" />
                    <View style={{ marginTop: 15 }} />
                    	<InputLabel label="Last Name" name="lastName" value={state.lastName} onChange={handleInputChange} status="basic" placeholder="E.g. Barron" />
                    <View style={{ marginTop: 15 }} />
					<Label title="Phone Number" status="basic" />
						<InputPhoneNumber name="contactNumber" value={state.contactNumber} onChange={handleInputChange} placeholder="(123) 456 7890" />
                    <View style={{ marginTop: 15 }} />
                    	<InputLabelPassword placeholder="Enter password" name="credTwo" value={state.credTwo} onChange={handleInputChange} label="Password" status="basic" />
                    <View style={{ marginTop: 15 }} />
                    	<InputLabelPassword placeholder="Confirm password" name="confirm" value={state.confirm} onChange={handleInputChange} label="Confirm Password" status="basic" />
                    <View style={{ marginTop: 25 }} />
                    <Label title="Geo-Location Range" status="basic" />
					<View style={{ flex: 1, width: '100%' }} >
						<DropdownSingle name="geoRange" data={radius} value={state.geoRange} onChange={handleInputChange} />
					</View>
                    <ButtonPrimary name="Next" width="100%" onpress={handleNext}/>
                    <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 15 }} >
                        <TextTwo title="Already have an account? " textalign="center" status="basic" />
                        <TouchableOpacity onPress={handleLogin}>
                            <TextTwo title="Login" textalign="center" fontweight="bold" underline="underline" width="100%" status="basic" />
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