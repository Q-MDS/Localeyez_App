import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { TouchableOpacity, SafeAreaView, ScrollView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonWide from "../../../../components/CatButtonWide";
import CatButtonSml from '../../../../components/CatButtonSml';

const SubFinancial = (props) => 
{
	const handleSearchCategory = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Services", category: "serFin", categoryItem: "serFin"});
	}
  
	const handelSearchBanks = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Services", category: "serFin", categoryItem: "Banks"});
	}

	const handelSearchBureau = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Services", category: "serFin", categoryItem: "Bureau De change"});
	}

	const handelSearchInsurance = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Services", category: "serFin", categoryItem: "Insurance"});
	}

	const handelsearchAccountants = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Services", category: "serFin", categoryItem: "Accountants"});
	}

	const handelSearchFinManagement = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Services", category: "serFin", categoryItem: "Financial Management"});
	}


  return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Services`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

				<TouchableOpacity onPress={handleSearchCategory}>
					<View style={{ marginBottom: 30 }}>
					<Image source={require('../../../../assets/sectors/services/cat_financial.png')} style={{ alignSelf: 'center' }} />
					<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Financial</Text>
					</View>
				</TouchableOpacity>

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