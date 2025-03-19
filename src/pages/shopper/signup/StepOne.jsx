import React, { useState, useEffect, useReducer } from 'react';
import DbUtils from '../../../services/DbUtils';
import { checkUser } from '../../../services/auth';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../components/TopNavBack';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { InputLabelEmail } from '../../../components/InputLabelEmail';
import { InputLabel } from '../../../components/InputLabel';
import { InputLabelPassword } from '../../../components/InputLabelPassword';
import { SafeAreaView, ScrollView, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Layout, Avatar, Card, Divider } from '@ui-kitten/components';
import { Label } from '../../../components/Label';
import { InputPhoneNumber } from '../../../components/InputPhoneNumber';
import DropdownSingle from '../../../components/DropdownSingle';
import { Text } from '@ui-kitten/components';

const initialState = {
	email: null,
	firstName: null,
	lastName: null,
	contactNumber: null,
	credOne: null,
	credTwo: null,
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
	const [errors, setErrors] = useState({ email: '', firstName: '', lastName: '', contactNumber: '', password: '', password_confirm: '' });

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
			subscribed: 0
        }
		let profileDataString = JSON.stringify(profileData);
		await DbUtils.setItem('shopper_profile', profileDataString);
		await DbUtile.setItem('shopper_logged_in', '0');

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
			agriculture: false,
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

    const handleNext = async () => 
    {
		await checkUser(state.email)
		.then((res) => 
		{
			if (res.status)
			{
				console.log('User exists');
				Alert.alert(
					"Validation",
					"The email address you entered is already registered. Please login or use a different email address.",
					[
						{
						text: "Ok",
						onPress: () => console.log("Cancel Pressed"),
						style: "cancel"
						}
					]
				);
			}
			else 
			{
				console.log('User does not exist');
				gotoStepTwo();
			}
		});
    }

	const gotoStepTwo = async () =>
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

	const validateForm = () => 
	{
		let tempErrors = {};

		if (!state.email)
		{
			tempErrors = { ...tempErrors, email: 'Email is required' };
		}
		else if (!/\S+@\S+\.\S+/.test(state.email))
		{
			tempErrors = { ...tempErrors, email: 'Email address is not valid' };
		}
		if (!state.firstName)
		{
			tempErrors = { ...tempErrors, firstName: 'First Name is required' };
		}
		if (!state.lastName)
		{
			tempErrors = { ...tempErrors, lastName: 'Last Name is required' };
		}
		// if (!state.contactNumber)
		// {
		// 	tempErrors = { ...tempErrors, contactNumber: 'Contact number is required' };
		// }
		if (!state.credTwo)
		{
			tempErrors = { ...tempErrors, password: 'Password is required' };
		}
		if (state.credTwo !== state.confirm)
		{
			tempErrors = { ...tempErrors, password_confirm: 'Passwords do not match' };
		}
		setErrors(tempErrors);

		if (Object.keys(tempErrors).length === 0)
		{
			handleNext();
		}
	}

	const checkCredOne = async () => 
	{
		
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavBack title="Back: Login Screen" alignment="start" navigation={props.navigation} pops={1} />
				<Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>
					{/* Page title */}
					<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginBottom: 10 }} />
					<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#612bc1', width: '100%' }}>Login Information</Text>
					</View>
					<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginTop: 5 }} />
					<ScrollView style={{ width: '100%' }}>
						<Card style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 20, marginBottom: 10 }}>
							<View style={{ position: 'relative' }} >
								<InputLabelEmail label="Email *" name="email" value={state.email} onChange={handleInputChange} status="basic" placeholder="Enter email" bg={errors.email ? '#efeaf9' : '#f2f2f2'} />
								{errors.email && <Text style={styles.error}>{errors.email}</Text>}
							</View>
						</Card>
						<Card style={{ backgroundColor: 'white', borderRadius: 10, marginBottom: 10 }}>
							<View style={{ position: 'relative' }} >
								<InputLabel label="First Name *" name="firstName" value={state.firstName} onChange={handleInputChange} status="basic" placeholder="Enter first name" bg={errors.firstName ? '#efeaf9' : '#f2f2f2'} />
								{errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}
							</View>
							<View style={{ position: 'relative', marginTop: 15 }} >
								<InputLabel label="Last Name *" name="lastName" value={state.lastName} onChange={handleInputChange} status="basic" placeholder="Enter last name" bg={errors.lastName ? '#efeaf9' : '#f2f2f2'} />
								{errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
							</View>
						</Card>
						<Card style={{ backgroundColor: 'white', borderRadius: 10, marginBottom: 10 }}>
							<View style={{ position: 'relative' }} >
								<Label title="Contact Number" textalign="left" mb={5} status="basic" fontsize={14} fontweight='bold' />
								<InputPhoneNumber name="contactNumber" value={state.contactNumber} onChange={handleInputChange} placeholder="Enter contact number" bg={errors.contactNumber ? '#efeaf9' : '#f2f2f2'} />
								{errors.contactNumber && <Text style={styles.error}>{errors.contactNumber}</Text>}
							</View>
						</Card>
						<Card style={{ backgroundColor: 'white', borderRadius: 10, marginBottom: 10 }}>
							<View style={{ position: 'relative'}} >
								<InputLabelPassword placeholder="Enter password" name="credTwo" value={state.credTwo} onChange={handleInputChange} label="Password *" status="basic" bg={errors.password ? '#efeaf9' : '#f2f2f2'} />
								{errors.password && <Text style={styles.error}>{errors.password}</Text>}
							</View>
							
							<View style={{ position: 'relative', marginTop: 15 }} >
								<InputLabelPassword placeholder="Confirm password" name="confirm" value={state.confirm} onChange={handleInputChange} label="Confirm Password" status="basic" bg={errors.password_confirm ? '#efeaf9' : '#f2f2f2'} />
								{errors.password_confirm && <Text style={styles.error}>{errors.password_confirm}</Text>}
							</View>
						</Card>
						<Card style={{ backgroundColor: 'white', borderRadius: 10, marginBottom: 20 }}>
							<Label title="Geo-Location Range" textalign="left" mb={5} status="basic" fontsize={14} fontweight='bold' />
							<View style={{ flex: 1, width: '100%' }} >
								<DropdownSingle name="geoRange" data={radius} value={state.geoRange} onChange={handleInputChange} />
							</View>
						</Card>
                    	<ButtonPrimary name="Submit" width="100%" onpress={validateForm}/>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 30 }} >
						<Text style={[MainStyles.title_a14]}>Already have an account? &nbsp;</Text>
						<TouchableOpacity onPress={handleLogin} >
							<Text style={[ MainStyles.title_a14, {  fontWeight: 'bold', textDecorationLine: 'underline' }]}>Login</Text>
						</TouchableOpacity>
					</Layout>
            </ScrollView>
			</Layout>
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
	error: {
		position: 'absolute',
		top: 1,
		right: 0,
		textAlign: 'right',
        width: '100%',
        color: '#b095e0',
        opacity: 0.5,
		fontSize: 12,
    },
});

export default StepOne;