import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { TouchableOpacity, SafeAreaView, ScrollView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonSml from '../../../../components/CatButtonSml';
import CatButtonWide from '../../../../components/CatButtonWide';

const SubDoctors = (props) => 
{
	const handleSearchCategory = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 1, searchSector: "Health & Wellness", category: "doctor", categoryItem: "doctor"});
	}

	const handelSearchGeneral = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Health & Wellness", category: "doctor", categoryItem: "General Practitioners"});
	}

	const handelSearchPhysicians = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Health & Wellness", category: "doctor", categoryItem: "Physicians"});
	}

	const handelSearchChiro = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Health & Wellness", category: "doctor", categoryItem: "Chiropractors"});
	}

	const handelSearchSurgeons = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Health & Wellness", category: "doctor", categoryItem: "Surgeons"});
	}

	const handelSearchDental = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Health & Wellness", category: "doctor", categoryItem: "Dental"});
	}

	const handelSearchHomeo = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Health & Wellness", category: "doctor", categoryItem: "Homeopathic"});
	}

	const handelSearchMental = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Health & Wellness", category: "doctor", categoryItem: "Mental Health"});
	}

	const handelSearchPeadiatric = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Health & Wellness", category: "doctor", categoryItem: "Peadiatric"});
	}

	const handelSearchOther = () =>
	{
		props.navigation.navigate('CatSearch', {searchType: 2, searchSector: "Health & Wellness", category: "doctor", categoryItem: "Other Specialists"});
	}

  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Health`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

					<TouchableOpacity onPress={handleSearchCategory}>
						<View style={{ marginBottom: 30 }}>
							<Image source={require('../../../../assets/sectors/health/cat_doctors.png')} style={{ alignSelf: 'center' }} />
							<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Doctors & Specialists</Text>
						</View>
					</TouchableOpacity>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#FFDED1" btnImage={require('../../../../assets/sectors/health/general.png')} btnText="General Practitioners" onPress={handelSearchGeneral} />
						<CatButtonSml bgColor="#FFDED1" btnImage={require('../../../../assets/sectors/health/physicians.png')} btnText="Physicians" onPress={handelSearchPhysicians} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#FFDED1" btnImage={require('../../../../assets/sectors/health/chiro.png')} btnText="Chiropractors" onPress={handelSearchChiro} />
						<CatButtonSml bgColor="#FFDED1" btnImage={require('../../../../assets/sectors/health/surgeons.png')} btnText="Surgeons" onPress={handelSearchSurgeons} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#FFDED1" btnImage={require('../../../../assets/sectors/health/dental.png')} btnText="Dental" onPress={handelSearchDental} />
						<CatButtonSml bgColor="#FFDED1" btnImage={require('../../../../assets/sectors/health/homeo.png')} btnText="Homeopathic" onPress={handelSearchHomeo} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#FFDED1" btnImage={require('../../../../assets/sectors/health/mental.png')} btnText="Mental Health" onPress={handelSearchMental} />
						<CatButtonSml bgColor="#FFDED1" btnImage={require('../../../../assets/sectors/health/peadiatric.png')} btnText="Peadiatric" onPress={handelSearchPeadiatric} />
					</Layout>

					<Layout style={{width: '100%'}}>
						<CatButtonWide bgColor="#FFDED1" btnImage={require('../../../../assets/sectors/health/other.png')} btnText="Other Specialists" onPress={handelSearchOther} />
					</Layout>

                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default SubDoctors;