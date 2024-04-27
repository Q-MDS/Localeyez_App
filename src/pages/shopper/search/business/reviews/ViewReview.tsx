import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Image} from 'react-native';
import { TopNavBack } from '../../../../../components/TopNavBack';
import { Layout, Text } from '@ui-kitten/components';
import { ReviewCard } from '../../../../../components/ReviewCard';
import { ButtonPrimary } from '../../../../../components/ButtonPrimary';

const ViewReview = (props:any) => 
{
	const [businessName, setBusinessName] = useState<any>(props.route.params.businessName);
	const [businessImage, setBusinessImage] = useState<any>(props.route.params.businessImage);
	const [review, setReview] = useState<any>(props.route.params.review);

	const [firstName, setFirstName] = useState<String>(''); // Shopper First Name
	const [lastName, setLastName] = useState<String>(''); // Shopper Last Name
	const [rating, setRating] = useState<String>('');
	const [reviewTitle, setReviewTitle] = useState<String>('');
	const [reviewDesc, setReviewDesc] = useState<String>('');

	const firstChar = lastName.charAt(0).toUpperCase();

	useEffect(() => 
	{
		setFirstName(review.first_name);
		setLastName(review.last_name);
		setRating(review.rating);
		setReviewTitle(review.review_title);
		setReviewDesc(review.review_desc);

		// console.log('Business Image:', businessImage);
	}, [review]);

	const handleWriteReview = () => 
	{
		console.log('Write a review button pressed.');
		// props.navigation.navigate('WriteReview', { business: business });
	}	

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			{/* <TopNavArrowTitle title="Reviews" alignment="start" navigation={props.navigation} onpress={handleGoBack} goBackTo="Search" /> */}
			{/* <TopNavArrowTitle title="Reviews" alignment="start" navigation={props.navigation}  /> */}
			<TopNavBack title="Reviews"  alignment="start" navigation={props.navigation}/>
			<View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f8fd', paddingStart: 20, paddingTop: 20, paddingBottom: 20, borderTopColor: '#DEDDE7', borderTopWidth: 1, borderBottomColor: '#DEDDE7', borderBottomWidth: 1 }}>
				{businessImage ? <Image source={{ uri: String(businessImage) }} style={{ width: 64, height: 64, borderRadius: 32 }} /> : null}	
				<Text category='h5' status="primary" style={{ paddingStart: 15,  }} >{`${businessName}`}</Text>
			</View>
			<ScrollView>
				<Layout style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 15, paddingStart: 20, paddingEnd: 20, backgroundColor: 'white' }}>
				<ReviewCard firstName={`${firstName} ${firstChar}.`} fn={firstName} ln={lastName} rating={rating} title={reviewTitle} review={reviewDesc} />
				</Layout>
			</ScrollView>
			<Layout style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 30, paddingStart: 20, paddingEnd: 20, backgroundColor: 'white', borderTopColor: '#DEDDE7', borderTopWidth: 1 }}>
				<ButtonPrimary name="Write a Review" width="100%" marginTop={25} onpress={handleWriteReview}/>
			</Layout>
		</SafeAreaView>
	)
}

export default ViewReview
