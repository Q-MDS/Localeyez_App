import React from "react";
import { sectorData } from "../../../sector.data";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../components/TopNavArrowTitle";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Layout, Card } from "@ui-kitten/components";
import { TextIcon } from "../../../components/TextIcon";

const Travel = (props) => 
{
	const travelData = sectorData.find(sector => sector.title === "Travel");
	/*
	Example to get specific data"
	const accomodationCategory = travelData.categories.find(category => category.name === "Accomodation");
	const accomodationItems = accomodationCategory.items;
	*/

	console.log('Travel: data:', travelData);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavArrowTitle title={travelData.title} alignment="start" navigation={props.navigation} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>
					{travelData.categories.map((category, index) => (
						<Card key={index} style={{ width: '100%', marginBottom: 15 }}>
						<TextIcon key={index} title={category.name} iconname="chevron-right-outline" fontweight="bold" fontsize={16} width={24}  />
						{category.items.map((item, index) => ( 
							index === 0 
							? <TextIcon key={index} title={item} iconname="chevron-right-outline" width={24} mt={20} mb={10} />
							: <TextIcon key={index} title={item} iconname="chevron-right-outline" width={24} mt={10} mb={10} />
						))}
						</Card>
					))}
                </Layout>
            </ScrollView>
        <BotNavShopper selected={1} />
        </SafeAreaView>
    );
};

export default Travel;