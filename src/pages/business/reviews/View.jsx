import React, { useState } from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../components/TopNavBack";
import DividerTop from "../../../components/DividerTop";
import { SafeAreaView, ScrollView } from "react-native";
import { Layout, Divider, Card, Text, Avatar, Icon } from "@ui-kitten/components";
import {ReviewCard} from "../../../components/ReviewCard";

const ReviewView = (props) => 
{
	console.log('Review record: ', props.route.params.reviewRecord);
	const [review, setReview] = useState(props.route.params.reviewRecord);

    return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
		<TopNavBack title="View review" alignment="start" navigation={props.navigation} pops={1} />
			<ScrollView>
				<Layout style={[MainStyles.layout_container, {backgroundColor: '#fff', paddingStart: 15, paddingEnd: 15}]}>
					<ReviewCard firstName={review.first_name} fn={review.first_name} ln={review.last_name} rating={review.rating} title={review.review_title} review={review.review_desc} />
				</Layout>
			</ScrollView>
			<Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} />
		</SafeAreaView>
    );
};

export default ReviewView;