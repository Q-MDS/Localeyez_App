import React, { useState } from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../components/TopNavBack";
import DividerTop from "../../../components/DividerTop";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Layout, Divider, Card, Text, Avatar, Icon } from "@ui-kitten/components";
import {ReviewCard} from "../../../components/ReviewCard";

const ReviewView = (props) => 
{
	console.log('Review record: ', props.route.params.reviewRecord);
	const [review, setReview] = useState(props.route.params.reviewRecord);

    return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
		<TopNavBack title="View review" alignment="start" navigation={props.navigation} pops={1} />
			<View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
			{/* <ScrollView style={{ flex: 1, width: '100%' }}> */}
				<Layout style={[MainStyles.column_container, { backgroundColor: '#f2f2f2', paddingStart: 15, paddingEnd: 15}]}>
					{/* <View style={{ flex: 1, backgroundColor: '#ff0000' }} /> */}
					<View>
						<ReviewCard profilePic={review.profile_pic} firstName={review.first_name} lastName={review.last_name} rating={review.rating} title={review.review_title} review={review.review_desc} />
					</View>
					{/* <View style={{ flex: 1, backgroundColor: '#ff0000' }} /> */}
				</Layout>
			{/* </ScrollView> */}
			</View>
		</SafeAreaView>
    );
};

export default ReviewView;