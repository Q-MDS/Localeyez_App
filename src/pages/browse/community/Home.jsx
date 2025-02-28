import React from 'react';
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../components/TopNavBack";
import { BotNavBrowse } from '../../../components/BotNavBrowse';
import { SafeAreaView, ScrollView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonMed from "../../../components/CatButtonMed";

const Home = (props) => 
{
	const handelGotoCharity = () =>
	{
		props.navigation.navigate('BrowseCommunityCharity');
	}
	const handelSearchNonProfit = () =>
	{
		props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Community", category: "communityOpt2", categoryItem: "communityOpt2"});
	}
	const handelSearchNgo = () =>
	{
		props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Community", category: "communityOpt3", categoryItem: "communityOpt3"});
	}
	const handelSearchSupport = () =>
	{
		props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Community", category: "communityOpt4", categoryItem: "communityOpt4"});
	}

  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Search Page`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 30 }}>
						<Image source={require('../../../assets/sectors/community/cat_community.png')} style={{ alignSelf: 'center' }} />
						<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Community</Text>
					</View>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#D6F6FD" btnImage={require('../../../assets/sectors/community/charity.png')} btnText="Charity Organisations" onPress={handelGotoCharity} />
						<CatButtonMed bgColor="#D6F6FD" btnImage={require('../../../assets/sectors/community/non_profit.png')} btnText="Non-Profits" onPress={handelSearchNonProfit} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#D6F6FD" btnImage={require('../../../assets/sectors/community/ngo.png')} btnText="NGO's" onPress={handelSearchNgo} />
						<CatButtonMed bgColor="#D6F6FD" btnImage={require('../../../assets/sectors/community/support.png')} btnText="Support Groups" onPress={handelSearchSupport} />
					</Layout>

                </Layout>
            </ScrollView>
        <BotNavBrowse selected={0} />
        </SafeAreaView>
  	)
}

export default Home;