import React from "react";
import { sectorData } from "../../../sector.data";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../components/TopNavBack";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Layout, Text, Card } from "@ui-kitten/components";
import { TextIcon } from "../../../components/TextIcon";

const Services = (props) => 
{
    const servicesData = sectorData.find(sector => sector.title === "Services");

	const handleCategorySearch = (category) => 
	{
		if (category !== "Home" && category !== "Self-care" && category !== "Financial"  && category !== "Public Services Contacts"  && category !== "Legal") 
		{
			props.navigation.navigate('CatSearch', {searchType: 0, searchSector: "Shopping", category:category, categoryItem: category});
			return;
		} 
		else if (category === "Home")
		{
			props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Shopping", category: "serHome", categoryItem: "serHome"});
			return;
		}
		else if (category === "Self-care")
		{
			props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Shopping", category: "serSelf", categoryItem: "serSelf"});
			return;
		}
		else if (category === "Financial")
		{
			props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Shopping", category: "serFin", categoryItem: "serFin"});
			return;
		}
		else if (category === "Public Services Contacts")
		{
			props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Shopping", category: "serPub", categoryItem: "serPub"});
			return;
		}
		else if (category === "Legal")
		{
			props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Shopping", category: "servicesOpt1", categoryItem: "servicesOpt1"});
			return;
		}
	}

	const handleItemSearch = (category, categoryItem) => 
	{
		category === "Home" ? category = "serHome" : category === "serHome";
		category === "Self-care" ? category = "serSelf" : category === "serSelf";
		category === "Financial" ? category = "serFin" : category === "serFin";
		category === "Public Services Contacts" ? category = "serPub" : category === "serPub";
		category === "Legal" ? category = "servicesOpt1" : category === "servicesOpt1";
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Shopping", category: category, categoryItem: categoryItem});
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Search Page`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 20 }}>
						<Image source={require('../../../assets/images/cat_services.png')} style={{ width: 120, height: 120, borderRadius: 10, alignSelf: 'center', marginTop: 10 }} />
						<Text style={[MainStyles.title_a18, {textAlign: 'center', marginTop: 10}]}>Services</Text>
					</View>

					{servicesData.categories.map((category, index) => (
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

export default Services;