import React, { useState, useEffect, useReducer } from "react";
import DbUtils from "../../../../services/DbUtils";
import { updBusinessInfo } from "../../../../services/api_helper";
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Layout, Text, Card, Divider } from "@ui-kitten/components";
import { InputLabelEmail } from "../../../../components/InputLabelEmail";
import { InputLabel } from "../../../../components/InputLabel";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";
import { InputPhoneNumber } from "../../../../components/InputPhoneNumber";
import { Label } from "../../../../components/Label";

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
	  case 'BUS_PROFILE_EDIT':
		return { ...state, ...action.payload };
	  default:
		throw new Error();
	}
}

const Edit = (props) => 
{
	const [state, dispatch] = useReducer(reducer, initialState);
	const [businessId, setBusinessId] = useState('');
	const [token, setToken] = useState('');
	const [errors, setErrors] = useState({ email: '', firstName: '', lastName: '', contactNumber: '' });

	const getProfile = async () => 
	{
		await DbUtils.getItem('business_profile')
		.then((profile) => 
		{
			const record = JSON.parse(profile);
			
			dispatch(
			{
				type: 'BUS_PROFILE_EDIT',
				payload: 
				{
					email: record.email,
					firstName: record.first_name,
					lastName: record.last_name,
					contactNumber: record.contact_number,
				},
			});
		});
	}

	const getBusniessId = async () => 
	{
		await DbUtils.getItem('business_id')
		.then((id) => 
		{
			setBusinessId(JSON.parse(id));
		});
	}

	const getToken = async () => 
	{
		const token = await DbUtils.getItem('token')
		.then((token) => 
		{
			setToken(JSON.parse(token));
		});
	}

	useEffect(() => 
	{
		const fetchProfile = async () => 
		{
			await getProfile();
			await getBusniessId();
			await getToken();
		};

		fetchProfile();
	}, []);

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'BUS_PROFILE_EDIT',
			payload: {...state, [name]: newValue}
		});
	}

	const updProfile = async (key, newValue) => 
	{
		const profileDataString = await DbUtils.getItem('business_profile');
		const profileData = JSON.parse(profileDataString);
		
		profileData[key] = newValue;
		
		await DbUtils.setItem('business_profile', JSON.stringify(profileData));
	};

    const handleSubmit = async () => 
    {
		await updProfile('email', state.email);
		await updProfile('first_name', state.firstName);
		await updProfile('last_name', state.lastName);
		await updProfile('contact_number', state.contactNumber);

		const data = 
		{
			business_id: businessId,
			email: state.email,
			first_name: state.firstName,
			last_name: state.lastName,
			contact_number: state.contactNumber,
		}

		try 
		{
			await updBusinessInfo(token, data)
			.then((res) =>
			{
				console.log('Business profile updated: ', res);
			});
		}
		catch (error)
		{
			console.log('Error updating business profile: ', error);
		}

        props.navigation.navigate('BusDashAccHome');
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
			{/* <ScrollView style={{ flex: 1, width: '100%' }}> */}
			<TopNavBack title="Back: Account Settings" alignment="start" navigation={props.navigation} pops={1} />
				<Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>
					{/* Page title */}
					<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginBottom: 10 }} />
					<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#612bc1', width: '100%' }}>Edit Profile</Text>
					</View>
					<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginTop: 5 }} />
					<ScrollView style={{ width: '100%' }}>
						<Card style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 20, marginBottom: 10 }}>
							<View style={{ position: 'relative', width: '100%' }} >
								<InputLabelEmail label="Email *" name="email" value={state.email} onChange={handleInputChange} placeholder="Enter email" status="basic" bg={errors.email ? '#ffe6e6' : '#f2f2f2'} />
								{errors.email && <Text style={styles.error}>{errors.email}</Text>}
							</View>
						</Card>
						<Card style={{ backgroundColor: 'white', borderRadius: 10, marginBottom: 10 }}>
							<View style={{ position: 'relative', width: '100%' }} >
								<InputLabel label="First Name *" name="firstName" value={state.firstName} onChange={handleInputChange} placeholder="Enter first name" status="basic" bg={errors.firstName ? '#ffe6e6' : '#f2f2f2'} />
								{errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}
							</View>
							<View style={{ position: 'relative', marginTop: 15, width: '100%' }} >
								<InputLabel label="Last Name *" name="lastName" value={state.lastName} onChange={handleInputChange} placeholder="Enter last name" status="basic" bg={errors.lastName ? '#ffe6e6' : '#f2f2f2'} />
								{errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
							</View>
						</Card>
						<Card style={{ backgroundColor: 'white', borderRadius: 10, marginBottom: 20 }}>
							<View style={{ position: 'relative', width: '100%' }} >
								<Label title="Contact Number" textalign="left" mb={5} status="basic" fontsize={14} fontweight='bold' />
								<InputPhoneNumber name="contactNumber" value={state.contactNumber} onChange={handleInputChange} status="basic" placeholder="Enter contact number" bg={errors.contactNumber ? '#ffe6e6' : '#f2f2f2'} />
								{errors.contactNumber && <Text style={styles.error}>{errors.contactNumber}</Text>}
							</View>
						</Card>
                        <ButtonPrimary name="Submit Changes" width="100%" onpress={validateForm} />
				</ScrollView>
			</Layout>
        </SafeAreaView>
    )
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

export default Edit;