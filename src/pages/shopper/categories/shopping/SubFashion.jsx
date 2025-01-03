import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonMed from "../../../../components/CatButtonMed";
import CatButtonSml from '../../../../components/CatButtonSml';

const SubFashion = (props) => 
{
	const handelSearchClothing = () =>
	{
		console.log('Search Clothing');
	}

	const handelSearchShoes = () =>
	{
		console.log('Search Shoes');
	}

	const handelSearchAccessories = () =>
	{
		console.log('Search Accessories');
	}

	const handelSearchMakeUp = () =>
	{
		console.log('Search Make Up');
	}
	
	const handelSearchBath = () =>
	{
		console.log('Search Accessories');
	}

	const handelSearchDesigner = () =>
	{
		console.log('Search Make Up');
	}

	const handelSearchHair = () =>
	{
		console.log('Search Accessories');
	}

	const handelSearchMakeUpArtist = () =>
	{
		console.log('Search Make Up');
	}

	const handelSearchSkin = () =>
	{
		console.log('Search Make Up');
	}

	const handelSearchCostume = () =>
	{
		console.log('Search Make Up');
	}
	

  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Shopping`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 30 }}>
						<Image source={require('../../../../assets/sectors/shopping/cat_fashion.png')} style={{ alignSelf: 'center' }} />
						<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Fashion & Beauty</Text>
					</View>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/clothing.png')} btnText="Clothing" onPress={handelSearchClothing} />
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/shoes.png')} btnText="Shoes" onPress={handelSearchShoes} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/accessories.png')} btnText="Accessories" onPress={handelSearchAccessories} />
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/make_up.png')} btnText="Make-Up & Cosmetics" onPress={handelSearchMakeUp} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/bath.png')} btnText="Bath & Body" onPress={handelSearchBath} />
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/designer.png')} btnText="Clothing Designers & Stylists" onPress={handelSearchDesigner} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/stylists.png')} btnText="Hair Stylists & Products" onPress={handelSearchHair} />
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/make_up_artist.png')} btnText="Make-Up Artists" onPress={handelSearchMakeUpArtist} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/skin.png')} btnText="Skin & Beauty Technicians" onPress={handelSearchSkin} />
						<CatButtonSml bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/costume.png')} btnText="Costume Hire" onPress={handelSearchCostume} />
					</Layout>


                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default SubFashion;