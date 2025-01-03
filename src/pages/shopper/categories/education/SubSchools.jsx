import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Layout, Text, Card } from "@ui-kitten/components";
import { TextIcon } from "../../../../components/TextIcon";
import CatButtonMed from "../../../../components/CatButtonMed";
import CatButtonWide from "../../../../components/CatButtonWide";

const SubSchools = (props) => 
{
	const handleSearchPreSchool = () => 
	{
		// Search results
		console.log('Search Children');
	}

	const handleSearchPrimary = () => 
	{
		// Search results
		console.log('Search Old Age Pensioners');
	}

	const handleSearchSecondary = () => 
	{
		// Search results
		console.log('Search Community Projects');
	}

	const handleSearchTertiary = () => 
	{
		// Search results
		console.log('Search Conservation');
	}
   
  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Education & Employment`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, paddingBottom: 25, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 40 }}>
						<Image source={require('../../../../assets/sectors/education/cat_schools.png')} style={{ alignSelf: 'center' }} />
						<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Charity Organisations</Text>
					</View>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#FFEEC8" btnImage={require('../../../../assets/sectors/education/pre_schools.png')} btnText="Preschools" onPress={handleSearchPreSchool} />
						<CatButtonMed bgColor="#FFEEC8" btnImage={require('../../../../assets/sectors/education/primary.png')} btnText="Primary Schools" onPress={handleSearchPrimary} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#FFEEC8" btnImage={require('../../../../assets/sectors/education/secondary.png')} btnText="Secondary Schools" onPress={handleSearchSecondary} />
						<CatButtonMed bgColor="#FFEEC8" btnImage={require('../../../../assets/sectors/education/tertiary.png')} btnText="Tertiary Education" onPress={handleSearchTertiary} />
					</Layout>

                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default SubSchools;