import React from "react";
import MainStyles from "../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../components/TopNavArrowTitle";
import { TopNavBack } from "../components/TopNavBack";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { Layout } from "@ui-kitten/components";
import TextTwo from "../components/TextTwo";

const PrivacyPolicy = (props: any) => 
{
	// console.log('props type', props);
	
	// const type = props.route.params.type; //aa

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopNavBack title="Privacy Policy" alignment="start" navigation={props.navigation} pops={1} />
				<ScrollView style={{ backgroundColor: 'white', flex: 1, width: '100%'  }}>
					<Layout style={[MainStyles.layout_container, {flex: 1, width: '100%'} ]}>
						<TextTwo title="Privacy Policy for Localeyez" fontsize={24} width="100%" status="primary" mb={10} />
						<Text style={[MainStyles.title_a14, { width: '100%', marginBottom: 20 } ]}>Last updated: 04-06-2024</Text>
							<Text style={{ color: 'black', fontWeight: 'bold', width: '100%', fontSize: 16, paddingBottom: 5 }}>{"Introduction"}</Text>
							<Text style={{ color: 'black', textAlign: 'left', width: '100%' }}>
							{"Thank you for choosing Localeyez. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy policy, or our practices with regards to your personal information, please contact us at charli_mwa@hotmail.com."}
							{"\n\n"}
							{"When you visit our mobile application, and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy policy, we seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it. We hope you take some time to read through it carefully."}
							{"\n"}
							</Text>
							<Text style={{ color: 'black', fontWeight: 'bold', width: '100%', fontSize: 16, paddingBottom: 5 }}>{"Information We Collect"}</Text>
							<Text style={{ color: 'black', textAlign: 'left', width: '100%' }}>
							{"We collect personal information that you voluntarily provide to us when registering at the App, expressing an interest in obtaining information about us or our products and services, when participating in activities on the App or otherwise contacting us."}
							{"\n\n"}
							{"The personal information that we collect depends on the context of your interactions with us and the App, the choices you make, and the products and features you use. The personal information we collect can include the following:"}
							{"\n"}
							{"• Name and Contact Data"}
							{"\n"}
							{"• Credentials"}
							{"\n"}
							{"• Payment Data"}
							{"\n"}
							{"• Social Media Login Data"}
							{"\n"}
							</Text>
							<Text style={{ color: 'black', fontWeight: 'bold', width: '100%', fontSize: 16, paddingBottom: 5 }}>{"How We Use Your Information"}</Text>
							<Text style={{ color: 'black', textAlign: 'left', width: '100%' }}>
							{"We use personal information collected via our App for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations."}
							{"\n\n"}
							{"We indicate the specific processing grounds we rely on next to each purpose listed below."}
							{"\n"}
							{"• To facilitate account creation and logon process."}
							{"\n"}
							{"• To send administrative information to you."}
							{"\n"}
							{"• To fulfill and manage your orders."}
							{"\n"}
							{"• To post testimonials."}
							{"\n"}
							</Text>
							<Text style={{ color: 'black', fontWeight: 'bold', width: '100%', fontSize: 16, paddingBottom: 5 }}>{"Sharing Your Information"}</Text>
							<Text style={{ color: 'black', textAlign: 'left', width: '100%' }}>
							{"We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations."}
							{"\n"}
							</Text>
							<Text style={{ color: 'black', fontWeight: 'bold', width: '100%', fontSize: 16, paddingBottom: 5 }}>{"Your Privacy Rights"}</Text>
							<Text style={{ color: 'black', textAlign: 'left', width: '100%' }}>
							{"You have the right to request access, correction, deletion, or restriction of your personal information, according to applicable law. You also have the right to object to processing and to port your data."}
							{"\n"}
							</Text>
							<Text style={{ color: 'black', fontWeight: 'bold', width: '100%', fontSize: 16, paddingBottom: 5 }}>{"Policy Updates"}</Text>
							<Text style={{ color: 'black', textAlign: 'left', width: '100%' }}>
							{"We may update this privacy policy from time to time. The updated version will be indicated by an updated \"Revised\" date and the updated version will be effective as soon as it is accessible."}
							{"\n"}
							</Text>
							{/* <Text style={{ color: 'black', fontWeight: 'bold', width: '100%', fontSize: 16, paddingBottom: 5 }}>{"Stripe Payment Portal"}</Text>
							<Text style={{ color: 'black' }}>
							{"We use Stripe for payment, analytics, and other business services. Stripe collects and processes personal data, including identifying information about the devices that connect to its services. Stripe uses this information to operate and improve the services it provides to us, including for fraud detection and prevention. You can learn more about Stripe and its processing activities via privacy policy at https://stripe.com/privacy."}
							{"\n"}
							</Text> */}
							<Text style={{ color: 'black', fontWeight: 'bold', width: '100%', fontSize: 16, paddingBottom: 5 }}>{"Contact Us"}</Text>
							<Text style={{ color: 'black', textAlign: 'left', width: '100%' }}>
							{"If you have questions or comments about this policy, you may email us at charli_mwa@hotmail.com"}
							{"\n"}
							</Text>
					</Layout>
			</ScrollView>
		</SafeAreaView>

  	)
}

export default PrivacyPolicy
