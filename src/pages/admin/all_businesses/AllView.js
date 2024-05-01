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
				</Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AllView;
