import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Layout, Text, Card } from "@ui-kitten/components";
import { TextIcon } from "../../../../components/TextIcon";
import CatButtonWideTall from '../../../../components/CatButtonWideTall';

const SubSelfCare = (props) => 
{
	const handleSearchHair = () => 
	{
		// Search results
		console.log('Search Hair');
	}

	const handleSearchBeauty = () => 
	{
		// Search results
		console.log('Search Beauty');
	}
   
  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Services`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, paddingBottom: 25, backgroundColor: '#fff'}]}>

                <View style={{ marginBottom: 40 }}>
                  <Image source={require('../../../../assets/sectors/services/cat_self_care.png')} style={{ alignSelf: 'center' }} />
                  <Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Self Care</Text>
                </View>

                <Layout style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
                  <CatButtonWideTall bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/hair.png')} btnText="Hair Dressers & Stylists" onPress={handleSearchHair} />
                  <CatButtonWideTall bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/beauty_spa.png')} btnText="Beauty Spas" onPress={handleSearchBeauty} />
                </Layout>

                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default SubSelfCare;