import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonMed from "../../../../components/CatButtonMed";
import CatButtonWide from "../../../../components/CatButtonWide";
import CatButtonSml from '../../../../components/CatButtonSml';

const Home = (props) => 
{
	const handelGotoHome = () =>
	{
		props.navigation.navigate('ServicesSubHome');
	}

	const handelGotoSelfCare = () =>
	{
		props.navigation.navigate('ServicesSelfCare');
	}

	const handelGotoFinancial = () =>
	{
		props.navigation.navigate('servicesFinancial');
	}

	const handelGotoPublic = () =>
	{
		props.navigation.navigate('ServicesPublic');
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
                  <Image source={require('../../../../assets/sectors/services/cat_services.png')} style={{ alignSelf: 'center' }} />
                  <Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Services</Text>
                </View>

                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
                  <CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/home.png')} btnText="Home" onPress={handelGotoHome} />
                  <CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/self_care.png')} btnText="Self Care" onPress={handelGotoSelfCare} />
                </Layout>

                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
                  <CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/financial.png')} btnText="Financial" onPress={handelGotoFinancial} />
                  <CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/legal.png')} btnText="Legal" onPress={handelSearchLegal} />
                </Layout>

                <Layout style={{width: '100%'}}>
                  <CatButtonWide bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/public.png')} btnText="Public Service Contacts" onPress={handelGotoPublic} />
                </Layout>

                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default Home;