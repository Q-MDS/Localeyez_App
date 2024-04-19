import React, {useState, useEffect} from 'react';
import DbUtils from '../../../../services/DbUtils';
import Toast from 'react-native-toast-message';
import { updShopperSectors } from '../../../../services/api_helper';
import MainStyles from '../../../../assets/styles/MainStyles';
import { Checkbox } from '../../../../components/Checkbox';
import { TopNavArrowTitle } from '../../../../components/TopNavArrowTitle';
import { SafeAreaView, ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Layout, Divider, Icon, Card } from '@ui-kitten/components';
import { TitleThree } from '../../../../components/TitleThree';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import { DropdownMultiSelect } from '../../../../components/DropdownMultiSelect';

const fashionData = [{ label: 'Clothing', value: 'Clothing' }, { label: 'Shoes', value: 'Shoes' }, { label: 'Accessories', value: 'Accessories' }, { label: 'Make-Up & Cosmetics', value: 'Make-Up & Cosmetics' }, { label: 'Bath & Body', value: 'Bath & Body' }, { label: 'Clothing Designers & Stylists', value: 'Clothing Designers & Stylists' }, { label: 'Hair Stylists & Products', value: 'Hair Stylists & Products' }, { label: 'Make-Up Artists', value: 'Make-Up Artists' }, { label: 'Skin & Beauty Technicians', value: 'Skin & Beauty Technicians' },	{ label: 'Costume Hire', value: 'Costume Hire' }];
const homeData = [{ label: 'Furniture', value: 'Furniture' }, { label: 'Fixtures & Fittings', value: 'Fixtures & Fittings' }, { label: 'Homeware & Decor', value: 'Homeware & Decor' }, { label: 'Electronics & Appliances', value: 'Electronics & Appliances' }];
const groceriesData = [{ label: 'Food & Beverage', value: 'Food & Beverage' }, { label: 'Local Markets & Homemade Goods', value: 'Local Markets & Homemade Goods' }, { label: 'Household Goods', value: 'Household Goods' }];
const accomodationData = [{ label: 'Hotels', value: 'Hotels' }, { label: 'Guest Lodges', value: 'Guest Lodges' }, { label: 'BnBs', value: 'BnBs' }, { label: 'Lodges', value: 'Lodges' }, { label: 'Villas & Private Homes', value: 'Villas & Private Homes' }, { label: 'Backpackers', value: 'Backpackers' }, { label: 'Other - E.g. Houseboats', value: 'Other - E.g. Houseboats' }];
const transportData = [{ label: 'Hotels', value: 'Hotels' }, { label: 'Guest Lodges', value: 'Guest Lodges' }, { label: 'BnBs', value: 'BnBs' }, { label: 'Lodges', value: 'Lodges' }, { label: 'Villas & Private Homes', value: 'Villas & Private Homes' }, { label: 'Backpackers', value: 'Backpackers' }, { label: 'Other - E.g. Houseboats', value: 'Other - E.g. Houseboats' }];
const sportData = [{ label: 'Gyms', value: 'Gyms' }, { label: 'Sports Clubs', value: 'Sports Clubs' }, { label: 'Spa\'s', value: 'Spa\'s' }, { label: 'Outdoor Activities', value: 'Outdoor Activities' }];
const doctorData = [{ label: 'General Practitioners', value: 'General Practitioners' }, { label: 'Physicians', value: 'Physicians' }, { label: 'Physiotherapists', value: 'Physiotherapists' }, { label: 'Chiropractors', value: 'Chiropractors' }, { label: 'Surgeons', value: 'Surgeons' }, { label: 'Dental', value: 'Dental' }, { label: 'Homeopathic', value: 'Homeopathic' }, { label: 'Mental Health', value: 'Mental Health' }, { label: 'Paediatric', value: 'Paediatric' }, { label: 'Other Specialists', value: 'Other Specialists' }];
const eatData = [{ label: 'Restaurants', value: 'Restaurants' }, { label: 'Bars', value: 'Bars' }, { label: 'Clubs', value: 'Clubs' }, { label: 'Coffee Shops', value: 'Coffee Shops' }, { label: 'Takeaways', value: 'Takeaways' }, { label: 'Bakeries & Patisseries', value: 'Bakeries & Patisseries' }, { label: 'Speciality Foods', value: 'Speciality Foods' }, { label: 'Catering & Ready Made', value: 'Catering & Ready Made' }];
const activitiesData = [{ label: 'Movies', value: 'Movies' }, { label: 'Entertainment Centres', value: 'Entertainment Centres' }, { label: 'Arts', value: 'Arts' }, { label: 'Outdoor Leisure', value: 'Outdoor Leisure' }, { label: 'Event Hire Specialists', value: 'Event Hire Specialists' }, { label: 'Venues', value: 'Venues' }, { label: 'Event Planners', value: 'Event Planners' }, { label: 'Children', value: 'Children' }];
const entEventData = [{ label: 'Music', value: 'Music' }, { label: 'Arts', value: 'Arts' }];
const eduEventData = [{ label: 'Preschools', value: 'Preschools' }, { label: 'Primary Schools', value: 'Primary Schools' }, { label: 'Secondary Schools', value: 'Secondary Schools' }, { label: 'Tertiary Education', value: 'Tertiary Education' }];
const learnData = [{ label: 'Courses', value: 'Courses' }, { label: 'E-Learning', value: 'E-Learning' }];
const employmentData = [{ label: 'Recruitment Agencies', value: 'Recruitment Agencies' }];
const serHomeData = [{ label: 'Building', value: 'Building' }, { label: 'Interiors', value: 'Interiors' }, { label: 'Plumbing', value: 'Plumbing' }, { label: 'Electrical', value: 'Electrical' }, { label: 'Painting', value: 'Painting' }, { label: 'Landscaping', value: 'Landscaping' }, { label: 'Cleaning', value: 'Cleaning' }, { label: 'Pest Control', value: 'Pest Control' }, { label: 'Veterinary & Pet Parlours', value: 'Veterinary & Pet Parlours' }, { label: 'Security', value: 'Security' }, { label: 'Communications & Connectivity', value: 'Communications & Connectivity' }, ];
const serSelfData = [{ label: 'Hair Dressers & Stylists', value: 'Hair Dressers & Stylists' }, { label: 'Beauty Spa\'s', value: 'Beauty Spa\'s' }];
const serFinData = [{ label: 'Banks', value: 'Banks' }, { label: 'Bureau De Change', value: 'Bureau De Change' }, { label: 'Financial Management', value: 'Financial Management' }, { label: 'Accountants', value: 'Accountants' }, { label: 'Insurance', value: 'Insurance' }];
const serPubData = [{ label: 'Water', value: 'Water' }, { label: 'Electricity', value: 'Electricity' }, { label: 'Roads', value: 'Roads' }, { label: 'Police', value: 'Police' }, { label: 'Fire Department', value: 'Fire Department' }, { label: 'Accident & Emergency', value: 'Accident & Emergency' }];
const communityData = [{ label: 'Children', value: 'Children' }, { label: 'Old Age Pensioners', value: 'Old Age Pensioners' }, { label: 'Community Projects', value: 'Community Projects' }, { label: 'Conservation', value: 'Conservation' }];

const Add = (props) => 
{
    const [shoppingCollapsed, setShoppingCollapsed] = useState(false);
	const [fashion, setFashion] = useState([]);
	const [home, setHome] = useState([]);
	const [groceries, setGroceries] = useState([]);
	const [shoppingOpt1, setShoppingOpt1] = useState(false);
	const [shoppingOpt2, setShoppingOpt2] = useState(false);
	const [shoppingOpt3, setShoppingOpt3] = useState(false);
    const [travelCollapsed, setTravelCollapsed] = useState(false);
	const [accomodation, setAccomodation] = useState([]);
	const [transport, setTransport] = useState([]);
	const [travelOpt1, setTravelOpt1] = useState(false);
    const [healthCollapsed, setHealthCollapsed] = useState(false);
	const [sport, setSport] = useState([]);
	const [doctor, setDoctor] = useState([]);
	const [healthOpt1, setHealthOpt1] = useState(false);
	const [healthOpt2, setHealthOpt2] = useState(false);
	const [healthOpt3, setHealthOpt3] = useState(false);
    const [entertainmentCollapsed, setEntertainmentCollapsed] = useState(false);
	const [eat, setEat] = useState([]);
	const [activities, setActivities] = useState([]);
	const [entEvent, setEntEvent] = useState([]);
    const [educationCollapsed, setEducationCollapsed] = useState(false);
	const [eduEvent, setEduEvent] = useState([]);
	const [learn, setLearn] = useState([]);
	const [employment, setEmployment] = useState([]);
    const [propertyCollapsed, setPropertyCollapsed] = useState(false);
	const [propertyOpt1, setPropertyOpt1] = useState(false);
	const [propertyOpt2, setPropertyOpt2] = useState(false);
	const [propertyOpt3, setPropertyOpt3] = useState(false);
	const [propertyOpt4, setPropertyOpt4] = useState(false);
    const [servicesCollapsed, setServicesCollapsed] = useState(false);
	const [serHome, setSerHome] = useState([]);
	const [serSelf, setSerSelf] = useState([]);
	const [serFin, setSerFin] = useState([]);
	const [serPub, setSerPub] = useState([]);
	const [servicesOpt1, setServicesOpt1] = useState(false);
    const [communityCollapsed, setCommunityCollapsed] = useState(false);
	const [community, setCommunity] = useState([]);
	const [communityOpt1, setCommunityOpt1] = useState(false);
	const [communityOpt2, setCommunityOpt2] = useState(false);
	const [communityOpt3, setCommunityOpt3] = useState(false);
	const [ready, setReady] = useState(false);

	const [sectors, setSectors] = useState('');
	const [token, setToken] = useState('');
	const [shopperId, setShopperId] = useState(0);

	const getToken = async () => 
	{
		const getToken = await DbUtils.getItem('shopper_token');

		setToken(JSON.parse(getToken));
	}

	const getShopperId = async () => 
	{
		const id = await DbUtils.getItem('shopper_id');
		
		setShopperId(JSON.parse(id));
	}

	const fetchSectors = async () => 
    {
        const getSectors = await DbUtils.getItem('shopper_sectors')
        .then((getSectors) => 
        {
			const sectorArray = JSON.parse(getSectors);
			
			if (sectorArray !== null)
			{
				setSectors(sectorArray);
				setReady(true);
			}
			console.log('Done: Get Sectors!');
        });
    }

	useEffect(() => 
	{
		const fetchData = async () => 
		{
			await getToken();
			await getShopperId();
			await fetchSectors();
			
			setReady(true);
		};

		fetchData();
	}, []);

	useEffect(() => 
	{
		if (ready)
		{
			const shopper_sectors = sectors;
			console.log('Groceries: ', shopper_sectors);
			if (shopper_sectors.fashion.length > 0 || shopper_sectors.home.length > 0 || shopper_sectors.groceries.length > 0 || shopper_sectors.shoppingOpt1 || shopper_sectors.shoppingOpt2 || shopper_sectors.shoppingOpt3) { setShoppingCollapsed(true) } else { setShoppingCollapsed(false) }
			setFashion(shopper_sectors.fashion);
			setHome(shopper_sectors.home);
			setGroceries(shopper_sectors.groceries);
			setShoppingOpt1(shopper_sectors.shoppingOpt1);
			setShoppingOpt2(shopper_sectors.shoppingOpt2);
			setShoppingOpt3(shopper_sectors.shoppingOpt3);

			if (shopper_sectors.accomodation.length > 0 || shopper_sectors.transport.length > 0 || shopper_sectors.travelOpt1) { setTravelCollapsed(true) } else { setTravelCollapsed(false) }
			setAccomodation(shopper_sectors.accomodation);
			setTransport(shopper_sectors.transport);
			setTravelOpt1(shopper_sectors.travelOpt1);

			if (shopper_sectors.sport.length > 0 || shopper_sectors.doctor.length > 0 || shopper_sectors.healthOpt1 || shopper_sectors.healthOpt2 || shopper_sectors.healthOpt3) { setHealthCollapsed(true) } else { setHealthCollapsed(false) }
			setSport(shopper_sectors.sport);
			setDoctor(shopper_sectors.doctor);
			setHealthOpt1(shopper_sectors.healthOpt1);
			setHealthOpt2(shopper_sectors.healthOpt2);
			setHealthOpt3(shopper_sectors.healthOpt3);

			if (shopper_sectors.eat.length > 0 || shopper_sectors.activities.length > 0 || shopper_sectors.entEvent.length > 0 ) { setEntertainmentCollapsed(true) } else { setEntertainmentCollapsed(false) }
			setEat(shopper_sectors.eat);
			setActivities(shopper_sectors.activities	);
			setEntEvent(shopper_sectors.entEvent);

			if (shopper_sectors.eduEvent.length > 0 || shopper_sectors.learn.length > 0 || shopper_sectors.employment.length > 0) { setEducationCollapsed(true) } else { setEducationCollapsed(false) }
			setEduEvent(shopper_sectors.eduEvent);
			setLearn(shopper_sectors.learn);
			setEmployment(shopper_sectors.employment);

			if (shopper_sectors.propertyOpt1 || shopper_sectors.propertyOpt2 || shopper_sectors.propertyOpt3 || shopper_sectors.propertyOpt4) { setPropertyCollapsed(true) } else { setPropertyCollapsed(false) }
			setPropertyOpt1(shopper_sectors.propertyOpt1);
			setPropertyOpt2(shopper_sectors.propertyOpt2);
			setPropertyOpt3(shopper_sectors.propertyOpt3);
			setPropertyOpt4(shopper_sectors.propertyOpt4);

			if (shopper_sectors.serHome.length > 0 || shopper_sectors.serSelf.length > 0 || shopper_sectors.serFin.length > 0 || shopper_sectors.serPub.length > 0 || shopper_sectors.servicesOpt1) { setServicesCollapsed(true) } else { setServicesCollapsed(false) }
			setSerHome(shopper_sectors.serHome);
			setSerSelf(shopper_sectors.serSelf);
			setSerFin(shopper_sectors.serFin);
			setSerPub(shopper_sectors.serPub);
			setServicesOpt1(shopper_sectors.servicesOpt1);

			if (shopper_sectors.community.length > 0 || shopper_sectors.communityOpt1 || shopper_sectors.communityOpt2 || shopper_sectors.communityOpt3) { setCommunityCollapsed(true) } else { setCommunityCollapsed(false) }
			setCommunity(shopper_sectors.community);
			setCommunityOpt1(shopper_sectors.communityOpt1);
			setCommunityOpt2(shopper_sectors.communityOpt2);
			setCommunityOpt3(shopper_sectors.communityOpt3);
		}
	}, [ready]);

    const handleSubmit = async () => 
    {
		const record = 
		{
			titleShopping: "Shopping",
			fashion: fashion,
			home: home,
			groceries: groceries,
			shoppingOpt1: shoppingOpt1,
			shoppingOpt2: shoppingOpt2,
			shoppingOpt3: shoppingOpt3,
			titleTravel: "Travel",
			accomodation:accomodation,
			transport: transport,
			travelOpt1: travelOpt1,
			titleHealth: "Health & Wellness",
			sport: sport,
			doctor: doctor,
			healthOpt1: healthOpt1,
			healthOpt2: healthOpt2,
			healthOpt3: healthOpt3,
			titleEnt: "Entertainment",
			eat: eat,
			activities: activities,
			entEvent: entEvent,
			titleEdu: "Education & Employment",
			eduEvent: eduEvent,
			learn: learn,
			employment: employment,
			titleProperty: "Property",
			propertyOpt1: propertyOpt1,
			propertyOpt2: propertyOpt2,
			propertyOpt3: propertyOpt3,
			propertyOpt4: propertyOpt4,
			titleServices: "Services",
			serHome: serHome,
			serSelf: serSelf,
			serFin: serFin,
			serPub: serPub,
			servicesOpt1: servicesOpt1,
			titleCommunity: "Community",
			community: community,
			communityOpt1: communityOpt1,
			communityOpt2: communityOpt2,
			communityOpt3: communityOpt3
		};
		let recordString = JSON.stringify(record);
		await DbUtils.setItem('shopper_sectors', recordString);

		// Update server
		const apiRecord = [
			{shopper_id: shopperId},
			{data: recordString}
		];
		const res = await updShopperSectors(token, apiRecord);
		const status = res.status;

		if (status)
		{
			Toast.show({
				type: 'success',
				position: 'bottom',
				text1: 'Success',
				text2: 'Changes have been successfully updated.',
				visibilityTime: 1000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		
			props.navigation.navigate('ShopperAccIntHome');
    	} 
		else 
		{
			Toast.show({
				type: 'error',
				position: 'bottom',
				text1: 'Server error',
				text2: 'There was a problen updating your changes.',
				visibilityTime: 1000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		}
    }
    
    return (
        <SafeAreaView style={{ flex: 1, width: '100%' }}>
            <TopNavArrowTitle title="Tell us your interests" alignment="start" navigation={props.navigation} />
            <ScrollView style={{ backgroundColor: 'white' }}>
                <Layout style={[MainStyles.layout_container, style={paddingStart: 15, paddingEnd: 15}]}>

					<Divider style={{ width: '100%', height: 1, marginTop: 10, marginBottom: 15, backgroundColor: '#DEDDE7' }} />
					{/* Shopping */}
					<Card style={{ width: '100%' }}>
						<TouchableOpacity style={{ width: '100%' }} onPress={() => setShoppingCollapsed(!shoppingCollapsed)}>
							<View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1, marginBottom: 10 }}>
								<TitleThree title="Shopping" mb={5} flex={1} />
								<Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
							</View>
						</TouchableOpacity>
						{shoppingCollapsed && (
							<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
								<DropdownMultiSelect data={fashionData} icon="shopping-cart-outline" value={fashion} onChange={setFashion} placeholder="Fashion & Beauty" />
								<DropdownMultiSelect data={homeData} icon="shopping-cart-outline" value={home} onChange={setHome} placeholder="Home" />
								<DropdownMultiSelect data={groceriesData} icon="shopping-cart-outline" value={groceries} onChange={setGroceries} placeholder="Groceries" />
								<Checkbox label="Hardware & Electrical" checked={shoppingOpt1} onChange={setShoppingOpt1} mt={15} mb={10} />
								<Checkbox label="Stationary & Gifts" checked={shoppingOpt2} onChange={setShoppingOpt2} mb={10} />
								<Checkbox label="Household Goods" checked={shoppingOpt3} onChange={setShoppingOpt3}  mb={10} />
							</View>
						)}
                    </Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />
					
					{/* Travel */}
					<Card style={{ width: '100%' }}>
						<TouchableOpacity style={{ width: '100%' }} onPress={() => setTravelCollapsed(!travelCollapsed)}>
							<View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
								<TitleThree title="Travel" mb={5} flex={1}  />
								<Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
							</View>
						</TouchableOpacity>
						{travelCollapsed && (
							<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
								<DropdownMultiSelect data={accomodationData} icon="navigation-2-outline" value={accomodation} onChange={setAccomodation} placeholder="Accommodation" />
								<DropdownMultiSelect data={transportData} icon="navigation-2-outline" value={transport} onChange={setTransport} placeholder="Transport" />
								<Checkbox label="Travel Agents" checked={travelOpt1} onChange={setTravelOpt1} mt={15} mb={10} />
							</View>
						)}
					</Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />

					{/* Health & Wellness */}
					<Card style={{ width: '100%' }}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setHealthCollapsed(!healthCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
                            <TitleThree title="Health & Wellness" mb={5} flex={1} />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
					{healthCollapsed && (
						<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
							<DropdownMultiSelect data={sportData} icon={"activity-outline"} value={sport} onChange={setSport} placeholder="Sports & Recreation" />
							<DropdownMultiSelect data={doctorData} icon={"activity-outline"} value={doctor} onChange={setDoctor} placeholder="Doctors & Specialists" />
							<Checkbox label="Health Stores & Pharmacies" checked={healthOpt1} onChange={setHealthOpt1} mt={15} mb={10} />
							<Checkbox label="Hospitals & Trauma Centres" checked={healthOpt2} onChange={setHealthOpt2} mt={15} mb={10} />
							<Checkbox label="Ambulance & Emergency Contacts" checked={healthOpt3} onChange={setHealthOpt3} mt={15} mb={10} />
						</View>
						)}
					</Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />

					{/* Entertainment */}
					<Card style={{ width: '100%' }}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setEntertainmentCollapsed(!entertainmentCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
                            <TitleThree title="Entertainment" mb={5} flex={1} />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
					{entertainmentCollapsed && (
						<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
							<DropdownMultiSelect data={eatData} icon="music-outline" value={eat} onChange={setEat} placeholder="Eat & Drink" />
							<DropdownMultiSelect data={activitiesData} icon="music-outline" value={activities} onChange={setActivities} placeholder="Activities" />
							<DropdownMultiSelect data={entEventData} icon="music-outline" value={entEvent} onChange={setEntEvent} placeholder="Events" />
						</View>
					)}
					</Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />

					{/* Education & Employment */}
					<Card style={{ width: '100%' }}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setEducationCollapsed(!educationCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
                            <TitleThree title="Education & Employment" mb={5} flex={1} />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
					{educationCollapsed && (
						<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
							<DropdownMultiSelect data={eduEventData} icon="book-open-outline" value={eduEvent} onChange={setEduEvent} placeholder="Events" />
							<DropdownMultiSelect data={learnData} icon="book-open-outline" value={learn} onChange={setLearn} placeholder="Learning" />
							<DropdownMultiSelect data={employmentData} icon="book-open-outline" value={employment} onChange={setEmployment} placeholder="Employment" />
						</View>
					)}
					</Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />

					{/* Property */}
					<Card style={{ width: '100%' }}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setPropertyCollapsed(!propertyCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
                            <TitleThree title="Property" mb={5} flex={1} />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
					{propertyCollapsed && (
						<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
							<Checkbox label="For Sale (Agents)" checked={propertyOpt1} onChange={setPropertyOpt1} mt={15} mb={10} />
							<Checkbox label="To Rent (Agents)" checked={propertyOpt2} onChange={setPropertyOpt2} mt={15} mb={10} />
							<Checkbox label="Commercial (Agents)" checked={propertyOpt3} onChange={setPropertyOpt3} mt={15} mb={10} />
							<Checkbox label="Legal (Property Law Firms)" checked={propertyOpt4} onChange={setPropertyOpt4} mt={15} mb={10} />
						</View>
					)}
					</Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />

					{/* Services */}
					<Card style={{ width: '100%' }}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setServicesCollapsed(!servicesCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
                            <TitleThree title="Services" mb={5} flex={1} />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
					{servicesCollapsed && (
						<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
							<DropdownMultiSelect data={serHomeData} icon="link-2-outline" value={serHome} onChange={setSerHome} placeholder="Home" />
							<DropdownMultiSelect data={serSelfData} icon="link-2-outline" value={serSelf} onChange={setSerSelf} placeholder="Self Care" />
							<DropdownMultiSelect data={serFinData} icon="link-2-outline" value={serFin} onChange={setSerFin} placeholder="Financial" />
							<DropdownMultiSelect data={serPubData} icon="link-2-outline" value={serPub} onChange={setSerPub} placeholder="Public Service Contacts" />
							<Checkbox label="Legal" checked={servicesOpt1} onChange={setServicesOpt1} mt={15} mb={10} />							
						</View>
					)}
					</Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />

					{/* Community */}
					<Card style={{ width: '100%' }}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setCommunityCollapsed(!communityCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
                            <TitleThree title="Community" mb={5} flex={1} />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
					{communityCollapsed && (
						<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
							<DropdownMultiSelect data={communityData} icon="people-outline" value={community} onChange={setCommunity} placeholder="Charity Organisations" />
							<Checkbox label="Non-Profits" checked={communityOpt1} onChange={setCommunityOpt1} mt={15} mb={10} />							
							<Checkbox label="NGO's" checked={communityOpt2} onChange={setCommunityOpt2} mt={15} mb={10} />							
							<Checkbox label="Support Groups" checked={communityOpt3} onChange={setCommunityOpt3} mt={15} mb={10} />							
						</View>
					)}
					</Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />

                    <ButtonPrimary name="Update" width="100%" marginTop={25} onpress={handleSubmit}/>
                </Layout>
                
            </ScrollView>
        </SafeAreaView>
    );
};

export default Add;