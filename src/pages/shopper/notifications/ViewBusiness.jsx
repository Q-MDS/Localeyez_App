import React, { useState, useEffect } from 'react';
import { getViewBusiness } from '../../../services/api_helper';
import DbUtils from '../../../services/DbUtils';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../components/TopNavBack';
import { SafeAreaView, ScrollView, TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { Layout, Divider, Icon, Card, Tab, TabView, Text } from '@ui-kitten/components';
import { TopNavTitle } from '../../../components/TopNavTitle';
import { IconText } from '../../../components/IconText';

const ViewBusiness = (props) => 
{
	const [token, setToken] = useState('');
	const [businessId, setBusinessId] = useState(props.route.params.businessId);
	const [record, setRecord] = useState([]);
	const [isready, setIsready] = useState(false);

	const getToken = async () => 
	{
		const getToken = await DbUtils.getItem('shopper_token');

		setToken(JSON.parse(getToken));
	}
	
	const getProfile = async () => 
	{
		try
		{
			const data = {business_id: businessId};

			await getViewBusiness(token, data)
			.then((res) =>
			{
				if (res.status)
				{
					// Got business record.
					setRecord(res.data);
					setIsready(true);
				} 
				else 
				{
					// There was an error
					console.log('Ooops');
				}
			});
		}
		catch(error)
		{
			console.log('Error:', error);
		}
	}

	useEffect(() => 
	{
		const fetchProfile = async () => 
		{
			await getToken();
			await getProfile();
		};

		fetchProfile();
	}, []);

	useEffect(() => 
		{
			if (isready)
			{
				console.log('Record:', record[0].company_name);

			}
		}, [isready]);

	if (isready)
	{
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavBack title="Back" alignment="start" navigation={props.navigation} pops={1} />
				<Divider style={{ height: 2, width: '100%', backgroundColor: '#612BC1', marginTop: 10 }} />
				<ScrollView>
					<Layout style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: '#efe7fd', height: 200, width: '100%' }}>
						{record[0].display_image ? <Image source={{ uri: record[0].display_image }} style={{ width: '100%', height: '100%',  objectFit: 'cover' }} /> : null}
					</Layout>
					<Divider style={{ height: 2, width: '100%', backgroundColor: '#612BC1', marginBottom: 10 }} />
					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingTop: 5, paddingBottom: 10, paddingEnd: 15 }} >
						{record[0].sm_x && <Image source={require('../../../assets/images/x_logo.png')} style={{ width: 30, height: 30 }} />}
						<View style={{ marginLeft: 8 }} />
						{record[0].sm_inst && <Image source={require('../../../assets/images/insta_logo.png')} style={{ width: 28, height: 28 }} />}
						<View style={{ marginLeft: 10 }} />
						{record[0].sm_fb && <Image source={require('../../../assets/images/fb_logo.png')} style={{ width: 32, height: 32 }} />}
						<View style={{ marginLeft: 10 }} />
						{record[0].sm_linkedin && <Image source={require('../../../assets/images/link_logo.png')} style={{ width: 28, height: 28 }} />}
						<View style={{ marginLeft: 8 }} />
						{record[0].sm_www && <Image source={require('../../../assets/images/www_logo.png')} style={{ width: 30, height: 30 }} />}
						<View style={{ position: 'absolute', left: 0, top: -70, borderColor: '#000', borderWidth: 0, borderRadius: 60, padding:  20, backgroundColor: 'transparent' }} >
							{record[0].profile_pic 
							? <Image source={{ uri: record[0].profile_pic }} style={{ width: 96, height: 96, borderRadius: 48, borderColor: 'black', borderWidth: 1  }} /> 
							: <Image source={require('../../../assets/images/pic_holder.png')} style={{ width: 96, height: 96, borderRadius: 48, borderColor: 'black', borderWidth: 1 }} /> 
							}
						</View>
					</Layout>
				
					<Layout style={[MainStyles.column_container]}>    
						<Text style={[MainStyles.title_aaa]}>{record[0].company_name}</Text>
						<View style={{ marginTop: 5 }} />
						<Text style={[MainStyles.title_a16]}>{record[0].business_bio}</Text>
						<View style={{ marginTop: 15 }} />
						<IconText title={`${record[0].loc_add_one}\n${record[0].loc_add_two}\n${record[0].loc_city}\n${record[0].loc_province}\n${record[0].loc_zip_code}`} iconname="compass-outline" fontsize={14} width={24} status="basic" />
						<IconText title={record[0].contact_number} iconname="phone-call-outline" fontsize={14} width={20} status="basic" />
						{/* <IconText title="4.5 Rating" iconname="star-outline" fontsize={14} width={20} status="basic" /> a */}
					</Layout>
					<View style={{ padding: 15 }}>
						<Image source={require('../../../assets/images/map.png')} style={{ width: '100%' }} />
					</View>
				</ScrollView>
				<Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} />
			</SafeAreaView>
		  );
	}
	
};

export default ViewBusiness
