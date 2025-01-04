import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { TouchableOpacity, SafeAreaView, ScrollView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonMed from "../../../../components/CatButtonMed";

const SubSports = (props) => 
{
	const handleSearchCategory = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Health & Wellness", category: "sport", categoryItem: "sport"});
	}

	const handelSearchGyms = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Health & Wellness", category: "sport", categoryItem: "Gyms"});
	}

	const handelSearchClubs = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Health & Wellness", category: "sport", categoryItem: "Sports Clubs"});
	}

	const handelSearchSpas = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Health & Wellness", category: "sport", categoryItem: "Spa’s"});
	}

	const handelSearchOutdoor = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Health & Wellness", category: "sport", categoryItem: "Outdoor activities"});
	}

  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Health`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

					<TouchableOpacity onPress={handleSearchCategory}>
						<View style={{ marginBottom: 30 }}>
							<Image source={require('../../../../assets/sectors/health/cat_sports.png')} style={{ alignSelf: 'center' }} />
							<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Sports & Recreation</Text>
						</View>
					</TouchableOpacity>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#FFDED1" btnImage={require('../../../../assets/sectors/health/gyms.png')} btnText="Gyms" onPress={handelSearchGyms} />
						<CatButtonMed bgColor="#FFDED1" btnImage={require('../../../../assets/sectors/health/clubs.png')} btnText="Sports Clubs" onPress={handelSearchClubs} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#FFDED1" btnImage={require('../../../../assets/sectors/health/spas.png')} btnText="Spa's" onPress={handelSearchSpas} />
						<CatButtonMed bgColor="#FFDED1" btnImage={require('../../../../assets/sectors/health/outdoor.png')} btnText="Outdoor Activities" onPress={handelSearchOutdoor} />
					</Layout>


                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default SubSports;