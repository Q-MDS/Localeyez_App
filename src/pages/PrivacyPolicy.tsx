import React from "react";
import MainStyles from "../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../components/TopNavArrowTitle";
import { TopNavBack } from "../components/TopNavBack";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { Layout } from "@ui-kitten/components";
import TextTwo from "../components/TextTwo";

const PrivacyPolicy = (props: any) => 
{
	console.log('props type', props);
	
	const type = props.route.params.type;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopNavBack title="Privacy Policy" alignment="start" navigation={props.navigation} pops={1} />
				<ScrollView style={{ backgroundColor: 'red', flex: 1, width: '100%'  }}>
					<Layout style={[MainStyles.layout_container, {flex: 1} ]}>
						<TextTwo title="Privacy Policy" fontsize={24} />
						<Text style={{ color: 'black' }}>
							{"\n"}
							{"This is a sample privacy policy for your application. This is not a real privacy policy and should not be used in a real application."}
							{"\n\n"}
							{"Personal Information: We collect personal information when you register with our application, when you use our services, and when you visit our pages. This information is used to fulfill your requests for services and to contact you about services on our site for which you have expressed interest."}
							{"\n\n"}
							{"Cookies: We use cookies to improve the quality of our service by storing user preferences and tracking user trends."}
							{"\n\n"}
							{"Information Sharing: We do not rent, sell, or share personal information about you with other people or non-affiliated companies except to provide products or services you've requested."}
							{"\n\n"}
							{"Confidentiality and Security: We limit access to personal information about you to employees who we believe reasonably need to come into contact with that information to provide products or services to you or in order to do their jobs."}
							{"\n\n"}
							{"Changes to this Privacy Policy: We may update this policy. We will notify you about significant changes in the way we treat personal information by sending a notice to the primary email address specified in your account or by placing a prominent notice on our site."}
							{"\n\n"}
							{"Questions and Suggestions: If you have questions or suggestions, please contact us at: support@yourapp.com"}
							{"\n"}
						</Text>
					</Layout>
			</ScrollView>
		</SafeAreaView>

  	)
}

export default PrivacyPolicy
