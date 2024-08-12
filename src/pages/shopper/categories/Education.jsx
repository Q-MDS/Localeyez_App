import React from "react";
import { sectorData } from "../../../sector.data";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../components/TopNavBack";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Layout, Text, Card } from "@ui-kitten/components";
import { TextIcon } from "../../../components/TextIcon";

const Education = (props) => 
{
    const educationData = sectorData.find(sector => sector.title === "Education & Employment");

	const handleCategorySearch = (category) => 
	{
		if (category !== "Schools" && category !== "Learning" && category !== "Employment") 
		{
			props.navigation.navigate('CatSearch', {searchType: 0, searchSector: "Education & Employment", category:category, categoryItem: category});
			return;
		} 
		else if (category === "Schools")
		{
			props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Education & Employment", category: "eduEvent", categoryItem: "eduEvent"});
			return;
		}
		else if (category === "Learning")
		{
			props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Education & Employment", category: "learn", categoryItem: "learn"});
			return;
		}
		else if (category === "Employment")
		{
			props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Education & Employment", category: "employment", categoryItem: "employment"});
			return;
		}
	}

	const handleItemSearch = (category, categoryItem) => 
	{
		category === "Schools" ? category = "eduEvent" : category === "eduEvent";
		category === "Learning" ? category = "learn" : category === "learn";
		category === "Employment" ? category = "employment" : category === "employment";
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Education & Employment", category: category, categoryItem: categoryItem});
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Search Page`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 20 }}>
						<Image source={require('../../../assets/images/cat_education.png')} style={{ width: 120, height: 120, borderRadius: 10, alignSelf: 'center', marginTop: 10 }} />
						<Text style={[MainStyles.title_a18, {textAlign: 'center', marginTop: 10}]}>Education & Employment</Text>
					</View>
					
					{educationData.categories.map((category, index) => (
						<Card key={index} style={{ width: '100%', marginBottom: 15 }}>
						<TouchableOpacity key={index} style={{ width: '100%' }} onPress={() => handleCategorySearch(category.name)}>
							<TextIcon key={index} title={category.name} iconname="chevron-right-outline" fontweight="bold" fontsize={16} width={24} status="primary" />
						</TouchableOpacity>
						{category.items.map((item, index) => ( 
							index === 0 
							? 
							<TouchableOpacity key={index} style={{ width: '100%' }} onPress={() => handleItemSearch(category.name, item.label)}>
								<TextIcon key={index} title={item.label} iconname="chevron-right-outline" width={24} mt={10} mb={5} pl={15} status="basic" />
							</TouchableOpacity>
							: 
							<TouchableOpacity key={index} style={{ width: '100%' }} onPress={() => handleItemSearch(category.name, item.label)}>
								<TextIcon key={index} title={item.label} iconname="chevron-right-outline" width={24} mt={5} mb={5} pl={15} status="basic" />
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

export default Education;