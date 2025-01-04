import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { TouchableOpacity, SafeAreaView, ScrollView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonSml from '../../../../components/CatButtonSml';

const SubEat = (props) => 
{
	const handleSearchCategory = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Entertainment", category: "eat", categoryItem: "eat"});
	}

	const handelSearchRestuarants = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Entertainment", category: "eat", categoryItem: "Restaurants"});
	}
	
	const handelSearchBars = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Entertainment", category: "eat", categoryItem: "Bars"});
	}

	const handelSearchClubs = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Entertainment", category: "eat", categoryItem: "Clubs"});
	}

	const handelSearchCoffee = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Entertainment", category: "eat", categoryItem: "Coffee Shops"});
	}
	
	const handelSearchTakeaways = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Entertainment", category: "eat", categoryItem: "Takeaways"});
	}

	const handelSearchBakeries = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Entertainment", category: "eat", categoryItem: "Bakeries and Patisseries"});
	}

	const handelSearchSpeciality = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Entertainment", category: "eat", categoryItem: "Speciality foods"});
	}

	const handelSearchCatering = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Entertainment", category: "eat", categoryItem: "Catering and ready meals"});
	}

  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Entertainment`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

					<TouchableOpacity onPress={handleSearchCategory}>
						<View style={{ marginBottom: 30 }}>
							<Image source={require('../../../../assets/sectors/entertainment/cat_eat.png')} style={{ alignSelf: 'center' }} />
							<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Eat & Drink</Text>
						</View>
					</TouchableOpacity>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/restaurants.png')} btnText="Restaurants" onPress={handelSearchRestuarants} />
						<CatButtonSml bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/bars.png')} btnText="Bars" onPress={handelSearchBars} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/clubs.png')} btnText="Clubs" onPress={handelSearchClubs} />
						<CatButtonSml bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/coffee.png')} btnText="Make-Up & Cosmetics" onPress={handelSearchCoffee} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/takeaways.png')} btnText="Takeaways" onPress={handelSearchTakeaways} />
						<CatButtonSml bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/bakeries.png')} btnText="Bakeries & Patisseries" onPress={handelSearchBakeries} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/speciality.png')} btnText="Speciality Foods" onPress={handelSearchSpeciality} />
						<CatButtonSml bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/catering.png')} btnText="Catering & ready Foods" onPress={handelSearchCatering} />
					</Layout>

                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default SubEat;