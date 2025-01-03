import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { TextIcon } from "../../../../components/TextIcon";

const SubEmployment = (props) => 
{
	const handleItemSearch = (category, categoryItem) => 
		{
			category === "Employment" ? category = "employment" : category === "employment";
			props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Education & Employment", category: category, categoryItem: categoryItem});
		}
   
  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Education & Employment`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, paddingBottom: 25, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 40 }}>
						<Image source={require('../../../../assets/sectors/education/cat_employment.png')} style={{ alignSelf: 'center' }} />
						<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Employment</Text>
					</View>

					<TouchableOpacity style={{ width: '100%' }} onPress={() => handleItemSearch("Employment", "employment")}>
						<TextIcon title={"Recruitment Agencies"} iconname="chevron-right-outline" width={24} mt={5} mb={5} pl={15} status="basic" />
					</TouchableOpacity>

                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default SubEmployment;