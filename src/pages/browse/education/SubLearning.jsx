import React from 'react';
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../components/TopNavBack";
import { BotNavBrowse } from '../../../components/BotNavBrowse';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonWideTall from '../../../components/CatButtonWideTall';

const SubLearning = (props) => 
{
	const handleSearchCategory = () =>
	{
		props.navigation.navigate('BrowseSearch', {searchType: 1, searchSector: "Education & Employment", category: "learn", categoryItem: "learn"});
	}

	const handleSearchCourses = () => 
	{
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Education & Employment", category: "learn", categoryItem: "Courses"});
	}

	const handleSearchELearning = () => 
	{
		props.navigation.navigate('BrowseSearch', {searchType: 2, searchSector: "Education & Employment", category: "learn", categoryItem: "E-learning"});
	}
   
  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Education & Employment`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, paddingBottom: 25, backgroundColor: '#fff'}]}>

					<TouchableOpacity onPress={handleSearchCategory}>
						<View style={{ marginBottom: 40 }}>
							<Image source={require('../../../assets/sectors/education/cat_learning.png')} style={{ alignSelf: 'center' }} />
							<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Learning</Text>
						</View>
					</TouchableOpacity>

					<Layout style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonWideTall bgColor="#FFEEC8" btnImage={require('../../../assets/sectors/education/courses.png')} btnText="Courses" onPress={handleSearchCourses} />
						<CatButtonWideTall bgColor="#FFEEC8" btnImage={require('../../../assets/sectors/education/elearning.png')} btnText="E-Learning" onPress={handleSearchELearning} />
					</Layout>

                </Layout>
            </ScrollView>
        <BotNavBrowse selected={0} />
        </SafeAreaView>
  	)
}

export default SubLearning;