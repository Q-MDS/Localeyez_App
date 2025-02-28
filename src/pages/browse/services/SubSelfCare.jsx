import React from 'react';
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../components/TopNavBack";
import { BotNavBrowse } from '../../../components/BotNavBrowse';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonWideTall from '../../../components/CatButtonWideTall';

const SubSelfCare = (props) => 
{
	const handleSearchCategory = () =>
	{
		props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Services", category: "serSelf", categoryItem: "serSelf"});
	}

	const handleSearchHair = () => 
	{
		// Search results
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Services", category: "serSelf", categoryItem: "Hair dressers and stylists"});
	}

	const handleSearchBeauty = () => 
	{
		// Search results
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Services", category: "serSelf", categoryItem: "Beauty Spa’s"});
	}
   
  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Services`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, paddingBottom: 25, backgroundColor: '#fff'}]}>

                <TouchableOpacity onPress={handleSearchCategory}>
                  	<View style={{ marginBottom: 40 }}>
						<Image source={require('../../../assets/sectors/services/cat_self_care.png')} style={{ alignSelf: 'center' }} />
						<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Self Care</Text>
                 	</View>
                </TouchableOpacity>

                <Layout style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
                  <CatButtonWideTall bgColor="#CDECFF" btnImage={require('../../../assets/sectors/services/hair.png')} btnText="Hair Dressers & Stylists" onPress={handleSearchHair} />
                  <CatButtonWideTall bgColor="#CDECFF" btnImage={require('../../../assets/sectors/services/beauty_spa.png')} btnText="Beauty Spas" onPress={handleSearchBeauty} />
                </Layout>

                </Layout>
            </ScrollView>
        <BotNavBrowse selected={0} />
        </SafeAreaView>
  	)
}

export default SubSelfCare;