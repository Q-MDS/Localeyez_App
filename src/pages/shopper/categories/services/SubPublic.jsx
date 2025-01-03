import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonSml from '../../../../components/CatButtonSml';

const SubPublic = (props) => 
{
	const handelSearchWater = () =>
	{
		console.log('Search Water');
	}

	const handelSearchEletricity = () =>
	{
		console.log('Search electricity');
	}

	const handelSearchRoads = () =>
	{
		console.log('Search Roads');
	}

	const handelsearchPolice = () =>
	{
		console.log('Search Police');
	}

	const handelSearchFire = () =>
	{
		console.log('Search Fire');
	}

	const handelSearchAccident = () =>
	{
		console.log('Search accident');
	}


  return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Services`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

                <View style={{ marginBottom: 30 }}>
                  <Image source={require('../../../../assets/sectors/services/cat_public.png')} style={{ alignSelf: 'center' }} />
                  <Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Public Services Contacts</Text>
                </View>

                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
                  <CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/water.png')} btnText="Water" onPress={handelSearchWater} />
                  <CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/electricity.png')} btnText="Electricity" onPress={handelSearchEletricity} />
                </Layout>

                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
                  <CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/roads.png')} btnText="Roads" onPress={handelSearchRoads} />
                  <CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/police.png')} btnText="Police" onPress={handelsearchPolice} />
                </Layout>

                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
                  <CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/fire.png')} btnText="Fire Department" onPress={handelSearchFire} />
                  <CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/accident.png')} btnText="Accident & Emergency" onPress={handelSearchAccident} />
                </Layout>

                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default SubPublic;