import React, {useState} from 'react';
import DbUtils from '../../../services/DbUtils';
import MainStyles from '../../../assets/styles/MainStyles';
import Collapsible from 'react-native-collapsible';
import { Checkbox } from '../../../components/Checkbox';
import { TopNavArrowTitle } from '../../../components/TopNavArrowTitle';
import { SafeAreaView, ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Layout, Divider, Icon, Card } from '@ui-kitten/components';
import { TitleThree } from '../../../components/TitleThree';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { MultiSelect } from 'react-native-element-dropdown';
import { DropdownMultiSelect } from '../../../components/DropdownMultiSelect';

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

const StepTwo = (props) => 
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

	const [selected, setSelected] = useState(['10km radius', '15km radius']);

    const handleNext = async () =>
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
			communityOpt3: communityOpt3
		}
		let recordString = JSON.stringify(record);
		await DbUtils.setItem('shopper_sectors', recordString);

        props.navigation.navigate('SignupUserStepThree');
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

                    <ButtonPrimary name="Next" width="100%" marginTop={25} onpress={handleNext}/>
                </Layout>
                
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
	dropdown: {
		width: '100%',
		flex: 1,
		height: 50,
		backgroundColor: 'transparent',
		borderBottomColor: 'gray',
		borderBottomWidth: 0.5,
	  },
	  placeholderStyle: {
		fontSize: 16,
		color: '#000',
	  },
	  selectedTextStyle: {
		fontSize: 14,
		color: '#000',
	  },
	  iconStyle: {
		width: 20,
		height: 20,
	  },
	  inputSearchStyle: {
		height: 40,
		fontSize: 16,
		color: '#000',
	  },
	  icon: {
		marginRight: 5,
	  },
	  selectedStyle: {
		borderRadius: 12,
		color: '#000',
	  },
  });

export default StepTwo;