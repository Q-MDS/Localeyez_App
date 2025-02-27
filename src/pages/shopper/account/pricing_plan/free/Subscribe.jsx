import React from 'react';
import MainStyles from "../../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../../components/TopNavBack";
import { TextIcon } from "../../../../../components/TextIcon";
import { Linking, SafeAreaView, ScrollView, View } from "react-native";
import { Layout, Text, Divider, Card } from "@ui-kitten/components";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";

const Subscribe = (props) => 
{
	const handleSubscribe = () => {
		props.navigation.navigate('Paywall');
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavBack title={`Back`} alignment="start" navigation={props.navigation} pops={1} />
			<ScrollView style={{ flex: 1 }}>
				<Layout style={[MainStyles.layout_container, { justifyContent: 'flex-start', alignItems: 'center', paddingTop: 0 }]}>
					<Text category="h1" status="primary" style={{ textAlign: "center", marginBottom: 10 }}>Pricing Plan</Text>
					<Text category="s1" style={{ width: '100%', marginTop: 0, marginBottom: 5, textAlign: 'center' }}>Current Pricing Plan</Text>
					<Text category="h4" style={{ width: '100%', marginTop: 0, marginBottom: 10, textAlign: 'center' }}>Free Account</Text>
					<Divider style={{ width: "100%" }} />
					<Text style={[MainStyles.title_a16, { textAlign: 'center', width: '80%', marginTop: 10, marginBottom: 0, color: '#612bc1' }]}>Subscribe to become a localeyez Verfied Member</Text>
					<Text style={[MainStyles.title_a13, { textAlign: 'center', width: '100%', marginTop: 10, marginBottom: 10 }]}>A small amount a month can save you big time with access to events happening in your area</Text>
					<Card style={{ width: '100%'}}>
						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
							<Text style={[MainStyles.title_a14, { textAlign: 'left', fontWeight: 'bold', marginTop: 10, marginBottom: 0, color: '#612bc1' }]}>Localeyez monthly subscription</Text>
							<Text style={[MainStyles.title_a14, { textAlign: 'left', fontWeight: 'bold', marginTop: 10, marginBottom: 0, color: '#000' }]}>$10/mth</Text>
						</View>
						<TextIcon title="Access to events" iconname="checkmark-circle-2" width={20} mt={5} />
						<TextIcon title="Access to promotions" iconname="checkmark-circle-2" width={20} />
						<TextIcon title="Review Businesses" iconname="checkmark-circle-2" width={20} />
						<TextIcon title="Access to amazing discounts" iconname="checkmark-circle-2" width={20} mb={0} />
						<Divider style={{ width: "100%" }} />
					</Card>
					<ButtonPrimary name="Subscribe" width="100%" marginTop={30} onpress={handleSubscribe} />
					<Divider style={{ width: "100%", marginTop: 10 }} />

				</Layout>
			</ScrollView>
		</SafeAreaView>
  	)
}

export default Subscribe