import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import DbUtils from "../../../../services/DbUtils";
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../../components/TopNavArrowTitle";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { TextIcon } from "../../../../components/TextIcon";
import TextTwo from "../../../../components/TextTwo";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";

const Home = (props) => 
{
	const [sectors, setSectors] = useState([]);
	const [ready, setReady] = useState(false);

	const src = {
		"titleShopping": "Shopping",
		"fashion": [
		  "Shoes"
		],
		"home": [
		  "Fixtures & Fittings"
		],
		"groceries": [
			"Food and Beverage"
		],
		"shoppingOpt1": true,
		"shoppingOpt2": true,
		"shoppingOpt3": true,
		"titleTravel": "Travel",
		"accomodation": [
		  "Hotels"
		],
		"transport": [
		  "BnBs"
		],
		"travelOpt1": true,
		"titleHealth": "Health & Wellness",
		"sport": [
		  "Gyms"
		],
		"doctor": [
		  "Physicians"
		],
		"healthOpt1": true,
		"healthOpt2": true,
		"healthOpt3": true,
		"titleEnt": "Entertainment",
		"eat": [
		  "Bars"
		],
		"activities": [
		  "Movies"
		],
		"entEvent": [
		  "Music"
		],
		"titleEdu": "Education & Employment",
		"eduEvent": [
		  "Preschools"
		],
		"learn": [
		  "Courses"
		],
		"employment": [
		  "Recruitment Agencies"
		],
		"titleProperty": "Property",
		"propertyOpt1": true,
		"propertyOpt2": true,
		"propertyOpt3": true,
		"propertyOpt4": true,
		"titleServices": "Services",
		"serHome": [
		  "Building",
		  "Interiors"
		],
		"serSelf": [
		  "Hair Dressers & Stylists"
		],
		"serFin": [
		  "Banks",
		  "Bureau De Change"
		],
		"serPub": [],
		"servicesOpt1": true,
		"titleCommunity": "Community",
		"community": [
		  "Children"
		],
		"communityOpt1": false,
		"communityOpt2": true,
		"communityOpt3": false,
		"communityOpt4": false
	};

	const fullDesc = {
		shoppingOpt1: "Hardware & Electrical",
		shoppingOpt2: "Stationary & Gifts",
		shoppingOpt3: "Children",
		travelOpt1: "Travel Agents",
		healthOpt1: "Health Stores & Pharmacies",
		healthOpt2: "Hospitals & Trauma Centres",
		healthOpt3: "Ambulance & Emergency Contacts",
		propertyOpt1: "For Sale (Agents)",
		propertyOpt2: "To Rent (Agents)",
		propertyOpt3: "Commercial (Agents)",
		propertyOpt4: "Legal (Property Law Firms",
		servicesOpt1: "Legal",
		communityOpt1: "Charity Organisations",
		communityOpt2: "Non-Profits",
		communityOpt3: "NGO's",
		communityOpt4: "Support Groups",
	};

	const aaa = {
		"fashion": "Fashion & Beauty",
		"home": "Home",
		"groceries": "Groceries",
		"accomodation": "Accommodation",
		"transport": "Transport",
		"sport": "Sports & Recreation",
		"doctor": "Doctors & Specialists",
		"eat": "Entertainment",
		"activities": "Activities",
		"entEvent": "Events",
		"eduEvent": "Schools",
		"learn": "Learning",
		"employment": "Employment",
		"serHome" : "Home",
		"serSelf" : "Self-Care",
		"serFin" : "Financial",
		"serPub" : "Public Services Contacts",
		"community": "Community",
	}

	const fetchSectors = async () => 
    {
        const getSectors = await DbUtils.getItem('shopper_sectors')
        .then((getSectors) => 
        {
			const sectorArray = JSON.parse(getSectors);
			console.log('BBB1:', sectorArray);
			// const jsonSectors = JSON.parse(sectorArray);
			// console.log('BBB2:', jsonSectors);...
			if (sectorArray !== null)
			{
				console.log('Poop 2:', sectorArray);
				setSectors(sectorArray);
				setReady(true);
			}
        });
    }

	useFocusEffect(React.useCallback(() => 
	{
		fetchSectors();
	}, []));

	useEffect(() => 
	{
		if (ready)
		{
			console.log('BBB: ', sectors);
		}
	}, [ready]);

	// useEffect(() => {
	// 	console.log('Updated sectors: ', src.length);

	// }, [sectors]);

    const handleAddInterests = () => 
    {
        console.log('Add More Interests clicked!');
        props.navigation.navigate('ShopperAccIntAdd');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
			<ScrollView>
            <TopNavArrowTitle title="Edit Interests" alignment="start" navigation={props.navigation} goBackTo="ShopperAccHome" />
            <Layout style={[MainStyles.layout_container ]}>
            <Text category="h6" status="primary" style={{ fontWeight: 'bold', marginBottom: 15 }}>Current Interests</Text>
				<View style={{ width: '100%' }}>
				
					{Object.entries(sectors).map(([key, value]) => 
					{
						if (key === 'titleShopping')
						{
							return (
								<View key={key} style={{ marginTop: 10, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={25} mt={10} />
								</View>
							);
						}
						if (key === 'titleTravel')
						{
							return (
								<View key={key} style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={25} mt={10} />
								</View>
							);
						}
						if (key === 'titleHealth')
						{
							return (
								<View key={key} style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={25} mt={10} />
								</View>
							);
						}
						if (key === 'titleEnt')
						{
							return (
								<View key={key} style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={25} mt={10} />
								</View>
							);
						}
						if (key === 'titleEdu')
						{
							return (
								<View key={key} style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={25} mt={10} />
								</View>
							);
						}
						if (key === 'titleProperty')
						{
							return (
								<View key={key} style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={25} mt={10} />
								</View>
							);
						}
						if (key === 'titleServices')
						{
							return (
								<View key={key} style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={25} mt={10} />
								</View>
							);
						}
						if (key === 'titleCommunity')
						{
							return (
								<View key={key} style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo  title={value} fontweight="bold" fontsize={25} mt={10} />
								</View>
							);
						}
						if (Array.isArray(value) && value.length > 0) 
						{
							return (
							<View key={key}>
								<TextTwo title={aaa[key] || key} fontweight="bold" fontsize={18} />
								{value.map((item, index) => (
									
									<TextIcon key={index} title={item} iconname="trash-2-outline" width={24} mt={10} mb={10} />
								))}
							{/* <View style={{ height: 1, backgroundColor: '#D5D2F3', width: '100%', marginTop: 10, marginBottom: 10 }} /> */}
							</View>
							);
						} 
						else if (value === true) 
						{
							//return <TextTwo key={key} title={fullDesc[key] || key} fontweight="bold" fontsize={14} />;
							return <TextIcon key={key} title={fullDesc[key] || key} iconname="trash-2-outline" width={24} fontweight="bold" fontsize={14} mt={10} mb={10} />
						} 
						else 
						{
							return null;
						}
					})}
				</View>
				<View style={{ flex: 1, justifyContent: 'flex-end', width: '100%', marginTop: 25 }} >
                	<ButtonPrimary name="Add More Interests" width="100%" marginTop={25} onpress={handleAddInterests} />
				</View>
            </Layout>
			</ScrollView>
        </SafeAreaView>
    );
};

export default Home;