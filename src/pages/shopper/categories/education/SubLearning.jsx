import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Layout, Text, Card } from "@ui-kitten/components";
import { TextIcon } from "../../../../components/TextIcon";
import CatButtonWideTall from '../../../../components/CatButtonWideTall';

const SubLearning = (props) => 
{
	const handleSearchCourses = () => 
	{
		// Search results
		console.log('Search Children');
	}

	const handleSearchELearning = () => 
	{
		// Search results
		console.log('Search Old Age Pensioners');
	}
   
  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Education & Employment`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, paddingBottom: 25, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 40 }}>
						<Image source={require('../../../../assets/sectors/education/cat_learning.png')} style={{ alignSelf: 'center' }} />
						<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Learning</Text>
					</View>

					<Layout style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonWideTall bgColor="#FFEEC8" btnImage={require('../../../../assets/sectors/education/courses.png')} btnText="Courses" onPress={handleSearchCourses} />
						<CatButtonWideTall bgColor="#FFEEC8" btnImage={require('../../../../assets/sectors/education/elearning.png')} btnText="E-Learning" onPress={handleSearchELearning} />
					</Layout>

                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default SubLearning;