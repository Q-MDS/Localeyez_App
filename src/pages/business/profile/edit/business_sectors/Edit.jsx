import React, { useState, useEffect }  from 'react';
import { useFocusEffect } from '@react-navigation/native';
import DbUtils from '../../../../../services/DbUtils';
import MainStyles from '../../../../../assets/styles/MainStyles';
import { TopNavArrowTitle } from '../../../../../components/TopNavArrowTitle';
import { TabsBusProf } from '../../../../../components/TabsBusProf';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import TextTwo from '../../../../../components/TextTwo';
import { ButtonPrimary } from '../../../../../components/ButtonPrimary';
import { TextIcon } from '../../../../../components/TextIcon';

const Edit = (props) => 
{
	const [sectors, setSectors] = useState([]);
	const [isReady, setIsReady] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(1);

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

	const categoryTitles = {
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
        const getSectors = await DbUtils.getItem('business_sectors')
        .then((getSectors) => 
        {
			const sectorArray = JSON.parse(getSectors);
			console.log('BBB1:', sectorArray);
			
			if (sectorArray !== null)
			{
				setSectors(sectorArray);
				setIsReady(true);
			}
        });
    }

	useFocusEffect(React.useCallback(() => 
	{
		fetchSectors();
	}, []));


	const handleGotoProfile = (index) => 
	{
		console.log('Index: ', index);
		setSelectedIndex(index);
		if (selectedIndex === 0) 
		{
			props.navigation.navigate('BusProfSectorsEdit', {selectedIndex: 1});
			
		}
		
		if (selectedIndex === 1) 
		{
			console.log('Goto Business Profile');
			props.navigation.navigate('BusProfEdit', {selectedIndex: 0});
		}
	}

	const handleAddSectors = () => 
    {
        console.log('Add More Interests clicked!');
        props.navigation.navigate('BusProfSectorsAdd');
    }

    // const handleAddSector = () => 
    // {
    //     props.navigation.navigate('BusProfSectorsAdd');
    // }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
			<ScrollView>
            <TopNavArrowTitle title="Edit Profile" alignment="start" navigation={props.navigation} goBackTo="BusProfProHome" />
			<TabsBusProf selected={1} value={selectedIndex} onchange={handleGotoProfile} />
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
									<TextTwo key={key} title={value} fontweight="bold" fontsize={20} mt={10} />
								</View>
							);
						}
						if (key === 'titleTravel')
						{
							return (
								<View key={key} style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={20} mt={10} />
								</View>
							);
						}
						if (key === 'titleHealth')
						{
							return (
								<View key={key} style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={20} mt={10} />
								</View>
							);
						}
						if (key === 'titleEnt')
						{
							return (
								<View key={key} style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={20} mt={10} />
								</View>
							);
						}
						if (key === 'titleEdu')
						{
							return (
								<View key={key} style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={20} mt={10} />
								</View>
							);
						}
						if (key === 'titleProperty')
						{
							return (
								<View key={key} style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={20} mt={10} />
								</View>
							);
						}
						if (key === 'titleServices')
						{
							return (
								<View key={key} style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
									<View style={{ height: 1, backgroundColor: '#D5D2F3'}} />
									<TextTwo key={key} title={value} fontweight="bold" fontsize={20} mt={10} />
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
								<TextTwo title={categoryTitles[key] || key}  fontsize={20} />
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
							return <TextIcon key={key} title={fullDesc[key] || key} iconname="trash-2-outline" width={24}  fontsize={14} mt={10} mb={10} />
						} 
						else 
						{
							return null;
						}
					})}
				</View>
				<View style={{ flex: 1, justifyContent: 'flex-end', width: '100%', marginTop: 25 }} >
                	<ButtonPrimary name="Manage Business Sectors" width="100%" marginTop={25} onpress={handleAddSectors} />
				</View>
            </Layout>
			</ScrollView>
        </SafeAreaView>
    );
};

export default Edit;