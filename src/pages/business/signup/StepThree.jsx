import React, {useState} from 'react';
import DbUtils from '../../../services/DbUtils'; 
import MainStyles from '../../../assets/styles/MainStyles';
import AccordianCheckboxList from '../../../components/AccordianCheckboxList';
import Collapsible from 'react-native-collapsible';
import { Checkbox } from '../../../components/Checkbox';
import { TopNavArrowTitle } from '../../../components/TopNavArrowTitle';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Layout, Divider, Icon } from '@ui-kitten/components';
import { Label } from '../../../components/Label';
import { TitleThree } from '../../../components/TitleThree';
import { ButtonPrimary } from '../../../components/ButtonPrimary';

const StepThree = (props) => 
{
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [checked, setChecked] = useState(false);

    const handleSubmit = async () =>
    {
		await updProfile('shoppingData', shoppingData);
		await updProfile('travelData', travelData);
		await updProfile('healthData', healthData);
		await updProfile('entertainmentData', entertainmentData);
		await updProfile('educationData', educationData);
		await updProfile('propertyData', propertyData);
		await updProfile('servicesData', servicesData);
		await updProfile('communityData', communityData);

        props.navigation.navigate('SignupBusinessStepFour');
    }

    // const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5", "Option 6", "Option 7"];
    // const selfCare = ["Childres", "Old Age Pensioners", "Community Projects", "Conservation"];
    // const shopping = {
    //     topics: {
    //         "Fashion & Beauty": ["Clothing", "Shoes"],
    //         "Home": ["Furniture", "Fixtures & Fittings"],
    //         "Groceries": ["Food & Beverage", "Local Markets & Homemade Goods"],
    //         "Hardware & Electrical": [],
    //         "Stationary & Gifts": ["Pens", "Paper"],
    //         "Children": ["Toys"]
    //     }
    //};
	const shopping = [
		{ "id": 1, "type": 0, "item": "Fashion & Beauty", "checked": false }, 
		{ "id": 2, "type": 1, "item": "Clothing", "checked": false }, 
		{ "id": 3, "type": 1, "item": "Shoes", "checked": false }, 
		{ "id": 4, "type": 0, "item": "Home", "checked": false }, 
		{ "id": 5, "type": 1, "item": "Furniture", "checked": false }, 
		{ "id": 6, "type": 1, "item": "Fixtures & Fittings", "checked": false }];
	const [shoppingData, setShoppingData] = useState(shopping);
	
	const travel = [
		{ "id": 1, "type": 0, "item": "Accomodation", "checked": false }, 
		{ "id": 2, "type": 1, "item": "Hotels", "checked": false }, 
		{ "id": 3, "type": 1, "item": "Guest Lodges", "checked": false }, 
		{ "id": 4, "type": 1, "item": "BnB's", "checked": false }, 
		{ "id": 5, "type": 0, "item": "Transport", "checked": false }, 
		{ "id": 6, "type": 1, "item": "Taxis", "checked": false },
		{ "id": 7, "type": 1, "item": "Trains", "checked": false },
		{ "id": 8, "type": 0, "item": "Travel Agents", "checked": false }];
	const [travelData, setTravelData] = useState(travel);
	
	const health = [
		{ "id": 1, "type": 0, "item": "Sports & Recreation", "checked": false }, 
		{ "id": 3, "type": 1, "item": "Gyms", "checked": false }, 
		{ "id": 4, "type": 1, "item": "Sports Clubs", "checked": false }, 
		{ "id": 5, "type": 1, "item": "Spa's", "checked": false }, 
		{ "id": 6, "type": 1, "item": "Outdoor Activities", "checked": false }, 
		{ "id": 7, "type": 0, "item": "Doctors & Specialists", "checked": false }, 
		{ "id": 8, "type": 1, "item": "General Practitioners", "checked": false }, 
		{ "id": 9, "type": 1, "item": "Physicians", "checked": false },
		{ "id": 10, "type": 1, "item": "Physiotherapists", "checked": false },
		{ "id": 11, "type": 1, "item": "Chiropractors", "checked": false },
		{ "id": 12, "type": 0, "item": "Health Stores & Pharmacies", "checked": false },
		{ "id": 13, "type": 0, "item": "Health Stores & Pharmacies", "checked": false },
		{ "id": 14, "type": 0, "item": "Ambulances & Emergency Contacts", "checked": false }];
	const [healthData, setHealthData] = useState(health);
	
	const entertainment = [
		{ "id": 1, "type": 0, "item": "Eat & Drink", "checked": false }, 
		{ "id": 2, "type": 1, "item": "Restaurants", "checked": false }, 
		{ "id": 3, "type": 1, "item": "Bars", "checked": false }, 
		{ "id": 4, "type": 1, "item": "Clubs", "checked": false }, 
		{ "id": 5, "type": 1, "item": "Coffee Shops", "checked": false }, 
		{ "id": 6, "type": 0, "item": "Activities", "checked": false }, 
		{ "id": 7, "type": 1, "item": "Movies", "checked": false }, 
		{ "id": 8, "type": 1, "item": "Entertainment Centres", "checked": false },
		{ "id": 9, "type": 1, "item": "Arts", "checked": false },
		{ "id": 10, "type": 1, "item": "Outdoor Leisure", "checked": false },
		{ "id": 11, "type": 0, "item": "Events", "checked": false },
		{ "id": 12, "type": 1, "item": "Music", "checked": false },
		{ "id": 13, "type": 1, "item": "Arts", "checked": false }];
	const [entertainmentData, setEntertainmentData] = useState(entertainment);
	
	const education = [
		{ "id": 1, "type": 0, "item": "Events", "checked": false }, 
		{ "id": 2, "type": 1, "item": "Preschools", "checked": false }, 
		{ "id": 3, "type": 1, "item": "Primary Schools", "checked": false }, 
		{ "id": 4, "type": 1, "item": "Secondary Schools", "checked": false }, 
		{ "id": 5, "type": 1, "item": "Tertiary Education", "checked": false }, 
		{ "id": 6, "type": 0, "item": "Learning", "checked": false }, 
		{ "id": 7, "type": 1, "item": "Courses", "checked": false }, 
		{ "id": 8, "type": 1, "item": "E-Learning", "checked": false },
		{ "id": 9, "type": 0, "item": "Employment", "checked": false },
		{ "id": 10, "type": 1, "item": "Recruitment Agencies", "checked": false }];
	const [educationData, setEducationData] = useState(education);
	
	const property = [
		{ "id": 1, "type": 0, "item": "For Sale (Agents)", "checked": false }, 
		{ "id": 2, "type": 0, "item": "To Rent (Agents)", "checked": false }, 
		{ "id": 3, "type": 0, "item": "Commercial (Agents)", "checked": false }, 
		{ "id": 4, "type": 0, "item": "Legal (Propert Law Firms)", "checked": false }];
	const [propertyData, setPropertyData] = useState(property);
	
	const services = [
		{ "id": 1, "type": 0, "item": "Home", "checked": false }, 
		{ "id": 2, "type": 1, "item": "Building", "checked": false }, 
		{ "id": 3, "type": 1, "item": "Interiors", "checked": false }, 
		{ "id": 4, "type": 1, "item": "Plumbing", "checked": false }, 
		{ "id": 5, "type": 1, "item": "Electrical", "checked": false }, 
		{ "id": 6, "type": 0, "item": "Self Care", "checked": false }, 
		{ "id": 7, "type": 1, "item": "Hair Dressors", "checked": false }, 
		{ "id": 8, "type": 1, "item": "Beauty Spa's", "checked": false }, 
		{ "id": 9, "type": 0, "item": "Financial", "checked": false }, 
		{ "id": 10, "type": 1, "item": "Banks", "checked": false }, 
		{ "id": 11, "type": 1, "item": "Bureau De Change", "checked": false }, 
		{ "id": 12, "type": 0, "item": "Public Services Contacts", "checked": false },
		{ "id": 13, "type": 1, "item": "Water", "checked": false }, 
		{ "id": 14, "type": 1, "item": "Electricity", "checked": false }, 
		{ "id": 15, "type": 1, "item": "Roads", "checked": false }, 
		{ "id": 16, "type": 1, "item": "Police", "checked": false }, 
		{ "id": 17, "type": 1, "item": "Fire Department", "checked": false }, 
		{ "id": 18, "type": 0, "item": "Legal", "checked": false }];
	const [servicesData, setServicesData] = useState(services);
	
	const community = [
		{ "id": 1, "type": 0, "item": "Charity Organisations", "checked": false }, 
		{ "id": 2, "type": 1, "item": "Children", "checked": false }, 
		{ "id": 3, "type": 1, "item": "Old Age Pensioners", "checked": false }, 
		{ "id": 4, "type": 1, "item": "Community Projects", "checked": false }, 
		{ "id": 5, "type": 1, "item": "Conservation", "checked": false }, 
		{ "id": 6, "type": 0, "item": "Non Profits", "checked": false }, 
		{ "id": 7, "type": 0, "item": "NGO's", "checked": false }, 
		{ "id": 8, "type": 0, "item": "Support Groups", "checked": false }];
	const [communityData, setCommunityData] = useState(services);

	const updProfile = async (key, newValue) => 
    {
        const profileDataString = await DbUtils.getItem('business_profile');
        const profileData = JSON.parse(profileDataString);
      
        profileData[key] = newValue;
        // console.log('key: ', key, ' newValue: ', newValue, ' profileData: ', profileData);
      
        await DbUtils.setItem('business_profile', JSON.stringify(profileData));
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Business Sector(s)" alignment="start" navigation={props.navigation} />
            {/* <DividerTop /> */}
            <ScrollView style={{ backgroundColor: 'white' }}>
                <Layout style={[MainStyles.layout_container]}>
                    <Label title="Choose which sector your business falls under:" textalign="left" mb={25} />
                        <AccordianCheckboxList title="Shopping" data={shopping} updateData={setShoppingData} bgColor="#F5F5F5" />
                    	<Divider style={{ width: '100%', height: 1, marginTop: 5, marginBottom: 5, backgroundColor: '#DEDDE7' }} />
                        <AccordianCheckboxList title="Travel" data={travel} updateData={setTravelData} bgColor="#F5F5F5" />
                    	<Divider style={{ width: '100%', height: 1, marginTop: 5, marginBottom: 5, backgroundColor: '#DEDDE7' }} />
                        <AccordianCheckboxList title="Health & Wellness" data={health} updateData={setHealthData} bgColor="#F5F5F5" />
                    	<Divider style={{ width: '100%', height: 1, marginTop: 5, marginBottom: 5, backgroundColor: '#DEDDE7' }} />
                        <AccordianCheckboxList title="Entertainment" data={entertainment} updateData={setEntertainmentData} bgColor="#F5F5F5" />
                    	<Divider style={{ width: '100%', height: 1, marginTop: 5, marginBottom: 5, backgroundColor: '#DEDDE7' }} />
                        <AccordianCheckboxList title="Educaton & Employment" data={education} updateData={setEducationData} bgColor="#F5F5F5" />
                    	<Divider style={{ width: '100%', height: 1, marginTop: 5, marginBottom: 5, backgroundColor: '#DEDDE7' }} />
                        <AccordianCheckboxList title="Property" data={property} updateData={setPropertyData} bgColor="#F5F5F5" />
                    	<Divider style={{ width: '100%', height: 1, marginTop: 5, marginBottom: 5, backgroundColor: '#DEDDE7' }} />
                        <AccordianCheckboxList title="Services" data={services} updateData={setServicesData} bgColor="#F5F5F5" />
                    	<Divider style={{ width: '100%', height: 1, marginTop: 5, marginBottom: 5, backgroundColor: '#DEDDE7' }} />
                        <AccordianCheckboxList title="Community" data={community} updateData={setCommunityData} bgColor="#F5F5F5" />
                    <ButtonPrimary name="Submit" width="100%" marginTop={25} onpress={handleSubmit}/>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default StepThree;