import React from 'react';
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { BotNavShopper } from "../../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import CatButtonMed from "../../../../components/CatButtonMed";
import CatButtonSml from '../../../../components/CatButtonSml';

const SubActivities = (props) => 
{
	const handelSearchMovies = () =>
	{
		console.log('Search Movies');
	}

	const handelSearchCentres = () =>
	{
		console.log('Search Centres');
	}

	const handelSearchArts = () =>
	{
		console.log('Search Arts & Crafts');
	}

	const handelSearchOutdoor = () =>
	{
		console.log('Search Outdoor Activities');
	}
	
	const handelSearchEventHire = () =>
	{
		console.log('Search Event Hire');
	}

	const handelSearchVenues = () =>
	{
		console.log('Search Venues');
	}

	const handelSearchEventPlanners = () =>
	{
		console.log('Search Event Planners');
	}

	const handelSearchChildren = () =>
	{
		console.log('Search Children');
	}

  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Entertainment`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 30 }}>
						<Image source={require('../../../../assets/sectors/entertainment/cat_activities.png')} style={{ alignSelf: 'center' }} />
						<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Activities</Text>
					</View>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/movies.png')} btnText="Movies" onPress={handelSearchMovies} />
						<CatButtonSml bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/ent_centres.png')} btnText="Entertainment Centres" onPress={handelSearchCentres} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/arts.png')} btnText="Arts" onPress={handelSearchArts} />
						<CatButtonSml bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/outdoor.png')} btnText="Outdoor Leisure" onPress={handelSearchOutdoor} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/event_hire.png')} btnText="Event Hire Specialists" onPress={handelSearchEventHire} />
						<CatButtonSml bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/venues.png')} btnText="Venues" onPress={handelSearchVenues} />
					</Layout>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonSml bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/event_planners.png')} btnText="Event Planners" onPress={handelSearchEventPlanners} />
						<CatButtonSml bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/children.png')} btnText="Children" onPress={handelSearchChildren} />
					</Layout>

                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default SubActivities;