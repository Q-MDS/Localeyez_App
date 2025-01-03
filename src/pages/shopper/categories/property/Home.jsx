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
	const handelSearchForSale = () =>
	{
		console.log('Search For Sale');
	}

	const handelSearchRent = () =>
	{
		console.log('Search To Rent');
	}

	const handelSearchCommercial = () =>
	{
		console.log('Search Commercial');
	}

	const handelSearchLegal = () =>
	{
		console.log('Search Legal');
	}

  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Search Page`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 30 }}>
						<Image source={require('../../../../assets/sectors/property/cat_property.png')} style={{ alignSelf: 'center' }} />
						<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Property</Text>
					</View>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#FCD5E1" btnImage={require('../../../../assets/sectors/property/for_sale.png')} btnText="For Sale (agents)" onPress={handelSearchForSale} />
						<CatButtonMed bgColor="#FCD5E1" btnImage={require('../../../../assets/sectors/property/to_rent.png')} btnText="To Rent (Agents)" onPress={handelSearchRent} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#FCD5E1" btnImage={require('../../../../assets/sectors/property/commercial.png')} btnText="Commercial (Agents)" onPress={handelSearchCommercial} />
						<CatButtonMed bgColor="#FCD5E1" btnImage={require('../../../../assets/sectors/property/legal.png')} btnText="Legal (Property Law Firms)" onPress={handelSearchLegal} />
					</Layout>


                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default Home;