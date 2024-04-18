import React, { useState, useEffect, useReducer} from "react";
import DbUtils from "../../../services/DbUtils";
import Toast from 'react-native-toast-message';
import { updShopperProfile } from "../../../services/api_helper";
import MainStyles from "../../../assets/styles/MainStyles";
import { InputLabelEmail } from "../../../components/InputLabelEmail";
import { InputLabel } from "../../../components/InputLabel";
import { InputLabelNumpad } from "../../../components/InputLabelNumpad";
import { TopNavArrowTitle } from "../../../components/TopNavArrowTitle";
import { Label } from "../../../components/Label";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Layout, Select, SelectItem, IndexPath } from "@ui-kitten/components";
import { InputPhoneNumber } from '../../../components/InputPhoneNumber';
import DropdownSingle from '../../../components/DropdownSingle';
import { ButtonPrimary } from "../../../components/ButtonPrimary";

const initialState = {
	email: null,
	firstName: null,
	lastName: null,
	contactNumber: null,
	credOne: null,
	confirm: null,
	geoRange: null,
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
	// const [profileExists, setProfileExists] = useState(false);
	// const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath('30km radius'));
	// const displayValue = radius[5];

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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Edit Profile" alignment="start" navigation={props.navigation} goBackTo="BusinessDashboard" />
            <Layout style={[MainStyles.layout_container ]}>
			<InputLabelEmail label="Email" name="email" value={state.email} onChange={handleInputChange} placeholder="Enter email" />
                <View style={{ marginTop: 15 }} />
                <InputLabel label="First Name" name="firstName" value={state.firstName} onChange={handleInputChange} placeholder="E.g. John" />
                <View style={{ marginTop: 15 }} />
                <InputLabel label="Last Name" name="lastName" value={state.lastName} onChange={handleInputChange} placeholder="E.g. Barron" />
                <View style={{ marginTop: 15 }} />
				<Label title="Contact Number" fontweight="bold" mb={5} />
                <InputPhoneNumber name="contactNumber" value={state.contactNumber} onChange={handleInputChange} placeholder="(123) 456 7890" />
                <View style={{ marginTop: 15 }} />
				<Label title="Geo-Location Range" fontweight="bold" />
				<View style={{ width: '100%', height: 70 }} >
					<DropdownSingle name="geoRange" data={radius} value={state.geoRange} onChange={handleInputChange} />
				</View>
                <Layout style={{ flexDirection: 'column', justifyContent: 'flex-end', flex: 1, width: '100%' }} >
                    <ButtonPrimary name="Submit Changes" width="100%" onpress={handleSubmit} />
                </Layout>
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
  });

export default Edit;