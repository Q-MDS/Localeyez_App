import React, { useState, useEffect, useReducer } from "react";
import DbUtils from "../../../../services/DbUtils";
import { updBusinessInfo } from "../../../../services/api_helper";
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Layout } from "@ui-kitten/components";
import { InputLabelEmail } from "../../../../components/InputLabelEmail";
import { InputLabel } from "../../../../components/InputLabel";
import { InputLabelNumpad } from "../../../../components/InputLabelNumpad";
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<ScrollView>
			<TopNavBack title="Edit profile" alignment="start" navigation={props.navigation} pops={1} />
                <Layout style={[MainStyles.layout_container ]}>
					<InputLabelEmail label="Email" name="email" value={state.email} onChange={handleInputChange} placeholder="Enter email" status="basic" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="First Name" name="firstName" value={state.firstName} onChange={handleInputChange} placeholder="Enter first name" status="basic" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Last Name" name="lastName" value={state.lastName} onChange={handleInputChange} placeholder="Enter last name" status="basic" />
                    <View style={{ marginTop: 15 }} />
					<Label title="Contact Number" textalign="left" mb={5} status="basic" fontsize={14} />
					<InputPhoneNumber name="contactNumber" value={state.contactNumber} onChange={handleInputChange} status="basic" placeholder="+2782 111 2222" />

                    <Layout style={{ flex: 1, width: '100%', marginTop: 25 }} >
                        <ButtonPrimary name="Submit Changes" width="100%" onpress={handleSubmit} />
                    </Layout>
                </Layout>
			</ScrollView>
        </SafeAreaView>
    )
}

export default Edit;