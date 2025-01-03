import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonWideTall from '../../../../components/CatButtonWideTall';

const SubEvents = (props) => 
{
	const handleSearchMusic = () => 
	{
		// Search results
		console.log('Search Music');
	}

	const handleSearchArts = () => 
	{
		// Search results
		console.log('Search Arts');
	}
   
  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Entertainment`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, paddingBottom: 25, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 40 }}>
						<Image source={require('../../../../assets/sectors/entertainment/cat_events.png')} style={{ alignSelf: 'center' }} />
						<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Events</Text>
					</View>

					<Layout style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonWideTall bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/music.png')} btnText="Music" onPress={handleSearchMusic} />
						<CatButtonWideTall bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/events_arts.png')} btnText="Arts" onPress={handleSearchArts} />
					</Layout>

                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default SubEvents;