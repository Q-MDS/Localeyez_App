import React from "react";
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../../components/TopNavArrowTitle";
import { SafeAreaView } from "react-native";
import DividerTop from "../../../../components/DividerTop";
import { Layout } from "@ui-kitten/components";
import { ReviewCard } from "../../../../components/ReviewCard";

const NotiView = (props) => 
{
	console.log('Review record: ', props.route.params.reviewRecord);
	const firstChar = props.route.params.reviewRecord.last_name.charAt(0).toUpperCase();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Notifications" alignment="start" navigation={props.navigation} goBackTo="BusDashNoti" />
                <DividerTop />
                <Layout style={[MainStyles.layout_container, {paddingTop: 30}]}>
					<ReviewCard firstName={`${props.route.params.reviewRecord.first_name} ${firstChar}.`} fn={props.route.params.reviewRecord.first_name} ln={props.route.params.reviewRecord.last_name} rating={props.route.params.reviewRecord.rating} title={props.route.params.reviewRecord.review_title} review={props.route.params.reviewRecord.review_desc} />
                </Layout>
        </SafeAreaView>
    );
}   

export default NotiView;