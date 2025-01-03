import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonMed from "../../../../components/CatButtonMed";

const SubHome = (props) => 
{
	const handelSearchFurniture = () =>
	{
		console.log('Search Furniture');
	}

	const handelSearchFixtures = () =>
	{
		console.log('Search Fixtures');
	}

	const handelSearchHomeware = () =>
	{
		console.log('Search Homeware');
	}

	const handelSearchElectronics = () =>
	{
		console.log('Search Electronics');
	}

  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Shopping`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 30 }}>
						<Image source={require('../../../../assets/sectors/shopping/cat_home.png')} style={{ alignSelf: 'center' }} />
						<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Home</Text>
					</View>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/furniture.png')} btnText="Furniture" onPress={handelSearchFurniture} />
						<CatButtonMed bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/fixtures.png')} btnText="Fixtures & Fittings" onPress={handelSearchFixtures} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/homeware.png')} btnText="Homeware & Decor" onPress={handelSearchHomeware} />
						<CatButtonMed bgColor="#EDC9F9" btnImage={require('../../../../assets/sectors/shopping/appliances.png')} btnText="Electronics & Appliances" onPress={handelSearchElectronics} />
					</Layout>


                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default SubHome;