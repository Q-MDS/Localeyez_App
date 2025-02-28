import React from 'react';
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../components/TopNavBack";
import { BotNavBrowse } from '../../../components/BotNavBrowse';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonMed from "../../../components/CatButtonMed";
import CatButtonWide from "../../../components/CatButtonWide";

const SubTransport = (props) => 
{
	const handleSearchCategory = () =>
	{
		console.log('Search Category: Fashion & Beauty');

		props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Travel", category: "transport", categoryItem: "transport"});
	}

	const handleSearchAirlines = () => 
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Travel", category: "transport", categoryItem: "Airlines"});
	}

	const handleSearchTrain = () => 
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Travel", category: "transport", categoryItem: "Train Services"});
	}

	const handleSearchBus = () => 
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Travel", category: "transport", categoryItem: "Bus Services"});
	}

	const handleSearchShuttle = () => 
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Travel", category: "transport", categoryItem: "Shuttle Services"});
	}

	const handleSearchTaxi = () => 
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Travel", category: "transport", categoryItem: "Taxi’s"});
	}

	const handleSearchCarHire = () => 
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Travel", category: "transport", categoryItem: "Car Hire"});
	}

	const handleSearchChauffeur = () => 
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Travel", category: "transport", categoryItem: "Chauffeur Services"});
	}

  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Travel`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, paddingBottom: 25, backgroundColor: '#fff'}]}>

					<TouchableOpacity onPress={handleSearchCategory}>
						<View style={{ marginBottom: 40 }}>
							<Image source={require('../../../assets/sectors/travel/cat_transport.png')} style={{ alignSelf: 'center' }} />
							<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Transport</Text>
						</View>
					</TouchableOpacity>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#C5EDEC" btnImage={require('../../../assets/sectors/travel/airlines.png')} btnText="Airlines" onPress={handleSearchAirlines} />
						<CatButtonMed bgColor="#C5EDEC" btnImage={require('../../../assets/sectors/travel/train.png')} btnText="Train Services" onPress={handleSearchTrain} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#C5EDEC" btnImage={require('../../../assets/sectors/travel/bus.png')} btnText="Bus Services" onPress={handleSearchBus} />
						<CatButtonMed bgColor="#C5EDEC" btnImage={require('../../../assets/sectors/travel/shuttle.png')} btnText="Shuttle Services" onPress={handleSearchShuttle} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#C5EDEC" btnImage={require('../../../assets/sectors/travel/taxi.png')} btnText="Taxis" onPress={handleSearchTaxi} />
						<CatButtonMed bgColor="#C5EDEC" btnImage={require('../../../assets/sectors/travel/car_hire.png')} btnText="Car Hire" onPress={handleSearchCarHire} />
					</Layout>
					<Layout style={{width: '100%'}}>
						<CatButtonWide bgColor="#C5EDEC" btnImage={require('../../../assets/sectors/travel/chauffeur.png')} btnText="Chauffeur Services" onPress={handleSearchChauffeur} />
					</Layout>
                </Layout>
            </ScrollView>
        <BotNavBrowse selected={0} />
        </SafeAreaView>
  	)
}

export default SubTransport;