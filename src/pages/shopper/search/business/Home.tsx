import React, { useState, useEffect, useReducer} from 'react';
import DbUtils from '../../../../services/DbUtils';
import { getBusinessPromotions } from '../../../../services/api_search';
import { getBusinessEvents } from '../../../../services/api_search';
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import { Card, Divider, Icon, Layout, Tab, TabView, Text, TextElement } from '@ui-kitten/components';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import MainStyles from '../../../../assets/styles/MainStyles';
import { BotNavShopper } from '../../../../components/BotNavShopper';
import { IconText } from '../../../../components/IconText';
import IconMap from '../../../../assets/images/IconMap';
import IconShare from '../../../../assets/images/IconShare';
import TextOne from '../../../../components/TextOne';
import { TopNavBack } from '../../../../components/TopNavBack';

const initialState = {
	businessId: null,
	displayImage: null,
	profilePic: null,
	companyName: null,
	contactNumber: null,
	businessBio: null,
	addressOne: null,
	addressTwo: null,
	city: null,
	province: null,
	zipCode: null,
	xUrl: null,
	instagramUrl: null,
	facebookUrl: null,
	linkedinUrl: null,
	wwwUrl: null,
	businessHours: null,
	gpsLat: null,
	gpsLng: null,
	bookingsEnabled: null,
	bookingsMax: null,
};

interface BusinessHour 
{
	day: string;
	open: string;
	close: string;
}

function reducer(state: any, action: { type: any; payload: any; }) 
{
	switch (action.type) 
	{
	  case 'SEARCH_BUSINESS':
		return { ...state, ...action.payload };
	  default:
		throw new Error();
	}
}

const Home = (props: any) => 
{
	const [state, dispatch] = useReducer(reducer, initialState);
	const [token, setToken] = useState('');
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isReady, setIsReady] = useState(false);
	const [business, setBusiness] = useState<any>(props.route.params.business);
	const [gotPromotions, setGotPromotions] = useState(false);
	const [promotions, setPromotions] = useState<any>([]);
	const [gotEvents, setGotEvents] = useState(false);
	const [events, setEvents] = useState<any>([]);
	const [isLoading, setIsLoading] = useState(true);

	const getToken = async () => 
	{
		const getToken = await DbUtils.getItem('shopper_token');
		const parsedToken = getToken ? JSON.parse(getToken) : null;
		setToken(parsedToken);
		setIsReady(true);
		console.log('Business ID 111: ', business);
		console.log('Business ID 222: ', state.business_hours);
	}

	const fetchPromotions = async () => 
	{
		const apiData = {business_id: state.businessId};
		
		const res = await getBusinessPromotions(token, apiData);
		const status = res.status;
		
		if (status)
		{
			setPromotions(res.promotions);
			setGotPromotions(true);
		} 
		else 
		{
			setGotPromotions(false);
		}
	}

	const fetchEvents = async () => 
	{
		const apiData = {business_id: state.businessId};
		
		const res = await getBusinessEvents(token, apiData);
		const status = res.status;
		
		if (status)
		{
			setEvents(res.events);
			setGotEvents(true);
		} 
		else 
		{
			setGotEvents(false);
		}
	}

	useEffect(() => 
	{
		dispatch(
		{
			type: 'SEARCH_BUSINESS',
			payload: 
			{
				businessId: business.id,
				displayImage: business.display_image,
				profilePic: business.profile_pic,
				companyName: business.company_name,
				businessBio: business.business_bio,
				contactNumber: business.contact_number,
				addressOne: business.loc_add_one,
				addressTwo: business.loc_add_two,
				city: business.loc_city,
				province: business.loc_province,
				zipCode: business.loc_zip_code,
				xUrl: business.sm_x,
				instagramUrl: business.sm_inst,
				facebookUrl: business.sm_fb,
				linkedinUrl: business.sm_linkedin,
				wwwUrl: business.sm_www,
				businessHours: JSON.parse(business.business_hours),
				gpsLat: business.loc_latitude,
				apdLng: business.loc_longitude,
				bookingsEnabled: business.bookings_enabled,
				bookingsmax: business.bookings_max
			},
		});
		
		getToken();
			
	}, [business]);
	
	useEffect(() => 
	{
		if (isReady)
		{
			console.log('Got token, fetching promotions');
			console.log('Token is: ', token);
			fetchPromotions();
			fetchEvents();
			setIsLoading(false);
		}
	}, [isReady]);

	useEffect(() => 
	{
		if (gotPromotions)
		{
			// console.log('Got promotions', promotions);
		}

		if (gotEvents)
		{
			// console.log('Got events', events);
		}
	},[gotPromotions, gotEvents])

	const handleMakeBooking = () => 
	{
		props.navigation.navigate('MakeBooking', { business: business });
	}

	const handleViewReviews = () => 
	{
		props.navigation.navigate('SearchBusinessReviews', { business: business });
	}

	const handeleViewPromotion = (promotion: any) => 
	{
		console.log('BBBBBBBBBBBBBBBBBBBBBBBB');
		props.navigation.navigate('SearchPromotionView', { promotion: promotion });
	}

	const handlePromotionShare = (promotionId: number) => 
		{
			const url = `http://192.168.1.28/localeyez_backend/share/init/p/${promotionId}`;
			Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
		}

	const handeleViewEvent = (record: any) => 
	{
		console.log('ASDASDASDASDASDSD');
		props.navigation.navigate('SearchEventView', { event: record });
	}

	const handleEventShare = (eventId: number) => 
	{
		const url = `http://192.168.1.28/localeyez_backend/share/init/e/${eventId}`;
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
	}

	function formatDate(dateString: string | number | Date) 
	{
		if (dateString === "") return "No date set.";
		const date = new Date(dateString);
		const formattedDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
		return formattedDate;
	}

	const isOpenNow = (hours: any) => 
	{
		const now = new Date();
		const day = now.toLocaleString('en-US', { weekday: 'short' });
		const currentTime = now.toTimeString().slice(0, 5);
	  
		const todayHours = hours.find((hour: BusinessHour) => hour.day === day);
		console.log('Today hours: ', day);
		if (!todayHours || todayHours.open === 'Closed') {
		  return false;
		}
	  
		return currentTime >= todayHours.open && currentTime <= todayHours.close;
	};

	const openMap = (latitude: number, longitude: number) => 
	{
		// -26.14752740498222, 28.079103084261373
		// const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
		const url = `https://www.google.com/maps?q=${-26.14752740498222},${28.079103084261373}`;
		Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
	};

	if (isLoading) 
	{
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavBack title="Back: Search Results" alignment="start" navigation={props.navigation} pops={1} />
				<Divider style={{ height: 2, width: '100%', backgroundColor: '#00000080', marginTop: 10 }} />
				<ScrollView>
					{/* Business diaplay image */}
					<Layout style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: '#efe7fd', height: 200, width: '100%' }}>
						{state.displayImage ? <Image source={{ uri: state.displayImage }} style={{ width: '100%', height: '100%',  objectFit: 'cover' }} /> : null}
					</Layout>
					<Divider style={{ height: 2, width: '100%', backgroundColor: '#00000080' }} />
					{/* Social media icons/links :: Check ViewBusiness.jsx in shopper > notifications for new layout */}
					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingTop: 5, paddingBottom: 10, paddingEnd: 15 }} >
					{state.xUrl && 
							<TouchableOpacity onPress={() => Linking.openURL(state.xUrl)}>
								<Image source={require('../../../../assets/images/x_logo.png')} style={{ width: 30, height: 30 }} />
							</TouchableOpacity>
						}
						<View style={{ marginLeft: 8 }} />
						{state.instagramUrl && 
							<TouchableOpacity onPress={() => Linking.openURL(state.instagramUrl)}>
								<Image source={require('../../../../assets/images/insta_logo.png')} style={{ width: 28, height: 28 }} />
							</TouchableOpacity>
						}
						<View style={{ marginLeft: 10 }} />
						{state.facebookUrl && 
							<TouchableOpacity onPress={() => Linking.openURL(state.facebookUrl)}>
								<Image source={require('../../../../assets/images/fb_logo.png')} style={{ width: 32, height: 32 }} />
							</TouchableOpacity>
							}
						<View style={{ marginLeft: 10 }} />
						{state.linkedinUrl && 
							<TouchableOpacity onPress={() => Linking.openURL(state.linkedinUrl)}>
								<Image source={require('../../../../assets/images/link_logo.png')} style={{ width: 28, height: 28 }} />
							</TouchableOpacity>
						}
						<View style={{ marginLeft: 8 }} />
						{state.wwwUrl && 
							<TouchableOpacity onPress={() => Linking.openURL(state.wwwUrl)}>
								<Image source={require('../../../../assets/images/www_logo.png')} style={{ width: 30, height: 30 }} />
							</TouchableOpacity>
						}
						<View style={{ position: 'relative', height: 30, width: '100%' }}>
							<View style={{ position: 'absolute', left: 20, top: -60, borderColor: '#000', borderWidth: 0, borderRadius: 60, backgroundColor: 'transparent'}} >
								{state.profilePic 
								? <Image source={{ uri: state.profilePic }} style={{ width: 96, height: 96, borderRadius: 48, borderColor: 'black', borderWidth: 1  }} /> 
								: <Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 96, height: 96, borderRadius: 48, borderColor: 'black', borderWidth: 1 }} /> 
								}
							</View>
						</View>
					</Layout>
					{/* Business Information */}
					<Layout style={[MainStyles.column_container, {paddingTop: 10, paddingStart: 20, paddingEnd: 20, paddingBottom: 0}]}> 
						{/* Company name and business bio */}
						<Card style={{ backgroundColor: '#efeaf9', borderRadius: 10, marginBottom: 10 }}>
							<Text style={[MainStyles.title_aaa]}>{state.companyName}</Text>
							<View style={{ marginTop: 5 }} />
							<Text style={[MainStyles.title_a16, MainStyles.textItalic]}>{state.businessBio}</Text>
						</Card>
						{/* Business details: Address and contact number */}
						<Card style={{ marginBottom: 10, borderRadius: 10 }}>
							<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#612bc1', width: '100%', marginBottom: 10 }}>Business Details</Text>
							<IconText title={`${state.addressOne ? state.addressOne : '-'}\n${state.addressTwo ? state.addressTwo : '-'}\n${state.city ? state.city : '-'}\n${state.province ? state.province : '-'}\n${state.zipCode ? state.zipCode : '-'}`} iconname="compass-outline" fontsize={14} width={24} status="basic" />
							<Divider style={{ marginTop: 5, marginBottom: 5 }}/>
							<TouchableOpacity  onPress={() => openMap(state.gpsLat, state.gpsLng)} >
								<View style={{ flexDirection: 'row', alignItems: 'center' }} >
									<IconMap />
									<Text style={[ MainStyles.title_a14, { paddingStart: 6, fontWeight: 'bold', color: '#612bc1'} ]} >View Map</Text>
								</View>
							</TouchableOpacity>
							<Divider style={{ marginTop: 5, marginBottom: 5 }}/>

							<IconText title={state.contactNumber === "" ? 'No number available' : 'b'} iconname="phone-call-outline" fontsize={14} width={20} status="basic" />
							<Divider style={{ marginTop: 5, marginBottom: 5 }}/>
							<TouchableOpacity onPress={() => handleViewReviews()} >
							<IconText title="See all reviews" iconname="star-outline" fontsize={14} width={20} status="basic" />
						</TouchableOpacity>
						</Card>
						
						{/* Make a booking */}
						{state.bookingsEnabled == 1 && (
						<Card style={{ marginBottom: 10, borderRadius: 10 }}>
							<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#612bc1', width: '100%', marginBottom: 10 }}>Bookings</Text>
							<Text style={{ fontSize: 14, color: '#00000080', marginBottom: 10 }}>Tap on the button below to make a booking.</Text>
							<ButtonPrimary name="Make a booking" width="100%" onpress={handleMakeBooking} />
						</Card>
						)}

						{/* Business Hours */}
						<Card style={{ marginBottom: 10, borderRadius: 10 }}>
							<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#612bc1', width: '100%', marginBottom: 10 }}>Business Hours</Text>
							{isOpenNow(state.businessHours) ? (
								<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#612bc1', paddingStart: 10, paddingEnd: 10, borderRadius: 5, paddingTop: 5, paddingBottom: 8, marginBottom: 10, width: 120 }}>
									<Text style={{ color: 'white', fontSize: 14 }}>Open Now</Text>
								</View>
							) : (
								<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: '#0000001a', borderWidth: 1, paddingStart: 10, paddingEnd: 10, borderRadius: 5, paddingTop: 5, paddingBottom: 8, marginBottom: 10, width: 120 }}>
									<Text style={{ color: '#00000080', fontSize: 14, textAlign: 'center' }}>Closed Now</Text>
								</View>
							)}
							{state.businessHours.map(({ day, open, close }: BusinessHour) => (
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
						
				<TabView
				selectedIndex={selectedIndex}
				onSelect={index => setSelectedIndex(index)}
				>
				<Tab title='Promotions'>			
					<Layout style={[styles.tabContainer, {marginTop: 20}]}>
						{promotions && promotions.length === 0 && (
						<Layout style={{ alignItems: 'center',backgroundColor: 'white', borderRadius: 10, width: '100%', paddingTop: 30, paddingBottom: 30 }} >
							<TextOne title="No promotions listed" status="basic" />
						</Layout>
						)}
						{promotions && promotions.map((record: { id: number, display_image: any; promo_title: string; promo_caption: string; promo_desc: string, promo_price: string, sale_item_mp: string; sale_item_op: string; start_date: string, end_date: string}, index: React.Key | null | undefined) => (
							<View key={index} style={{ paddingStart: 20, paddingEnd: 20, width: '100%' }}>
								<Card key={index} style={{ width: '100%', marginBottom: 15 }}>
									<View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2', width: '100%', height: 200, borderColor: '#CCCCCC', borderWidth: 1 }} >
										{record.display_image 
										? 
										<Image source={{ uri: record.display_image }} style={{ width: '100%', height: '100%', borderRadius: 5 }} /> 
										:
										<Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 64, height: 64 }} /> 
										}
									</View>
									<Text style={[MainStyles.title_a20, {marginTop: 10, fontWeight: '700', color: '#612bc1'}]}>{record.promo_title}</Text>
									<Text style={[MainStyles.title_a16, {marginTop: 5, color: '#00000080', fontStyle: 'italic' }]}>{record.promo_caption}</Text>
									<Text style={[MainStyles.title_a14, {marginTop: 5, color: '#000' }]}>{record.promo_desc}</Text>

									<View style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%', justifyContent: 'center', marginTop: 10}} >
										<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
											<Text style={[MainStyles.title_a13, { textAlign: 'left', color: '#612bc1' }]}>Promotional Price:</Text>
											<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1 }]}>{record.promo_price}</Text>
										</View>
										<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
											<Text style={[MainStyles.title_a13, { textAlign: 'left', color: '#612bc1' }]}>Sale Off Price:</Text>
											<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1, textDecorationLine: 'line-through' }]}>{record.sale_item_op === "" ? "-" : "999"}</Text>
										</View>
										<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
											<Text style={[MainStyles.title_a13, { textAlign: 'left', color: '#612bc1' }]}>Sale Marked Down Price:</Text>
											<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1, textDecorationLine: 'line-through' }]}>{record.sale_item_op === "" ? "-" : "999"}</Text>
										</View>
										<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
											<Text style={[MainStyles.title_a13, { textAlign: 'left', color: '#612bc1' }]}>Start Date:</Text>
											<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1 }]}>{record.start_date}</Text>
										</View>
										<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
											<Text style={[MainStyles.title_a13, { textAlign: 'left', color: '#612bc1' }]}>End Date:</Text>
											<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1 }]}>{record.end_date}</Text>
										</View>
									</View>
									<TouchableOpacity onPress={() => handlePromotionShare(record.id)}>
										<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 110, borderRadius: 8, marginTop: 10, padding: 8, paddingStart: 15, paddingEnd: 15, backgroundColor: '#612bc1' }}>
											<IconShare />
											<Text style={[MainStyles.title_a13, { textAlign: 'left', color: '#FFFFFF' }]}>SHARE</Text>
										</View>
									</TouchableOpacity>
								</Card>
							</View>
						))}
					</Layout>
					</Tab>
				<Tab title='Events'>
					<Layout style={[styles.tabContainer, {marginTop: 20}]}>
						{events && events.length === 0 && (
						<Layout style={{ alignItems: 'center',backgroundColor: 'white', borderRadius: 10, width: '100%', paddingTop: 30, paddingBottom: 30 }} >
							<TextOne title="No events listed" status="basic" />
						</Layout>
						)}
						{events && events.map((record: { id: number, display_image: any; event_title: string; event_caption: string; event_desc: string, start_date: string | number | Date; start_time: string, end_date: string, end_time: string, loc_add_one: any; loc_add_two: any; loc_city: any; loc_province: string }, index: React.Key | null | undefined) => 
						(
							<View key={index} style={{ paddingStart: 20, paddingEnd: 20, width: '100%' }}>
								<Card style={{ marginBottom: 15, backgroundColor: '#ffffff' }}>
									<View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2', width: '100%', height: 200, borderColor: '#CCCCCC', borderWidth: 1 }} >
										{record.display_image 
										? 
										<Image source={{ uri: record.display_image }} style={{ width: '100%', height: '100%', borderRadius: 5 }} /> 
										:
										<Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 64, height: 64 }} /> 
										}
									</View>
									<Text style={[MainStyles.title_a20, {marginTop: 15, fontWeight: '700', color: '#612bc1'}]}>{record.event_title}</Text>
									<Text style={[MainStyles.title_a16, {marginTop: 5, color: '#00000080', fontStyle: 'italic' }]}>{record.event_caption}</Text>
									<Text style={[MainStyles.title_a14, {marginTop: 5, color: '#000' }]}>{record.event_desc}</Text>

									<Text style={[MainStyles.title_a16, {marginTop: 5, color: '#612bc1', fontWeight: 'bold' }]}>{state.companyName}</Text>

									<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
										<Text style={[MainStyles.title_a13, { textAlign: 'left', color: '#612bc1' }]}>Starts:</Text>
										<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1 }]}>{formatDate(record.start_date)} - {record.start_time}</Text>
									</View>
									<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
										<Text style={[MainStyles.title_a13, { textAlign: 'left', color: '#612bc1' }]}>Ends:</Text>
										<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1 }]}>{formatDate(record.end_date)} - {record.end_time}</Text>
									</View>
									<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
										<Text style={[MainStyles.title_a13, { textAlign: 'left', color: '#612bc1', height: '100%' }]}>Where:</Text>
										<View style={{ flexDirection: 'column', alignItems: 'flex-end', flex: 1 }}>
											<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1 }]}>{`${record.loc_add_one || '-'}`}</Text>
											<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1 }]}>{`${record.loc_add_two || '-'}`}</Text>
											<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1 }]}>{`${record.loc_city || '-'}`}</Text>
											<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1 }]}>{`${record.loc_province || '-'}`}</Text>
										</View>
									</View>
									<TouchableOpacity onPress={() => handleEventShare(record.id)}>
									<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 110, borderRadius: 8, marginTop: 10, padding: 8, paddingStart: 15, paddingEnd: 15, backgroundColor: '#612bc1' }}>
										<IconShare />
										<Text style={[MainStyles.title_a13, { textAlign: 'left', color: '#FFFFFF' }]}>SHARE</Text>
									</View>
									</TouchableOpacity>
								</Card>
							</View>
						))}
					</Layout>
				</Tab>
			</TabView>
			</ScrollView>
		<Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} />
		<BotNavShopper selected={1}/>
	</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	tabContainer: {
	  alignItems: 'center',
	  justifyContent: 'center',
	  width: '100%'
	},
});

export default Home;
