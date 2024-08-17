import React, { useState, useEffect, useReducer } from "react";
import DbUtils from "../../../../services/DbUtils";
import Toast from 'react-native-toast-message';
import { updCreds } from "../../../../services/api_helper";
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Layout, Text, Card, Divider } from "@ui-kitten/components";
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
	const [errors, setErrors] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

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

	const validateForm = () => 
	{
		let tempErrors = {};

		if (!state.oldPassword)
		{
			tempErrors = { ...tempErrors, oldPassword: 'Email is required' };
		}
		if (!state.newPassword)
		{
			tempErrors = { ...tempErrors, newPassword: 'Password is required' };
		}
		if (state.newPassword !== state.confirmPassword)
		{
			tempErrors = { ...tempErrors, confirmPassword: 'Passwords do not match' };
		}
		setErrors(tempErrors);

		if (Object.keys(tempErrors).length === 0)
		{
			handleUpdate();
		}
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavBack title="Back: Account Settings" alignment="start" navigation={props.navigation} pops={1} />
				<Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>
					{/* Page title */}
					<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginBottom: 10 }} />
					<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#612bc1', width: '100%' }}>Security: Change Password</Text>
					</View>
					<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginTop: 5 }} />
					<ScrollView style={{ width: '100%' }}>
							<Card style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 20, marginBottom: 10 }}>
								<View style={{ position: 'relative', width: '100%' }} >
									<InputLabelPassword label="Current Password" name="oldPassword" value={state.oldPassword} onChange={handleInputChange} status="basic" placeholder="Enter current password" bg={errors.oldPassword ? '#ffe6e6' : '#f2f2f2'} />
									{errors.oldPassword && <Text style={styles.error}>{errors.oldPassword}</Text>}
								</View>
							</Card>
							<Card style={{ backgroundColor: 'white', borderRadius: 10, marginBottom: 20 }}>
								<View style={{ position: 'relative', marginTop: 15, width: '100%' }} >
									<InputLabelPassword label="New Password" name="newPassword" value={state.newPassword} onChange={handleInputChange} status="basic" placeholder="Enter new password" bg={errors.newPassword ? '#ffe6e6' : '#f2f2f2'} />
									{errors.newPassword && <Text style={styles.error}>{errors.newPassword}</Text>}
								</View>
								<View style={{ position: 'relative', marginTop: 15, width: '100%' }} >
									<InputLabelPassword label="Confirm Password" name="confirmPassword" value={state.confirmPassword} onChange={handleInputChange} status="basic" placeholder="Retype password" bg={errors.confirmPassword ? '#ffe6e6' : '#f2f2f2'} />
									{errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
								</View>
							</Card>
						<ButtonPrimary name="Update Password" width="100%" onpress={validateForm} />
						<View style={{ marginTop: 15 }} />
						<ButtonSecondary name="Cancel" width="100%" onpress={handleCancel} />
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

export default Security;