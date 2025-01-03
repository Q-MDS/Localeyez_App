import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonSml from '../../../../components/CatButtonSml';

const SubHome = (props) => 
{
	const handelSearchBuilding = () =>
	{
		console.log('Search Building');
	}

	const handelSearchInteriors = () =>
	{
		console.log('Search Interiors');
	}

	const handelSearchPlumbing = () =>
	{
		console.log('Search Plumbing');
	}

	const handelSearchelectrical = () =>
	{
		console.log('Search Electrical');
	}
	
	const handelSearchPainting = () =>
	{
		console.log('Search Painting');
	}

	const handelSearchLandscaping = () =>
	{
		console.log('Search Landscaping');
	}

	const handelSearchCleaning = () =>
	{
		console.log('Search Cleaning');
	}

	const handelSearchPest = () =>
	{
		console.log('Search Pest');
	}

	const handelSearchVet = () =>
	{
		console.log('Search Vet');
	}

	const handelSearchSecurity = () =>
	{
		console.log('Search Security');
	}

  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Services`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 30 }}>
						<Image source={require('../../../../assets/sectors/services/cat_home.png')} style={{ alignSelf: 'center' }} />
						<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Home</Text>
					</View>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/building.png')} btnText="Building" onPress={handelSearchBuilding} />
						<CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/interiors.png')} btnText="Interiors" onPress={handelSearchInteriors} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/plumbing.png')} btnText="Plumbing" onPress={handelSearchPlumbing} />
						<CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/electrical.png')} btnText="Electrical" onPress={handelSearchelectrical} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/painting.png')} btnText="Painting" onPress={handelSearchPainting} />
						<CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/landscaping.png')} btnText="Landscaping" onPress={handelSearchLandscaping} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/cleaning.png')} btnText="Cleaning" onPress={handelSearchCleaning} />
						<CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/pest.png')} btnText="Pest Control" onPress={handelSearchPest} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/vet.png')} btnText="Veterinary & Pet parlours" onPress={handelSearchVet} />
						<CatButtonSml bgColor="#CDECFF" btnImage={require('../../../../assets/sectors/services/security.png')} btnText="Security" onPress={handelSearchSecurity} />
					</Layout>

                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default SubHome;