import React, {useState, useEffect} from "react";
import DbUtils from "../../../services/DbUtils";
import Toast from 'react-native-toast-message';
import { getBusinessReviews } from "../../../services/api_helper";
import MainStyles from "../../../assets/styles/MainStyles";
import { ReviewCard } from "../../../components/ReviewCard";
import { TopNavBusReviews } from "../../../components/TopNavBusReviews";
import { BotNavBusiness } from "../../../components/BotNavBusiness";
import { SafeAreaView, ScrollView } from "react-native";
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
				console.log('Fetching reviews...');
				const data = [{business_id: businessId}];
				let params = JSON.stringify(data);

				const res = await getBusinessReviews(token, params);

				setAverageRating(res.data.average_rating);
				setReviews(res.data.reviews);

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
			console.log('Gonna fetch the data now...', token, businessId);
			fetchData();
		}
	}, [isReady]);

    const handelView = () => 
    {
        props.navigation.navigate('ReviewView');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TopNavBusReviews title='Your Reviews' rating={averageRating} />
                <ScrollView>
                    <Layout style={[MainStyles.layout_container, {backgroundColor: '#fff'}]}>
					{reviews.map((review, index) => (
  					<ReviewCard key={index} firstName={review.first_name} lastName={review.last_name} rating={review.rating} title={review.review_title} review={review.review_desc} />
					))}
						{/* <ReviewCard firstName="Trevor" lastName="Davis" rating={5} title="Great value for money!" review="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis saepe inventore." />
						<ReviewCard firstName="Trevor" lastName="Davis" rating={5} title="Great value for money!" review="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis saepe inventore." />
						<ReviewCard firstName="Trevor" lastName="Davis" rating={5} title="Great value for money!" review="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis saepe inventore." /> */}
                    </Layout>
                </ScrollView>
                <Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} />
                <BotNavBusiness selected={2}/>
            </SafeAreaView>
    );
};

export default ReviewList;