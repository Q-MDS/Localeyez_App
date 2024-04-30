import React, { useState, useEffect, useReducer} from 'react';
import DbUtils from '../../../../services/DbUtils';
import Toast from 'react-native-toast-message';
import { getBusinessPromotions } from '../../../../services/api_search';
import { getBusinessEvents } from '../../../../services/api_search';
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity, StyleSheet  } from 'react-native';
import { Card, Divider, Icon, Layout, Tab, TabView } from '@ui-kitten/components';
import TextTwo from '../../../../components/TextTwo';
import MainStyles from '../../../../assets/styles/MainStyles';
import { BotNavBusiness } from '../../../../components/BotNavBusiness';
import { BotNavShopper } from '../../../../components/BotNavShopper';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import CustomIcon from '../../../../components/CustomIcon';
import { IconText } from '../../../../components/IconText';
import TextOne from '../../../../components/TextOne';
import { TitleFour } from '../../../../components/TitleFour';
import { TitleOne } from '../../../../components/TitleOne';
import { TopNavTitle } from '../../../../components/TopNavTitle';
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

	const getToken = async () => 
	{
		const getToken = await DbUtils.getItem('shopper_token');
		const parsedToken = getToken ? JSON.parse(getToken) : null;
		setToken(parsedToken);
		setIsReady(true);
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
			
			Toast.show({
				type: 'success',
				position: 'bottom',
				text1: 'Success',
				text2: 'Promotions have been downloaded.',
				visibilityTime: 1000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});

		} 
		else 
		{
			setGotPromotions(false);

			Toast.show({
				type: 'error',
				position: 'bottom',
				text1: 'Server error',
				text2: 'There was a problen fetching promotions.',
				visibilityTime: 1000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
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
			
			Toast.show({
				type: 'success',
				position: 'bottom',
				text1: 'Success',
				text2: 'Events have been downloaded.',
				visibilityTime: 1000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		} 
		else 
		{
			setGotEvents(false);

			Toast.show({
				type: 'error',
				position: 'bottom',
				text1: 'Server error',
				text2: 'There was a problen fetching Events.',
				visibilityTime: 1000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
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
		props.navigation.navigate('SearchBusinessReviews', { business: business });
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
                <Divider style={{ height: 2, width: '100%', backgroundColor: '#DEDDE7', marginTop: 10 }} />

                <Layout style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 200, width: '100%' }}>
					{state.displayImage ? <Image source={{ uri: state.displayImage }} style={{ width: '100%', height: 200 }} /> : null}
                </Layout>

                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#f5f5f5', paddingTop: 10, paddingBottom: 10, paddingEnd: 15 }} >
					{state.xUrl && <CustomIcon name="twitter" style={{ width: 32, color: '#B2AEDB' }} />}
					<View style={{ marginLeft: 8 }} />
					{state.instgramUrl && <CustomIcon name="instagram" style={{ width: 32, color: '#B2AEDB' }} />}
					<View style={{ marginLeft: 10 }} />
					{state.facebookUrl && <CustomIcon name="facebook-square" style={{ width: 32, color: '#B2AEDB' }} />}
					<View style={{ marginLeft: 10 }} />
					{state.linkedinUrl && <CustomIcon name="linkedin-square" style={{ width: 32, color: '#B2AEDB' }} />}
					<View style={{ marginLeft: 8 }} />
                    {state.wwwUrl && <Icon name="globe-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />}
                    <View style={{ position: 'absolute', left: 0, top: -70, borderColor: '#000', borderWidth: 0, borderRadius: 60, padding:  20, backgroundColor: 'transparent' }} >
						{state.profilePic 
						? <Image source={{ uri: state.profilePic }} style={{ width: 96, height: 96, borderRadius: 48, borderColor: 'black', borderWidth: 1  }} /> 
						: <Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 96, height: 96, borderRadius: 48, borderColor: 'black', borderWidth: 1 }} /> 
						}
                    </View>
                    {/* <Avatar source={require('../../../../assets/images/pic_holder.png')} size="giant" style={{ position: 'absolute', left: 20, top: -40, padding: 20,  borderColor: '#000', borderWidth: 1, backgroundColor: 'red', objectFit: 'contain'  }} /> */}
                </Layout>
                <ScrollView>
                    <Layout style={[MainStyles.layout_container, {backgroundColor: '#f5f5f5', paddingStart: 15, paddingEnd: 15}]}>    
                        <TitleOne title={state.companyName} />
                        <View style={{ marginTop: 10 }} />
                        <TextTwo title={state.businessBio} />
                        <View style={{ marginTop: 15 }} />
                        <IconText title={`${state.addressOne}, ${state.addressTwo}, ${state.city}, ${state.province}, ${state.zipCode}`} iconname="compass-outline" fontsize={14} width={18} />
                        <IconText title={state.contactNumber} iconname="phone-call-outline" fontsize={14} width={18} />
						<TouchableOpacity onPress={handleViewReviews} >
                        	<IconText title="4.5 Rating - See all reviews" iconname="star-outline" fontsize={14} width={18} />
						</TouchableOpacity>
                        <Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} />
						
						<TabView
							selectedIndex={selectedIndex}
							onSelect={index => setSelectedIndex(index)}
							style={{ width: '100%' }}
						>
						<Tab title='Promotions'>			
							<Layout style={styles.tabContainer}>
								{promotions && promotions.length === 0 && (
								<Layout style={{ alignItems: 'center',backgroundColor: 'white', borderRadius: 10, width: '100%', paddingTop: 30, paddingBottom: 30 }} >
									<TextOne title="There are no promotions to display" />
								</Layout>
								)}
								{promotions && promotions.map((record: { display_image: any; promo_title: any; promo_caption: any; sector: any; sale_item_mp: any; sale_item_op: any; start_date: any; }, index: React.Key | null | undefined) => (
										// <TouchableOpacity key={index} onPress={() => handeleViewPromotion(record)} style={{ width: '100%' }}>
										<Card key={index} style={{ width: '100%', marginBottom: 15 }} >
											<TouchableOpacity key={index} onPress={() => handeleViewPromotion(record)} style={{ width: '100%' }}>
												<View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', width: '100%', height: 140 }} >
													{record.display_image 
													? 
													<Image source={{ uri: record.display_image }} style={{ width: '100%', height: '100%' }} /> 
													:
													<Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 64, height: 64 }} /> 
													}
												</View>
												<TitleFour title={record.promo_title} fontsize={16} mt={10}  />
												<TextTwo title={record.promo_caption} />
												<TextTwo title={record.sector} fontweight='bold' mt={5} mb={10} width="100%" />
												<View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between'}} >
													<IconText title={`R${record.sale_item_mp}`} iconname="pricetags-outline" fontsize={14} width={18} textAlign='left' />
													<TextTwo title={`R${record.sale_item_op}`} fontweight='normal' mt={5} mb={5} underline="line-through" fontsize={14} textalign="left" flex={1} ps={15} />
													<IconText title={formatDate(record.start_date)} iconname="clock-outline" fontsize={14} width={18} textAlign='right' />
												</View>
											</TouchableOpacity>
										</Card>
									))}
							</Layout>
						</Tab>
						<Tab title='Events'>
							<Layout style={styles.tabContainer}>
								{events && events.length === 0 && (
								<Layout style={{ alignItems: 'center',backgroundColor: 'white', borderRadius: 10, width: '100%', paddingTop: 30, paddingBottom: 30 }} >
									<TextOne title="There are no events to display" />
								</Layout>
								)}
								{events && events.map((record: { display_image: any; event_title: any; event_caption: any; sector: any; start_date: string | number | Date; loc_add_one: any; }, index: React.Key | null | undefined) => 
								(
									<Card key={index} style={{ width: '100%', marginBottom: 15 }} >
										<TouchableOpacity key={index} onPress={() => handeleViewEvent(record)} style={{ width: '100%' }}>
											<View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', width: '100%', height: 140 }} >
												{record.display_image 
												? 
												<Image source={{ uri: record.display_image }} style={{ width: '100%', height: '100%' }} /> 
												:
												<Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 64, height: 64 }} /> 
												}
											</View>
											<TitleFour title={record.event_title} fontsize={16} mt={10} />
											<TextTwo title={record.event_caption} />
											<TextTwo title={record.sector} fontweight='bold' mt={5} mb={10} width="100%" />
											<IconText title={formatDate(record.start_date)} iconname="pricetags-outline" fontsize={14} width={18} textAlign='left' />
											<IconText title={record.loc_add_one} iconname="clock-outline" fontsize={14} width={18} textAlign='right' />
										</TouchableOpacity>
									</Card>
								))}
							</Layout>
						</Tab>
					</TabView>
				</Layout>
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
