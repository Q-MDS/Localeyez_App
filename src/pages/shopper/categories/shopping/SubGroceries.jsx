import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { TouchableOpacity, SafeAreaView, ScrollView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonMed from "../../../../components/CatButtonMed";
import CatButtonWide from '../../../../components/CatButtonWide';

const SubGroceries = (props) => 
{
	const handleSearchCategory = () =>
	{
		console.log('Search Category: Groceries');
		props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Shopping", category: "groceries", categoryItem: "groceries"});
	}
	
	const handelSearchFood = () =>
	{
		console.log('Search Food');
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Shopping", category: "groceries", categoryItem: "Food & Beverage"});
	}

	const handelSearchMarkets = () =>
	{
		console.log('Search Markets');
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Shopping", category: "groceries", categoryItem: "Local Markets & homemade goods"});
	}

	const handelSearchHousehold = () =>
	{
		console.log('Search Household');
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Shopping", category: "groceries", categoryItem: "Household goods"});
	}

  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Shopping`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

					<TouchableOpacity onPress={handleSearchCategory}>
						<View style={{ marginBottom: 30 }}>
							<Image source={require('../../../../assets/sectors/shopping/cat_groceries.png')} style={{ alignSelf: 'center' }} />
							<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Groceries</Text>
						</View>
					</TouchableOpacity>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/food.png')} btnText="Food & Beverages" onPress={handelSearchFood} />
						<CatButtonMed bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/markets.png')} btnText="Local Markets & Homemade Goods" onPress={handelSearchMarkets} />
					</Layout>

					<Layout style={{width: '100%'}}>
						<CatButtonWide bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/household.png')} btnText="Household Goods" onPress={handelSearchHousehold} />
					</Layout>

                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default SubGroceries;