import React, { useEffect, useState } from "react";
import DbUtils from "../../../services/DbUtils";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../components/TopNavArrowTitle";
import { SafeAreaView } from "react-native";
import { Layout, Avatar, Text } from "@ui-kitten/components";

const Verified = (props) => 
{
	const [email, setEmail] = useState('');	
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [profilePic, setProfilePic] = useState('');

	const getProfile = async () => 
    {
        const profile = await DbUtils.getItem('shopper_profile')
        .then((profile) => 
        {
			setEmail(JSON.parse(profile).email);
			setFirstName(JSON.parse(profile).first_name);
			setLastName(JSON.parse(profile).last_name);
			setProfilePic(JSON.parse(profile).profile_pic);
        });
    }

	useEffect(() => 
	{
		getProfile();
	}, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Verified Member" alignment="start" navigation={props.navigation} goBackTo="ShopperAccHome" />
            <Layout style={[MainStyles.layout_container, { justifyContent: 'center', alignItems: 'center' } ]}>
                <Layout style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop:40, paddingBottom: 30 }}>
					{profilePic == '' || profilePic == null ? (
						<Avatar source={require('../../../assets/images/list_icon.png')} style={{ width: 128, height: 128 }} />
					) : (
						<Avatar source={{ uri: profilePic }} style={{ width: 160, height: 160 }} />
					)}
                    <Text category="h6" status="primary" style={{ fontWeight: 'bold', marginTop: 15 }}>{`${firstName} ${lastName}`}</Text>
                    <Text category="p1" status="primary">{email}</Text>
                    <Text category="p2" status="primary" style={{ marginTop: 50 }}>Show this to businesses offering discounts</Text>
                </Layout>
            </Layout>
        </SafeAreaView>
    );
};

export default Verified;