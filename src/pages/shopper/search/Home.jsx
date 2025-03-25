import React, { useState, useEffect, useReducer, useRef } from "react";
import { PermissionsAndroid, Platform } from 'react-native';
// import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import DbUtils from "../../../services/DbUtils";
import MainStyles from "../../../assets/styles/MainStyles";
import { shopperSearch } from "../../../services/api_search";
import { Keyboard } from 'react-native';
import { radius } from "../../../sector.data";
import { sectorList } from "../../../sector.data";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { InputSearch } from "../../../components/InputSearch";
import { ButtonOutline } from "../../../components/ButtonOutline";
import { SafeAreaView, ScrollView, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Layout, Text, Modal, Card, TabView, Tab, Icon, Divider } from "@ui-kitten/components";
import DropdownSingle from "../../../components/DropdownSingle";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import { DateSelect } from '../../../components/DateSelect';
import TextTwo from "../../../components/TextTwo";

const initialState = {
	shopperId: 0,
	location: "30",
	gpsLat: '0.0',
	gpsLng: '0.0',
	startDate: '',
	endDate: '',
	sector: '',
	canGetLoc: 0
};

function reducer(state, action) 
{
	switch (action.type) 
	{
	  case 'SEARCH_HOME':
		return { ...state, ...action.payload };
	  default:
		throw new Error();
	}
}

const Home = (props) => 
{
    const [state, dispatch] = useReducer(reducer, initialState);
	
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [token, setToken] = useState('');
	const [searchString, setSearchString] = useState('');
    const [showLocation, setShowLocation] = useState(false);
    const [showDateRange, setShowDateRange] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
	const [businesses, setBusinesses] = useState([]);
	const [numBusinesses, setNumBusinesses] = useState(0);
	const [promotions, setPromotions] = useState([]);
	const [numPromotions, setNumPromotions] = useState(0);
	const [events, setEvents] = useState([]);
	const [numEvents, setNumEvents] = useState(0);
	// const [showTooltip, setShowTooltip] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [canGetLoc, setCanGetLoc] = useState(false);
	const [gpsLat, setGpsLat] = useState('');
	const [gpsLng, setGpsLng] = useState('');
	const [showAskGetLoc, setShowAskGetLoc] = useState(false);

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'SEARCH_HOME',
			payload: {...state, [name]: newValue}
		});
	}

	useEffect(() => 
	{
		requestLocationPermission();
	}, []);

	const getToken = async () => 
	{
		const getToken = await DbUtils.getItem('shopper_token');

		setToken(JSON.parse(getToken));
	}

	const getProfile = async () => 
    {
        const profile = await DbUtils.getItem('shopper_profile');
		console.log('MMMMMM Profile: ', profile);
		// .then((profile) => 
        // {
		dispatch(
		{
			type: 'SEARCH_HOME',
			payload: 
			{
				shopperId: JSON.parse(profile).id,
				location: JSON.parse(profile).geo_range,
				canGetLoc: JSON.parse(profile).can_get_loc
			},
		});
		// });
    }

	const updProfile = async (key, newValue) => 
	{
		const profileDataString = await DbUtils.getItem('shopper_profile');
		const profileData = JSON.parse(profileDataString);
		
		profileData[key] = newValue;
		
		await DbUtils.setItem('shopper_profile', JSON.stringify(profileData));
	};

	useEffect(() => 
	{
		const searchFor = props.route.params.searchFor ? props.route.params.searchFor : '';
		setSearchString(searchFor);
		const fetchData = async () => 
		{
			await getToken();
			await getProfile()
		};

		fetchData();
	}, []);

	const handleReset = () => 
	{
		console.log('Clear every ting: ', searchString);
		setSearchString('');
	}

	const handleSearch = async () => 
	{
		if (searchString === '') 
		{
			// setShowTooltip(true);
			alert("Search field cannot be empty");
			return;
		} 
		else 
		{
			if (state.canGetLoc == 0) 
			{
				setShowAskGetLoc(true);
				return;
				
			} 
			else if (state.canGetLoc == 1)
			{
				state.location = '';
			}
			else 
			{
				setIsLoading(true);

				await getCurrentPosition();
				// console.log('Booyaa GPS Lat: ', state.gpsLat, state.gpsLng);
				
				Keyboard.dismiss();
				const apiData = {
					"shopper_id": state.shopperId,
					"search_string": searchString,
					"location": state.location,
					"gps_lat": state.gpsLat,
					"gps_lng": state.gpsLng,
					"start_date": state.startDate,
					"end_date": state.endDate,
					"sector": state.sector
				};
				
				setIsLoading(true);

				try
				{
					const res = await shopperSearch(token, apiData);
					// .then((res) => 
					// {
						if (res.status)
						{
							setBusinesses(res.businesses);
							console.log('ELKELK: ', res.businesses, res.businesses.length);
							setNumBusinesses(res.businesses.length);
							setPromotions(res.promotions);
							setNumPromotions(res.promotions.length);
							setEvents(res.events);
							setNumEvents(res.events.length);
							console.log('res.bus', res.businesses.length);
							console.log('res.promotions', res.promotions.length);
							console.log('res.events', res.events.length);
						} 
						else 
						{
							setBusinesses([]);
							setNumBusinesses(0);
							setPromotions([]);
							setNumPromotions(0);
							setEvents([]);
							setNumEvents(0);
							console.log('Search failed B: ', res.businesses);
							console.log('Search failed P: ', res.promotions);
							console.log('Search failed E: ', res.events);
						}
					// });
				} 
				catch (error)
				{
					console.log('Search failed: ', error);
				}

				setIsLoading(false);
			}
		}
	}

	const handleSetLocation = (value) => 
	{
		setShowLocation(false);
	}

	const clearLocation = () => 
	{
		state.location = '';
		setShowLocation(false);
	}

	const handleSetDateRange = (value) => 
	{
		setShowDateRange(false);
	}

	const clearDateRange = () => 
	{
		state.startDate = '';
		state.endDate = '';
		setShowDateRange(false);
	}

	const handleSetCategory = (value) => 
	{
		setShowCategory(false);
	}

	const clearSector = () => 
	{
		state.sector = '';
		setShowCategory(false);
	}
	
	const handeleViewBusiness = (business) => 
	{
		props.navigation.navigate('SearchBusinessView', { business: business });
	}
	
	const handeleViewPromotion = (promotion) => 
	{
		props.navigation.navigate('SearchPromotionView', { promotion: promotion });
	}

	const handeleViewEvent = (event) => 
	{
		props.navigation.navigate('SearchEventView', { event: event });
	}

	// const requestLocationPermission = async () => {
	// 	if (Platform.OS === 'ios') {
	// 	  let response = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
	  
	// 	  if (response === RESULTS.DENIED) {
	// 		request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((response) => {
	// 		  // …
	// 		});
	// 	  }
	// 	}
	  
	// 	if (Platform.OS === 'android') {
	// 	  try {
	// 		const granted = await PermissionsAndroid.request(
	// 		  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
	// 		  {
	// 			title: "Localeyez Location Permission",
	// 			message:
	// 			  "We need your location in order to find businesses " +
	// 			  "within the geo range you have selected.",
	// 			buttonNeutral: "Ask Me Later",
	// 			buttonNegative: "Cancel",
	// 			buttonPositive: "OK"
	// 		  }
	// 		);
	// 		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
	// 		  console.log("You can use the location");
	// 		} else {
	// 		  console.log("Location permission denied");
	// 		}
	// 	  } catch (err) {
	// 		console.warn(err);
	// 	  }
	// 	}
	// };

	const requestLocationPermission = async () => 
	{
		if (Platform.OS === 'ios') 
		{
			Geolocation.requestAuthorization();
		} 
		else if (Platform.OS === 'android') 
		{
			await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			);
		}
	};

	const getCurrentPosition = async () => 
	{
		Geolocation.getCurrentPosition(position => 
		{
			const { latitude, longitude } = position.coords;
			setGpsLat(latitude);
			state.gpsLat = latitude;
			setGpsLng(longitude);
			state.gpsLng = longitude;
			console.log(latitude, longitude);
		},
		  error => console.log(error.message),
		  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};

	const handleGetLocAccept = async () => 
	{
		console.log('Accepted');
		await updProfile('can_get_loc', 2);
		state.canGetLoc = 2;
		state.location = 10;
		console.log('STATE ACCCEPT: ', state);
		setShowAskGetLoc(false);
	}

	const handleGetLocDeny = async () => 
	{
		console.log('Deny');
		await updProfile('can_get_loc', 1);
		await updProfile('geo_range', '');
		// handleInputChange("canGetLoc", 1);
		state.canGetLoc = 1;
		state.location = '';
		console.log('STATE DENY: ', state);
		setShowAskGetLoc(false);
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
			<Layout style={[ { flex: 1, alignItems: 'center', width: '100%' }]}>
				<View style={{ width: '100%', marginTop: 0, backgroundColor: '#ffffff', borderColor: '#DEDDE7', borderWidth: 1, padding: 10, paddingTop: 15, paddingBottom: 15, borderTopStartRadius: 0, borderTopEndRadius: 0, borderBottomStartRadius: 20, borderBottomEndRadius: 20  }} >
					<View style={{ width: '100%' }}>
						<InputSearch value={searchString} setValue={setSearchString} resetButton={handleReset} onpress={handleSearch} placeholder="Search for..." />
					</View>
					<Text style={[MainStyles.title_a16, { width: '100%', paddingStart: 5, marginTop: 10, textAlign: 'center' }]}>Filter options</Text>
					<View style={{ flexDirection: 'row', width: '100%', paddingStart: 5, paddingEnd: 5, marginTop: 10 }}>
						<ButtonOutline name="Location" setFlex={1} onpress={() => { setShowLocation(true); }} />
						<View style={{ width: 5 }}></View>
						<ButtonOutline name="Date Range" setFlex={1} onpress={() => { setShowDateRange(true); }}  />
						<View style={{ width: 5 }}></View>
						<ButtonOutline name="Category" setFlex={1} onpress={() => { setShowCategory(true); }}  />
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingStart: 5, paddingEnd: 5, marginTop: 10 }}>
						{state.location !== '' ? (<Text style={[MainStyles.title_a14, { flex: 1, textAlign: 'center' }]}>{state.location}km</Text>) : (<Text style={[MainStyles.title_a14, { flex: 1, textAlign: 'center' }]}>-</Text>)}
						<View style={{ width: 5 }}></View>
						{state.startDate !== '' ? (<Text style={[MainStyles.title_a14, { flex: 1, textAlign: 'center' }]}>F: {state.startDate.toLocaleDateString()}</Text>) : (<Text style={[MainStyles.title_a14, { flex: 1, textAlign: 'center' }]}>-</Text>)}
						<View style={{ width: 5 }}></View>
						{state.sector !== '' ? (<Text style={[MainStyles.title_a14, { flex: 1, textAlign: 'center' }]}>{state.sector}</Text>) : (<Text style={[MainStyles.title_a14, { flex: 1, textAlign: 'center' }]}>-</Text>)}
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingStart: 5, paddingEnd: 5, marginTop: 10 }}>
						<Text category="p2" style={{ flex: 1, textAlign: 'center' }}></Text>
						<View style={{ width: 5 }}></View>
						{state.endDate !== '' ? (<Text style={[MainStyles.title_a14, { flex: 1, textAlign: 'center' }]}>T: {state.endDate.toLocaleDateString()}</Text>) : (<Text style={[MainStyles.title_a14, { flex: 1, textAlign: 'center' }]}>-</Text>)}
						<View style={{ width: 5 }}></View>
						<Text category="p2" style={{ flex: 1, textAlign: 'center' }}></Text>
					</View>
				</View>

				{/* {showTooltip && (
				<View style={styles.tooltip}>
					<Text style={{ color: 'white' }} onPress={handleCloseTooltip}>Search field cannot be empty</Text>
				</View>
				)} */}

				{/* Tab: Businesses */}
				<TabView selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)} style={{ flex: 1, width: '100%', marginTop: 20 }} >
					<Tab title={`Businesses [${numBusinesses}]`}>
						<ScrollView>
							<View style={{ flexDirection: 'column', width: '100%', flexGrow: 1, paddingTop: 5, paddingBottom: 15 }} >
								<Text style={[MainStyles.title_a20, { paddingStart: 15, paddingBottom: 15, borderBottomColor: '#DEDDE7', borderBottomWidth: 1 }]}>Business List</Text>
								{businesses.map((business, index) => (
									<TouchableOpacity key={index} onPress={() => handeleViewBusiness(business)} style={{ width: '100%' }}>
										<View style={[styles.listContainer, { backgroundColor: index % 2 === 0 ? '#f9f8fd' : 'white' }]}>
											<View style={styles.listIcon}>
												{business.profile_pic === '' 
												? <Image source={require('../../../assets/images/pic_holder.png')} style={{ width: 62, height: 62, borderRadius: 32 }} /> 
												: <Image source={{ uri: business.profile_pic }} style={{ width: 62, height: 62, borderRadius: 32 }} />
												}
											</View>
											<View style={styles.listContent}>
												<Text style={[MainStyles.title_a18]}>{business.company_name}</Text>
												<Text style={[MainStyles.title_a14]}>{business.business_bio}</Text>
											</View>
										</View>
									</TouchableOpacity>
								))}
							</View>
						</ScrollView>
					</Tab>
					{/* Tab: Promotions */}
					<Tab title={`Promotions [${numPromotions}]`}>
						<ScrollView>
							<View style={{ flexDirection: 'column', width: '100%', flexGrow: 1, paddingTop: 5, paddingBottom: 15 }} >
							<Text style={[MainStyles.title_a20, { paddingStart: 15, paddingBottom: 15, borderBottomColor: '#DEDDE7', borderBottomWidth: 1 }]}>Promotion List</Text>
								{promotions.map((promotion, index) => (
									<TouchableOpacity key={index} onPress={() => handeleViewPromotion(promotion)} style={{ width: '100%' }}>
										<View key={index} style={[styles.listContainer, { backgroundColor: index % 2 === 0 ? '#f9f8fd' : 'white' }]}>
											<View style={styles.listIcon}>
												{promotion.display_image === ''
												? <Image source={require('../../../assets/images/pic_holder.png')} style={{ width: 62, height: 62, borderRadius: 32 }} />
												: <Image source={{ uri: promotion.display_image }} style={{ width: 62, height: 62, borderRadius: 32 }} />
												}
											</View>
											<View style={styles.listContent}>
												<Text style={[MainStyles.title_a18]}>{promotion.promo_title}</Text>
												<Text style={[MainStyles.title_a14]}>{promotion.promo_desc}</Text>
											</View>
										</View>
									</TouchableOpacity>
								))}
							</View>
						</ScrollView>
					</Tab>
					{/* Tab: Events */}
					<Tab title={`Events [${numEvents}]`}>
						<ScrollView>
							<View style={{ flexDirection: 'column', width: '100%', flexGrow: 1, paddingTop: 5, paddingBottom: 15 }} >
								<Text style={[MainStyles.title_a20, { paddingStart: 15, paddingBottom: 15, borderBottomColor: '#DEDDE7', borderBottomWidth: 1 }]}>Event List</Text>
								{events.map((event, index) => (
									<TouchableOpacity key={index} onPress={() => handeleViewEvent(event)} style={{ width: '100%' }}>
										<View key={index} style={[styles.listContainer, { backgroundColor: index % 2 === 0 ? '#f9f8fd' : 'white' }]}>
											<View style={styles.listIcon}>
												{event.display_image === ''
												? <Image source={require('../../../assets/images/pic_holder.png')} style={{ width: 62, height: 62, borderRadius: 32 }} />
												: <Image source={{ uri: event.display_image }} style={{ width: 62, height: 62, borderRadius: 32 }} />
												}
											</View>
											<View style={styles.listContent}>
												<Text style={[MainStyles.title_a18]}>{event.event_title}</Text>
												<Text style={[MainStyles.title_a14]}>{event.event_desc}</Text>
											</View>
										</View>
									</TouchableOpacity>
								))}
							</View>
						</ScrollView>
					</Tab>
				</TabView>

				{/* Popup to select location */}
				<Modal
					visible={showLocation}
					backdropStyle={styles.backdrop}
					onBackdropPress={() => setShowLocation(false)}
					style={{ width: '90%' }}
					>
					<Card disabled={true} style={{ flexGrow: 1, width: '100%', borderRadius: 20 }}>
						<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
							<TouchableOpacity onPress={() => setShowLocation(false)} style={{ width: '90%' }}>
								<Text style={[MainStyles.title_a16]} >Location</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => setShowLocation(false)} >
								<Icon name="close-outline" width={24} height={24} color="#8F9BB3" opacity={0.3} />
							</TouchableOpacity>
						</View>
						<View style={{ width: '100%', height: 1, backgroundColor: '#DEDDE7', marginTop: 10 }} />
						<Text style={[MainStyles.title_a14, { marginTop: 20}]}>Change Geo-Location Radius</Text>
						<DropdownSingle name="location" data={radius} value={state.location} onChange={handleInputChange} />

						<ButtonPrimary name="Set" width="100%" marginTop={10} onpress={handleSetLocation}/>

						<TouchableOpacity style={{ marginTop:20, marginBottom: 20 }} onPress={clearLocation} >
							<Text category="p1" status="primary" style={{ width: '100%', textAlign: 'center', marginTop: 10, marginBottom: 0 }}>Clear</Text>
						</TouchableOpacity>

						
					</Card>
				</Modal>

				{/* Popup to select date reange */}
				<Modal
					visible={showDateRange}
					backdropStyle={styles.backdrop}
					onBackdropPress={() => setShowDateRange(false)}
					style={{ width: '90%' }}
					>
					<Card disabled={true} style={{ flexGrow: 1, width: '100%', borderRadius: 20 }}>
						<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
							<TouchableOpacity onPress={() => setShowDateRange(false)} style={{ width: '90%' }}>
								<Text style={[MainStyles.title_a16]} >Date Range</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => setShowDateRange(false)} >
								<Icon name="close-outline" width={24} height={24} color="#8F9BB3" opacity={0.3} />
							</TouchableOpacity>
						</View>
						<View style={{ width: '100%', height: 1, backgroundColor: '#DEDDE7', marginTop: 10 }} />
						<Text style={[MainStyles.title_a14, { marginTop: 20, marginBottom: 10 }]}>Please select a [From Date]:</Text>
						<DateSelect name="startDate" value={state.startDate} onChange={handleInputChange} />
						<Text style={[MainStyles.title_a14, { marginTop: 20, marginBottom: 10 }]}>Please select a [To Date]:</Text>
						<DateSelect name="endDate" value={state.endDate} onChange={handleInputChange} />

						<ButtonPrimary name="Set" width="100%" marginTop={25} onpress={handleSetDateRange}/>

						<TouchableOpacity style={{ marginTop:20, marginBottom: 20 }} onPress={clearDateRange} >
							<Text category="p1" status="primary" style={{ width: '100%', textAlign: 'center', marginTop: 10, marginBottom: 0 }}>Clear</Text>
						</TouchableOpacity>

						
					</Card>
				</Modal>

				{/* Popup to select category */}
				<Modal
					visible={showCategory}
					backdropStyle={styles.backdrop}
					onBackdropPress={() => setShowCategory(false)}
					style={{ width: '90%' }}
					>
					<Card disabled={true} style={{ flexGrow: 1, width: '100%', borderRadius: 20 }}>
						<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
							<TouchableOpacity onPress={() => setShowCategory(false)} style={{ width: '90%' }}>
								<Text style={[MainStyles.title_a16]} >Category</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => setShowCategory(false)} >
								<Icon name="close-outline" width={24} height={24} color="#8F9BB3" opacity={0.3} />
							</TouchableOpacity>
						</View>
						<View style={{ width: '100%', height: 1, backgroundColor: '#DEDDE7', marginTop: 10 }} />
						<Text style={[MainStyles.title_a14, { marginTop: 20, marginBottom: 10 }]}>Select a business sector/category</Text>
						<DropdownSingle name="sector" data={sectorList} value={state.sector} onChange={handleInputChange} />

						<ButtonPrimary name="Set" width="100%" marginTop={25} onpress={handleSetCategory}/>

						<TouchableOpacity style={{ marginTop:20, marginBottom: 20 }} onPress={clearSector} >
							<Text category="p1" status="primary" style={{ width: '100%', textAlign: 'center', marginTop: 10, marginBottom: 0 }}>Clear</Text>
						</TouchableOpacity>

						
					</Card>
				</Modal>
				{/* Popup to ask user for permission to get location */}
				<Modal
					visible={showAskGetLoc}
					backdropStyle={styles.backdrop}
					onBackdropPress={() => setShowAskGetLoc(false)}
					style={{ width: '90%' }}
					>
					<Card disabled={true} style={{ flexGrow: 1, width: '100%', borderRadius: 20 }}>
						<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
							<TouchableOpacity onPress={() => setShowAskGetLoc(false)} style={{ width: '90%' }}>
								<Text style={[MainStyles.title_a16]} >Get current location</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => setShowAskGetLoc(false)} >
								<Icon name="close-outline" width={24} height={24} color="#8F9BB3" opacity={0.3} />
							</TouchableOpacity>
						</View>
						<View style={{ width: '100%', height: 1, backgroundColor: '#DEDDE7', marginTop: 10 }} />
						<Text style={[MainStyles.title_a14, { marginTop: 20, marginBottom: 10 }]}>In order to find businesses within the geo range you have selected, your current location is required. </Text>
						<Text style={[MainStyles.title_a14, { marginTop: 10, marginBottom: 10 }]}>Click "Accept" to allow this or "Deny" if you prefer not to. The aquired gps co-ordinates are not stored or shared and are only used as part of the search criteria.</Text>
						<Text style={[MainStyles.title_a14, { marginTop: 10, marginBottom: 10 }]}>You can change this setting in your profile settings.</Text>

						<ButtonPrimary name="Accept" width="100%" marginTop={25} onpress={handleGetLocAccept}/>

						<TouchableOpacity style={{ marginTop:20, marginBottom: 20 }} onPress={handleGetLocDeny} >
							<Text category="p1" status="primary" style={{ width: '100%', textAlign: 'center', marginTop: 10, marginBottom: 0 }}>Deny</Text>
						</TouchableOpacity>

					</Card>
				</Modal>
			</Layout>
			<Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7' }} />
		<BotNavShopper selected={1} />
        </SafeAreaView>
    );
};

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

export default Home;