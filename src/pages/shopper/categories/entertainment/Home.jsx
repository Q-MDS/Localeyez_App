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
	const handelGotoEat = () =>
	{
		props.navigation.navigate('EntertainmentEat');
	}
	const handelGotoActivities = () =>
	{
		props.navigation.navigate('EntertainmentActivities');
	}
	const handelGotoEvents = () =>
	{
		props.navigation.navigate('EntertainmentEvents');
	}


  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`Back: Search Page`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 25, paddingEnd: 25, backgroundColor: '#fff'}]}>

					<View style={{ marginBottom: 30 }}>
						<Image source={require('../../../../assets/sectors/entertainment/cat_entertainment.png')} style={{ alignSelf: 'center' }} />
						<Text style={[MainStyles.title_a24, MainStyles.mb_0, {textAlign: 'center', marginTop: 20 }]}>Entertainment</Text>
					</View>

					<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, flex: 1, columnGap: 25, width: '100%' }}>
						<CatButtonMed bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/eat.png')} btnText="Eat & Drink" onPress={handelGotoEat} />
						<CatButtonMed bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/activities.png')} btnText="Activities" onPress={handelGotoActivities} />
					</Layout>

					<Layout style={{width: '100%'}}>
						<CatButtonWide bgColor="#C2F1E6" btnImage={require('../../../../assets/sectors/entertainment/events.png')} btnText="Events" onPress={handelGotoEvents} />
					</Layout>

                </Layout>
            </ScrollView>
        <BotNavShopper selected={0} />
        </SafeAreaView>
  	)
}

export default Home;