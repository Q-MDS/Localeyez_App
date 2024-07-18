import React, { useState, useEffect, useReducer} from 'react';
import DbUtils from '../../../services/DbUtils';
import { getBusinessPromotions } from '../../../services/api_search';
import { getBusinessEvents } from '../../../services/api_search';
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity, StyleSheet, Linking  } from 'react-native';
import { Card, Divider, Icon, Layout, Tab, TabView, Text, TextElement } from '@ui-kitten/components';
import MainStyles from '../../../assets/styles/MainStyles';
import { BotNavBrowse } from '../../../components/BotNavBrowse';
import { IconText } from '../../../components/IconText';
import { IconPhone } from '../../../components/IconPhone';
import TextOne from '../../../components/TextOne';
import { TopNavBack } from '../../../components/TopNavBack';

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
};

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

	// const getToken = async () => 
	// {
	// 	const getToken = await DbUtils.getItem('shopper_token');
	// 	const parsedToken = getToken ? JSON.parse(getToken) : null;
	// 	setToken(parsedToken);
	// 	setIsReady(true);
	// }

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
			},
		});

		// getToken();
			
	}, [business]);
	
	useEffect(() => 
	{
		if (isReady)
		{
			console.log('Got token, fetching promotions');
			console.log('Token is: ', token);
			fetchPromotions();
			fetchEvents();
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

	const handleViewReviews = () => 
	{
		props.navigation.navigate('BrowseBusReviews', { business: business });
	}

	const handeleViewPromotion = (promotion: any) => 
	{
		console.log('BBBBBBBBBBBBBBBBBBBBBBBB');
		props.navigation.navigate('SearchPromotionView', { promotion: promotion });
	}

	const handeleViewEvent = (record: any) => 
	{
		console.log('ASDASDASDASDASDSD');
		props.navigation.navigate('SearchEventView', { event: record });
	}

	function formatDate(dateString: string | number | Date) 
	{
		if (dateString === "") return "No date set.";
		const date = new Date(dateString);
		const formattedDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
		return formattedDate;
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavBack title={state.companyName} alignment="start" navigation={props.navigation} pops={1} />
				<Divider style={{ height: 2, width: '100%', backgroundColor: '#612BC1', marginTop: 10 }} />
				<ScrollView>
				<Layout style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: '#efe7fd', height: 200, width: '100%' }}>
					{state.displayImage ? <Image source={{ uri: state.displayImage }} style={{ width: '100%', height: '100%',  objectFit: 'cover' }} /> : null}
                </Layout>
				<Divider style={{ height: 2, width: '100%', backgroundColor: '#612BC1', marginBottom: 10 }} />
                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingTop: 5, paddingBottom: 10, paddingEnd: 15 }} >
				{state.xUrl && 
						<TouchableOpacity onPress={() => Linking.openURL(state.xUrl)}>
							<Image source={require('../../../assets/images/x_logo.png')} style={{ width: 30, height: 30 }} />
						</TouchableOpacity>
					}
					<View style={{ marginLeft: 8 }} />
					{state.instagramUrl && 
						<TouchableOpacity onPress={() => Linking.openURL(state.instagramUrl)}>
							<Image source={require('../../../assets/images/insta_logo.png')} style={{ width: 28, height: 28 }} />
						</TouchableOpacity>
					}
					<View style={{ marginLeft: 10 }} />
					{state.facebookUrl && 
						<TouchableOpacity onPress={() => Linking.openURL(state.facebookUrl)}>
							<Image source={require('../../../assets/images/fb_logo.png')} style={{ width: 32, height: 32 }} />
						</TouchableOpacity>
						}
					<View style={{ marginLeft: 10 }} />
					{state.linkedinUrl && 
						<TouchableOpacity onPress={() => Linking.openURL(state.linkedinUrl)}>
							<Image source={require('../../../assets/images/link_logo.png')} style={{ width: 28, height: 28 }} />
						</TouchableOpacity>
					}
					<View style={{ marginLeft: 8 }} />
                    {state.wwwUrl && 
						<TouchableOpacity onPress={() => Linking.openURL(state.wwwUrl)}>
							<Image source={require('../../../assets/images/www_logo.png')} style={{ width: 30, height: 30 }} />
						</TouchableOpacity>
					}
                    <View style={{ position: 'absolute', left: 0, top: -70, borderColor: '#000', borderWidth: 0, borderRadius: 60, padding:  20, backgroundColor: 'transparent' }} >
						{state.profilePic 
						? <Image source={{ uri: state.profilePic }} style={{ width: 96, height: 96, borderRadius: 48, borderColor: 'black', borderWidth: 1  }} /> 
						: <Image source={require('../../../assets/images/pic_holder.png')} style={{ width: 96, height: 96, borderRadius: 48, borderColor: 'black', borderWidth: 1 }} /> 
						}
                    </View>
                    {/* <Avatar source={require('../../../../assets/images/pic_holder.png')} size="giant" style={{ position: 'absolute', left: 20, top: -40, padding: 20,  borderColor: '#000', borderWidth: 1, backgroundColor: 'red', objectFit: 'contain'  }} /> */}
                </Layout>

				<Layout style={[MainStyles.column_container]}>    
					{/* <TitleOne title={state.companyName} status="primary" /> */}
					<Text style={[MainStyles.title_aaa]}>{state.companyName}</Text>
					<View style={{ marginTop: 5 }} />
					<Text style={[MainStyles.title_a16]}>{state.businessBio}</Text>
					{/* <TextTwo title={state.businessBio} status="basic" /> */}
					<View style={{ marginTop: 15 }} />
					<IconText title={`${state.addressOne == '' ? '-' : state.addressOne}\n${state.addressTwo == '' ? '-' : state.addressTwo}\n${state.city == '' ? '-' : state.city}\n${state.province == '' ? '-' : state.province}\n${state.zipCode == '' ? '-' : state.zipCode}`} iconname="compass-outline" fontsize={14} width={24} status="basic" />
					<IconPhone title={state.contactNumber} iconname="phone-call-outline" fontsize={14} width={20} status="basic" />
					<TouchableOpacity onPress={() => handleViewReviews()} >
						<IconText title="See all reviews" iconname="star-outline" fontsize={14} width={20} status="basic" />
					</TouchableOpacity>

					{/* <Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} /> */}
				</Layout>
						
				<TabView
					selectedIndex={selectedIndex}
					onSelect={index => setSelectedIndex(index)}
					style={{ width: '100%' }}
				>
				<Tab title='Promotions'>			
				<Layout style={styles.tabContainer}>
					{promotions && promotions.length === 0 && (
					<Layout style={{ alignItems: 'center',backgroundColor: 'white', borderRadius: 10, width: '100%', paddingTop: 30, paddingBottom: 30 }} >
						<TextOne title="No promotions listed" status="basic" />
						{/* <ButtonPrimary name="Add Promotion" marginTop={15} onpress={handleAddPromo} /> */}
					</Layout>
					)}
					{promotions && promotions.map((record: { display_image: any; promo_title: (React.ReactText | TextElement) | (React.ReactText | TextElement)[] | undefined; promo_caption: (React.ReactText | TextElement) | (React.ReactText | TextElement)[] | undefined; sale_item_mp: (React.ReactText | TextElement) | (React.ReactText | TextElement)[] | undefined; sale_item_op: (React.ReactText | TextElement) | (React.ReactText | TextElement)[] | undefined; start_date: string | number | Date; }, index: React.Key | null | undefined) => (
							<Card key={index} style={{ width: '100%', marginBottom: 15 }}>
								<View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#f2f2f2', width: '100%', height: 200 }} >
									{record.display_image 
									? 
									<Image source={{ uri: record.display_image }} style={{ width: '100%', height: '100%', borderRadius: 5 }} /> 
									:
									<Image source={require('../../../assets/images/pic_holder.png')} style={{ width: 64, height: 64 }} /> 
									}
								</View>
								<Text style={[MainStyles.title_a18, {marginTop: 10, fontWeight: '700'}]}>{record.promo_title}</Text>
								<Text style={[MainStyles.title_a14, {marginTop: 5 }]}>{record.promo_caption}</Text>
								<View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', marginTop: 10}} >
									<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
										<Icon fill='#612BC1' name="pricetags-outline" width={18} height={18} />
										<Text style={[MainStyles.title_a14, { marginStart: 5, textAlign: 'left' }]}>{record.sale_item_mp}</Text>
										<Text style={[MainStyles.title_a14, { marginStart: 10, textAlign: 'left', textDecorationLine: 'line-through' }]}>{record.sale_item_op}</Text>
									</View>
									<View style={{ flex: 1 }}>
										<IconText title={formatDate(record.start_date)} iconname="clock-outline" fontsize={14} width={18} textAlign='right' status="basic"   />
									</View>
								</View>
							</Card>
						))}
				</Layout>
				</Tab>
				<Tab title='Events'>
					<Layout style={styles.tabContainer}>
						{events && events.length === 0 && (
						<Layout style={{ alignItems: 'center',backgroundColor: 'white', borderRadius: 10, width: '100%', paddingTop: 30, paddingBottom: 30 }} >
							<TextOne title="No events listed" status="basic" />
							{/* <ButtonPrimary name="Add Event" marginTop={15} onpress={handleAddEvent} /> */}
						</Layout>
						)}
						{events && events.map((record: { display_image: any; event_title: (React.ReactText | TextElement) | (React.ReactText | TextElement)[] | undefined; event_caption: (React.ReactText | TextElement) | (React.ReactText | TextElement)[] | undefined; start_date: string | number | Date; loc_add_one: any; loc_add_two: any; loc_city: any; }, index: React.Key | null | undefined) => 
						(
							<Card key={index} style={{ width: '100%', marginBottom: 15 }}>
								<View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#f2f2f2', width: '100%', height: 200 }} >
									{record.display_image 
									? 
									<Image source={{ uri: record.display_image }} style={{ width: '100%', height: '100%', borderRadius: 5 }} /> 
									:
									<Image source={require('../../../assets/images/pic_holder.png')} style={{ width: 64, height: 64 }} /> 
									}
								</View>
								<Text style={[MainStyles.title_a18, {marginTop: 10, fontWeight: '700'}]}>{record.event_title}</Text>
								<Text style={[MainStyles.title_a14, {marginTop: 5 }]}>{record.event_caption}</Text>
								<Text style={[MainStyles.title_a14, {marginTop: 5, fontWeight: 'bold' }]}>{state.companyName}</Text>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
									<Icon fill='#612BC1' name="calendar-outline" width={18} height={18} />
									<Text style={[MainStyles.title_a14, {marginStart: 10 }]}>{formatDate(record.start_date)}</Text>
								</View>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
									<Icon fill='#612BC1' name="pin-outline" width={18} height={18} />
									{/* <Text style={[MainStyles.title_a14, {marginStart: 10 }]}>{`${record.loc_add_one}, ${record.loc_add_two}, ${record.loc_city}`}</Text> */}
									<Text style={[MainStyles.title_a14, {marginStart: 10 }]}>{`${record.loc_add_one || '-', record.loc_add_two || '-', record.loc_city || '-'}`}</Text>
								</View>
							</Card>
						))}
					</Layout>
				</Tab>
			</TabView>
			</ScrollView>
		<Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} />
		<BotNavBrowse selected={0} navigation={props.navigation}/>
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
