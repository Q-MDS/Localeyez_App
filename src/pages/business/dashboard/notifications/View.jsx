import React, { useState } from "react";
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../../components/TopNavBack";
import { SafeAreaView, View } from "react-native";
import DividerTop from "../../../../components/DividerTop";
import { Layout } from "@ui-kitten/components";
import { ReviewCard } from "../../../../components/ReviewCard";

const NotiView = (props) => 
{
	console.log('Review record: ', props.route.params.reviewRecord);
	const [review, setReview] = useState(props.route.params.reviewRecord);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavBack title="Notifications" alignment="start" navigation={props.navigation} pops={1} />
				<View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
					<Layout style={[MainStyles.column_container, { backgroundColor: '#f2f2f2', paddingTop: 15, paddingStart: 15, paddingEnd: 15}]}>
						<View>
							<ReviewCard profilePic={review.profile_pic} firstName={review.first_name} lastName={review.last_name} rating={review.rating} title={review.review_title} review={review.review_desc} />
						</View>
					</Layout>
				</View>
        </SafeAreaView>
    );
}   

export default NotiView;