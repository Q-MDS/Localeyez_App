import React, { useState, useEffect } from "react";
import DbUtils from "../../../services/DbUtils";
import Toast from 'react-native-toast-message';
import { getShopperReviews } from "../../../services/api_helper";
import MainStyles from "../../../assets/styles/MainStyles";
import { ReviewCard } from "../../../components/ReviewCard";
import { TopNavShopperReviews } from "../../../components/TopNavShopperReviews";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { SafeAreaView, ScrollView } from "react-native";
import { Layout, Divider, Card, Text, Avatar, Icon } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";

const ReviewList = (props) => 
{
    const [token, setToken] = useState('');
	const [shopperId, setShopperId] = useState(0);
	const [isReady, setIsReady] = useState(false);
	const [reviews, setReviews] = useState([]);

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
			try 
			{
				console.log('Fetching reviews...');
				const data = [{shopper_id: shopperId}];
				let params = JSON.stringify(data);

				const res = await getShopperReviews(token, params);

				console.log('Shopper reviews: ', res.data);
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
		<TopNavShopperReviews title='Your Reviews' />
			<ScrollView>
				<Layout style={[MainStyles.layout_container, {backgroundColor: '#fff', paddingStart: 15, paddingEnd: 15}]}>
				{reviews.map((review, index) => (
					<TouchableOpacity style={{ flexDirection: 'row', flex: 1,  }} onPress={() => handelView(review.company_name, review.rating, review.review_title, review.review_desc)}>
						<ReviewCard key={index} firstName={review.company_name} rating={review.rating} title={review.review_title} review={review.review_desc.substring(0, 70) + '...'} />
					</TouchableOpacity>
				))}
				</Layout>
			</ScrollView>
			<Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} />
			<BotNavShopper selected={2}/>
		</SafeAreaView>
    );
};

export default ReviewList;