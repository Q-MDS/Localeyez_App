import React from "react";
import { sectorData } from "../../sector.data";
import MainStyles from "../../assets/styles/MainStyles";
import { TopNavBack } from "../../components/TopNavBack";
import { BotNavShopper } from "../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Layout, Text, Card } from "@ui-kitten/components";
import { TextIcon } from "../../components/TextIcon";

const Community = (props) => 
{
	const communityData = sectorData.find(sector => sector.title === "Community");

	const handleCategorySearch = (category) => 
	{
		console.log('category', category);
		if (category !== "Charity Organisations" && category !== "Non-Profits" && category !== "NGO’s" && category !== "Support Groups" && category !== "Self-care") 
		{
			props.navigation.navigate('BrowseSearch', {searchType: 0, searchSector: "Community", category:category, categoryItem: category});
			return;
		} 
		else if (category === "Charity Organisations")
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Community", category: "communityOpt1", categoryItem: "communityOpt1"});
			return;
		}
		else if (category === "Non-Profits")
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Community", category: "communityOpt2", categoryItem: "communityOpt2"});
			return;
		}
		else if (category === "NGO’s")
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Community", category: "communityOpt3", categoryItem: "communityOpt3"});
			return;
		}
		else if (category === "Support Groups")
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Community", category: "communityOpt4", categoryItem: "communityOpt4"});
			return;
		}
		else 
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Community", category: "community", categoryItem: "community"});
			return;
		}
	}

	const handleItemSearch = (category, categoryItem) => 
	{
		console.log('category', category, categoryItem);
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Community", category: "community", categoryItem: categoryItem});
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 20 }}>
						<Image source={require('../../assets/images/cat_community.png')} style={{ width: 120, height: 120, borderRadius: 10, alignSelf: 'center', marginTop: 10 }} />
						<Text style={[MainStyles.title_a18, {textAlign: 'center', marginTop: 10}]}>Community</Text>
					</View>

					{communityData.categories.map((category, index) => (
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

export default Community;