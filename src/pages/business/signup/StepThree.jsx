import React, {useState, useEffect} from 'react';
import { sectorData } from "../../../sector.data";
import DbUtils from '../../../services/DbUtils'; 
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../components/TopNavBack';
import { SafeAreaView, ScrollView, View, TouchableOpacity } from 'react-native';
import { Layout, Divider, Icon, Card } from '@ui-kitten/components';
import { TitleThree } from '../../../components/TitleThree';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { DropdownMultiSelect } from '../../../components/DropdownMultiSelect';
import { Checkbox } from '../../../components/Checkbox';

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
			<TopNavBack title="Business sector(s)" alignment="start" navigation={props.navigation} pops={1} />

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

                    <ButtonPrimary name="Next" width="100%" marginTop={25} onpress={handleSubmit}/>
                </Layout>
                
            </ScrollView>
        </SafeAreaView>
    );
};

export default StepThree;