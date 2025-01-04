import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonMed from "../../../../components/CatButtonMed";
import CatButtonWide from "../../../../components/CatButtonWide";

const Home = (props) => 
{
	const handelGotoAccomodation = () =>
	{
		props.navigation.navigate('TravelAccomodation');
	}
	const handelGotoTransport = () =>
	{
		props.navigation.navigate('TravelTransport');
	}
	const handelSearchTravelAgents = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Travel", category: "travelOpt1", categoryItem: "travelOpt1"});
	}


  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Search Page`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 30 }}>
						<Image source={require('../../../../assets/sectors/travel/cat_travel.png')} style={{ alignSelf: 'center' }} />
						<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Travel</Text>
					</View>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#C5EDEC" btnImage={require('../../../../assets/sectors/travel/accomodation.png')} btnText="Accomodation" onPress={handelGotoAccomodation} />
						<CatButtonMed bgColor="#C5EDEC" btnImage={require('../../../../assets/sectors/travel/travel.png')} btnText="Transport" onPress={handelGotoTransport} />
					</Layout>

					<Layout style={{width: '100%'}}>
						<CatButtonWide bgColor="#C5EDEC" btnImage={require('../../../../assets/sectors/travel/travel_agents.png')} btnText="Travel Agents" onPress={handelSearchTravelAgents} />
					</Layout>

                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default Home;