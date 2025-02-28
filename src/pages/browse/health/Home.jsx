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
	const handelGotoSports = () =>
	{
		props.navigation.navigate('BrowseHealthSports');
	}

	const handelGotoDoctors = () =>
	{
		props.navigation.navigate('BrowseHealthDoctors');
	}

	const handelSearchStores = () =>
	{
		props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Health & Wellness", category: "healthOpt1", categoryItem: "healthOpt1"});
	}

	const handelSearchHospitals = () =>
	{
		props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Health & Wellness", category: "healthOpt2", categoryItem: "healthOpt2"});
	}

  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Search`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 30 }}>
						<Image source={require('../../../assets/sectors/health/cat_health.png')} style={{ alignSelf: 'center' }} />
						<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Health & Wellness</Text>
					</View>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#FFDED1" btnImage={require('../../../assets/sectors/health/sports.png')} btnText="Sports & Recreation" onPress={handelGotoSports} />
						<CatButtonMed bgColor="#FFDED1" btnImage={require('../../../assets/sectors/health/doctors.png')} btnText="Doctors & Specialists" onPress={handelGotoDoctors} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#FFDED1" btnImage={require('../../../assets/sectors/health/stores.png')} btnText="Health Stores & Pharmacies" onPress={handelSearchStores} />
						<CatButtonMed bgColor="#FFDED1" btnImage={require('../../../assets/sectors/health/hospitals.png')} btnText="Hospitals & Trauma Centres" onPress={handelSearchHospitals} />
					</Layout>

                </Layout>
            </ScrollView>
        <BotNavBrowse selected={0} />
        </SafeAreaView>
  	)
}

export default Home;