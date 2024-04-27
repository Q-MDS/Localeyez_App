import React, { useState, useEffect } from 'react';
import DbUtils from '../../../../../services/DbUtils';
import Toast from 'react-native-toast-message';
import { getBusinessReviews } from '../../../../../services/api_helper';
import { SafeAreaView, ScrollView, View, Image} from 'react-native';
import { TopNavArrowTitle } from '../../../../../components/TopNavArrowTitle';
import { Layout, Text } from '@ui-kitten/components';
import { ReviewCard } from '../../../../../components/ReviewCard';
import { ButtonPrimary } from '../../../../../components/ButtonPrimary';
import { TouchableOpacity } from 'react-native-gesture-handler';

const List = (props:any) => 
{
	const [business, setBusiness] = useState<any>(props.route.params.business);
	const [businessId, setBusinessId] = useState<String>('');
	const [businessName, setBusinessName] = useState<String>('');
	const [businessImage, setBusinessImage] = useState<String>('');
	const [reviews, setReviews] = useState<any>([]);
	const [gotReviews, setGotReviews] = useState(false);
	const [averageRating, setAverageRating] = useState('0');

	const [token, setToken] = useState('');
	const [isReady, setIsReady] = useState(false);

	useEffect(() => 
	{
		setBusinessId(business.id);
		setBusinessName(business.company_name);
		setBusinessImage(business.profile_pic);
		console.log('Business Image:', businessImage);
	}, [business]);

	const getToken = async () => 
	{
		const getToken = await DbUtils.getItem('shopper_token');
		const parsedToken = getToken ? JSON.parse(getToken) : null;
		setToken(parsedToken);
		setIsReady(true);
	}

	useEffect(() => 
	{
		getToken();
	}, []);

	const fetchReviews = async () => 
	{
		const apiData = {business_id: businessId};
		
		const res = await getBusinessReviews(token, apiData);
		const status = res.status;
		console.log('Reviews: ', res.data.reviews);
		if (status)
		{
			setAverageRating(res.data.average_rating);
			setReviews(res.data.reviews);
			setGotReviews(true);
			
			Toast.show({
				type: 'success',
				position: 'bottom',
				text1: 'Success',
				text2: 'Reviews have been downloaded.',
				visibilityTime: 1000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});

		} 
		else 
		{
			setGotReviews(false);

			Toast.show({
				type: 'error',
				position: 'bottom',
				text1: 'Server error',
				text2: 'There was a problen fetching reviews.',
				visibilityTime: 1000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		}
	}

	useEffect(() => 
	{
		if (isReady)
		{
			console.log('Got token, fetching reviews');
			console.log('Token is: ', token);
			fetchReviews();
		}
	}, [isReady]);

	const handleGoBack = () => 
	{
		props.navigation.navigate('SearchBusinessView', { business: business });
	}

	const handelViewReview = (review: any) => 
	{
		console.log('View review button pressed.');
		
		props.navigation.navigate('SearchBusinessReviewView', { businessName: businessName, businessImage: businessImage, review: review });
	}

	const handleWriteReview = () => 
	{
		console.log('Write a review button pressed.');
		props.navigation.navigate('SearchBusinessReviewWrite', { businessId: businessId, businessName: businessName, businessImage: businessImage });
	}

	return (
	<SafeAreaView style={{ flex: 1 }}>
		<TopNavArrowTitle title="Reviews" alignment="start" navigation={props.navigation} onpress={handleGoBack} goBackTo="Search" />
		<View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f8fd', paddingStart: 20, paddingTop: 20, paddingBottom: 20, borderTopColor: '#DEDDE7', borderTopWidth: 1, borderBottomColor: '#DEDDE7', borderBottomWidth: 1 }}>
			{businessImage ? <Image source={{ uri: String(businessImage) }} style={{ width: 64, height: 64, borderRadius: 32 }} /> : null}	
			<Text category='h5' status="primary" style={{ paddingStart: 15,  }} >{`${businessName}`}</Text>
		</View>
		<ScrollView>
			<Layout style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 15, paddingStart: 20, paddingEnd: 20, backgroundColor: 'white', width: '100%' }}>
				<Text>Reviews</Text>
				
				{reviews && reviews.map((review: { first_name: any; last_name: any; rating: any; review_title: any; review_desc: any; }, index: React.Key | null | undefined) => (
					<TouchableOpacity key={index} style={{ flexDirection: 'row' }} onPress={() => handelViewReview(review)}>
						<ReviewCard key={index} firstName={review.first_name} lastName={review.last_name} rating={review.rating} title={review.review_title} review={review.review_desc.length > 100 ? review.review_desc.substring(0, 100) + '...' : review.review_desc} />
					</TouchableOpacity>
				))}
			</Layout>
		</ScrollView>
		<Layout style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 30, paddingStart: 20, paddingEnd: 20, backgroundColor: 'white', borderTopColor: '#DEDDE7', borderTopWidth: 1 }}>
			<ButtonPrimary name="Write a Review" width="100%" marginTop={25} onpress={handleWriteReview}/>
		</Layout>
	</SafeAreaView>
	)
}

export default List
