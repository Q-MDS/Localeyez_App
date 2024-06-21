import React from "react";
import { sectorData } from "../../sector.data";
import MainStyles from "../../assets/styles/MainStyles";
import { TopNavBack } from "../../components/TopNavBack";
import { BotNavShopper } from "../../components/BotNavShopper";
import { BotNavBrowse } from "../../components/BotNavBrowse";
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Layout, Text, Card } from "@ui-kitten/components";
import { TextIcon } from "../../components/TextIcon";

const Property = (props) => 
{
    const propertyData = sectorData.find(sector => sector.title === "Property");

	const handleCategorySearch = (category) => 
	{
		if (category === "For Sale (Agents)") 
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Property", category: "propertyOpt1", categoryItem: "propertyOpt1"});
			return;
		} 
		else if(category === "To Rent (Agents)")
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Property", category:"propertyOpt2", categoryItem: "propertyOpt2"});
			return;
		}
		else if(category === "Commercial (Agents)")
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Property", category:"propertyOpt3", categoryItem: "propertyOpt3"});
			return;
		}
		else 
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Property", category:"propertyOpt4", categoryItem: "propertyOpt4"});
			return;
		}
	}

	const handleItemSearch = (category, categoryItem) => 
	{
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Property", category: category, categoryItem: categoryItem});
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 20 }}>
						<Image source={require('../../assets/images/cat_property.png')} style={{ height: 120, objectFit: 'contain', borderRadius: 10, alignSelf: 'center', marginTop: 10 }} />
						<Text style={[MainStyles.title_a18, {textAlign: 'center', marginTop: 10}]}>Property</Text>
					</View>

					{propertyData.categories.map((category, index) => (
						<Card key={index} style={{ width: '100%', marginBottom: 15 }}>
						<TouchableOpacity key={index} style={{ width: '100%' }} onPress={() => handleCategorySearch(category.name)}>
							<TextIcon key={index} title={category.name} iconname="chevron-right-outline" fontweight="bold" fontsize={16} width={24} status="primary"  />
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
        <BotNavBrowse selected={1} navigation={props.navigation} />
        </SafeAreaView>
    );
};

export default Property;