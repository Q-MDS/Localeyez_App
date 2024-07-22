import React from "react";
import MainStyles from "../assets/styles/MainStyles";
import { TopNavBack } from "../components/TopNavBack";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { Layout } from "@ui-kitten/components";
import TextTwo from "../components/TextTwo";

const Terms = (props: any) => 
{
	// console.log('props type', props);
	
	// const type = props.route.params.type; //aa

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopNavBack title="Terms & Conditions" alignment="start" navigation={props.navigation} pops={1} />
				<ScrollView style={{ backgroundColor: 'white', flex: 1, width: '100%'  }}>
					<Layout style={[MainStyles.layout_container, {flex: 1, width: '100%'} ]}>
						<TextTwo title="Terms and conditions for Localeyez" fontsize={24} width="100%" status="primary" mb={10} />
						<Text style={[MainStyles.title_a14, { width: '100%', marginBottom: 20 } ]}>Last updated: 19-07-2024</Text>
							<Text style={{ color: 'black', fontWeight: 'bold', width: '100%', fontSize: 16, paddingBottom: 5 }}>{"Acceptance of Terms"}</Text>
							<Text style={{ color: 'black', textAlign: 'left', width: '100%' }}>
							{"By accessing and using Localeyez monthly subscription, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this service, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service."}
							{"\n"}
							</Text>
							<Text style={{ color: 'black', fontWeight: 'bold', width: '100%', fontSize: 16, paddingBottom: 5 }}>{"Payment Terms"}</Text>
							<Text style={{ color: 'black', textAlign: 'left', width: '100%' }}>
							{"For services or products offered on a subscription basis, the following terms apply, unless Localeyez notifies you otherwise in writing. This agreement also incorporates by reference and includes program ordering and payment terms provided to you for the service:"}
							{"\n\n"}
							{"• Payments will be billed to you in U.S. dollars, and your account will be debited when you subscribe and provide your payment information, unless stated otherwise in the program ordering or payment terms."}
							{"\n"}
							{"• You must pay with one of the following:"}
							{"\n"}
							{"1. A valid credit card acceptable to Localeyez;"}
							{"\n"}
							{"2. A valid debit card acceptable to Localeyez;"}
							{"\n"}
							{"3. Sufficient funds in a checking or savings account to cover an electronic debit of the payment due; or"}
							{"\n"}
							{"4. By another payment option Localeyez provides to you in writing."}
							{"\n\n"}
							{"If you have an outstanding balance due on any Localeyez account, you agree that Localeyez may charge such unpaid fees to your provided payment method or otherwise bill you for such unpaid fees."}
							{"\n\n"}
						</Text>
					</Layout>
			</ScrollView>
		</SafeAreaView>
  	)
}

export default Terms;
