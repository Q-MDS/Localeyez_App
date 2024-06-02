import React, { useState, useEffect } from "react";
import DbUtils from "../../../services/DbUtils";
import Toast from 'react-native-toast-message';
import { getShopperReviews } from "../../../services/api_helper";
import MainStyles from "../../../assets/styles/MainStyles";
import { ReviewCard } from "../../../components/ReviewCard";
import { ReviewBusCard } from "../../../components/ReviewBusCard";
import { TopNavBack } from "../../../components/TopNavBack";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { SafeAreaView, ScrollView, View, ActivityIndicator } from "react-native";
import { Layout, Text, Divider } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";

const ReviewList = (props) => 
{
    const [token, setToken] = useState('');
	const [shopperId, setShopperId] = useState(0);
	const [isReady, setIsReady] = useState(false);
	const [reviews, setReviews] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getToken = async () => 
	{
		const getToken = await DbUtils.getItem('shopper_token');

		setToken(JSON.parse(getToken));
	}

	const getShopperId = async () => 
	{
		const id = await DbUtils.getItem('shopper_id');
		
		setShopperId(JSON.parse(id));
	}

	useEffect(() => 
	{
		const fetchData = async () => 
		{
			await getToken();
			await getShopperId();
			
			setIsReady(true);
		};

		fetchData();
	}, []);

	useEffect(() => 
	{
		const fetchData = async () => 
		{
			setIsLoading(true);
			try 
			{
				console.log('Fetching reviews...');
				const data = {shopper_id: shopperId};
				let params = JSON.stringify(data);

				const res = await getShopperReviews(token, params);

				console.log('Shopper reviews: ', res);
				setReviews(res.data);
			} 
			catch (error) 
			{
				Toast.show({
					type: 'error',
					position: 'bottom',
					text1: 'There was an error fetching the reviews.',
					text2: 'Please try again.',
					visibilityTime: 4000,
					autoHide: true,
					topOffset: 30,
					bottomOffset: 40,
				});
			}
			setIsLoading(false);
		};

		if (isReady) 
		{
			// Your code here...
			console.log('Gonna fetch the data now...', token, shopperId);
			fetchData();
		}
	}, [isReady]);

    const handelView = (companyName, rating, title, desc) => 
    {
        props.navigation.navigate('ShopperReviewView', { companyName: companyName, rating: rating, title: title, desc: desc });
    }

	if (isLoading) 
	{
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	reviews
	{
		console.log('Reviews: ', reviews);
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
				<ScrollView style={{ flex: 1, width: '100%', paddingTop: 30 }}>
				<Text style={[ MainStyles.title_aaa, { textAlign: 'center' }]}>Your Reviews</Text>
				<Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} />
					<Layout style={[MainStyles.column_container, {backgroundColor: '#f2f2f2', paddingTop: 20, paddingStart: 20, paddingEnd: 20, marginBottom: 20 }]}>
						{reviews.length > 0 ?
							reviews.map((review, index) => (
							<ReviewBusCard key={index} profilePic={review.profile_pic} companyName={review.company_name} rating={review.rating} title={review.review_title} review={review.review_desc} />
						))
						:
							<Text>No records found</Text>
						}
					</Layout>
				</ScrollView>
				<BotNavShopper selected={2}/>
			</SafeAreaView>
		);
	}
    
};

export default ReviewList;