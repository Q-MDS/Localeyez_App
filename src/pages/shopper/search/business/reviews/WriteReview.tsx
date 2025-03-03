import React, { useState, useEffect, useReducer } from 'react';
import MainStyles from '../../../../../assets/styles/MainStyles';
import DbUtils from '../../../../../services/DbUtils';
import { newReview } from '../../../../../services/api_search';
import { SafeAreaView, ScrollView, StyleSheet, View, Image} from 'react-native';
import { TopNavBack } from '../../../../../components/TopNavBack';
import { Layout, Text } from '@ui-kitten/components';
import { ButtonPrimary } from '../../../../../components/ButtonPrimary';
import { InputMultiline } from '../../../../../components/InputMultiline';
import StarRating from 'react-native-star-rating-widget';

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
	const [starCount, setStarCount] = useState(3);
	const [isReady, setIsReady] = useState(false);
	const [errors, setErrors] = useState<{ title?: string, review?: string }>({});

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

	const handleRatingCompleted = (rating: number) => 
	{
		setStarCount(rating);
	};

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
				// Toast.show({
				// 	type: 'success',
				// 	position: 'bottom',
				// 	text1: 'Success',
				// 	text2: 'Review was successfully uploaded.',
				// 	visibilityTime: 1000,
				// 	autoHide: true,
				// 	topOffset: 30,
				// 	bottomOffset: 40,
				// });
			
				props.navigation.navigate('SearchBusinessReviewWriteConfirm');
			} 
			else 
			{
				// Toast.show({
				// 	type: 'error',
				// 	position: 'bottom',
				// 	text1: 'Server error',
				// 	text2: 'There was an error uploading your review',
				// 	visibilityTime: 1000,
				// 	autoHide: true,
				// 	topOffset: 30,
				// 	bottomOffset: 40,
				// });
			}
		}
	}

	const validateForm = () => 
	{
		let tempErrors = {};

		if (!state.title || state.title === '')
		{
			tempErrors = { ...tempErrors, title: 'Required' };
		}
		
		if (!state.review || state.review === '')
		{
			tempErrors = { ...tempErrors, review: 'Required' };
		}
		
		setErrors(tempErrors);

		if (Object.keys(tempErrors).length === 0)
		{
			handleSubmitReview();
		}
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavBack title="Back: View reviews" alignment="start" navigation={props.navigation} pops={1} />
			<View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f8fd', paddingStart: 20, paddingTop: 20, paddingBottom: 20, borderTopColor: '#DEDDE7', borderTopWidth: 1, borderBottomColor: '#DEDDE7', borderBottomWidth: 1 }}>
				{businessImage ? <Image source={{ uri: String(businessImage) }} style={{ width: 64, height: 64, borderRadius: 32, marginEnd: 10 }} /> : null}	
				<Text category='h5' status="primary" >{`${businessName}`}</Text>
			</View>
			<ScrollView>
				<Layout style={{ flex: 1, marginTop: 20, paddingStart: 20, paddingEnd: 20, marginBottom: 20 }}>
					<Text style={[MainStyles.title_a16, MainStyles.textBold, { marginBottom: 15 }]} >Rate the service</Text>
					<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
						<StarRating
							rating={starCount}
							onChange={setStarCount}
							starSize={30}
							maxStars={5}
						/>
					</View>
					<View style={{ marginTop: 25 }} />
					<View style={{ position: 'relative' }} >
						<InputMultiline label="Write review title" name="title" status="basic" placeholder="Please provide a brief 5-word caption describing the business for your review." numLines={3} value={state.title} onChange={handleInputChange} bg={errors.title ? '#efeaf9' : '#f2f2f2'} />
						{errors.title && <Text style={styles.error}>{errors.title}</Text>}
					</View>
					<View style={{ position: 'relative', marginTop: 25 }} >
						<InputMultiline label="Write review message" name="review" status="basic" placeholder="Write your review here..." numLines={8} value={state.review} onChange={handleInputChange} bg={errors.review ? '#efeaf9' : '#f2f2f2'} />
						{errors.review && <Text style={styles.error}>{errors.review}</Text>}
					</View>
				</Layout>
			</ScrollView>
			<Layout style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 30, paddingStart: 20, paddingEnd: 20, backgroundColor: 'white' }}>
				<ButtonPrimary name="Submit Review" width="100%" marginTop={25} onpress={validateForm}/>
			</Layout>
		</SafeAreaView>
	)
};

const styles = StyleSheet.create({
	error: {
		position: 'absolute',
		top: 1,
		right: 0,
		textAlign: 'right',
        width: '100%',
        color: '#b095e0',
        opacity: 0.5,
		fontSize: 12,
    },
});

export default WriteReview
