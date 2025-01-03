import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonMed from "../../../../components/CatButtonMed";
import CatButtonWide from "../../../../components/CatButtonWide";
import CatButtonSml from '../../../../components/CatButtonSml';

const SubFinancial = (props) => 
{
	const handelSearchBanks = () =>
	{
		console.log('Search Banks');
	}

	const handelSearchBureau = () =>
	{
		console.log('Search Bureau');
	}

	const handelSearchInsurance = () =>
	{
		console.log('Search Insurance');
	}

	const handelsearchAccountants = () =>
	{
		console.log('Search Accountants');
	}

	const handelSearchFinManagement = () =>
	{
		console.log('Search Financial Management');
	}


  return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Services`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

                <View style={{ marginBottom: 30 }}>
                  <Image source={require('../../../../assets/sectors/services/cat_financial.png')} style={{ alignSelf: 'center' }} />
                  <Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Financial</Text>
                </View>

                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
                  <CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/banks.png')} btnText="Banks" onPress={handelSearchBanks} />
                  <CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/bureau.png')} btnText="Bureau De Change" onPress={handelSearchBureau} />
                </Layout>

                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
                  <CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/insurance.png')} btnText="Insurance" onPress={handelSearchInsurance} />
                  <CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/accountants.png')} btnText="Accountants" onPress={handelsearchAccountants} />
                </Layout>

                <Layout style={{width: '100%'}}>
                  <CatButtonWide bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/fin_manage.png')} btnText="Financial Management" onPress={handelSearchFinManagement} />
                </Layout>

                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default SubFinancial;