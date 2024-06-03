import React, {useState, useEffect} from "react";
import DbUtils from "../../../services/DbUtils";
import Toast from 'react-native-toast-message';
import { getBusinessReviews } from "../../../services/api_helper";
import MainStyles from "../../../assets/styles/MainStyles";
import { ReviewCard } from "../../../components/ReviewCard";
import { TopNavBusReviews } from "../../../components/TopNavBusReviews";
import { BotNavBusiness } from "../../../components/BotNavBusiness";
import { SafeAreaView, ScrollView, View, TouchableOpacity } from "react-native";
import { Layout, Divider, Card, Text, Avatar, Icon } from "@ui-kitten/components";

const ReviewList = (props) => 
{
    const [selectedBotTab, setSelectedBotTab] = useState(2);
	const [token, setToken] = useState('');
	const [businessId, setBusinessId] = useState('');
	const [isReady, setIsReady] = useState(false);
	const [averageRating, setAverageRating] = useState('0');
	const [reviews, setReviews] = useState([]);

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
						setAverageRating(Number(avgRating.toFixed(2)));
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* <TopNavBusReviews title='Your Reviews' rating={averageRating} /> */}
			<ScrollView style={{ flex: 1, width: '100%', paddingTop: 40 }}>
				<Text style={[ MainStyles.title_aaa, { textAlign: 'center' }]}>Your Reviews</Text>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					<Icon name="star" fill='#000' style={{ width: 16, height: 16}}/>
					<Text style={[MainStyles.title_a16, {textAlign: 'center', paddingStart: 5}]}>{averageRating}</Text>
				</View>
				<Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} />
                    <Layout style={[MainStyles.column_container, {backgroundColor: '#f2f2f2', paddingTop: 20,paddingStart: 20, paddingEnd: 20, marginBottom: 20 }]}>
						{reviews.length > 0 ?
							reviews.map((review, index) => (
  							<ReviewCard key={index} profilePic={review.profile_pic} firstName={review.first_name} lastName={review.last_name} rating={review.rating} title={review.review_title} review={review.review_desc} onPress={() => handelView(review)} />
						))
						:
							<Text style={[MainStyles.title_a16, { paddingTop: 20 }]}>No reviews available</Text>
						}
                    </Layout>
                </ScrollView>
                <Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7' }} />
                <BotNavBusiness selected={2}/>
            </SafeAreaView>
    );
};

export default ReviewList;