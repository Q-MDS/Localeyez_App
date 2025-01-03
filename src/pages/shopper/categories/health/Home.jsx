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
	const handelGotoSports = () =>
	{
		props.navigation.navigate('HealthSports');
	}

	const handelGotoDoctors = () =>
	{
		props.navigation.navigate('HealthDoctors');
	}

	const handelSearchStores = () =>
	{
		console.log('Search Health Stores & Pharmacies');
	}

	const handelSearchHospitals = () =>
	{
		console.log('Search Hospitals & Yrauma Centers');
	}

  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Search`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 30 }}>
						<Image source={require('../../../../assets/sectors/health/cat_health.png')} style={{ alignSelf: 'center' }} />
						<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Health & Wellness</Text>
					</View>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#FFDED1" btnImage={require('../../../../assets/sectors/health/sports.png')} btnText="Sports & Recreation" onPress={handelGotoSports} />
						<CatButtonMed bgColor="#FFDED1" btnImage={require('../../../../assets/sectors/health/doctors.png')} btnText="Doctors & Specialists" onPress={handelGotoDoctors} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#FFDED1" btnImage={require('../../../../assets/sectors/health/stores.png')} btnText="Health Stores & Pharmacies" onPress={handelSearchStores} />
						<CatButtonMed bgColor="#FFDED1" btnImage={require('../../../../assets/sectors/health/hospitals.png')} btnText="Hospitals & Trauma Centres" onPress={handelSearchHospitals} />
					</Layout>

                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default Home;