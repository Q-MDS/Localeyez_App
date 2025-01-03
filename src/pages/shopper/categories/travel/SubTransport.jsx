import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Layout, Text, Card } from "@ui-kitten/components";
import { TextIcon } from "../../../../components/TextIcon";
import CatButtonMed from "../../../../components/CatButtonMed";
import CatButtonWide from "../../../../components/CatButtonWide";

const SubTransport = (props) => 
{
	const handleSearchAirlines = () => 
	{
		// Search results
		console.log('Search Airlines');
	}

	const handleSearchTrain = () => 
	{
		// Search results
		console.log('Search Train Services');
	}

	const handleSearchBus = () => 
	{
		// Search results
		console.log('Search Bus Services');
	}

	const handleSearchShuttle = () => 
	{
		// Search results
		console.log('Search Shuttle Services');
	}

	const handleSearchTaxi = () => 
	{
		// Search results
		console.log('Search Taxi Services');
	}

	const handleSearchCarHire = () => 
	{
		// Search results
		console.log('Search Car Hire');
	}

	const handleSearchChauffeur = () => 
	{
		// Search results
		console.log('Search Chauffeur Services');
	}

  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Travel`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, paddingBottom: 25, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 40 }}>
						<Image source={require('../../../../assets/sectors/travel/cat_transport.png')} style={{ alignSelf: 'center' }} />
						<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Transport</Text>
					</View>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#C5EDEC" btnImage={require('../../../../assets/sectors/travel/airlines.png')} btnText="Airlines" onPress={handleSearchAirlines} />
						<CatButtonMed bgColor="#C5EDEC" btnImage={require('../../../../assets/sectors/travel/train.png')} btnText="Train Services" onPress={handleSearchTrain} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#C5EDEC" btnImage={require('../../../../assets/sectors/travel/bus.png')} btnText="Bus Services" onPress={handleSearchBus} />
						<CatButtonMed bgColor="#C5EDEC" btnImage={require('../../../../assets/sectors/travel/shuttle.png')} btnText="Shuttle Services" onPress={handleSearchShuttle} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#C5EDEC" btnImage={require('../../../../assets/sectors/travel/taxi.png')} btnText="Taxis" onPress={handleSearchTaxi} />
						<CatButtonMed bgColor="#C5EDEC" btnImage={require('../../../../assets/sectors/travel/car_hire.png')} btnText="Car Hire" onPress={handleSearchCarHire} />
					</Layout>
					<Layout style={{width: '100%'}}>
						<CatButtonWide bgColor="#C5EDEC" btnImage={require('../../../../assets/sectors/travel/chauffeur.png')} btnText="Chauffeur Services" onPress={handleSearchChauffeur} />
					</Layout>
                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default SubTransport;