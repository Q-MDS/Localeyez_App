import React, { useState, useEffect } from 'react';
import DbUtils from '../../../services/DbUtils';
import Toast from 'react-native-toast-message';
import MainStyles from '../../../assets/styles/MainStyles';
import { searchByCategory } from '../../../services/api_search';
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Layout, Tab, TabView, Text } from '@ui-kitten/components';
import { TopNavBack } from '../../../components/TopNavBack';
import { BotNavShopper } from '../../../components/BotNavShopper';
import TextTwo from '../../../components/TextTwo';

const SearchCategory = (props:any) => 
{
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [token, setToken] = useState('');
	const [shopperId, setShopperId] = useState('');
	const [isReady, setIsReady] = useState(false);
	const [searchSector, setSearchSector] = useState('');
	const [searchType, setSearchType] = useState('');
	const [category, setCategory] = useState('');
	const [categoryItem, setCategoryItem] = useState('');
	const [businesses, setBusinesses] = useState<any>([]);
	const [numBusinesses, setNumBusinesses] = useState(0);
	const [promotions, setPromotions] = useState<any>([]);
	const [numPromotions, setNumPromotions] = useState(0);
	const [events, setEvents] = useState<any>([]);
	const [numEvents, setNumEvents] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	const getToken = async () => 
	{
		const getToken = await DbUtils.getItem('shopper_token');
		const parsedToken = getToken ? JSON.parse(getToken) : null;
		setToken(parsedToken);
	}

	const getShopperId = async () => 
	{
		const id = await DbUtils.getItem('shopper_id');
		const parsedId = id ? JSON.parse(id) : null;
		
		setShopperId(parsedId);
	}
	useEffect(() => 
	{
		setSearchSector(props.route.params.searchSector);
		setSearchType(props.route.params.searchType);
		setCategory(props.route.params.category);
		setCategoryItem(props.route.params.categoryItem);
		
		const getParams = async () =>
		{
			await getToken();
			await getShopperId();
			setIsReady(true);
		}

		getParams();
	}, []);

	const fetchSearchResults = async () => 
	{
		setIsLoading(true);
		console.log('Fetching search results: ', searchSector, " > ",  searchType, " >> ", category, " >>> ", categoryItem);
		const apiData = {shopper_id: shopperId, search_sector: searchSector, search_type: searchType, category: category, category_item: categoryItem};
		
		const res = await searchByCategory(token, apiData);
		const status = res.status;
		console.log('Results: ', res);
		if (status)
		{
			// setAverageRating(res.data.average_rating);
			// setReviews(res.data.reviews);
			setBusinesses(res.businesses);
			setNumBusinesses(res.businesses.length);
			setPromotions(res.promotions);
			setNumPromotions(res.promotions.length);
			setEvents(res.events);
			setNumEvents(res.events.length);
			
			Toast.show({
				type: 'success',
				position: 'bottom',
				text1: 'Success',
				text2: 'Travel search reults have been downloaded.',
				visibilityTime: 1000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		} 
		else 
		{
			// setGotReviews(false);
			setBusinesses(res.businesses);
			setNumBusinesses(res.businesses.length);
			setPromotions(res.promotions);
			setNumPromotions(res.promotions.length);
			setEvents(res.events);
			setNumEvents(res.events.length);

			Toast.show({
				type: 'error',
				position: 'bottom',
				text1: 'Server error',
				text2: 'There was a problen fetching reviews.',
				visibilityTime: 1000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		}

		setIsLoading(false);
	}

	useEffect(() => 
	{
		if (isReady)
		{
			fetchSearchResults();
		}
	}, [isReady]);

	const handeleViewBusiness = (business: { profile_pic: any; company_name: any; business_bio: any; }) => 
		{
			props.navigation.navigate('SearchBusinessView', { business: business });
	}
	
	const handeleViewPromotion = (promotion: any) => 
	{
		props.navigation.navigate('SearchPromotionView', { promotion: promotion });
	}

	const handeleViewEvent = (event: any) => 
	{
		props.navigation.navigate('SearchEventView', { event: event });
	}

	if (isLoading) 
	{
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
		<TopNavBack title={`Back to ${props.route.params.searchSector}`} alignment="start" navigation={props.navigation} pops={1} />
			<TabView selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)} style={{ flex: 1, width: '100%', marginTop: 20 }} >
					<Tab title={`Businesses [${numBusinesses}]`}>
						<View style={{ flexDirection: 'column', width: '100%', flexGrow: 1, paddingTop: 15, paddingBottom: 15, backgroundColor: '#f5f5f5' }} >
							<ScrollView>
								<Text style={[MainStyles.title_a20, { paddingStart: 15, paddingBottom: 15, borderBottomColor: '#DEDDE7', borderBottomWidth: 1 }]}>Business List</Text>
								{businesses.length === 0 ? (
								<Text style={[MainStyles.title_a16, { paddingTop: 20, paddingStart: 20 }]}>No results found</Text>
								) : (
								businesses.map((business: { profile_pic: any; company_name: any; business_bio: any; }, index: number) => (
									<TouchableOpacity key={index} onPress={() => handeleViewBusiness(business)} style={{ width: '100%' }}>
										<View style={[styles.listContainer, { backgroundColor: index % 2 === 0 ? '#f9f8fd' : 'white' }]}>
											<View style={styles.listIcon}>
												<Image source={{ uri: business.profile_pic }} style={{ width: 62, height: 62, borderRadius: 32 }} />
											</View>
											<View style={styles.listContent}>
												<Text style={[MainStyles.title_a18, { textAlign: 'left' }]}>{business.company_name} </Text>
												<Text style={[MainStyles.title_a14, { textAlign: 'left' }]}>{business.business_bio} </Text>
											</View>
										</View>
									</TouchableOpacity>
								))
							)}
							</ScrollView>
						</View>
					</Tab>
					<Tab title={`Promotions [${numPromotions}]`}>
					<View style={{ flexDirection: 'column', width: '100%', flexGrow: 1, padding: 15, backgroundColor: '#f5f5f5' }} >
					<Text style={[MainStyles.title_a20, { paddingStart: 15, paddingBottom: 15, borderBottomColor: '#DEDDE7', borderBottomWidth: 1 }]}>Promotion List</Text>
							{promotions.length === 0 ? (
							<Text category='p1' status="primary" style={{ paddingTop: 20, paddingStart: 20 }}>No results found</Text>
							) : (
							promotions.map((promotion: { display_image: any; promo_title: any; promo_desc: any; }, index: number) => (
								<TouchableOpacity key={index} onPress={() => handeleViewPromotion(promotion)} style={{ width: '100%' }}>
									<View key={index} style={[styles.listContainer, { backgroundColor: index % 2 === 0 ? '#f9f8fd' : 'white' }]}>
										<View style={styles.listIcon}>
											{/* <Image source={require('../../../assets/images/pic_holder.png')} style={{ width: 62, height: 62, borderRadius: 32 }} /> */}
											<Image source={{ uri: promotion.display_image }} style={{ width: 62, height: 62, borderRadius: 32 }} />
										</View>
										<View style={styles.listContent}>
											<Text style={[MainStyles.title_a18, { textAlign: 'left' }]}>{promotion.promo_title} </Text>
											<Text style={[MainStyles.title_a14, { textAlign: 'left' }]}>{promotion.promo_desc} </Text>
										</View>
									</View>
								</TouchableOpacity>
							))
						)}
						</View>
					</Tab>
					<Tab title={`Events [${numEvents}]`}>
						<View style={{ flexDirection: 'column', width: '100%', flexGrow: 1, padding: 15, backgroundColor: '#f5f5f5' }} >
						<Text style={[MainStyles.title_a20, { paddingStart: 15, paddingBottom: 15, borderBottomColor: '#DEDDE7', borderBottomWidth: 1 }]}>Event List</Text>
							{events.length === 0 ? (
							<Text category='p1' status="primary" style={{ paddingTop: 20, paddingStart: 20 }}>No results found</Text>
							) : (
							events.map((event: { display_image: any; event_title: any; event_desc: any; }, index: number) => (
								<TouchableOpacity key={index} onPress={() => handeleViewEvent(event)} style={{ width: '100%' }}>
									<View key={index} style={[styles.listContainer, { backgroundColor: index % 2 === 0 ? '#f9f8fd' : 'white' }]}>
										<View style={styles.listIcon}>
											<Image source={{ uri: event.display_image }} style={{ width: 62, height: 62, borderRadius: 32 }} />
										</View>
										<View style={styles.listContent}>
											<Text style={[MainStyles.title_a18, { textAlign: 'left' }]}>{event.event_title} </Text>
											<Text style={[MainStyles.title_a14, { textAlign: 'left' }]}>{event.event_desc} </Text>
										</View>
									</View>
								</TouchableOpacity>
							))
						)}
						</View>
					</Tab>
				</TabView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
	)
}

const styles = StyleSheet.create({
    container: {
      minHeight: 192,
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
	tooltip: {
		position: 'absolute',
		top: 23.5, 
		left: 55,
		padding: 10, 
		backgroundColor: '#5D5A88', 
		borderRadius: 5, 
		shadowColor: "#000",
		shadowOffset: {
		width: 0,
		height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	listContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		padding: 10,
		borderBottomColor: '#DEDDE7',
		borderBottomWidth: 1
	},
	listIcon: {
		width: 64,
		height: 64,
		borderRadius: 32,
		borderColor: '#5D5A88',
		borderWidth: 1
	},
	listContent: {
		flexDirection: 'column',
		flex: 1,
		width: '100%',
		marginStart: 10,
	},
	listTitle: {
		fontSize: 26,
		fontWeight: 'bold',
		marginBottom: 5
	},
	// listTitle: {
	// 	fontSize: 14,
	// }
  });

export default SearchCategory
