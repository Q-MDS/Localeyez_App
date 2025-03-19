import React, {useState, useEffect} from 'react';
import { sectorData } from "../../../sector.data";
import DbUtils from '../../../services/DbUtils'; 
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../components/TopNavBack';
import { SafeAreaView, ScrollView, View, TouchableOpacity } from 'react-native';
import { Layout, Divider, Icon, Card, Text } from '@ui-kitten/components';
import { TitleThree } from '../../../components/TitleThree';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { DropdownMultiSelect } from '../../../components/DropdownMultiSelect';
import { Checkbox } from '../../../components/Checkbox';
import { CheckboxList } from '../../../components/CheckboxList';

const StepThree = (props) => 
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
	const [agriculture, setAgriculture] = useState(false); // 1803
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

	const fetchSectors = async () => 
	{
		const getSectors = await DbUtils.getItem('business_sectors')
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
			console.log('Fashion: ', sectors);
			//if (shopper_sectors.fashion.some(item => item.value) || shopper_sectors.home.some(item => item.value) || shopper_sectors.groceries.some(item => item.value) || shopper_sectors.shoppingOpt1 || shopper_sectors.shoppingOpt2 || shopper_sectors.shoppingOpt3) { setShoppingCollapsed(true) } else { setShoppingCollapsed(false) }
			setFashion(shopper_sectors.fashion);
			setHome(shopper_sectors.home);
			setGroceries(shopper_sectors.groceries);
			setAgriculture(shopper_sectors.agriculture); // 1803
			setShoppingOpt1(shopper_sectors.shoppingOpt1);
			setShoppingOpt2(shopper_sectors.shoppingOpt2);
			setShoppingOpt3(shopper_sectors.shoppingOpt3);

			//if (shopper_sectors.accomodation.some(item => item.value) || shopper_sectors.transport.some(item => item.value)) { setTravelCollapsed(true) } else { setTravelCollapsed(false) }
			setAccomodation(shopper_sectors.accomodation);
			setTransport(shopper_sectors.transport);
			setTravelOpt1(shopper_sectors.travelOpt1);

			//if (shopper_sectors.sport.some(item => item.value) || shopper_sectors.doctor.some(item => item.value) || shopper_sectors.healthOpt1 || shopper_sectors.healthOpt2 || shopper_sectors.healthOpt3) { setHealthCollapsed(true) } else { setHealthCollapsed(false) }
			setSport(shopper_sectors.sport);
			setDoctor(shopper_sectors.doctor);
			setHealthOpt1(shopper_sectors.healthOpt1);
			setHealthOpt2(shopper_sectors.healthOpt2);
			setHealthOpt3(shopper_sectors.healthOpt3);

			// if (shopper_sectors.eat.some(item => item.value) || shopper_sectors.activities.some(item => item.value) || shopper_sectors.entEvent.some(item => item.value) ) { setEntertainmentCollapsed(true) } else { setEntertainmentCollapsed(false) }
			setEat(shopper_sectors.eat);
			setActivities(shopper_sectors.activities);
			setEntEvent(shopper_sectors.entEvent);

			// if (shopper_sectors.eduEvent.some(item => item.value) || shopper_sectors.learn.some(item => item.value) || shopper_sectors.employment.some(item => item.value)) { setEducationCollapsed(true) } else { setEducationCollapsed(false) }
			setEduEvent(shopper_sectors.eduEvent);
			setLearn(shopper_sectors.learn);
			setEmployment(shopper_sectors.employment);

			// if (shopper_sectors.propertyOpt1 || shopper_sectors.propertyOpt2 || shopper_sectors.propertyOpt3 || shopper_sectors.propertyOpt4) { setPropertyCollapsed(true) } else { setPropertyCollapsed(false) }
			setPropertyOpt1(shopper_sectors.propertyOpt1);
			setPropertyOpt2(shopper_sectors.propertyOpt2);
			setPropertyOpt3(shopper_sectors.propertyOpt3);
			setPropertyOpt4(shopper_sectors.propertyOpt4);

			// if (shopper_sectors.serHome.some(item => item.value) || shopper_sectors.serSelf.some(item => item.value) || shopper_sectors.serFin.some(item => item.value) || shopper_sectors.serPub.some(item => item.value) || shopper_sectors.servicesOpt1) { setServicesCollapsed(true) } else { setServicesCollapsed(false) }
			setSerHome(shopper_sectors.serHome);
			setSerSelf(shopper_sectors.serSelf);
			setSerFin(shopper_sectors.serFin);
			setSerPub(shopper_sectors.serPub);
			setServicesOpt1(shopper_sectors.servicesOpt1);

			// if (shopper_sectors.community.some(item => item.value)|| shopper_sectors.communityOpt1 || shopper_sectors.communityOpt2 || shopper_sectors.communityOpt3 || shopper_sectors.communityOpt4) { setCommunityCollapsed(true) } else { setCommunityCollapsed(false) }
			setCommunity(shopper_sectors.community);
			setCommunityOpt1(shopper_sectors.communityOpt1);
			setCommunityOpt2(shopper_sectors.communityOpt2);
			setCommunityOpt3(shopper_sectors.communityOpt3);
			setCommunityOpt4(shopper_sectors.communityOpt4);
		}
	}, [ready]);

	const handleFashionChange = (label, isChecked) => 
	{
		setFashion(prevFashion => 
		{
			return prevFashion.map(item => 
			item.label === label ? { ...item, value: isChecked } : item
			);
		});
	};
	const handleHomeChange = (label, isChecked) => 
	{
		setHome(prevHome => 
		{
			return prevHome.map(item => 
			item.label === label ? { ...item, value: isChecked } : item
			);
		});
	};
	const handleGroceriesChange = (label, isChecked) => 
	{
		setGroceries(prevGroceries => 
		{
			return prevGroceries.map(item => 
			item.label === label ? { ...item, value: isChecked } : item
			);
		});
	};
	const handleAccomodationChange = (label, isChecked) => 
		{
			setAccomodation(prevAccomodation => 
			{
				return prevAccomodation.map(item => 
				item.label === label ? { ...item, value: isChecked } : item
				);
			});
	};
	const handleTransportChange = (label, isChecked) => 
	{
		setTransport(prevTransport => 
		{
			return prevTransport.map(item => 
			item.label === label ? { ...item, value: isChecked } : item
			);
		});
	};
	const handleSportChange = (label, isChecked) => 
	{
		setSport(prevSport => 
		{
			return prevSport.map(item => 
			item.label === label ? { ...item, value: isChecked } : item
			);
		});
	};
	const handleDoctorChange = (label, isChecked) => 
	{
		setDoctor(prevDoctor => 
		{
			return prevDoctor.map(item => 
			item.label === label ? { ...item, value: isChecked } : item
			);
		});
	};
	const handleEatChange = (label, isChecked) => 
	{
		setEat(prevEat => 
		{
			return prevEat.map(item => 
			item.label === label ? { ...item, value: isChecked } : item
			);
		});
	};
	const handleActivitiesChange = (label, isChecked) => 
	{
		setActivities(prevActivities => 
		{
			return prevActivities.map(item => 
			item.label === label ? { ...item, value: isChecked } : item
			);
		});
	};
	const handleEntEventChange = (label, isChecked) => 
	{
		setEntEvent(prevEntEvent => 
		{
			return prevEntEvent.map(item => 
			item.label === label ? { ...item, value: isChecked } : item
			);
		});
	};
	const handleEduEventChange = (label, isChecked) => 
	{
		setEduEvent(prevEduEvent => 
		{
			return prevEduEvent.map(item => 
			item.label === label ? { ...item, value: isChecked } : item
			);
		});
	};
	const handleLearnChange = (label, isChecked) => 
	{
		setLearn(prevLearn => 
		{
			return prevLearn.map(item => 
			item.label === label ? { ...item, value: isChecked } : item
			);
		});
	};
	const handleEmploymentChange = (label, isChecked) => 
	{
		setEmployment(prevEmployment => 
		{
			return prevEmployment.map(item => 
			item.label === label ? { ...item, value: isChecked } : item
			);
		});
	};
	const handleSerHomeChange = (label, isChecked) => 
	{
		setSerHome(prevSerHome => 
		{
			return prevSerHome.map(item => 
			item.label === label ? { ...item, value: isChecked } : item
			);
		});
	};
	const handleSerSelfChange = (label, isChecked) => 
	{
		setSerSelf(prevSerSelf => 
		{
			return prevSerSelf.map(item => 
			item.label === label ? { ...item, value: isChecked } : item
			);
		});
	};
	const handleSerFinChange = (label, isChecked) => 
	{
		setSerFin(prevSerFin => 
		{
			return prevSerFin.map(item => 
			item.label === label ? { ...item, value: isChecked } : item
			);
		});
	};
	const handleSerPubChange = (label, isChecked) => 
	{
		setSerPub(prevSerPub => 
		{
			return prevSerPub.map(item => 
			item.label === label ? { ...item, value: isChecked } : item
			);
		});
	};
	const handleCommunityChange = (label, isChecked) => 
	{
		setCommunity(prevCommunity => 
		{
			return prevCommunity.map(item => 
			item.label === label ? { ...item, value: isChecked } : item
			);
		});
	};

	const handleSubmit = async () =>
    {
		// Save to async storage
		const record = 
		{
			titleShopping: "Shopping",
			fashion: fashion,
			home: home,
			groceries: groceries,
			shoppingOpt1: shoppingOpt1,
			shoppingOpt2: shoppingOpt2,
			shoppingOpt3: shoppingOpt3,
			agriculture: agriculture,
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
			communityOpt3: communityOpt3,
			communityOpt4: communityOpt4
		}
		let recordString = JSON.stringify(record);
		await DbUtils.setItem('business_sectors', recordString);

        props.navigation.navigate('SignupBusinessStepFour');
    }

    return (
		<SafeAreaView style={{ flex: 1, width: '100%' }}>
			<TopNavBack title="Back: Company Information" alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView style={{ backgroundColor: 'white' }}>
                <Layout style={[MainStyles.column_container]}>
					{/* Shopping */}
					<Card style={{ width: '100%' }}>
						<TouchableOpacity style={{ width: '100%' }} onPress={() => setShoppingCollapsed(!shoppingCollapsed)}>
							<View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1, marginBottom: 10 }}>
								<Text style={{ fontSize: 18, fontWeight:'bold', color: '#220622', flex: 1 }}>{shoppingData.title}</Text>
								<Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
							</View>
						</TouchableOpacity>
						{shoppingCollapsed && (
							<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
								<CheckboxList title={shoppingLabels[0]} data={fashion} onCheckboxChange={handleFashionChange} />
								<CheckboxList title={shoppingLabels[1]} data={home} onCheckboxChange={handleHomeChange} />
								<CheckboxList title={shoppingLabels[2]} data={groceries} onCheckboxChange={handleGroceriesChange} />
								<Checkbox label={shoppingLabels[3]} checked={agriculture} onChange={setAgriculture}  mt={15} mb={10} />
								<Checkbox label={shoppingLabels[4]} checked={shoppingOpt1} onChange={setShoppingOpt1} mb={10} />
								<Checkbox label={shoppingLabels[5]} checked={shoppingOpt2} onChange={setShoppingOpt2} mb={10} />
								<Checkbox label={shoppingLabels[6]} checked={shoppingOpt3} onChange={setShoppingOpt3}  mb={10} />
							</View>
						)}
                    </Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />
					
					{/* Travel */}
					<Card style={{ width: '100%' }}>
						<TouchableOpacity style={{ width: '100%' }} onPress={() => setTravelCollapsed(!travelCollapsed)}>
							<View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
								<Text style={{ fontSize: 18, fontWeight:'bold', color: '#220622', flex: 1 }}>{travelData.title}</Text>
								<Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
							</View>
						</TouchableOpacity>
						{travelCollapsed && (
							<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
								<CheckboxList title={travelLabels[0]} data={accomodation} onCheckboxChange={handleAccomodationChange} />
								<CheckboxList title={travelLabels[1]} data={transport} onCheckboxChange={handleTransportChange} />
								<Checkbox label={travelLabels[2]} checked={travelOpt1} onChange={setTravelOpt1} mt={15} mb={10} />
							</View>
						)}
					</Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />

					{/* Health & Wellness */}
					<Card style={{ width: '100%' }}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setHealthCollapsed(!healthCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
							<Text style={{ fontSize: 18, fontWeight:'bold', color: '#220622', flex: 1 }}>{healthData.title}</Text>
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
					{healthCollapsed && (
						<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
							<CheckboxList title={healthLabels[0]} data={sport} onCheckboxChange={handleSportChange} />
							<CheckboxList title={healthLabels[1]} data={doctor} onCheckboxChange={handleDoctorChange} />
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
							<Text style={{ fontSize: 18, fontWeight:'bold', color: '#220622', flex: 1 }}>{entertainmentData.title}</Text>
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
					{entertainmentCollapsed && (
						<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
							<CheckboxList title={entertainmentLabels[0]} data={eat} onCheckboxChange={handleEatChange} />
							<CheckboxList title={entertainmentLabels[1]} data={activities} onCheckboxChange={handleActivitiesChange} />
							<CheckboxList title={entertainmentLabels[2]} data={entEvent} onCheckboxChange={handleEntEventChange} />
						</View>
					)}
					</Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />

					{/* Education & Employment */}
					<Card style={{ width: '100%' }}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setEducationCollapsed(!educationCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
							<Text style={{ fontSize: 18, fontWeight:'bold', color: '#220622', flex: 1 }}>{educationData.title}</Text>
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
					{educationCollapsed && (
						<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
							<CheckboxList title={educationLabels[0]} data={eduEvent} onCheckboxChange={handleEduEventChange} />
							<CheckboxList title={educationLabels[1]} data={learn} onCheckboxChange={handleLearnChange} />
							<CheckboxList title={educationLabels[2]} data={employment} onCheckboxChange={handleEmploymentChange} />
						</View>
					)}
					</Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />

					{/* Property */}
					<Card style={{ width: '100%' }}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setPropertyCollapsed(!propertyCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
							<Text style={{ fontSize: 18, fontWeight:'bold', color: '#220622', flex: 1 }}>{propertyData.title}</Text>
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
							<Text style={{ fontSize: 18, fontWeight:'bold', color: '#220622', flex: 1 }}>{servicesData.title}</Text>
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
					{servicesCollapsed && (
						<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
							<CheckboxList title={servicesLabels[0]} data={serHome} onCheckboxChange={handleSerHomeChange} />
							<CheckboxList title={servicesLabels[1]} data={serSelf} onCheckboxChange={handleSerSelfChange} />
							<CheckboxList title={servicesLabels[2]} data={serFin} onCheckboxChange={handleSerFinChange} />
							<CheckboxList title={servicesLabels[3]} data={serPub} onCheckboxChange={handleSerPubChange} />
							<Checkbox label={servicesLabels[4]} checked={servicesOpt1} onChange={setServicesOpt1} mt={15} mb={10} />							
						</View>
					)}
					</Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />

					{/* Community */}
					<Card style={{ width: '100%' }}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setCommunityCollapsed(!communityCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
							<Text style={{ fontSize: 18, fontWeight:'bold', color: '#220622', flex: 1 }}>{communityData.title}</Text>
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
					{communityCollapsed && (
						<View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
							<Checkbox label={communityLabels[0]} checked={communityOpt1} onChange={setCommunityOpt1} mt={15} mb={10} />							
							<Checkbox label={communityLabels[1]} checked={communityOpt2} onChange={setCommunityOpt2} mt={15} mb={10} />							
							<Checkbox label={communityLabels[2]} checked={communityOpt3} onChange={setCommunityOpt3} mt={15} mb={10} />							
							<Checkbox label={communityLabels[3]} checked={communityOpt4} onChange={setCommunityOpt4} mt={15} mb={10} />							
							<CheckboxList title={communityLabels[4]} data={community} onCheckboxChange={handleCommunityChange} />	
						</View>
					)}
					</Card>

                    <Divider style={{ width: '100%', height: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#DEDDE7' }} />

                    <ButtonPrimary name="Next" width="100%" marginTop={25} onpress={handleSubmit}/>
                </Layout>
                
            </ScrollView>
        </SafeAreaView>
    );
};

export default StepThree;