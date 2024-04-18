import React, { useState, useEffect } from "react";
import DbUtils from "../../../../services/DbUtils";
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../../components/TopNavArrowTitle";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import TextOne from "../../../../components/TextOne";
import { TextIcon } from "../../../../components/TextIcon";
import TextTwo from "../../../../components/TextTwo";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";

const Home = (props) => 
{
	const [sectors, setSectors] = useState([]);

	const src = {
		"title": "Shopping",
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
		"home": ["Clothing",],
		"shoppingOpt1": true,
		"shoppingOpt2": true,
		"shoppingOpt3": true,
		"title": "Travel",
		"accomodation": ["Clothing",],
		"transport": ["Clothing",],
		"travelOpt1": false,
		"sport": ["Clothing",],
		"doctor": ["Clothing",],
		"healthOpt1": true,
		"healthOpt2": true,
		"healthOpt3": true,
		"eat": ["Clothing",],
		"activities": ["Clothing",],
		"entEvent": ["Clothing",],
		"eduEvent": ["Clothing",],
		"learn": ["Clothing",],
		"employment": ["Clothing",],
		"propertyOpt1": true,
		"propertyOpt2": true,
		"propertyOpt3": true,
		"propertyOpt4": true,
		"serHome": ["Clothing",],
		"serSelf": ["Clothing",],
		"serFin": ["Clothing",],
		"serPub": ["Clothing",],
		"servicesOpt1": true,
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
        const sectors = await DbUtils.getItem('shopper_sectors')
        .then((sectors) => 
        {
			if (sectors !== null)
			{
				setSectors(JSON.parse(sectors));
			}
        });
    }

	useEffect(() => 
	{
		getSectors();
		
	}, []);

	useEffect(() => 
	{
		console.log('Sectors:', JSON.parse(sectors[0].sectors_data));
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
				{Object.entries(src).map(([key, value]) => {
				if (Array.isArray(value) && value.length > 0) {
					return (
					<View key={key}>
						<TextTwo title={aaa[key] || key} fontweight="bold" fontsize={18} />
						{value.map((item, index) => (
							<TextTwo key={index} title={item} fontsize={14} />
						))}
					<View style={{ height: 1, backgroundColor: '#D5D2F3', width: '100%', marginTop: 10, marginBottom: 10 }} />
					</View>
					);
				} else if (value === true) {
					return <TextTwo key={key} title={fullDesc[key] || key} fontsize={14} />;
				} else {
					return null;
				}
				})}
			</View>

                {/* <Layout style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', padding: 20, backgroundColor: '#f8f8fc', borderRadius: 20 }}>
                    <TextOne title="Health & Wellness" textAlign="left" fontweight="bold" width="100%" />
                    <TextIcon title="• Health Stores & Pharmacies" iconname="trash-2-outline" fontsize={13} width={20} mt={5} mb={0} />
                    <TextTwo title="• Sports & Recreation" textalign="left" fontsize={13} width="100%" mt={5} />
                    <TextIcon title="Gyms" iconname="trash-2-outline" fontsize={13} width={20} mt={5} mb={0} pl={7} />
                    <TextIcon title="Sports Clubs" iconname="trash-2-outline" fontsize={13} width={20} mt={5} mb={0} pl={7} />
                </Layout>
                <View style={{ marginTop: 25 }} />
                <Layout style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', padding: 20, backgroundColor: '#f8f8fc', borderRadius: 20 }}>
                    <TextOne title="Shopping" textAlign="left" fontweight="bold" width="100%" />
                    <TextIcon title="• Stationary & Gifts" iconname="trash-2-outline" fontsize={13} width={20} mt={5} mb={0} />
                    <TextTwo title="• Fashion & Beauty" textalign="left" fontsize={13} width="100%" mt={5} />
                    <TextIcon title="Clothing" iconname="trash-2-outline" fontsize={13} width={20} mt={5} mb={0} pl={7} />
                    <TextIcon title="Accessories" iconname="trash-2-outline" fontsize={13} width={20} mt={5} mb={0} pl={7} />
                </Layout> */}
				<View style={{ flex: 1, justifyContent: 'flex-end', width: '100%', marginTop: 25 }} >
                	<ButtonPrimary name="Add More Interests" width="100%" marginTop={25} onpress={handleAddInterests} />
				</View>
            </Layout>
			</ScrollView>
        </SafeAreaView>
    );
};

export default Home;