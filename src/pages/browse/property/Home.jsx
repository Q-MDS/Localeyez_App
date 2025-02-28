import React from 'react';
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../components/TopNavBack";
import { BotNavBrowse } from '../../../components/BotNavBrowse';
import { SafeAreaView, ScrollView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonMed from "../../../components/CatButtonMed";
import CatButtonWide from "../../../components/CatButtonWide";

const Home = (props) => 
{
	const handelSearchForSale = () =>
	{
		props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Property", category: "propertyOpt1", categoryItem: "propertyOpt1"});
	}

	const handelSearchRent = () =>
	{
		props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Property", category: "propertyOpt2", categoryItem: "propertyOpt2"});
	}

	const handelSearchCommercial = () =>
	{
		props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Property", category: "propertyOpt3", categoryItem: "propertyOpt3"});
	}

	const handelSearchLegal = () =>
	{
		props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Property", category: "propertyOpt4", categoryItem: "propertyOpt4"});
	}

  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Search Page`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 30 }}>
						<Image source={require('../../../assets/sectors/property/cat_property.png')} style={{ alignSelf: 'center' }} />
						<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Property</Text>
					</View>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#FCD5E1" btnImage={require('../../../assets/sectors/property/for_sale.png')} btnText="For Sale (agents)" onPress={handelSearchForSale} />
						<CatButtonMed bgColor="#FCD5E1" btnImage={require('../../../assets/sectors/property/to_rent.png')} btnText="To Rent (Agents)" onPress={handelSearchRent} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#FCD5E1" btnImage={require('../../../assets/sectors/property/commercial.png')} btnText="Commercial (Agents)" onPress={handelSearchCommercial} />
						<CatButtonMed bgColor="#FCD5E1" btnImage={require('../../../assets/sectors/property/legal.png')} btnText="Legal (Property Law Firms)" onPress={handelSearchLegal} />
					</Layout>


                </Layout>
            </ScrollView>
        <BotNavBrowse selected={0} />
        </SafeAreaView>
  	)
}

export default Home;