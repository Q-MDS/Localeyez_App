import React, { useState, useEffect, useReducer } from 'react';
import DbUtils from '../../../../../services/DbUtils';
import { newReview } from '../../../../../services/api_search';
import Toast from 'react-native-toast-message';
import { Rating } from 'react-native-ratings';
import { SafeAreaView, ScrollView, View, Image} from 'react-native';
import { TopNavBack } from '../../../../../components/TopNavBack';
import { Layout, Text } from '@ui-kitten/components';
import { ButtonPrimary } from '../../../../../components/ButtonPrimary';
import { InputMultiline } from '../../../../../components/InputMultiline';

const initialState = {
	businessId: null,
	shopperId: null,
	title: null,
	review: null,
};

function reducer(state: any, action: { type: any; payload: any; }) 
{
	switch (action.type) 
	{
	  case 'WRITE_REVIEW':
		return { ...state, ...action.payload };
	  default:
		throw new Error();
	}
}

const WriteReview = (props:any) => 
{
	const [state, dispatch] = useReducer(reducer, initialState);
	const [token, setToken] = useState('');
	const [businessId, setBusinessId] = useState<any>(props.route.params.businessId);
	const [shopperId, setShopperId] = useState<any>('');
	const [businessName, setBusinessName] = useState<any>(props.route.params.businessName);
	const [businessImage, setBusinessImage] = useState<any>(props.route.params.businessImage);
	const [starCount, setStarCount] = useState(0);
	const [isReady, setIsReady] = useState(false);

	function handleInputChange(name: any, newValue: any) 
	{
		dispatch(
		{
			type: 'WRITE_REVIEW',
			payload: {...state, [name]: newValue}
		});
	}

	const getToken = async () => 
	{
		const getToken = await DbUtils.getItem('shopper_token');
		const parsedToken = getToken ? JSON.parse(getToken) : null;
		
		setToken(parsedToken);
	}

	const getShopperId = async () => 
	{
		const id = await DbUtils.getItem('shopper_id');
		const parsedId = id ? JSON.parse(id) : null;
		
		setShopperId(parsedId);
	}

	useEffect(() => 
	{
		const fetchData = async () => 
		{
			await getToken();
			await getShopperId();

			setIsReady(true);
		}
		fetchData();
	}, []);


	const handleSubmitReview = async () => 
	{
		console.log('Send to server etc...', state.title, state.review, starCount, businessId, shopperId, token);

		if (isReady)
		{
			const apiData = {
				business_id: businessId,
				shopper_id: shopperId,
				rating: starCount,
				title: state.title,
				review: state.review,
			};
			const res = await newReview(token, apiData);
			const status = res.status;
	
			if (status)
			{
				Toast.show({
					type: 'success',
					position: 'bottom',
					text1: 'Success',
					text2: 'Review was successfully uploaded.',
					visibilityTime: 1000,
					autoHide: true,
					topOffset: 30,
					bottomOffset: 40,
				});
			
				props.navigation.navigate('SearchBusinessReviewWriteConfirm');
			} 
			else 
			{
				Toast.show({
					type: 'error',
					position: 'bottom',
					text1: 'Server error',
					text2: 'There was an error uploading your review',
					visibilityTime: 1000,
					autoHide: true,
					topOffset: 30,
					bottomOffset: 40,
				});
			}
		}
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavBack title="Write Review"  alignment="start" navigation={props.navigation}/>
			<View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f8fd', paddingStart: 20, paddingTop: 20, paddingBottom: 20, borderTopColor: '#DEDDE7', borderTopWidth: 1, borderBottomColor: '#DEDDE7', borderBottomWidth: 1 }}>
				{businessImage ? <Image source={{ uri: String(businessImage) }} style={{ width: 64, height: 64, borderRadius: 32 }} /> : null}	
				<Text category='h5' status="primary" style={{ paddingStart: 15,  }} >{`${businessName}`}</Text>
			</View>
			<ScrollView>
				<Layout style={{ flex: 1, marginTop: 20, paddingStart: 20, paddingEnd: 20, marginBottom: 20 }}>
					<Text category='h6' status="primary" style={{ marginBottom: 15 }} >Rate the service</Text>
					{/* <StarRating
						disabled={false}
						maxStars={5}
						rating={starCount}
						fullStarColor={'#5D5A88'}
						selectedStar={(rating: React.SetStateAction<number>) => setStarCount(rating)}
						/> */}
						<Rating
							type='star'
							ratingCount={5}
							imageSize={30}
							onFinishRating={setStarCount}
							/>
					<Text category='h6' status="primary" style={{ marginTop: 20, marginBottom: 15 }} >Write review title</Text>
					<InputMultiline name="title" placeholder="Please provide a brief 5-word caption describing the business for your review." numLines={5} value={state.title} onChange={handleInputChange} />
					<Text category='h6' status="primary" style={{ marginTop: 20, marginBottom: 15 }} >Write message review</Text>
					<InputMultiline name="review" placeholder="Write your review here..." numLines={9} value={state.review} onChange={handleInputChange} />
				</Layout>
			</ScrollView>
			<Layout style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 30, paddingStart: 20, paddingEnd: 20, backgroundColor: 'white', borderTopColor: '#DEDDE7', borderTopWidth: 1 }}>
				<ButtonPrimary name="Submit Review" width="100%" marginTop={25} onpress={handleSubmitReview}/>
			</Layout>
		</SafeAreaView>
	)
}

export default WriteReview
