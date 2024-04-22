import React from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { ReviewCard } from "../../../components/ReviewCard";
import { TopNavArrowTitle } from "../../../components/TopNavArrowTitle";
import DividerTop from "../../../components/DividerTop";
import { SafeAreaView, ScrollView } from "react-native";
import { Layout, Divider, Card, Text, Avatar, Icon } from "@ui-kitten/components";

const ReviewView = (props) => 
{
	console.log('ReviewView props: ', props.route.params);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
		<TopNavArrowTitle title='View Review' alignment="start" navigation={props.navigation} goBackTo="ShopperReviewList" />
			<ScrollView>
				<Layout style={[MainStyles.layout_container, {backgroundColor: '#fff', paddingStart: 15, paddingEnd: 15}]}>
					<ReviewCard firstName={props.route.params.companyName} fn={props.route.params.companyName} rating={props.route.params.rating} title={props.route.params.title} review={props.route.params.desc} />
				</Layout>
			</ScrollView>
			<Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} />
		</SafeAreaView>
    );
};

export default ReviewView;