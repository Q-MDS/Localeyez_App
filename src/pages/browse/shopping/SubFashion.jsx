import React from 'react';
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../components/TopNavBack";
import { BotNavBrowse } from '../../../components/BotNavBrowse';
import { TouchableOpacity, SafeAreaView, ScrollView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonSml from '../../../components/CatButtonSml';

const SubFashion = (props) => 
{
	const handleSearchCategory = () =>
	{
		console.log('Search Category: Fashion & Beauty');

		props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Shopping", category: "fashion", categoryItem: "fashion"});
	}

	const handelSearchClothing = () =>
	{
		console.log('Search Clothing');
		// category === "Fashion & Beauty" ? category = "fashion" : category === "fashion";
		// category === "Home" ? category = "home" : category === "home";
		// category === "Groceries" ? category = "groceries" : category === "groceries";
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Shopping", category: "fashion", categoryItem: "Clothing"});
	}

	const handelSearchShoes = () =>
	{
		console.log('Search Shoes');
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Shopping", category: "fashion", categoryItem: "Shoes"});
	}

	const handelSearchAccessories = () =>
	{
		console.log('Search Accessories');
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Shopping", category: "fashion", categoryItem: "Accessories"});
	}

	const handelSearchMakeUp = () =>
	{
		console.log('Search Make Up');
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Shopping", category: "fashion", categoryItem: "Make-Up & Cosmetics"});
	}
	
	const handelSearchBath = () =>
	{
		console.log('Search Bath');
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Shopping", category: "fashion", categoryItem: "Bath & Body"});
	}

	const handelSearchDesigner = () =>
	{
		console.log('Search Designer');
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Shopping", category: "fashion", categoryItem: "Clothing Designers & Stylists"});
	}

	const handelSearchHair = () =>
	{
		console.log('Search Hair');
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Shopping", category: "fashion", categoryItem: "Hair Stylists & Products"});
	}

	const handelSearchMakeUpArtist = () =>
	{
		console.log('Search Make Up Artist');
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Shopping", category: "fashion", categoryItem: "Make-up artists"});
	}

	const handelSearchSkin = () =>
	{
		console.log('Search Skin');
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Shopping", category: "fashion", categoryItem: "Skin and beauty Technicians"});
	}

	const handelSearchCostume = () =>
	{
		console.log('Search Costume');
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Shopping", category: "fashion", categoryItem: "Costume Hire"});
	}
	

  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Shopping`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

					<TouchableOpacity onPress={handleSearchCategory}>
						<View style={{ marginBottom: 30 }}>
							<Image source={require('../../../assets/sectors/shopping/cat_fashion.png')} style={{ alignSelf: 'center' }} />
							<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Fashion & Beauty</Text>
						</View>
					</TouchableOpacity>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../assets/sectors/shopping/clothing.png')} btnText="Clothing" onPress={handelSearchClothing} />
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../assets/sectors/shopping/shoes.png')} btnText="Shoes" onPress={handelSearchShoes} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../assets/sectors/shopping/accessories.png')} btnText="Accessories" onPress={handelSearchAccessories} />
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../assets/sectors/shopping/make_up.png')} btnText="Make-Up & Cosmetics" onPress={handelSearchMakeUp} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../assets/sectors/shopping/bath.png')} btnText="Bath & Body" onPress={handelSearchBath} />
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../assets/sectors/shopping/designer.png')} btnText="Clothing Designers & Stylists" onPress={handelSearchDesigner} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../assets/sectors/shopping/stylists.png')} btnText="Hair Stylists & Products" onPress={handelSearchHair} />
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../assets/sectors/shopping/make_up_artist.png')} btnText="Make-Up Artists" onPress={handelSearchMakeUpArtist} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../assets/sectors/shopping/skin.png')} btnText="Skin & Beauty Technicians" onPress={handelSearchSkin} />
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../assets/sectors/shopping/costume.png')} btnText="Costume Hire" onPress={handelSearchCostume} />
					</Layout>


                </Layout>
            </ScrollView>
        <BotNavBrowse selected={0} />
        </SafeAreaView>
  	)
}

export default SubFashion;