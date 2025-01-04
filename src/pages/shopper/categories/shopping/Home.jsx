import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonSml from '../../../../components/CatButtonSml';

const Home = (props) => 
{
	const handelGotoFashion = () =>
	{
		props.navigation.navigate('ShoppingFashion');
	}

	const handelGotoHome = () =>
	{
		props.navigation.navigate('ShoppingSubHome');
	}

	const handelGotoGroceries = () =>
	{
		props.navigation.navigate('ShoppingGroceries');
	}

	const handelSearchHardware = () =>
	{
		console.log('Search Hardware & Electrical');
		props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Shopping", category: "shoppingOpt1", categoryItem: "shoppingOpt1"});
	}

	const handelSearchStationary = () =>
	{
		console.log('Search Stationary & Gifts');
		props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Shopping", category: "shoppingOpt2", categoryItem: "shoppingOpt2"});
	}

	const handelSearchChildren = () =>
	{
		console.log('Search Children');
		props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Shopping", category: "shoppingOpt3", categoryItem: "shoppingOpt3"});
	}

  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Search`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 30 }}>
						<Image source={require('../../../../assets/sectors/shopping/cat_shopping.png')} style={{ alignSelf: 'center' }} />
						<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Shopping</Text>
					</View>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/fashion.png')} btnText="Fashion & Beauty" onPress={handelGotoFashion} />
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/home.png')} btnText="Home" onPress={handelGotoHome} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/groceries.png')} btnText="Groceries" onPress={handelGotoGroceries} />
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/hardware.png')} btnText="Hardware & Electrical" onPress={handelSearchHardware} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/stationary.png')} btnText="Stationary & Gifts" onPress={handelSearchStationary} />
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/children.png')} btnText="Children" onPress={handelSearchChildren} />
					</Layout>

                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default Home;