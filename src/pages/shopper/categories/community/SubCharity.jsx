import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Layout, Text, Card } from "@ui-kitten/components";
import { TextIcon } from "../../../../components/TextIcon";
import CatButtonMed from "../../../../components/CatButtonMed";
import CatButtonWide from "../../../../components/CatButtonWide";

const SubCharity = (props) => 
{
	const handleSearchChildren = () => 
	{
		// Search results
		console.log('Search Children');
	}

	const handleSearchOldAge = () => 
	{
		// Search results
		console.log('Search Old Age Pensioners');
	}

	const handleSearchProjects = () => 
	{
		// Search results
		console.log('Search Community Projects');
	}

	const handleSearchConservation = () => 
	{
		// Search results
		console.log('Search Conservation');
	}

  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Travel`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, paddingBottom: 25, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 40 }}>
						<Image source={require('../../../../assets/sectors/community/cat_charity.png')} style={{ alignSelf: 'center' }} />
						<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Charity Organisations</Text>
					</View>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#D6F6FD" btnImage={require('../../../../assets/sectors/community/children.png')} btnText="Children" onPress={handleSearchChildren} />
						<CatButtonMed bgColor="#D6F6FD" btnImage={require('../../../../assets/sectors/community/oldage.png')} btnText="Old Age Pensioners" onPress={handleSearchOldAge} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#D6F6FD" btnImage={require('../../../../assets/sectors/community/projects.png')} btnText="Community Projects" onPress={handleSearchProjects} />
						<CatButtonMed bgColor="#D6F6FD" btnImage={require('../../../../assets/sectors/community/conservation.png')} btnText="Conservation" onPress={handleSearchConservation} />
					</Layout>

                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default SubCharity;