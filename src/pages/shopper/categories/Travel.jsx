import React from "react";
import { sectorData } from "../../../sector.data";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../components/TopNavBack";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Layout, Card } from "@ui-kitten/components";
import { TextIcon } from "../../../components/TextIcon";

const Travel = (props) => 
{
	const travelData = sectorData.find(sector => sector.title === "Travel");

	const handleCategorySearch = (category) => 
	{
		if (category !== "Travel Agents" && category !== "Accomodation" && category !== "Transport") 
		{
			props.navigation.navigate('CatSearch', {searchType: 0, searchSector: "Travel", category:category, categoryItem: category});
			return;
		} 
		else if (category === "Accomodation")
		{
			props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Travel", category: "accomodation", categoryItem: "accomodation"});
			return;
		}
		else if (category === "Transport")
		{
			props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Travel", category: "transport", categoryItem: "transport"});
			return;
		}
		else 
		{
			props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Travel", category: "travelOpt1", categoryItem: "travelOpt1"});
			return;
		}
	}

	const handleItemSearch = (category, categoryItem) => 
	{
		console.log('category FFF', category, categoryItem);
		category === "Transport" ? category = "transport" : category === "transport";
		category === "Accomodation" ? category = "accomodation" : category === "accomodation";
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Travel", category: category, categoryItem: categoryItem});
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>
					{travelData.categories.map((category, index) => (
						<Card key={index} style={{ width: '100%', marginBottom: 15 }}>
							<TouchableOpacity key={index} style={{ width: '100%' }} onPress={() => handleCategorySearch(category.name)}>
								<TextIcon key={index} title={category.name} iconname="chevron-right-outline" fontweight="bold" fontsize={16} width={24}  />
							</TouchableOpacity>

							{category.items.map((item, index) => ( 
								index === 0 
								? 
								<TouchableOpacity key={index} style={{ width: '100%' }} onPress={() => handleItemSearch(category.name, item.value)}>
									<TextIcon key={index} title={item.label} iconname="chevron-right-outline" width={24} mt={20} mb={10} />
								</TouchableOpacity>
								: 
								<TouchableOpacity key={index} style={{ width: '100%' }} onPress={() => handleItemSearch(category.name, item.value)}>
									<TextIcon key={index} title={item.label} iconname="chevron-right-outline" width={24} mt={10} mb={10} />
								</TouchableOpacity>
							))}
						</Card>
					))}
                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
    );
};

export default Travel;