import React from 'react';
import MainStyles from '../../../assets/styles/MainStyles';
import DbUtils from '../../../services/DbUtils';
import { TopNavBack } from '../../../components/TopNavBack';
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import { Layout, Text, Divider } from '@ui-kitten/components';
import DividerTop from '../../../components/DividerTop';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { ButtonSecondary } from '../../../components/ButtonSecondary';

const AllView = (props) => 
{
	const business = props.route.params.record;

    return (
        <SafeAreaView style={{ flex: 1 }}>
			<TopNavBack title={business.company_name} alignment="start" navigation={props.navigation} pops={1} />
            <DividerTop />
            <ScrollView>
				<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingStart: 20, paddingEnd: 20, backgroundColor: '#f9f8fd', paddingTop: 10, paddingBottom: 10, borderBottomColor: '#dedde7', borderBottomWidth: 1 }}>
					<Text category='h6' status="primary" style={{ fontWeight: 'bold' }}>Status:</Text>
					{business.active === '0' && <Text category='p1' status="primary" style={{ fontWeight: 'bold' }}>Denied</Text>}
					{business.active === '1' && <Text category='p1' status="primary" style={{ fontWeight: 'bold' }}>Approved</Text>}
					{business.active === '2' && <Text category='p1' status="primary" style={{ fontWeight: 'bold' }}>New</Text>}
					{/* <Text category='p1' status="primary" style={{ fontWeight: 'bold' }}>Approved</Text> */}
				</Layout>
				<Layout style={[MainStyles.layout_container, style={alignItems: 'flex-start'}]}>
				<Text category='p2' status="basic">Email</Text>
				<Text category='p1' status="primary" style={{ width: '100%', borderBottomColor: '#d9d9d9', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 15 }}>{business.email}</Text>
                
				<Text category='p2' status="basic">First Name</Text>
				<Text category='p1' status="primary" style={{ width: '100%', borderBottomColor: '#d9d9d9', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 15 }}>{business.first_name != "" ? business.first_name : "-"}</Text>

				<Text category='p2' status="basic">Last Name</Text>
				<Text category='p1' status="primary" style={{ width: '100%', borderBottomColor: '#d9d9d9', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 15 }}>{business.last_name != "" ? business.last_name : "-"}</Text>

				<Text category='p2' status="basic">Company Name</Text>
				<Text category='p1' status="primary" style={{ width: '100%', borderBottomColor: '#d9d9d9', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 15 }}>{business.company_name != "" ? business.company_name : "-"}</Text>

				<Text category='p2' status="basic">Company Phone Number</Text>
				<Text category='p1' status="primary" style={{ width: '100%', borderBottomColor: '#d9d9d9', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 15 }}>{business.contact_number != "" ? business.contact_number : "-"}</Text>

				<Text category='p2' status="basic">Location</Text>
				<Text category='p1' status="primary"style={{ width: '100%', }}>{business.loc_add_one != "" ? business.loc_add_one : "-"}</Text>
				<Text category='p1' status="primary"style={{ width: '100%', }}>{business.loc_add_two != "" ? business.loc_add_two : "-"}</Text>
				<Text category='p1' status="primary"style={{ width: '100%', }}>{business.loc_city != "" ? business.loc_city : "-"}</Text>
				<Text category='p1' status="primary"style={{ width: '100%', }}>{business.loc_province != "" ? business.loc_province : "-"}</Text>
				<Text category='p1' status="primary"style={{ width: '100%', paddingBottom: 15, marginBottom: 15, borderBottomColor: '#d9d9d9', borderBottomWidth: 1, }}>{business.loc_zip_code != "" ? business.loc_zip_code : "-"}</Text>
				<Text category='p2' status="basic">Business Bio</Text>
				<Text category='p1' status="primary" style={{ width: '100%', borderBottomColor: '#d9d9d9', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 15 }}>{business.business_bio != "" ? business.business_bio : "-"}</Text>
				<Text category='p2' status="basic">Small Business</Text>
				<Text category='p1' status="primary" style={{ width: '100%', borderBottomColor: '#d9d9d9', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 15 }}>{business.is_local == 0 ? "No" : "Yes"}</Text>

				
				<Text category='p2' status="primary" style={{ fontWeight: 'bold', marginBottom: 10 }}>Social Media</Text>
				<Text category='p2' status="basic">X</Text>
				<Text category='p1' status="primary" style={{ width: '100%', borderBottomColor: '#d9d9d9', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 15 }}>{business.sm_x === '' ? "-" : business.sm_x}</Text>
				<Text category='p2' status="basic">Instagram</Text>
				<Text category='p1' status="primary" style={{ width: '100%', borderBottomColor: '#d9d9d9', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 15 }}>{business.sm_inst === '' ? "-" : business.sm_inst}</Text>
				<Text category='p2' status="basic">Facebook</Text>
				<Text category='p1' status="primary" style={{ width: '100%', borderBottomColor: '#d9d9d9', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 15 }}>{business.sm_fb === '' ? "-" : business.sm_fb}</Text>
				<Text category='p2' status="basic">Linkedin</Text>
				<Text category='p1' status="primary" style={{ width: '100%', borderBottomColor: '#d9d9d9', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 15 }}>{business.sm_linkedin === '' ? "-" : business.sm_linkedin}</Text>
				<Text category='p2' status="basic">Website</Text>
				<Text category='p1' status="primary" style={{ width: '100%', borderBottomColor: '#d9d9d9', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 15 }}>{business.sm_www === '' ? "-" : business.sm_www}</Text>
				
				<Text category='s1' status="primary" style={{ fontWeight: 'bold' }}>Business Sectors</Text>
                {JSON.parse(business.sectors).map((sector, index) => (
					<Text key={index} category="p1" status="primary" >{sector}</Text>
				))}
				{/* <ButtonPrimary name="Approve" width="100%" marginTop={40} onpress={handleApprove}/>
				<ButtonSecondary name="Deny" width="100%" marginTop={20} onpress={handleDeny}/> */}
            </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AllView;
