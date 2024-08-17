import React, { useState } from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../components/TopNavBack";
import DividerTop from "../../../components/DividerTop";
import { SafeAreaView, ScrollView, View, StyleSheet, Image } from "react-native";
import { Layout, Divider, Card, Text, Avatar, Icon } from "@ui-kitten/components";
import {ReviewCard} from "../../../components/ReviewCard";
import { Label } from "../../../components/Label";

const ReviewView = (props) => 
{
	console.log('Review record: ', props.route.params.reviewRecord);
	const [review, setReview] = useState(props.route.params.reviewRecord);

	function getInitials(firstName, lastName)
	{
		let firstChar = "";
		if (firstName) 
		{
			firstChar = firstName.charAt(0).toUpperCase();
		} 
		let lastChar = "";
		if (lastName) 
		{
			lastChar = lastName.charAt(0).toUpperCase();
		} 

		return firstChar + "." + lastChar + ".";
	}

	function getLastChar(lastName)
	{
		let lastChar = "";
		if (lastName) 
		{
			lastChar = lastName.charAt(0).toUpperCase();
		} 

		return lastChar;
	}

    return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
		<TopNavBack title="Back: review list" alignment="start" navigation={props.navigation} pops={1} />
			<Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff', width: '100%'}]}>
					{/* Page title */}
					<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginBottom: 10 }} />
					<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#612bc1', width: '100%' }}>View Review</Text>
					</View>
					<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginTop: 5 }} />
					<ScrollView style={{ width: '100%' }}>
					<Card style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 15, marginBottom: 10 }}>
						<Layout style={{ flexDirection: 'row', alignItems: 'center' }} >
					
							{review.profile_pic
							? 
								<View style={{ paddingEnd: 15 }}>
									<Image source={{ uri: review.profile_pic }} style={{ width: 84, height: 84, borderRadius: 42 }} /> 
								</View>
							: 
								<View style={styles.avatar}>
									{/* <Text style={styles.avatarText}>{`${firstChar}${lastChar}`}</Text> */}
									<Text style={styles.avatarText}>{getInitials(review.first_name, review.last_name)}</Text>
								</View>
							}
							{review.last_name ? (
								<View>
									<Text style={[MainStyles.title_a20, { fontWeight: 'normal' }]}>{`${review.first_name} `}{getLastChar(review.last_name)}</Text>
								</View>
							) : (
								<View>
									<Text category="h5" status="primary" style={{ fontWeight: 'normal', opacity: 0.6 }}>{`${review.firstName}`}</Text>
								</View>
							)}
						</Layout>
					</Card>
					<Card style={{ backgroundColor: 'white', borderRadius: 10, marginBottom: 10 }}>
						<View style={{ width: '100%' }} >
							<Label title="Review Title" textalign="left" mb={5} status="basic" fontsize={14} fontweight='bold' />
							<Text style={{ fontSize: 16, color: '#333', marginBottom: 10 }}>{review.review_title}</Text>
						</View>
					</Card>
					<Card style={{ backgroundColor: 'white', borderRadius: 10, marginBottom: 10 }}>
						<View style={{ width: '100%' }} >
							<Label title="Review Message" textalign="left" mb={5} status="basic" fontsize={14} fontweight='bold' />
							<Text style={{ fontSize: 16, color: '#333', marginBottom: 10 }}>{review.review_desc}</Text>
						</View>
					</Card>
			</ScrollView>
			</Layout>
		</SafeAreaView>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        width: '100%',
    },

    image: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 150,
        backgroundColor: '#f9f9ff',
    },

    title: {
        width: '100%',
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },

	avatar: {
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: 15,
    },
    avatarText: {
        color: '#fff',
        fontSize: 24,
    },
});

export default ReviewView;