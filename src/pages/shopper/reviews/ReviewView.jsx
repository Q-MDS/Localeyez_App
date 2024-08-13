import React from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { ReviewCard } from "../../../components/ReviewCard";
import { TopNavBack } from "../../../components/TopNavBack";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Layout, Divider, Card } from "@ui-kitten/components";
import { Label } from "../../../components/Label";

const ReviewView = (props) => 
{
	console.log('ReviewView props: ', props.route.params);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavBack title={`Back: Review List`} alignment="start" navigation={props.navigation} pops={1} />
				<Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff', width: '100%'}]}>
					{/* Page title */}
					<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginBottom: 10 }} />
					<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#612bc1', width: '100%' }}>View Review</Text>
					</View>
					<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginTop: 5 }} />
					<ScrollView style={{  width: '100%' }}>
						<Card style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 15, marginBottom: 10 }}>
							<View style={{ width: '100%' }} >
								<Label title="Company Name" textalign="left" mb={5} status="basic" fontsize={14} fontweight='bold' />
								<Text style={{ fontSize: 24, color: '#333', marginBottom: 10 }}>{props.route.params.companyName}</Text>
								<Text style={{ fontSize: 15, color: '#333', marginBottom: 10 }}>Created: {props.route.params.created}</Text>
							</View>
						</Card>
						<Card style={{ backgroundColor: 'white', borderRadius: 10, marginBottom: 10 }}>
							<View style={{ width: '100%' }} >
								<Label title="Review Title" textalign="left" mb={5} status="basic" fontsize={14} fontweight='bold' />
								<Text style={{ fontSize: 16, color: '#333', marginBottom: 10 }}>{props.route.params.title}</Text>
							</View>
						</Card>
						<Card style={{ backgroundColor: 'white', borderRadius: 10, marginBottom: 10 }}>
							<View style={{ width: '100%' }} >
								<Label title="Review Message" textalign="left" mb={5} status="basic" fontsize={14} fontweight='bold' />
								<Text style={{ fontSize: 16, color: '#333', marginBottom: 10 }}>{props.route.params.desc}</Text>
							</View>
						</Card>
					</ScrollView>
				</Layout>
		</SafeAreaView>
    );
};

export default ReviewView;