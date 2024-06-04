import React, { useState, useEffect, useReducer} from "react";
import DbUtils from "../../../services/DbUtils";
import Toast from 'react-native-toast-message';
import { updShopperProfile } from "../../../services/api_helper";
import MainStyles from "../../../assets/styles/MainStyles";
import { InputLabelEmail } from "../../../components/InputLabelEmail";
import { InputLabel } from "../../../components/InputLabel";
import { TopNavBack } from "../../../components/TopNavBack";
import { Label } from "../../../components/Label";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { InputPhoneNumber } from '../../../components/InputPhoneNumber';
import DropdownSingle from '../../../components/DropdownSingle';
import { ButtonPrimary } from "../../../components/ButtonPrimary";

const initialState = {
	email: null,
	firstName: null,
	lastName: null,
	contactNumber: null,
};

function reducer(state, action) 
{
	switch (action.type) 
	{
	  case 'EDIT_PROFILE':
		return { ...state, ...action.payload };
	  default:
		throw new Error();
	}
}

const radius = [ { label: '5km radius', value: '5' }, { label: '10km radius', value: '10' }, { label: '15km radius', value: '15' }, { label: '20km radius', value: '20' }, { label: '25km radius', value: '25' }, { label: '30km radius', value: '30' }, { label: '35km radius', value: '35' }, { label: '40km radius', value: '40' }, { label: '45km radius', value: '45' }, { label: '50km radius', value: '50' }];

const Edit = (props) => 
{
	const [state, dispatch] = useReducer(reducer, initialState);
	const [token, setToken] = useState('');
	const [shopperId, setShopperId] = useState(0);
	const [isReady, setIsReady] = useState(false);
	const [errors, setErrors] = useState({ email: '', firstName: '', lastName: '', contactNumber: '' });

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'EDIT_PROFILE',
			payload: {...state, [name]: newValue}
		});
	}

	const getToken = async () => 
	{
		const getToken = await DbUtils.getItem('shopper_token');

		setToken(JSON.parse(getToken));
	}

	const getShopperId = async () => 
	{
		const id = await DbUtils.getItem('shopper_id');
		
		setShopperId(JSON.parse(id));
	}

	useEffect(() => 
	{
		const fetchData = async () => 
		{
			await getToken();
			await getShopperId();
			
			setIsReady(true);
		};

		fetchData();
	}, []);

    const getProfile = async () => 
    {
        const profile = await DbUtils.getItem('shopper_profile')
        .then((profile) => 
        {
			dispatch(
			{
				type: 'EDIT_PROFILE',
				payload: 
				{
					email: JSON.parse(profile).email,
					firstName: JSON.parse(profile).first_name,
					lastName: JSON.parse(profile).last_name,
					contactNumber: JSON.parse(profile).contact_number,
					geoRange: JSON.parse(profile).geo_range
				},
			});
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
		const fetchData = async () => 
		{
			try 
			{
				getProfile();

				setIsReady(false);
			} 
			catch (error) 
			{
				Toast.show({
					type: 'error',
					position: 'bottom',
					text1: 'There was an error fetching your profile data.',
					text2: 'Please try again.',
					visibilityTime: 4000,
					autoHide: true,
					topOffset: 30,
					bottomOffset: 40,
				});
			}
		};

		if (isReady) 
		{
			fetchData();
		}
    }, [[isReady]]);

    const handleSubmit = async () => 
    {
		// Update async
		await updProfile('email', state.email);
        await updProfile('first_name', state.firstName);
        await updProfile('last_name', state.lastName);
        await updProfile('contact_number', state.contactNumber);
        await updProfile('geo_range', state.geoRange);

		// Send changes to server.
		const data = {
			shopper_id: shopperId,
			email: state.email,
			first_name: state.firstName,
			last_name: state.lastName,
			contact_number: state.contactNumber,
			geo_range: state.geoRange
		}
		const res = await updShopperProfile(token, data);
		const status = res.status;

		if (status)
		{
			Toast.show({
				type: 'success',
				position: 'bottom',
				text1: 'Success',
				text2: 'Profile has been successfully updated.',
				visibilityTime: 1000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		
			props.navigation.navigate('ShopperAccHome');
    	} 
		else 
		{
			Toast.show({
				type: 'error',
				position: 'bottom',
				text1: 'Server error',
				text2: 'There was a problen updating your profile.',
				visibilityTime: 1000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		}
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
		setErrors(tempErrors);

		if (Object.keys(tempErrors).length === 0)
		{
			handleSubmit();
		}
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavBack title={`Edit Profile`} alignment="start" navigation={props.navigation} pops={1} />
			<ScrollView style={{ flex: 1, width: '100%' }}>
				<Layout style={[MainStyles.layout_container ]}>
				
					<View style={{ position: 'relative', width: '100%' }} >
						<InputLabelEmail label="Email *" name="email" value={state.email} onChange={handleInputChange} status="basic" placeholder="Enter email" bg={errors.email ? '#ffe6e6' : '#f2f2f2'} />
						{errors.email && <Text style={styles.error}>{errors.email}</Text>}
					</View>

					<View style={{ position: 'relative', marginTop: 15, width: '100%' }} >
						<InputLabel label="First Name *" name="firstName" value={state.firstName} onChange={handleInputChange} status="basic" placeholder="Enter first name"  bg={errors.firstName ? '#ffe6e6' : '#f2f2f2'}/>
						{errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}
					</View>

					<View style={{ position: 'relative', marginTop: 15, width: '100%' }} >
						<InputLabel label="Last Name *" name="lastName" value={state.lastName} onChange={handleInputChange} status="basic" placeholder="Enter last name" bg={errors.lastName ? '#ffe6e6' : '#f2f2f2'} />
						{errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
					</View>

					<View style={{ position: 'relative', marginTop: 15, width: '100%' }} >
						<Label title="Contact Number" mb={5} status="basic" fontsize={16} />
						<InputPhoneNumber name="contactNumber" value={state.contactNumber} onChange={handleInputChange} placeholder="Enter contact number" bg={errors.contactNumber ? '#ffe6e6' : '#f2f2f2'} />
						{errors.contactNumber && <Text style={styles.error}>{errors.contactNumber}</Text>}
					</View>

					<View style={{ marginTop: 15 }} />
					<Label title="Geo-Location Range"  status="basic" fontsize={16} />
						<View style={{ width: '100%', height: 70 }} >
							<DropdownSingle name="geoRange" data={radius} value={state.geoRange} onChange={handleInputChange} />
						</View>
					<Layout style={{ width: '100%', marginTop: 40 }} >
						<ButtonPrimary name="Submit Changes" width="100%" onpress={validateForm} />
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

export default Edit;