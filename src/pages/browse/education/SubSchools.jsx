import React from 'react';
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../components/TopNavBack";
import { BotNavBrowse } from '../../../components/BotNavBrowse';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Layout, Text, Card } from "@ui-kitten/components";
import { TextIcon } from "../../../components/TextIcon";
import CatButtonMed from "../../../components/CatButtonMed";
import CatButtonWide from "../../../components/CatButtonWide";

const SubSchools = (props) => 
{
	const handleSearchCategory = () =>
	{
		props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Education & Employment", category: "eduEvent", categoryItem: "eduEvent"});
	}

	const handleSearchPreSchool = () => 
	{
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Education & Employment", category: "eduEvent", categoryItem: "Preschools"});
	}

	const handleSearchPrimary = () => 
	{
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Education & Employment", category: "eduEvent", categoryItem: "Primary Schools"});
	}

	const handleSearchSecondary = () => 
	{
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Education & Employment", category: "eduEvent", categoryItem: "Secondary Schools"});
	}

	const handleSearchTertiary = () => 
	{
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Education & Employment", category: "eduEvent", categoryItem: "Tertiary Education"});
	}
   
  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Education & Employment`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, paddingBottom: 25, backgroundColor: '#fff'}]}>

					<TouchableOpacity onPress={handleSearchCategory}>
						<View style={{ marginBottom: 40 }}>
							<Image source={require('../../../assets/sectors/education/cat_schools.png')} style={{ alignSelf: 'center' }} />
							<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Schools</Text>
						</View>
					</TouchableOpacity>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#FFEEC8" btnImage={require('../../../assets/sectors/education/pre_schools.png')} btnText="Preschools" onPress={handleSearchPreSchool} />
						<CatButtonMed bgColor="#FFEEC8" btnImage={require('../../../assets/sectors/education/primary.png')} btnText="Primary Schools" onPress={handleSearchPrimary} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#FFEEC8" btnImage={require('../../../assets/sectors/education/secondary.png')} btnText="Secondary Schools" onPress={handleSearchSecondary} />
						<CatButtonMed bgColor="#FFEEC8" btnImage={require('../../../assets/sectors/education/tertiary.png')} btnText="Tertiary Education" onPress={handleSearchTertiary} />
					</Layout>

                </Layout>
            </ScrollView>
        <BotNavBrowse selected={0} />
        </SafeAreaView>
  	)
}

export default SubSchools;