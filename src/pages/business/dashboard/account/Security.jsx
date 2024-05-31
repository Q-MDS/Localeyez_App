import React, { useState, useEffect, useReducer } from "react";
import DbUtils from "../../../../services/DbUtils";
import Toast from 'react-native-toast-message';
import { updCreds } from "../../../../services/api_helper";
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Layout } from "@ui-kitten/components";
import { InputLabelPassword } from "../../../../components/InputLabelPassword";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../../components/ButtonSecondary";
import { ButtonText } from "../../../../components/ButtonText";

const initialState = {
	oldPassword: null,
	newPassword: null,
	confirmPassword: null,
}

function reducer(state, action)
{
	switch (action.type)
	{
		case "CHANGE_PASSWORD":
			return { ...state, ...action.payload };
		default:
			throw new Error();
	}
}

const Security = (props) => 
{
	const [state, dispatch] = useReducer(reducer, initialState);

	const [token, setToken] = useState('');
	const [businessId, setBusinessId] = useState(0);
	const [ready, setReady] = useState(false);

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'CHANGE_PASSWORD',
			payload: {...state, [name]: newValue}
		});
	}

	const getToken = async () => 
	{
		const getToken = await DbUtils.getItem('shopper_token');

		setToken(JSON.parse(getToken));
	}

	const getBusinessId = async () => 
	{
		const id = await DbUtils.getItem('business_id');
		
		setBusinessId(JSON.parse(id));
	}

	useEffect(() => 
	{
		const fetchData = async () => 
		{
			await getToken();
			await getBusinessId();
			
			setReady(true);
		};

		fetchData();
	}, []);

    const handleUpdate = async () => 
    {
		// Only update the server
		// TODO....
		if (ready)
		{
			const apiRecord = [
				{user_id: businessId},
				{cred_type: 0},
				{data: state.newPassword}
			];
			const res = await updCreds(token, apiRecord);
			const status = res.status;
	
			if (status)
			{
				Toast.show({
					type: 'success',
					position: 'bottom',
					text1: 'Success',
					text2: 'Changes have been successfully updated.',
					visibilityTime: 1000,
					autoHide: true,
					topOffset: 30,
					bottomOffset: 40,
				});
			
				props.navigation.navigate('BusDashAccHome');
			} 
			else 
			{
				Toast.show({
					type: 'error',
					position: 'bottom',
					text1: 'Server error',
					text2: 'There was a problen updating your changes.',
					visibilityTime: 1000,
					autoHide: true,
					topOffset: 30,
					bottomOffset: 40,
				});
			}
		}
    }

    const handleCancel = () => 
    {
        props.navigation.navigate('BusDashAccHome');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavBack title="Security" alignment="start" navigation={props.navigation} pops={1} />
				<ScrollView style={{ flex: 1, width: '100%' }}>
					<Layout style={ [MainStyles.column_container, {backgroundColor: 'white'}] }>
						<View>
							<InputLabelPassword label="Current Password" name="oldPassword" value={state.oldPassword} onChange={handleInputChange} status="basic" placeholder="Enter current password" />
							<View style={{ marginTop: 15 }} />
							<InputLabelPassword label="New Password" name="newPassword" value={state.newPassword} onChange={handleInputChange} status="basic" placeholder="Enter new password" />
							<View style={{ marginTop: 15 }} />
							<InputLabelPassword label="Confirm Password" name="confirmPassword" value={state.confirmPassword} onChange={handleInputChange} status="basic" placeholder="Retype password" />
						</View>
						<Layout style={{ flex: 1, width: '100%', marginTop: 60 }} >
							<ButtonPrimary name="Update Password" width="100%" onpress={handleUpdate} />
							<View style={{ marginTop: 15 }} />
							<ButtonText name="Cancel" width="100%" onpress={handleCancel} />
						</Layout>
						<View style={{ flex: 1 }} />
						</Layout>
				</ScrollView>
        </SafeAreaView>
    )
}

export default Security;