import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonMed from "../../../../components/CatButtonMed";
import CatButtonWide from "../../../../components/CatButtonWide";

const Home = (props) => 
{
	const handelGotoSchools = () =>
	{
		props.navigation.navigate('EducationSchools');
	}
	const handelGotoLearning = () =>
	{
		props.navigation.navigate('EducationLearning');
	}
	const handelSearchEmployment = () =>
	{
		props.navigation.navigate('EducationEmployment');
	}


  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Search Page`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 30 }}>
						<Image source={require('../../../../assets/sectors/education/cat_education.png')} style={{ alignSelf: 'center' }} />
						<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Education & Employment</Text>
					</View>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#FFEEC8" btnImage={require('../../../../assets/sectors/education/schools.png')} btnText="Schools" onPress={handelGotoSchools} />
						<CatButtonMed bgColor="#FFEEC8" btnImage={require('../../../../assets/sectors/education/learning.png')} btnText="Learning" onPress={handelGotoLearning} />
					</Layout>

					<Layout style={{width: '100%'}}>
						<CatButtonWide bgColor="#FFEEC8" btnImage={require('../../../../assets/sectors/education/employment.png')} btnText="Employment" onPress={handelSearchEmployment} />
					</Layout>

                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default Home;