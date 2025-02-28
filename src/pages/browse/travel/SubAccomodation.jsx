import React from 'react';
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../components/TopNavBack";
import { BotNavBrowse } from '../../../components/BotNavBrowse';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonMed from "../../../components/CatButtonMed";
import CatButtonWide from "../../../components/CatButtonWide";

const SubAccomodation = (props) => 
{
	const handleSearchCategory = () =>
	{
		console.log('Search Category: Accomodation');

		props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Travel", category: "accomodation", categoryItem: "accomodation"});
	}

	const handleSearchHotels = () => 
	{
		// Search results
		console.log('Search Hotels');
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Travel", category: "accomodation", categoryItem: "Hotels"});
	}

	const handleSearchGuestLodges = () => 
	{
		// Search results
		console.log('Search Guest Lodges');
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Travel", category: "accomodation", categoryItem: "Guest Lodges"});
	}

	const handleSearchBnb = () => 
	{
		// Search results
		console.log('Search BnB');
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Travel", category: "accomodation", categoryItem: "BnB’s"});
	}

	const handleSearchLodges = () => 
	{
		// Search results
		console.log('Search Lodges');
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Travel", category: "accomodation", categoryItem: "Lodges"});
	}

	const handleSearchVillas = () => 
	{
		// Search results
		console.log('Search Villas');
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Travel", category: "accomodation", categoryItem: "Villa’s and Private Homes"});
	}

	const handleSearchBackpackers = () => 
	{
		// Search results
		console.log('Search Backpackers');
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Travel", category: "accomodation", categoryItem: "Backpackers"});
	}

	const handleSearchOther = () => 
	{
		// Search results
		console.log('Search Other');
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Travel", category: "accomodation", categoryItem: "Other –eg houseboats"});
	}


  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Travel`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, paddingBottom: 25, backgroundColor: '#fff'}]}>

					<TouchableOpacity onPress={handleSearchCategory}>
						<View style={{ marginBottom: 40 }}>
							<Image source={require('../../../assets/sectors/travel/cat_accomodation.png')} style={{ alignSelf: 'center' }} />
							<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Accomodation</Text>
						</View>
					</TouchableOpacity>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#C5EDEC" btnImage={require('../../../assets/sectors/travel/hotels.png')} btnText="Hotels" onPress={handleSearchHotels} />
						<CatButtonMed bgColor="#C5EDEC" btnImage={require('../../../assets/sectors/travel/guest_lodges.png')} btnText="Guest Lodges" onPress={handleSearchGuestLodges} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#C5EDEC" btnImage={require('../../../assets/sectors/travel/bnbs.png')} btnText="BnB's" onPress={handleSearchBnb} />
						<CatButtonMed bgColor="#C5EDEC" btnImage={require('../../../assets/sectors/travel/lodges.png')} btnText="Lodges" onPress={handleSearchLodges} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#C5EDEC" btnImage={require('../../../assets/sectors/travel/villas.png')} btnText="Villa’s & Private Homes" onPress={handleSearchVillas} />
						<CatButtonMed bgColor="#C5EDEC" btnImage={require('../../../assets/sectors/travel/backpackers.png')} btnText="Backpackers" onPress={handleSearchBackpackers} />
					</Layout>
					<Layout style={{width: '100%'}}>
						<CatButtonWide bgColor="#C5EDEC" btnImage={require('../../../assets/sectors/travel/other.png')} btnText="Other" onPress={handleSearchOther} />
					</Layout>
                </Layout>
            </ScrollView>
        <BotNavBrowse selected={0} />
        </SafeAreaView>
  	)
}

export default SubAccomodation;