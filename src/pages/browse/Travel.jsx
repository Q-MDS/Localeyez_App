import React from "react";
import { sectorData } from "../../sector.data";
import MainStyles from "../../assets/styles/MainStyles";
import { TopNavBack } from "../../components/TopNavBack";
import { BotNavShopper } from "../../components/BotNavShopper";
import { BotNavBrowse } from "../../components/BotNavBrowse";
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Layout, Text, Card } from "@ui-kitten/components";
import { TextIcon } from "../../components/TextIcon";

const Travel = (props) => 
{
	const travelData = sectorData.find(sector => sector.title === "Travel");

	const handleCategorySearch = (category) => 
	{
		if (category !== "Travel Agents" && category !== "Accomodation" && category !== "Transport") 
		{
			// Search entire Travel: 0
			props.navigation.navigate('BrowseSearch', {searchType: 0, searchSector: "Travel", category:category, categoryItem: category});
			return;
		} 
		else if (category === "Accomodation")
		{
			// Search only Accomodation/Travel/TravelOpt1: 1
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Travel", category: "accomodation", categoryItem: "accomodation"});
			return;
		}
		else if (category === "Transport")
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Travel", category: "transport", categoryItem: "transport"});
			return;
		}
		else 
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Travel", category: "travelOpt1", categoryItem: "travelOpt1"});
			return;
		}
	}

	const handleItemSearch = (category, categoryItem) => 
	{
		// Items under the heading e.g. Transport > Bus Services
		category === "Transport" ? category = "transport" : category === "transport";
		category === "Accomodation" ? category = "accomodation" : category === "accomodation";
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Travel", category: category, categoryItem: categoryItem});
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 20 }}>
						<Image source={require('../../assets/images/cat_travel.png')} style={{ height: 120, objectFit: 'contain', borderRadius: 10, alignSelf: 'center', marginTop: 10 }} />
						<Text style={[MainStyles.title_a18, {textAlign: 'center', marginTop: 10}]}>Travel</Text>
					</View>

					{travelData.categories.map((category, index) => (
						<Card key={index} style={{ width: '100%', marginBottom: 15 }}>
							<TouchableOpacity key={index} style={{ width: '100%' }} onPress={() => handleCategorySearch(category.name)}>
								<TextIcon key={index} title={category.name} iconname="chevron-right-outline" fontweight="bold" fontsize={16} width={24} status="primary"  />
							</TouchableOpacity>

							{category.items.map((item, index) => ( 
								index === 0 
								? 
								<TouchableOpacity key={index} style={{ width: '100%' }} onPress={() => handleItemSearch(category.name, item.label)}>
									<TextIcon key={index} title={item.label} iconname="chevron-right-outline" width={24} mt={10} mb={5} pl={20} status="basic"  />
								</TouchableOpacity>
								: 
								<TouchableOpacity key={index} style={{ width: '100%' }} onPress={() => handleItemSearch(category.name, item.label)}>
									<TextIcon key={index} title={item.label} iconname="chevron-right-outline" width={24} mt={5} mb={5} pl={20} status="basic"  />
								</TouchableOpacity>
							))}
						</Card>
					))}
                </Layout>
            </ScrollView>
        <BotNavBrowse selected={0} navigation={props.navigation} />
        </SafeAreaView>
    );
};

export default Travel;