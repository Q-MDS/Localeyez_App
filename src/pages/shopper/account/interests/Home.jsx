import React, { useState, useEffect } from "react";
import DbUtils from "../../../../services/DbUtils";
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../../components/TopNavArrowTitle";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import TextOne from "../../../../components/TextOne";
import { TextIcon } from "../../../../components/TextIcon";
import TextTwo from "../../../../components/TextTwo";
import { IconText } from "../../../../components/IconText";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";

const Home = (props) => 
{
	const [sectors, setSectors] = useState('');

	const src = {
		"titleShopping": "Shopping",
		"fashion": [
			"Clothing",
			"Shoes",
			"Accessories",
			"Make-up and Cosmetics",
			"Bath and Body",
			"Clothing Designers & Stylists",
			"Hair Stylists & Products",
			"Make-up artists",
			"Skin and beauty Technicians",
			"Costume Hire",
		],
		"home": ["Furniture",],
		"groceries": ["Food & Beverage",],
		"shoppingOpt1": true,
		"shoppingOpt2": true,
		"shoppingOpt3": true,
		"titleTravel": "Travel",
		"accomodation": ["Clothing",],
		"transport": ["Clothing",],
		"travelOpt1": false,
		"titleHealth": "Health & Wellness",
		"sport": ["Clothing",],
		"doctor": ["Clothing",],
		"healthOpt1": true,
		"healthOpt2": true,
		"healthOpt3": true,
		"titleEnt": "Entertainment",
		"eat": ["Clothing",],
		"activities": ["Clothing",],
		"entEvent": ["Clothing",],
		"titleEdu": "Education & Employment",
		"eduEvent": ["Clothing",],
		"learn": ["Clothing",],
		"employment": ["Clothing",],
		"titleProperty": "Property",
		"propertyOpt1": true,
		"propertyOpt2": true,
		"propertyOpt3": true,
		"propertyOpt4": true,
		"titleServices": "Services",
		"serHome": ["Clothing",],
		"serSelf": ["Clothing",],
		"serFin": ["Clothing",],
		"serPub": ["Clothing",],
		"servicesOpt1": true,
		"titleCommunity": "Community",
		"community": ["Clothing",],
		"communityOpt1": true,
		"communityOpt2": true,
		"communityOpt3": true
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
		communityOpt1: "Non-Profits",
		communityOpt2: "NGO's",
		communityOpt3: "Support Groups",
	};

	const aaa = {
		"fashion": "Fashion & Beauty",
		"home": "Home",
		"accomodation": "Accommodation",
		"transport": "Transport",
		"sport": "Sports & Recreation",
		"doctor": "Doctors & Specialists",
		"eat": "Entertainment",
		"activities": "Activities",
		"entEvent": "Events",
		"eduEvent": "Events",
		"learn": "Learning",
		"employment": "Employment",
		"serHome" : "Home",
		"serSelf" : "Self-Care",
		"serFin" : "Financial",
		"serPub" : "Public Services Contacts",
		"community": "Community",
	}

	const getSectors = async () => 
    {
        const getSectors = await DbUtils.getItem('shopper_sectors')
        .then((getSectors) => 
        {
			let a = JSON.parse(getSectors);
			let b = JSON.parse(a[0].sectors_data);
			
			if (getSectors !== null)
			{
				setSectors(JSON.stringify(b));
			}
        });
    }

	useEffect(() => 
	{
		getSectors();
	}, []);

	useEffect(() => 
	{
		console.log('Fuck : ', sectors);
		// console.log('Sectors:', JSON.parse(sectors[0].sectors_data));
	}, [sectors]);

    const handleAddInterests = () => 
    {
        console.log('Add More Interests clicked!');
        props.navigation.navigate('ShopperAccIntAdd');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
			<ScrollView>
            <TopNavArrowTitle title="Edit Interests" alignment="start" navigation={props.navigation} goBackTo="BusinessDashboard" />
            <Layout style={[MainStyles.layout_container ]}>
            <Text category="h6" status="primary" style={{ fontWeight: 'bold', marginBottom: 15 }}>Current Interests</Text>
				<View style={{ width: '100%' }}>
					{/* {Object.entries(JSON.parse(sectors[0].sectors_data)).map(([key, value]) => { */}
					{Object.entries(src).map(([key, value]) => 
					{
						if (key === 'titleShopping')
						{
							return (
								<View style={{ marginTop: 10, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={25} mt={10} />
								</View>
							);
						}
						if (key === 'titleTravel')
						{
							return (
								<View style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={25} mt={10} />
								</View>
							);
						}
						if (key === 'titleHealth')
						{
							return (
								<View style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={25} mt={10} />
								</View>
							);
						}
						if (key === 'titleEnt')
						{
							return (
								<View style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={25} mt={10} />
								</View>
							);
						}
						if (key === 'titleEdu')
						{
							return (
								<View style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={25} mt={10} />
								</View>
							);
						}
						if (key === 'titleProperty')
						{
							return (
								<View style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={25} mt={10} />
								</View>
							);
						}
						if (key === 'titleServices')
						{
							return (
								<View style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={25} mt={10} />
								</View>
							);
						}
						if (key === 'titleCommunity')
						{
							return (
								<View style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={25} mt={10} />
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