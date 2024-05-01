import React from 'react';
import MainStyles from '../../../assets/styles/MainStyles';
import DbUtils from '../../../services/DbUtils';
import { approveBusiness } from '../../../services/api_admin';
import { denyBusiness } from '../../../services/api_admin';
import { TopNavBack } from '../../../components/TopNavBack';
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import { Layout, Text, Divider } from '@ui-kitten/components';
import DividerTop from '../../../components/DividerTop';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { ButtonSecondary } from '../../../components/ButtonSecondary';

const NewView = (props) => 
{
	const business = props.route.params.record;

	const handleApprove = () => 
	{
		Alert.alert(
			"Confirmation",
			"Are you sure you want to approve?",
			[
			  {
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
			  },
			  { text: "OK", onPress: () => approve() }
			]
		  );
	}

	const approve = async () => 
	{
		const token = await DbUtils.getItem('admin_token');
		const arb = JSON.parse(token);
		const apiData = { business_id: business.id };

		const res = await approveBusiness(arb, apiData);
		const status = res.status;

		if (status)
		{
			Alert.alert(
				"Success",
				"Business has been approved.",
				[
				  {
					text: "OK",
					onPress: () => props.navigation.navigate('AdminNewBusinessHome')
				  }
				]
			  );
		}
		else
		{
			Alert.alert(
				"Error",
				"An error occurred. Please try again.",
				[
				  {
					text: "OK",
					onPress: () => console.log("OK Pressed")
				  }
				]
			  );
		}
	}

	const handleDeny = () => 
	{
		Alert.alert(
			"Confirmation",
			"Are you sure you want to deny?",
			[
			  {
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
			  },
			  { text: "OK", onPress: () => deny() }
			]
		  );
	}

	const deny = async () => 
	{
		const token = await DbUtils.getItem('admin_token');
		const arb = JSON.parse(token);
		const apiData = { business_id: business.id };

		const res = await denyBusiness(arb, apiData);
		const status = res.status;

		if (status)
		{
			Alert.alert(
				"Success",
				"Business has been denied.",
				[
				  {
					text: "OK",
					onPress: () => props.navigation.navigate('AdminNewBusinessHome')
				  }
				]
			  );
		}
		else
		{
			Alert.alert(
				"Error",
				"An error occurred. Please try again.",
				[
				  {
					text: "OK",
					onPress: () => console.log("OK Pressed")
				  }
				]
			  );
		}
	}

    return (
        <SafeAreaView style={{ flex: 1 }}>
			<TopNavBack title={business.company_name} alignment="start" navigation={props.navigation} pops={1} />
            <DividerTop />
            <ScrollView>
            <Layout style={MainStyles.layout_container}>
				<Text category='s1' status="primary" style={{ fontWeight: 'bold' }}>Email</Text>
				<Text category='p1' status="primary">{business.email}</Text>
                <Divider style={{ height: 15, backgroundColor: 'transparent' }} />
				<Text category='s1' status="primary" style={{ fontWeight: 'bold' }}>First Name</Text>
				<Text category='p1' status="primary">{business.first_name}</Text>
                <Divider style={{ height: 15, backgroundColor: 'transparent' }} />
				<Text category='s1' status="primary" style={{ fontWeight: 'bold' }}>Last Name</Text>
				<Text category='p1' status="primary">{business.last_name}</Text>
                <Divider style={{ height: 15, backgroundColor: 'transparent' }} />
				<Text category='s1' status="primary" style={{ fontWeight: 'bold' }}>Company Name</Text>
				<Text category='p1' status="primary">{business.company_name}</Text>
                <Divider style={{ height: 15, backgroundColor: 'transparent' }} />
				<Text category='s1' status="primary" style={{ fontWeight: 'bold' }}>Company Phone Number</Text>
				<Text category='p1' status="primary">{business.contact_number}</Text>
                <Divider style={{ height: 15, backgroundColor: 'transparent' }} />
				<Text category='s1' status="primary" style={{ fontWeight: 'bold' }}>Location</Text>
				<Text category='p1' status="primary">{business.loc_add_one}</Text>
				<Text category='p1' status="primary">{business.loc_add_two}</Text>
				<Text category='p1' status="primary">{business.loc_city}</Text>
				<Text category='p1' status="primary">{business.loc_province}</Text>
				<Text category='p1' status="primary">{business.loc_zip_code}</Text>
				<Divider style={{ height: 15, backgroundColor: 'transparent' }} />
				<Text category='s1' status="primary" style={{ fontWeight: 'bold' }}>Business Bio</Text>
				<Text category='p1' status="primary">{business.business_bio}</Text>
				<Divider style={{ height: 15, backgroundColor: 'transparent' }} />
				<Text category='s1' status="primary" style={{ fontWeight: 'bold' }}>Small Business</Text>
				<Text category='p1' status="primary">{business.is_local}</Text>
				<Divider style={{ height: 15, backgroundColor: 'transparent' }} />
				<Text category='s1' status="primary" style={{ fontWeight: 'bold' }}>Social Media</Text>
				<Text category='p2' status="primary">X</Text>
				<Text category='p1' status="primary">{business.sm_x === '' ? "-" : business.sm_x}</Text>
				<Text category='p2' status="primary">Instagram</Text>
				<Text category='p1' status="primary">{business.sm_inst === '' ? "-" : business.sm_inst}</Text>
				<Text category='p2' status="primary">Facebook</Text>
				<Text category='p1' status="primary">{business.sm_fb === '' ? "-" : business.sm_fb}</Text>
				<Text category='p2' status="primary">Linkedin</Text>
				<Text category='p1' status="primary">{business.sm_linkedin === '' ? "-" : business.sm_linkedin}</Text>
				<Text category='p2' status="primary">Website</Text>
				<Text category='p1' status="primary">{business.sm_www === '' ? "-" : business.sm_www}</Text>
				<Divider style={{ height: 15, backgroundColor: 'transparent' }} />
				<Text category='s1' status="primary" style={{ fontWeight: 'bold' }}>Business Sectors</Text>
                {JSON.parse(business.sectors).map((sector, index) => (
					<Text key={index} category="p1" status="primary" >{sector}</Text>
				))}
				<ButtonPrimary name="Approve" width="100%" marginTop={40} onpress={handleApprove}/>
				<ButtonSecondary name="Deny" width="100%" marginTop={20} onpress={handleDeny}/>
            </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default NewView;
