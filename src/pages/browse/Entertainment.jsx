import React from "react";
import { sectorData } from "../../sector.data";
import MainStyles from "../../assets/styles/MainStyles";
import { TopNavBack } from "../../components/TopNavBack";
import { BotNavShopper } from "../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Layout, Text, Card } from "@ui-kitten/components";
import { TextIcon } from "../../components/TextIcon";

const Entertainment = (props) => 
{
    const entertainmentData = sectorData.find(sector => sector.title === "Entertainment");

	const handleCategorySearch = (category) => 
	{
		if (category !== "Eat & Drink" && category !== "Activities" && category !== "Events") 
		{
			props.navigation.navigate('BrowseSearch', {searchType: 0, searchSector: "Entertainment", category:category, categoryItem: category});
			return;
		} 
		else if (category === "Eat & Drink")
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Entertainment", category: "eat", categoryItem: "eat"});
			return;
		}
		else if (category === "Activities")
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Entertainment", category: "activities", categoryItem: "activities"});
			return;
		}
		else if (category === "Events")
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Entertainment", category: "entEvent", categoryItem: "entEvent"});
			return;
		}
	}

	const handleItemSearch = (category, categoryItem) => 
	{
		category === "Eat & Drink" ? category = "eat" : category === "eat";
		category === "Activities" ? category = "activities" : category === "activities";
		category === "Events" ? category = "entEvent" : category === "entEvent";
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Entertainment", category: category, categoryItem: categoryItem});
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 20 }}>
						<Image source={require('../../assets/images/cat_entertainment.png')} style={{ width: 120, height: 120, borderRadius: 10, alignSelf: 'center', marginTop: 10 }} />
						<Text style={[MainStyles.title_a18, {textAlign: 'center', marginTop: 10}]}>Entertainment</Text>
					</View>

					{entertainmentData.categories.map((category, index) => (
						<Card key={index} style={{ width: '100%', marginBottom: 15 }}>
							<TouchableOpacity key={index} style={{ width: '100%' }} onPress={() => handleCategorySearch(category.name)}>
								<TextIcon key={index} title={category.name} iconname="chevron-right-outline" fontweight="bold" fontsize={16} width={24} status="primary" />
							</TouchableOpacity>
							{category.items.map((item, index) => ( 
								index === 0 
								? 
								<TouchableOpacity key={index} style={{ width: '100%' }} onPress={() => handleItemSearch(category.name, item.label)}>
									<TextIcon key={index} title={item.label} iconname="chevron-right-outline" width={24} mt={10} mb={5} pl={20} status="basic" />
								</TouchableOpacity>
								: 
								<TouchableOpacity key={index} style={{ width: '100%' }} onPress={() => handleItemSearch(category.name, item.label)}>
									<TextIcon key={index} title={item.label} iconname="chevron-right-outline" width={24} mt={5} mb={5} pl={20} status="basic" />
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