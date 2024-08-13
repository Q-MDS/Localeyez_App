import React, { useState, useEffect } from 'react';
import { getViewBusiness } from '../../../services/api_helper';
import DbUtils from '../../../services/DbUtils';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../components/TopNavBack';
import { SafeAreaView, ScrollView, TouchableOpacity, Image, View, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import { Layout, Divider, Icon, Card, Tab, TabView, Text } from '@ui-kitten/components';
import { TopNavTitle } from '../../../components/TopNavTitle';
import { IconText } from '../../../components/IconText';
import IconMap from '../../../assets/images/IconMap';

const ViewBusiness = (props) => 
{
	const [token, setToken] = useState('');
	const [businessId, setBusinessId] = useState(props.route.params.businessId);
	const [record, setRecord] = useState([]);
	const [isready, setIsready] = useState(false);
	const [businessHours, setBusinessHours] = useState([]);

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
					const bh = res.data[0].business_hours;
					console.log('Business hours:', res.data[0].business_hours);
					setBusinessHours(JSON.parse(bh));
					setIsready(true);
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
		console.log('ASD');
		const fetchProfile = async () => 
		{
			await getToken();
			await getProfile();
		};

		fetchProfile();
	}, []);

	const isOpenNow = (hours) => 
	{
		const now = new Date();
		const day = now.toLocaleString('en-US', { weekday: 'short' });
		const currentTime = now.toTimeString().slice(0, 5);
		
		const todayHours = hours.find((hour) => hour.day === day);
		console.log('Today hours: ', day);
		if (!todayHours || todayHours.open === 'Closed') {
			return false;
		}
		
		return currentTime >= todayHours.open && currentTime <= todayHours.close;
	};

	const openMap = (latitude, longitude) => 
	{
		// -26.14752740498222, 28.079103084261373
		// const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
		const url = `https://www.google.com/maps?q=${-26.14752740498222},${28.079103084261373}`;
		Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
	};

	if (isready)
	{
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavBack title="Back: View Promotion/Event" alignment="start" navigation={props.navigation} pops={1} />
				<Divider style={{ height: 2, width: '100%', backgroundColor: '#00000080', marginTop: 10 }} />
				{record.length > 0 ? 
					(
					<ScrollView>
						{/* Business diaplay image */}
						<Layout style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: '#efe7fd', height: 200, width: '100%' }}>
							{record[0].display_image ? <Image source={{ uri: record[0].display_image }} style={{ width: '100%', height: '100%',  objectFit: 'cover' }} /> : null}
						</Layout>
						<Divider style={{ height: 2, width: '100%', backgroundColor: '#00000080' }} />
						{/* Social media icons/links */}
						<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 5, paddingBottom: 10, paddingEnd: 15, columnGap: 5, width: '100%' }} >
							
							<View style={{ position: 'relative', height: 30, flex: 1 }}>
								<View style={{ position: 'absolute', left: 20, top: -60, borderColor: '#000', borderWidth: 0, borderRadius: 60, backgroundColor: 'transparent'}} >
									{record[0].profile_pic 
									? <Image source={{ uri: record[0].profile_pic }} style={{ width: 96, height: 96, borderRadius: 48, borderColor: 'black', borderWidth: 1  }} /> 
									: <Image source={require('../../../assets/images/pic_holder.png')} style={{ width: 96, height: 96, borderRadius: 48, borderColor: 'black', borderWidth: 1 }} /> 
									}
								</View>
							</View>
							<View  style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end', columnGap: 15}}>
							{record[0].sm_x ? 
							(
								<TouchableOpacity onPress={() => Linking.openURL(record[0].sm_x)}>
									<Image source={require('../../../assets/images/x_logo.png')} style={{ width: 30, height: 30 }} />
								</TouchableOpacity>
							) : (
								<Image source={require('../../../assets/images/x_logo.png')} style={{ width: 30, height: 30, opacity: 0.1 }} />
							)
							}
							{record[0].sm_inst ? 
							(
								<TouchableOpacity onPress={() => Linking.openURL(record[0].sm_inst)}>
									<Image source={require('../../../assets/images/insta_logo.png')} style={{ width: 28, height: 28 }} />
								</TouchableOpacity>
							) : (
									<Image source={require('../../../assets/images/insta_logo.png')} style={{ width: 28, height: 28, opacity: 0.1 }} />
							)
								
							}
							{record[0].sm_fb ? 
							(
								<TouchableOpacity onPress={() => Linking.openURL(record[0].sm_fb)}>
									<Image source={require('../../../assets/images/fb_logo.png')} style={{ width: 32, height: 32 }} />
								</TouchableOpacity>
							) : (
								<Image source={require('../../../assets/images/fb_logo.png')} style={{ width: 32, height: 32, opacity: 0.1 }} />
							)
								
								}
							{record[0].sm_linkedin ? 
							(
								<TouchableOpacity onPress={() => Linking.openURL(record[0].sm_linkedin)}>
									<Image source={require('../../../assets/images/link_logo.png')} style={{ width: 28, height: 28 }} />
								</TouchableOpacity>
							) : (
								<Image source={require('../../../assets/images/link_logo.png')} style={{ width: 28, height: 28, opacity: 0.1 }} />
							)
							}
							{record[0].sm_www ?
							(
								<TouchableOpacity onPress={() => Linking.openURL(record[0].sm_www)}>
									<Image source={require('../../../assets/images/www_logo.png')} style={{ width: 30, height: 30 }} />
								</TouchableOpacity>
							) : (
								<Image source={require('../../../assets/images/www_logo.png')} style={{ width: 30, height: 30 }} />
							)
							}
							</View>
						</Layout>
						{/* Business Information */}
						<Layout style={[MainStyles.column_container, {paddingTop: 10, paddingStart: 20, paddingEnd: 20, paddingBottom: 0}]}> 
							{/* Company name and business bio */}
							<Card style={{ backgroundColor: '#efeaf9', borderRadius: 10, marginBottom: 10 }}>
								<Text style={[MainStyles.title_aaa]}>{record[0].company_name}</Text>
								<View style={{ marginTop: 5 }} />
								<Text style={[MainStyles.title_a16, MainStyles.textItalic]}>{record[0].business_bio}</Text>
							</Card>
							{/* Business details: Address and contact number */}
							<Card style={{ marginBottom: 10, borderRadius: 10 }}>
								<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#612bc1', width: '100%', marginBottom: 10 }}>Business Details</Text>
								<IconText title={`${record[0].addressOne ? record[0].addressOne : '-'}\n${record[0].addressTwo ? record[0].addressTwo : '-'}\n${record[0].city ? record[0].city : '-'}\n${record[0].province ? record[0].province : '-'}\n${record[0].zipCode ? record[0].zipCode : '-'}`} iconname="compass-outline" fontsize={14} width={24} status="basic" />
								<Divider style={{ marginTop: 5, marginBottom: 5 }}/>
								<TouchableOpacity  onPress={() => openMap(record[0].gpsLat, record[0].gpsLng)} >
									<View style={{ flexDirection: 'row', alignItems: 'center' }} >
										<IconMap />
										<Text style={ MainStyles.title_a14 } >View Map</Text>
									</View>
								</TouchableOpacity>
								<Divider style={{ marginTop: 5, marginBottom: 5 }}/>

								<IconText title={record[0].contactNumber === "" ? 'No number available' : 'b'} iconname="phone-call-outline" fontsize={14} width={20} status="basic" />
								<Divider style={{ marginTop: 5, marginBottom: 5 }}/>
							</Card>
							{/* Business Hours */}
							<Card style={{ marginBottom: 10, borderRadius: 10 }}>
							<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#612bc1', width: '100%', marginBottom: 10 }}>Business Hours</Text>
							{isOpenNow(businessHours) ? (
								<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#612bc1', paddingStart: 10, paddingEnd: 10, borderRadius: 5, paddingTop: 5, paddingBottom: 8, marginBottom: 10, width: 120 }}>
									<Text style={{ color: 'white', fontSize: 14 }}>Open Now</Text>
								</View>
							) : (
								<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: '#0000001a', borderWidth: 1, paddingStart: 10, paddingEnd: 10, borderRadius: 5, paddingTop: 5, paddingBottom: 8, marginBottom: 10, width: 120 }}>
									<Text style={{ color: '#00000080', fontSize: 14, textAlign: 'center' }}>Closed Now</Text>
								</View>
							)}
							{businessHours.map(({ day, open, close }) => (
								<View key={day}>
									<View 
										style={{ 
											flexDirection: 'row', 
											alignItems: 'center', 
											justifyContent: 'space-between', 
											columnGap: 10, 
											borderBottomColor: '#efe7fd', 
											borderBottomWidth: 1, 
											paddingTop: 5, 
											paddingBottom: 5,
											borderTopWidth: day === 'Mon' ? 1 : 0, 
											borderTopColor: day === 'Mon' ? '#efe7fd' : 'transparent', 
											}}  
											key={day}
											>
										<Text style={{ width: 35, color: 'black' }}>{day}</Text>
										<Text style={{ color: '#612bc1', fontSize: 14 }}>{open}</Text>
										<Text style={{ color: '#612bc1', fontSize: 14 }}>-</Text>
										<Text style={{ color: '#612bc1', fontSize: 14, flex: 1 }}>{close}</Text>
									</View>
								</View>
							))}
						</Card>
						</Layout>
					</ScrollView>
					)
					:
					(
						<View style={[MainStyles.column_container, { marginTop: 0, alignItems: 'left' }]}>
							<Text style={[MainStyles.title_a16]}>Record not found</Text>
						</View>
					)
				} 
				<Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} />
			</SafeAreaView>
		  );
	}
	
};

export default ViewBusiness
