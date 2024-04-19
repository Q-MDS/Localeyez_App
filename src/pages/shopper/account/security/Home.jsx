import React,  {useReducer}  from "react";
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../../components/TopNavArrowTitle";
import { SafeAreaView, View } from "react-native";
import { Layout } from "@ui-kitten/components";
import { InputLabelPassword } from "../../../../components/InputLabelPassword";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../../components/ButtonSecondary";

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

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'SHOPPER_SIGNUP_ONE',
			payload: {...state, [name]: newValue}
		});
	}

    const handleUpdate = () => 
    {
		// Only update the server
        props.navigation.navigate('ShopperAccHome');
    }

    const handleCancel = () => 
    {
        props.navigation.navigate('ShopperAccHome');
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Security" alignment="start" navigation={props.navigation} goBackTo="ShopperAccHome" />
                <Layout style={[MainStyles.layout_container ]}>
                    <InputLabelPassword label="Current Password" name="oldPassword" value={state.oldPassword} onChange={handleInputChange} placeholder="Type current password" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabelPassword label="New Password" name="newPassword" value={state.newPassword} onChange={handleInputChange} placeholder="********" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabelPassword label="Confirm Password" name="confirmPassword" value={state.confirmPassword} onChange={handleInputChange} placeholder="********" />
                    <Layout style={{ flexDirection: 'column', justifyContent: 'flex-end', flex: 1, width: '100%', paddingBottom: 50 }} >
                        <ButtonPrimary name="Update Password" width="100%" onpress={handleUpdate} />
                        <View style={{ marginTop: 15 }} />
                        <ButtonSecondary name="Cancel" width="100%" onpress={handleCancel} />
                    </Layout>
                </Layout>
        </SafeAreaView>
    )
}

export default Security;