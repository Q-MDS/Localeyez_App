import React, {useState, useEffect} from "react";
import DbUtils from "../../../services/DbUtils";
import Toast from 'react-native-toast-message';
import { getBusinessReviews } from "../../../services/api_helper";
import MainStyles from "../../../assets/styles/MainStyles";
import { ReviewCard } from "../../../components/ReviewCard";
import { TopNavBusReviews } from "../../../components/TopNavBusReviews";
import { BotNavBusiness } from "../../../components/BotNavBusiness";
import { SafeAreaView, ScrollView, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Layout, Divider, Card, Text, Avatar, Icon } from "@ui-kitten/components";

const ReviewList = (props) => 
{
    const [selectedBotTab, setSelectedBotTab] = useState(2);
	const [token, setToken] = useState('');
	const [businessId, setBusinessId] = useState('');
	const [isReady, setIsReady] = useState(false);
	const [averageRating, setAverageRating] = useState('0');
	const [reviews, setReviews] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getToken = async () => 
	{
		const token = await DbUtils.getItem('token');
		
		setToken(JSON.parse(token));
	}

	const getBusniessId = async () => 
	{
		const id = await DbUtils.getItem('business_id');
		
		setBusinessId(JSON.parse(id));
	}

	useEffect(() => 
	{
		const fetchData = async () => 
		{
			await getBusniessId();
			await getToken();
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
				const data = {business_id: businessId};
				let params = JSON.stringify(data);

				await getBusinessReviews(token, params)
				.then((res) => 
				{
					if (res.status)
					{
						let avgRating = res.data.average_rating;
						// setAverageRating(Number(avgRating.toFixed(2)));
						setAverageRating(avgRating);
						setReviews(res.data.reviews);
					} 
					else 
					{
						setAverageRating(0);
						setReviews([]);
					}
				});
			} 
			catch (error) 
			{
				// console.log('Error fetching reviews:', error);;
			}
			setIsLoading(false);
			console.log('Reviews:', reviews.length);
		};

		if (isReady) 
		{
			// Your code here...
			console.log('Gonna fetch the data now...', token, businessId);
			fetchData();
		}
	}, [isReady]);

    const handelView = (review) => 
    {
        props.navigation.navigate('ReviewView', {reviewRecord: review});
    }

	if (isLoading) 
	{
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <Layout style={[MainStyles.layout_container, { paddingTop: 30, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>
				<ScrollView style={{ width: '100%', paddingTop: 0 }}>
					<Text style={[ MainStyles.title_aaa, { textAlign: 'left' }]}>Your Reviews</Text>
					<View style={{ flexDirection: 'row', alignItems: 'left', justifyContent: 'flex-start', marginTop: 10 }}>
						<Icon name="star" fill='#000' style={{ width: 16, height: 16}}/>
						<Text style={[MainStyles.title_a14, {textAlign: 'left', paddingStart: 5}]}>{averageRating} (Reviews: {reviews.length})</Text>
					</View>
                    <Layout style={[{ paddingTop: 20, marginBottom: 20 }]}>
						{reviews.length > 0 ?
							reviews.map((review, index) => (
  							<ReviewCard key={index} profilePic={review.profile_pic} firstName={review.first_name} lastName={review.last_name} rating={review.rating} title={review.review_title} review={review.review_desc} onPress={() => handelView(review)} />
						))
						:
							<Text style={[MainStyles.title_a16]}>No reviews available</Text>
						}
                    </Layout>
                </ScrollView>
                <Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7' }} />
				</Layout>
                <BotNavBusiness selected={3}/>
            </SafeAreaView>
    );
};

export default ReviewList;