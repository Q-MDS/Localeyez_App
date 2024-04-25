import React, { useState, useEffect, useReducer} from "react";
import DbUtils from "../../../services/DbUtils";
import { shopperSearch } from "../../../services/api_search";
import { radius } from "../../../sector.data";
import { sectorList } from "../../../sector.data";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { InputSearch } from "../../../components/InputSearch";
import { ButtonOutline } from "../../../components/ButtonOutline";
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from "react-native";
import { Layout, Text, Modal, Card, TabView, Tab, Icon } from "@ui-kitten/components";
import DropdownSingle from "../../../components/DropdownSingle";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import { DateSelect } from '../../../components/DateSelect';

const initialState = {
	shopperId: 0,
	location: "30",
	gpsLat: '0.0',
	gpsLng: '0.0',
	startDate: '',
	endDate: '',
	sector: '',
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

const Home = () => 
{
    const [state, dispatch] = useReducer(reducer, initialState);

	const [selectedIndex, setSelectedIndex] = useState(0);
	const [token, setToken] = useState('');
	const [searchString, setSearchString] = useState('');
    const [showLocation, setShowLocation] = useState(false);
    const [showDateRange, setShowDateRange] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
	const [businesses, setBusinesses] = useState([]);
	const [promotions, setPromotions] = useState([]);
	const [events, setEvents] = useState([]);

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'SEARCH_HOME',
			payload: {...state, [name]: newValue}
		});
	}

	const getToken = async () => 
	{
		const getToken = await DbUtils.getItem('shopper_token');

		setToken(JSON.parse(getToken));
	}

	const getProfile = async () => 
    {
        const profile = await DbUtils.getItem('shopper_profile')
		.then((profile) => 
        {
			dispatch(
			{
				type: 'SEARCH_HOME',
				payload: 
				{
					shopperId: JSON.parse(profile).id,
					location: JSON.parse(profile).geo_range,
				},
			});
		});
    }

	useEffect(() => 
	{
		const fetchData = async () => 
		{
			await getToken();
			await getProfile();
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
		const res = await shopperSearch(token, apiData);
		const status = res.status;

		if (status)
		{
			setBusinesses(res.businesses);
			setPromotions(res.promotions);
			setEvents(res.events);
			// console.log('Search results B: ', res.businesses);
			// console.log('Search results P: ', res.promotions);
			// console.log('Search results E: ', res.events);
		} 
		else 
		{
			setBusinesses([]);
			setPromotions([]);
			setEvents([]);
			console.log('Search failed B: ', res.businesses);
			console.log('Search failed P: ', res.promotions);
			console.log('Search failed E: ', res.events);
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
			<Layout style={[ { flex: 1, alignItems: 'center', width: '100%' }]}>
				<View style={{ width: '100%', marginTop: 0, backgroundColor: '#f9f8fd', borderColor: '#DEDDE7', borderWidth: 1, padding: 10, paddingTop: 15, paddingBottom: 15, borderTopStartRadius: 0, borderTopEndRadius: 0, borderBottomStartRadius: 20, borderBottomEndRadius: 20  }} >
					<View style={{ width: '100%' }}>
						<InputSearch value={searchString} setValue={setSearchString} resetButton={handleReset} searchButton={handleSearch} placeholder="Search for..." />
					</View>
					<Text category="p2" status="primary" style={{ width: '100%', fontWeight: 'bold', paddingStart: 5, marginTop: 10 }}>Filter options:</Text>
					<View style={{ flexDirection: 'row', width: '100%', paddingStart: 5, paddingEnd: 5, marginTop: 10 }}>
						<ButtonOutline name="Location" setFlex={1} onpress={() => { setShowLocation(true); }} />
						<View style={{ width: 5 }}></View>
						<ButtonOutline name="Date Range" setFlex={1} onpress={() => { setShowDateRange(true); }}  />
						<View style={{ width: 5 }}></View>
						<ButtonOutline name="Category" setFlex={1} onpress={() => { setShowCategory(true); }}  />
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingStart: 5, paddingEnd: 5, marginTop: 10 }}>
						{state.location !== '' ? (<Text category="p2" style={{ flex: 1, textAlign: 'center' }}>{state.location}km</Text>) : (<Text category="p2" style={{ flex: 1, textAlign: 'center' }}>-</Text>)}
						<View style={{ width: 5 }}></View>
						{state.startDate !== '' ? (<Text category="p2" style={{ flex: 1, textAlign: 'center' }}>F: {state.startDate.toLocaleDateString()}</Text>) : (<Text category="p2" style={{ flex: 1, textAlign: 'center' }}>-</Text>)}
						<View style={{ width: 5 }}></View>
						{state.sector !== '' ? (<Text category="p2" style={{ flex: 1, textAlign: 'center' }}>{state.sector}</Text>) : (<Text category="p2" style={{ flex: 1, textAlign: 'center' }}>-</Text>)}
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingStart: 5, paddingEnd: 5, marginTop: 10 }}>
						<Text category="p2" style={{ flex: 1, textAlign: 'center' }}></Text>
						<View style={{ width: 5 }}></View>
						{state.endDate !== '' ? (<Text category="p2" style={{ flex: 1, textAlign: 'center' }}>T: {state.endDate.toLocaleDateString()}</Text>) : (<Text category="p2" style={{ flex: 1, textAlign: 'center' }}>-</Text>)}
						<View style={{ width: 5 }}></View>
						<Text category="p2" style={{ flex: 1, textAlign: 'center' }}></Text>
					</View>

				</View>

				<TabView selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)} style={{ flex: 1, width: '100%', marginTop: 20 }} >
					<Tab title='Businesses'>
						<View style={{ flexDirection: 'column', width: '100%', flexGrow: 1, padding: 15, backgroundColor: '#f5f5f5' }} >
							<Text category="h5">Business List</Text>
							{businesses.map((business, index) => (
								<View key={index} style={{ marginBottom: 10 }}>
									<Text>{business.company_name}</Text>
									<Text>{business.business_bio}</Text>
								</View>
							))}
						</View>
					</Tab>
					<Tab title='Promotions'>
					<View style={{ flexDirection: 'column', width: '100%', flexGrow: 1, padding: 15, backgroundColor: '#f5f5f5' }} >
							<Text category="h5">Promotion List</Text>
						</View>
					</Tab>
					<Tab title='Events'>
						<View style={{ flexDirection: 'column', width: '100%', flexGrow: 1, padding: 15, backgroundColor: '#f5f5f5' }} >
							<Text category="h5">Event List</Text>
						</View>
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
								<Text category="h6" status="primary" >Location</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => setShowLocation(false)} >
								<Icon name="close-outline" width={24} height={24} color="#8F9BB3" opacity={0.3} />
							</TouchableOpacity>
						</View>
						<View style={{ width: '100%', height: 1, backgroundColor: '#DEDDE7', marginTop: 10 }} />
						<Text category="s2" status="primary" style={{ marginTop: 20 }}>Change Geo-Location Radius</Text>
						<DropdownSingle name="location" data={radius} value={state.location} onChange={handleInputChange} />

						<Text category="s2" status="primary" style={{ marginTop: 20 }}>Current position</Text>
						<Text category="s2" status="success" style={{ marginTop: 20 }}>Click here to get your current position</Text>
						<Text category="s2" status="primary" style={{ marginTop: 20 }}>Latitude: -26.204103</Text>
						<Text category="s2" status="primary" style={{ marginTop: 5 }}>Longitude: 28.047305</Text>

						<Text category="s2" status="primary" style={{ marginTop: 20 }}>Please note these co-ordinates are not stored and are only used to fetch results within the selected radius</Text>

						<TouchableOpacity onPress={clearLocation} >
							<Text category="p1" status="primary" style={{ width: '100%', textAlign: 'center', marginTop: 20, marginBottom: 0 }}>Clear</Text>
						</TouchableOpacity>

						<ButtonPrimary name="Set" width="100%" marginTop={25} onpress={handleSetLocation}/>
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
								<Text category="h6" status="primary" >Date Range</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => setShowDateRange(false)} >
								<Icon name="close-outline" width={24} height={24} color="#8F9BB3" opacity={0.3} />
							</TouchableOpacity>
						</View>
						<View style={{ width: '100%', height: 1, backgroundColor: '#DEDDE7', marginTop: 10 }} />
						<Text category="s2" status="primary" style={{ marginTop: 20, marginBottom: 10 }}>Please select a [From Date]:</Text>
						<DateSelect name="startDate" value={state.startDate} onChange={handleInputChange} />
						<Text category="s2" status="primary" style={{ marginTop: 20, marginBottom: 10 }}>Please select a [To Date]:</Text>
						<DateSelect name="endDate" value={state.endDate} onChange={handleInputChange} />

						<TouchableOpacity onPress={clearDateRange} >
							<Text category="p1" status="primary" style={{ width: '100%', textAlign: 'center', marginTop: 20, marginBottom: 0 }}>Clear</Text>
						</TouchableOpacity>

						<ButtonPrimary name="Set" width="100%" marginTop={25} onpress={handleSetDateRange}/>
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
								<Text category="h6" status="primary" >Category</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => setShowCategory(false)} >
								<Icon name="close-outline" width={24} height={24} color="#8F9BB3" opacity={0.3} />
							</TouchableOpacity>
						</View>
						<View style={{ width: '100%', height: 1, backgroundColor: '#DEDDE7', marginTop: 10 }} />
						<Text category="s2" status="primary" style={{ marginTop: 20 }}>Select a business sector/category</Text>
						<DropdownSingle name="sector" data={sectorList} value={state.sector} onChange={handleInputChange} />

						<TouchableOpacity onPress={clearSector} >
							<Text category="p1" status="primary" style={{ width: '100%', textAlign: 'center', marginTop: 20, marginBottom: 0 }}>Clear</Text>
						</TouchableOpacity>

						<ButtonPrimary name="Set" width="100%" marginTop={25} onpress={handleSetCategory}/>
					</Card>
				</Modal>
			</Layout>
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
  });

export default Home;