import React from "react";
import { sectorData } from "../../../sector.data";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../components/TopNavBack";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Layout, Card } from "@ui-kitten/components";
import { TextIcon } from "../../../components/TextIcon";

const Property = (props) => 
{
    const propertyData = sectorData.find(sector => sector.title === "Property");

	const handleCategorySearch = (category) => 
	{
		if (category === "For Sale (Agents)") 
		{
			props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Property", category: "propertyOpt1", categoryItem: "propertyOpt1"});
			return;
		} 
		else if(category === "To Rent (Agents)")
		{
			props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Property", category:"propertyOpt2", categoryItem: "propertyOpt2"});
			return;
		}
		else if(category === "Commercial (Agents)")
		{
			props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Property", category:"propertyOpt3", categoryItem: "propertyOpt3"});
			return;
		}
		else 
		{
			props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Property", category:"propertyOpt4", categoryItem: "propertyOpt4"});
			return;
		}
	}

	const handleItemSearch = (category, categoryItem) => 
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Property", category: category, categoryItem: categoryItem});
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>
					{propertyData.categories.map((category, index) => (
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

export default Property;