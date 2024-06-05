import React from "react";
import { sectorData } from "../../sector.data";
import MainStyles from "../../assets/styles/MainStyles";
import { TopNavBack } from "../../components/TopNavBack";
import { BotNavShopper } from "../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Layout, Text, Card } from "@ui-kitten/components";
import { TextIcon } from "../../components/TextIcon";

const Shopping = (props) => 
{
    const shoppingData = sectorData.find(sector => sector.title === "Shopping");

	const handleCategorySearch = (category) => 
	{
		if (category !== "Fashion & Beauty" && category !== "Home" && category !== "Groceries"  && category !== "Hardware & Electrical"  && category !== "Stationary & Gifts" && category !== "Children") 
		{
			props.navigation.navigate('BrowseSearch', {searchType: 0, searchSector: "Shopping", category:category, categoryItem: category});
			return;
		} 
		else if (category === "Fashion & Beauty")
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Shopping", category: "fashion", categoryItem: "fashion"});
			return;
		}
		else if (category === "Home")
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Shopping", category: "home", categoryItem: "home"});
			return;
		}
		else if (category === "Groceries")
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Shopping", category: "groceries", categoryItem: "groceries"});
			return;
		}
		else if (category === "Hardware & Electrical")
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Shopping", category: "shoppingOpt1", categoryItem: "shoppingOpt1"});
			return;
		}
		else if (category === "Stationary & Gifts")
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Shopping", category: "shoppingOpt2", categoryItem: "shoppingOpt2"});
			return;
		}
		else 
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Shopping", category: "shoppingOpt3", categoryItem: "shoppingOpt3"});
			return;
		}
	}

	const handleItemSearch = (category, categoryItem) => 
	{
		category === "Fashion & Beauty" ? category = "fashion" : category === "fashion";
		category === "Home" ? category = "home" : category === "home";
		category === "Groceries" ? category = "groceries" : category === "groceries";
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Shopping", category: category, categoryItem: categoryItem});
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 20 }}>
						<Image source={require('../../assets/images/cat_shopping.png')} style={{ width: 120, height: 120, borderRadius: 10, alignSelf: 'center', marginTop: 10 }} />
						<Text style={[MainStyles.title_a18, {textAlign: 'center', marginTop: 10}]}>Shopping</Text>
					</View>

					{shoppingData.categories.map((category, index) => (
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

export default Shopping;