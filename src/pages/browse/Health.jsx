import React from "react";
import { sectorData } from "../../sector.data";
import MainStyles from "../../assets/styles/MainStyles";
import { TopNavBack } from "../../components/TopNavBack";
import { BotNavShopper } from "../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Layout, Text, Card } from "@ui-kitten/components";
import { TextIcon } from "../../components/TextIcon";

const Health = (props) => 
{
    const healthData = sectorData.find(sector => sector.title === "Health & Wellness");

	const handleCategorySearch = (category) => 
	{
		if (category !== "Sports & Recreation" && category !== "Doctors & Specialists" && category !== "Health Stores & Pharmacies" && category !== "Hospitals & Trauma Centres" ) 
		{
			props.navigation.navigate('BrowseSearch', {searchType: 0, searchSector: "Health & Wellness", category:category, categoryItem: category});
			return;
		} 
		else if (category === "Sports & Recreation")
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Health & Wellness", category: "sport", categoryItem: "sport"});
			return;
		}
		else if (category === "Doctors & Specialists")
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Health & Wellness", category: "doctor", categoryItem: "doctor"});
			return;
		}
		else if (category === "Health Stores & Pharmacies")
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Health & Wellness", category: "healthOpt1", categoryItem: "healthOpt1"});
			return;
		}
		else if (category === "Hospitals & Trauma Centres")
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Health & Wellness", category: "healthOpt2", categoryItem: "healthOpt2"});
			return;
		}
		else 
		{
			props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Health & Wellness", category: "healthOpt3", categoryItem: "healthOpt3"});
			return;
		}
	}

	const handleItemSearch = (category, categoryItem) => 
	{
		category === "Sports & Recreation" ? category = "sport" : category === "sport";
		category === "Doctors & Specialists" ? category = "doctor" : category === "doctor";
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Health & Wellness", category: category, categoryItem: categoryItem});
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 20 }}>
						<Image source={require('../../assets/images/cat_health.png')} style={{ width: 120, height: 120, borderRadius: 10, alignSelf: 'center', marginTop: 10 }} />
						<Text style={[MainStyles.title_a18, {textAlign: 'center', marginTop: 10}]}>Health & Wellness</Text>
					</View>
					{healthData.categories.map((category, index) => (
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

export default Health;