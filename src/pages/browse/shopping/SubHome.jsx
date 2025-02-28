import React from 'react';
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../components/TopNavBack";
import { BotNavBrowse } from '../../../components/BotNavBrowse';
import { TouchableOpacity, SafeAreaView, ScrollView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonMed from "../../../components/CatButtonMed";

const SubHome = (props) => 
{
	const handleSearchCategory = () =>
	{
		console.log('Search Category: Home');

		props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Shopping", category: "home", categoryItem: "home"});
	}

	const handelSearchFurniture = () =>
	{
		console.log('Search Furniture');
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Shopping", category: "home", categoryItem: "Furniture"});
	}

	const handelSearchFixtures = () =>
	{
		console.log('Search Fixtures');
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Shopping", category: "home", categoryItem: "Fixtures and Fittings"});
	}

	const handelSearchHomeware = () =>
	{
		console.log('Search Homeware');
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Shopping", category: "home", categoryItem: "Homeware and Décor"});
	}

	const handelSearchElectronics = () =>
	{
		console.log('Search Electronics');
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Shopping", category: "home", categoryItem: "Electronics and appliances"});
	}

  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Shopping`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

					<TouchableOpacity onPress={handleSearchCategory}>
						<View style={{ marginBottom: 30 }}>
							<Image source={require('../../../assets/sectors/shopping/cat_home.png')} style={{ alignSelf: 'center' }} />
							<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Home</Text>
						</View>
					</TouchableOpacity>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#EDC9F9" btnImage={require('../../../assets/sectors/shopping/furniture.png')} btnText="Furniture" onPress={handelSearchFurniture} />
						<CatButtonMed bgColor="#EDC9F9" btnImage={require('../../../assets/sectors/shopping/fixtures.png')} btnText="Fixtures & Fittings" onPress={handelSearchFixtures} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#EDC9F9" btnImage={require('../../../assets/sectors/shopping/homeware.png')} btnText="Homeware & Decor" onPress={handelSearchHomeware} />
						<CatButtonMed bgColor="#EDC9F9" btnImage={require('../../../assets/sectors/shopping/appliances.png')} btnText="Electronics & Appliances" onPress={handelSearchElectronics} />
					</Layout>


                </Layout>
            </ScrollView>
        <BotNavBrowse selected={0} />
        </SafeAreaView>
  	)
}

export default SubHome;