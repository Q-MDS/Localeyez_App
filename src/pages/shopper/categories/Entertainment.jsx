import React from "react";
import { sectorData } from "../../../sector.data";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../components/TopNavBack";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Layout, Card } from "@ui-kitten/components";
import { TextIcon } from "../../../components/TextIcon";

const Entertainment = (props) => 
{
    const entertainmentData = sectorData.find(sector => sector.title === "Entertainment");

	const handleCategorySearch = (category) => 
	{
		if (category !== "Eat & Drink" && category !== "Activities" && category !== "Events") 
		{
			props.navigation.navigate('CatSearch', {searchType: 0, searchSector: "Entertainment", category:category, categoryItem: category});
			return;
		} 
		else if (category === "Eat & Drink")
		{
			props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Entertainment", category: "eat", categoryItem: "eat"});
			return;
		}
		else if (category === "Activities")
		{
			props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Entertainment", category: "activities", categoryItem: "activities"});
			return;
		}
		else if (category === "Events")
		{
			props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Entertainment", category: "entEvent", categoryItem: "entEvent"});
			return;
		}
	}

	const handleItemSearch = (category, categoryItem) => 
	{
		category === "Eat & Drink" ? category = "eat" : category === "eat";
		category === "Activities" ? category = "activities" : category === "activities";
		category === "Events" ? category = "entEvent" : category === "entEvent";
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Entertainment", category: category, categoryItem: categoryItem});
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>
					{entertainmentData.categories.map((category, index) => (
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
        <BotNavShopper selected={1} />
        </SafeAreaView>
    );
};

export default Entertainment;