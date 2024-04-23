import React, {useState, useEffect} from 'react';
import { sectorData } from '../../../../sector.data';
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

// const fashionData = [{ label: 'Clothing', value: 'Clothing' }, { label: 'Shoes', value: 'Shoes' }, { label: 'Accessories', value: 'Accessories' }, { label: 'Make-Up & Cosmetics', value: 'Make-Up & Cosmetics' }, { label: 'Bath & Body', value: 'Bath & Body' }, { label: 'Clothing Designers & Stylists', value: 'Clothing Designers & Stylists' }, { label: 'Hair Stylists & Products', value: 'Hair Stylists & Products' }, { label: 'Make-Up Artists', value: 'Make-Up Artists' }, { label: 'Skin & Beauty Technicians', value: 'Skin & Beauty Technicians' },	{ label: 'Costume Hire', value: 'Costume Hire' }];
// const homeData = [{ label: 'Furniture', value: 'Furniture' }, { label: 'Fixtures & Fittings', value: 'Fixtures & Fittings' }, { label: 'Homeware & Decor', value: 'Homeware & Decor' }, { label: 'Electronics & Appliances', value: 'Electronics & Appliances' }];
// const groceriesData = [{ label: 'Food & Beverage', value: 'Food & Beverage' }, { label: 'Local Markets & Homemade Goods', value: 'Local Markets & Homemade Goods' }, { label: 'Household Goods', value: 'Household Goods' }];
// const accomodationData = [{ label: 'Hotels', value: 'Hotels' }, { label: 'Guest Lodges', value: 'Guest Lodges' }, { label: 'BnBs', value: 'BnBs' }, { label: 'Lodges', value: 'Lodges' }, { label: 'Villas & Private Homes', value: 'Villas & Private Homes' }, { label: 'Backpackers', value: 'Backpackers' }, { label: 'Other - E.g. Houseboats', value: 'Other - E.g. Houseboats' }];
// const transportData = [{ label: 'Hotels', value: 'Hotels' }, { label: 'Guest Lodges', value: 'Guest Lodges' }, { label: 'BnBs', value: 'BnBs' }, { label: 'Lodges', value: 'Lodges' }, { label: 'Villas & Private Homes', value: 'Villas & Private Homes' }, { label: 'Backpackers', value: 'Backpackers' }, { label: 'Other - E.g. Houseboats', value: 'Other - E.g. Houseboats' }];
// const sportData = [{ label: 'Gyms', value: 'Gyms' }, { label: 'Sports Clubs', value: 'Sports Clubs' }, { label: 'Spa\'s', value: 'Spa\'s' }, { label: 'Outdoor Activities', value: 'Outdoor Activities' }];
// const doctorData = [{ label: 'General Practitioners', value: 'General Practitioners' }, { label: 'Physicians', value: 'Physicians' }, { label: 'Physiotherapists', value: 'Physiotherapists' }, { label: 'Chiropractors', value: 'Chiropractors' }, { label: 'Surgeons', value: 'Surgeons' }, { label: 'Dental', value: 'Dental' }, { label: 'Homeopathic', value: 'Homeopathic' }, { label: 'Mental Health', value: 'Mental Health' }, { label: 'Paediatric', value: 'Paediatric' }, { label: 'Other Specialists', value: 'Other Specialists' }];
// const eatData = [{ label: 'Restaurants', value: 'Restaurants' }, { label: 'Bars', value: 'Bars' }, { label: 'Clubs', value: 'Clubs' }, { label: 'Coffee Shops', value: 'Coffee Shops' }, { label: 'Takeaways', value: 'Takeaways' }, { label: 'Bakeries & Patisseries', value: 'Bakeries & Patisseries' }, { label: 'Speciality Foods', value: 'Speciality Foods' }, { label: 'Catering & Ready Made', value: 'Catering & Ready Made' }];
// const activitiesData = [{ label: 'Movies', value: 'Movies' }, { label: 'Entertainment Centres', value: 'Entertainment Centres' }, { label: 'Arts', value: 'Arts' }, { label: 'Outdoor Leisure', value: 'Outdoor Leisure' }, { label: 'Event Hire Specialists', value: 'Event Hire Specialists' }, { label: 'Venues', value: 'Venues' }, { label: 'Event Planners', value: 'Event Planners' }, { label: 'Children', value: 'Children' }];
// const entEventData = [{ label: 'Music', value: 'Music' }, { label: 'Arts', value: 'Arts' }];
// const eduEventData = [{ label: 'Preschools', value: 'Preschools' }, { label: 'Primary Schools', value: 'Primary Schools' }, { label: 'Secondary Schools', value: 'Secondary Schools' }, { label: 'Tertiary Education', value: 'Tertiary Education' }];
// const learnData = [{ label: 'Courses', value: 'Courses' }, { label: 'E-Learning', value: 'E-Learning' }];
// const employmentData = [{ label: 'Recruitment Agencies', value: 'Recruitment Agencies' }];
// const serHomeData = [{ label: 'Building', value: 'Building' }, { label: 'Interiors', value: 'Interiors' }, { label: 'Plumbing', value: 'Plumbing' }, { label: 'Electrical', value: 'Electrical' }, { label: 'Painting', value: 'Painting' }, { label: 'Landscaping', value: 'Landscaping' }, { label: 'Cleaning', value: 'Cleaning' }, { label: 'Pest Control', value: 'Pest Control' }, { label: 'Veterinary & Pet Parlours', value: 'Veterinary & Pet Parlours' }, { label: 'Security', value: 'Security' }, { label: 'Communications & Connectivity', value: 'Communications & Connectivity' }, ];
// const serSelfData = [{ label: 'Hair Dressers & Stylists', value: 'Hair Dressers & Stylists' }, { label: 'Beauty Spa\'s', value: 'Beauty Spa\'s' }];
// const serFinData = [{ label: 'Banks', value: 'Banks' }, { label: 'Bureau De Change', value: 'Bureau De Change' }, { label: 'Financial Management', value: 'Financial Management' }, { label: 'Accountants', value: 'Accountants' }, { label: 'Insurance', value: 'Insurance' }];
// const serPubData = [{ label: 'Water', value: 'Water' }, { label: 'Electricity', value: 'Electricity' }, { label: 'Roads', value: 'Roads' }, { label: 'Police', value: 'Police' }, { label: 'Fire Department', value: 'Fire Department' }, { label: 'Accident & Emergency', value: 'Accident & Emergency' }];
// const communityData = [{ label: 'Children', value: 'Children' }, { label: 'Old Age Pensioners', value: 'Old Age Pensioners' }, { label: 'Community Projects', value: 'Community Projects' }, { label: 'Conservation', value: 'Conservation' }];

const Add = (props) => 
{
	const shoppingData = sectorData.find(sector => sector.title === "Shopping");
	const shoppingLabels = shoppingData.categories.map(category => category.name);
	const fashionAndBeautyCategory = shoppingData.categories.find(category => category.name === "Fashion & Beauty");
	const fashionData = fashionAndBeautyCategory.items;
	const homeCategory = shoppingData.categories.find(category => category.name === "Home");
	const homeData = homeCategory.items;
	const groceriesCategory = shoppingData.categories.find(category => category.name === "Groceries");
	const groceriesData = groceriesCategory.items;

	const travelData = sectorData.find(sector => sector.title === "Travel");
	const travelLabels = travelData.categories.map(category => category.name);
	const accommodationCategory = travelData.categories.find(category => category.name === "Accomodation");
	const accommodationData = accommodationCategory.items;
	const transportCategory = travelData.categories.find(category => category.name === "Transport");
	const transportData = transportCategory.items;
	
	const healthData = sectorData.find(sector => sector.title === "Health & Wellness");
	const healthLabels = healthData.categories.map(category => category.name);
	const sportCategory = healthData.categories.find(category => category.name === "Sports & Recreation");
	const sportData = sportCategory.items;
	const doctorCategory = healthData.categories.find(category => category.name === "Doctors & Specialists");
	const doctorData = doctorCategory.items;

	const entertainmentData = sectorData.find(sector => sector.title === "Entertainment");
	const entertainmentLabels = entertainmentData.categories.map(category => category.name);
	const eatCategory = entertainmentData.categories.find(category => category.name === "Eat & Drink");
	const eatData = eatCategory.items;
	const activitiesCategory = entertainmentData.categories.find(category => category.name === "Activities");
	const activitiesData = activitiesCategory.items;
	const entEventCategory = entertainmentData.categories.find(category => category.name === "Events");
	const entEventData = entEventCategory.items;

	const educationData = sectorData.find(sector => sector.title === "Education & Employment");
	const educationLabels = educationData.categories.map(category => category.name);
	const eduEventDataCategory = educationData.categories.find(category => category.name === "Schools");
	const eduEventData = eduEventDataCategory.items;
	const learnDataCategory = educationData.categories.find(category => category.name === "Learning");
	const learnData = learnDataCategory.items;
	const employmentCategory = educationData.categories.find(category => category.name === "Employment");
	const employmentData = employmentCategory.items;

	const propertyData = sectorData.find(sector => sector.title === "Property");
	const propertyLabels = propertyData.categories.map(category => category.name);

	const servicesData = sectorData.find(sector => sector.title === "Services");
	const servicesLabels = servicesData.categories.map(category => category.name);
	const serHomeCategory = servicesData.categories.find(category => category.name === "Home");
	const serHomeData = serHomeCategory.items;
	const serSelfCategory = servicesData.categories.find(category => category.name === "Self-care");
	const serSelfData = serSelfCategory.items;
	const serFinCategory = servicesData.categories.find(category => category.name === "Financial");
	const serFinData = serFinCategory.items;
	const serPubCategory = servicesData.categories.find(category => category.name === "Public Services Contacts");
	const serPubData = serPubCategory.items;

	const communityData = sectorData.find(sector => sector.title === "Community");
	const communityLabels = communityData.categories.map(category => category.name);
	const commCategory = communityData.categories.find(category => category.name === "Self-care");
	const commData = commCategory.items;

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
	const [communityOpt4, setCommunityOpt4] = useState(false);
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

			if (shopper_sectors.community.length > 0 || shopper_sectors.communityOpt1 || shopper_sectors.communityOpt2 || shopper_sectors.communityOpt3 || shopper_sectors.communityOpt4) { setCommunityCollapsed(true) } else { setCommunityCollapsed(false) }
			setCommunity(shopper_sectors.community);
			setCommunityOpt1(shopper_sectors.communityOpt1);
			setCommunityOpt2(shopper_sectors.communityOpt2);
			setCommunityOpt3(shopper_sectors.communityOpt3);
			setCommunityOpt4(shopper_sectors.communityOpt4);
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
								<TitleThree title={shoppingData.title} mb={5} flex={1} />
								<Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
							</View>
						</TouchableOpacity>
						{shoppingCollapsed && (
							<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
								<DropdownMultiSelect data={fashionData} icon="shopping-cart-outline" value={fashion} onChange={setFashion} placeholder={shoppingLabels[0]} />
								<DropdownMultiSelect data={homeData} icon="shopping-cart-outline" value={home} onChange={setHome} placeholder={shoppingLabels[1]} />
								<DropdownMultiSelect data={groceriesData} icon="shopping-cart-outline" value={groceries} onChange={setGroceries} placeholder={shoppingLabels[2]} />
								<Checkbox label={shoppingLabels[3]} checked={shoppingOpt1} onChange={setShoppingOpt1} mt={15} mb={10} />
								<Checkbox label={shoppingLabels[4]} checked={shoppingOpt2} onChange={setShoppingOpt2} mb={10} />
								<Checkbox label={shoppingLabels[5]} checked={shoppingOpt3} onChange={setShoppingOpt3}  mb={10} />
							</View>
						)}
                    </Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />
					
					{/* Travel */}
					<Card style={{ width: '100%' }}>
						<TouchableOpacity style={{ width: '100%' }} onPress={() => setTravelCollapsed(!travelCollapsed)}>
							<View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
								<TitleThree title={travelData.title} mb={5} flex={1}  />
								<Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
							</View>
						</TouchableOpacity>
						{travelCollapsed && (
							<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
								<DropdownMultiSelect data={accommodationData} icon="navigation-2-outline" value={accomodation} onChange={setAccomodation} placeholder={travelLabels[0]} />
								<DropdownMultiSelect data={transportData} icon="navigation-2-outline" value={transport} onChange={setTransport} placeholder={travelLabels[1]} />
								<Checkbox label={travelLabels[2]} checked={travelOpt1} onChange={setTravelOpt1} mt={15} mb={10} />
							</View>
						)}
					</Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />

					{/* Health & Wellness */}
					<Card style={{ width: '100%' }}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setHealthCollapsed(!healthCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
                            <TitleThree title={healthData.title} mb={5} flex={1} />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
					{healthCollapsed && (
						<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
							<DropdownMultiSelect data={sportData} icon={"activity-outline"} value={sport} onChange={setSport} placeholder={healthLabels[0]} />
							<DropdownMultiSelect data={doctorData} icon={"activity-outline"} value={doctor} onChange={setDoctor} placeholder={healthLabels[1]} />
							<Checkbox label={healthLabels[2]} checked={healthOpt1} onChange={setHealthOpt1} mt={15} mb={10} />
							<Checkbox label={healthLabels[3]} checked={healthOpt2} onChange={setHealthOpt2} mt={15} mb={10} />
							<Checkbox label={healthLabels[4]} checked={healthOpt3} onChange={setHealthOpt3} mt={15} mb={10} />
						</View>
						)}
					</Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />

					{/* Entertainment */}
					<Card style={{ width: '100%' }}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setEntertainmentCollapsed(!entertainmentCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
                            <TitleThree title={entertainmentData.title} mb={5} flex={1} />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
					{entertainmentCollapsed && (
						<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
							<DropdownMultiSelect data={eatData} icon="music-outline" value={eat} onChange={setEat} placeholder={entertainmentLabels[0]} />
							<DropdownMultiSelect data={activitiesData} icon="music-outline" value={activities} onChange={setActivities} placeholder={entertainmentLabels[1]} />
							<DropdownMultiSelect data={entEventData} icon="music-outline" value={entEvent} onChange={setEntEvent} placeholder={entertainmentLabels[2]} />
						</View>
					)}
					</Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />

					{/* Education & Employment */}
					<Card style={{ width: '100%' }}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setEducationCollapsed(!educationCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
                            <TitleThree title={educationData.title} mb={5} flex={1} />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
					{educationCollapsed && (
						<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
							<DropdownMultiSelect data={eduEventData} icon="book-open-outline" value={eduEvent} onChange={setEduEvent} placeholder={educationLabels[0]} />
							<DropdownMultiSelect data={learnData} icon="book-open-outline" value={learn} onChange={setLearn} placeholder={educationLabels[1]} />
							<DropdownMultiSelect data={employmentData} icon="book-open-outline" value={employment} onChange={setEmployment} placeholder={educationLabels[2]} />
						</View>
					)}
					</Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />

					{/* Property */}
					<Card style={{ width: '100%' }}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setPropertyCollapsed(!propertyCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
                            <TitleThree title={propertyData.title} mb={5} flex={1} />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
					{propertyCollapsed && (
						<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
							<Checkbox label={propertyLabels[0]} checked={propertyOpt1} onChange={setPropertyOpt1} mt={15} mb={10} />
							<Checkbox label={propertyLabels[1]} checked={propertyOpt2} onChange={setPropertyOpt2} mt={15} mb={10} />
							<Checkbox label={propertyLabels[2]} checked={propertyOpt3} onChange={setPropertyOpt3} mt={15} mb={10} />
							<Checkbox label={propertyLabels[3]} checked={propertyOpt4} onChange={setPropertyOpt4} mt={15} mb={10} />
						</View>
					)}
					</Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />

					{/* Services */}
					<Card style={{ width: '100%' }}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setServicesCollapsed(!servicesCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
                            <TitleThree title={servicesData.title} mb={5} flex={1} />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
					{servicesCollapsed && (
						<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
							<DropdownMultiSelect data={serHomeData} icon="link-2-outline" value={serHome} onChange={setSerHome} placeholder={servicesLabels[0]} />
							<DropdownMultiSelect data={serSelfData} icon="link-2-outline" value={serSelf} onChange={setSerSelf} placeholder={servicesLabels[1]} />
							<DropdownMultiSelect data={serFinData} icon="link-2-outline" value={serFin} onChange={setSerFin} placeholder={servicesLabels[2]} />
							<DropdownMultiSelect data={serPubData} icon="link-2-outline" value={serPub} onChange={setSerPub} placeholder={servicesLabels[3]} />
							<Checkbox label={servicesLabels[4]} checked={servicesOpt1} onChange={setServicesOpt1} mt={15} mb={10} />							
						</View>
					)}
					</Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />

					{/* Community */}
					<Card style={{ width: '100%' }}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setCommunityCollapsed(!communityCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
                            <TitleThree title={communityData.title} mb={5} flex={1} />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
					{communityCollapsed && (
						<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
							<Checkbox label={communityLabels[0]} checked={communityOpt1} onChange={setCommunityOpt1} mt={15} mb={10} />							
							<Checkbox label={communityLabels[1]} checked={communityOpt2} onChange={setCommunityOpt2} mt={15} mb={10} />							
							<Checkbox label={communityLabels[2]} checked={communityOpt3} onChange={setCommunityOpt3} mt={15} mb={10} />							
							<Checkbox label={communityLabels[3]} checked={communityOpt4} onChange={setCommunityOpt4} mt={15} mb={10} />							
							<DropdownMultiSelect data={commData} icon="people-outline" value={community} onChange={setCommunity} placeholder={communityLabels[4]} />
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