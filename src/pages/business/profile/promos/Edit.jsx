import React, { useState, useEffect, useReducer } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import DbUtils from '../../../../services/DbUtils';
import { updPromotion } from '../../../../services/api_helper';
import { updPromotionImage } from '../../../../services/api_upload';
import Toast from 'react-native-toast-message';
import MainStyles from '../../../../assets/styles/MainStyles';
import { TopNavBackTitleIcon } from '../../../../components/TopNavBackTitleIcon';
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity, BackHandler, ActivityIndicator, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import DividerTop from '../../../../components/DividerTop';
import { InputLabel } from '../../../../components/InputLabel';
import { InputMultiline } from '../../../../components/InputMultiline';
import { InputLabelNumpad } from '../../../../components/InputLabelNumpad';
import { InputNumpad } from '../../../../components/InputNumpad';
import { DateSelect } from '../../../../components/DateSelect';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import DropdownSingle from '../../../../components/DropdownSingle';
import { InputOnly } from '../../../../components/InputOnly';
import { Label } from '../../../../components/Label';
import { InputZip } from '../../../../components/InputZip';

const sectors = [
	{ label: 'Shopping', value: 'Shopping' }, 
	{ label: 'Travel', value: 'Travel' }, 
	{ label: 'Health & Wellness', value: 'Health & Wellness' }, 
	{ label: 'Entertainment', value: 'Entertainment' }, 
	{ label: 'Education & Employment', value: 'Education & Employment' }, 
	{ label: 'Property', value: 'Property' }, 
	{ label: 'Services', value: 'Services' }, 
	{ label: 'Community', value: 'Community' }
];

const initialState = {
	remoteId: null,
	businessId: null,
	sector: null,
	displayImage: null,
	promoTitle: null,
	promoCaption: null,
	promoDesc: null,
	promoPrice: null,
	promoSiOp: null,
	promoSiMp: null,
	promoStartDate: null,
	promoEndDate: null,
	promoLocAdd1: null,
	promoLocAdd2: null,
	promoLocCity: null,
	promoLocProvince: null,
	promoLocZipCode: null,
};

function reducer(state, action) 
{
	switch (action.type) 
	{
	  	case 'SET_PROMOTION':
			return { ...state, ...action.payload };
	  	default:
			throw new Error();
	}
}

const Edit = (props) => 
{
	const [state, dispatch] = useReducer(reducer, initialState);

	const [remoteId, setRemoteId] = useState('');
	const [businessId, setBusinessId] = useState('');
	const [token, setToken] = useState('');
	const [sector, setSector] = useState('');
	const [isUploading, setIsUploading] = useState(false);
	const [isNewPic, setIsNewPic] = useState(false);
	const [imageType, setImageType] = useState('');
	const [base64Data, setBase64Data] = useState('');
	const [errors, setErrors] = useState({ sector: '', title: '', caption: '', desc: '', price: '', startDate: '', endDate: '' });

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'SET_PROMOTION',
			payload: {...state, [name]: newValue}
		});
	}

	const getPromotions = async () => 
	{
		const data = await DbUtils.getItem('promotions');
		const parsedData = JSON.parse(data);
		
		showPromotion(parsedData[props.route.params.id]);
	}

	const getToken = async () => 
	{
		const token = await DbUtils.getItem('token');
		
		setToken(JSON.parse(token));
	}

	const showPromotion = (record) => 
	{
		setRemoteId(record.id);
		setBusinessId(record.business_id);
		
		dispatch(
		{
		  type: 'SET_PROMOTION',
		  payload: 
		  {
			sector: record.sector,
			displayImage: record.display_image,
			promoTitle: record.promo_title,
			promoCaption: record.promo_caption,
			promoDesc: record.promo_desc,
			promoPrice: record.promo_price,
			promoSiOp: record.sale_item_op,
			promoSiMp: record.sale_item_mp,
			promoStartDate: record.start_date ? new Date(record.start_date) : null,
			promoEndDate: record.end_date ? new Date(record.end_date) : null,
			promoLocAdd1: record.loc_add_one,
			promoLocAdd2: record.loc_add_two,
			promoLocCity: record.loc_city,
			promoLocProvince: record.loc_province,
			promoLocZipCode: record.loc_zip_code,
		  	},
		});
	};

	useEffect(() => 
	{
		const fetchPromotions = async () => 
		{
			await getPromotions();
			await getToken();
		};

		fetchPromotions();
	}, []);

	const chooseDisplayImage = () => 
	{
		let options = {
		  mediaType: 'photo',
		  maxWidth: 640,
		  maxHeight: 360,
		  quality: 1,
		  includeBase64: true,
		};
	
		launchImageLibrary(options, response => 
		{
			if (response.didCancel) 
			{
				console.log('User cancelled image picker');
			} 
			else if (response.error) 
			{
				console.log('ImagePicker Error: ', response.error);
			} 
			else 
			{
				setIsNewPic(true);
				setImageType(response.assets[0].type);
				setBase64Data(response.assets[0].base64);

				handleInputChange('displayImage', response.assets[0].uri);
				// setDisplayImage(response.assets[0].uri);
			}
		});
	};

	const uploadFile = async (promotionId) => 
	{
		const formData = new FormData();
		formData.append('business_id', businessId);
		formData.append('promotion_id', promotionId);
		formData.append('image_type', imageType);
		formData.append('image', base64Data);

	  try 
	  {
		  const response = await updPromotionImage(token, formData);
		  console.log('Image response:', response.status);
		  if (response.status)
		  {
			  return response.data;
		  }
	  } 
	  catch (error) 
	  {
		  console.error(error);
	  }
	}

    const handleSubmit = async () => 
    {
		setIsUploading(true);

		const promotionData = [{
			id: remoteId,
			business_id: businessId,
			sector: state.sector,
			display_image: state.displayImage,
			promo_title: state.promoTitle,
			promo_caption: state.promoCaption,
			promo_desc: state.promoDesc,
			promo_price: state.promoPrice,
			sale_item_op: state.promoSiOp, 
			sale_item_mp: state.promoSiMp, 
			start_date: state.promoStartDate,
			end_date: state.promoEndDate,   
			loc_add_one: state.promoLocAdd1,   
			loc_add_two: state.promoLocAdd2,   
			loc_city: state.promoLocCity,   
			loc_province: state.promoLocProvince,   
			loc_zip_code: state.promoLocZipCode,   
			updated_at: new Date().toLocaleDateString()
		}];

		let record = JSON.stringify(promotionData);

		try 
		{
			const res = await updPromotion(token, record);
			
			if (res.status)
			{
				let fileUrl = state.displayImage;
				if (isNewPic)
				{
					fileUrl = await uploadFile(remoteId);
				}

				// Get the current array of records
				const data = await DbUtils.getItem('promotions');
				const parsedData = JSON.parse(data);
			
				// Update the record at the specified index
				const updatedData = parsedData.map((record, index) => 
				{
					if (index === Number(props.route.params.id)) 
					{
						// This is the record to update
						return {
						...record,
						sector: state.sector,
						display_image: fileUrl,
						promo_title: state.promoTitle,
						promo_caption: state.promoCaption,
						promo_description: state.promoDesc,
						promo_price: state.promoPrice,
						sale_item_op: state.promoSiOp,
						sale_item_mp: state.promoSiMp,
						start_date: state.promoStartDate,
						end_date: state.promoEndDate,
						loc_add_one: state.promoLocAdd1,
						loc_add_two: state.promoLocAdd2,
						loc_city: state.promoLocCity,
						loc_province: state.promoLocProvince,
						loc_zip_code: state.promoLocZipCode,
						};
					} 
					else 
					{
						// This is not the record to update, so return it as is
						return record;
					}
				});
			
				// Save the updated array back to async-storage
				await DbUtils.setItem('promotions', JSON.stringify(updatedData));

				props.navigation.navigate('BusProfProHome');
			}
		} 
		catch (error)
		{
			Toast.show({
				type: 'error',
				position: 'bottom',
				text1: 'There was an error uploading the promotion',
				text2: 'Please try again.',
				visibilityTime: 4000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		}

		setIsUploading(false);
    }

	const validateForm = () => 
	{
		let tempErrors = {};

		if (!state.sector)
		{
			tempErrors = { ...tempErrors, sector: 'Sector is required' };
		}
		if (!state.promoTitle || state.promoTitle === '')
		{
			tempErrors = { ...tempErrors, title: 'Title is required' };
		}
		if (!state.promoCaption || state.promoCaption === '')
		{
			tempErrors = { ...tempErrors, caption: 'Caption is required' };
		}
		if (!state.promoDesc || state.promoDesc === '')
		{
			tempErrors = { ...tempErrors, desc: 'Description is required' };
		}
		if (!state.promoPrice || state.promoPrice === '')
		{
			tempErrors = { ...tempErrors, price: 'Price is required' };
		}
		if (!state.promoStartDate || state.promoStartDate === '')
		{
			tempErrors = { ...tempErrors, startDate: 'Start date is required' };
		}
		if (!state.promoEndDate || state.promoEndDate === '')
		{
			tempErrors = { ...tempErrors, endDate: 'End date is required' };
		}
		setErrors(tempErrors);
		
		if (Object.keys(tempErrors).length === 0)
		{
			handleSubmit();
		} 
	}

	useEffect(() => 
	{
		const backAction = () => 
		{
			console.log('Back action');
			props.navigation.navigate('BusProfProHome');
			return true;
		};

		const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

		return () => backHandler.remove();
	}, []);

	if (isUploading) 
    {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <TopNavBackTitleIcon title="Edit Promotion" alignment="start" navigation={props.navigation} goBackTo="BusProProAddEditBack" goDelete="BusProfProDelete" deleteId={remoteId} />
        <DividerTop />
        <ScrollView style={{ flex: 1, width: '100%' }}>
            <Layout style={[MainStyles.layout_container, {backgroundColor: '#fff'}]}>
				<Text style={[MainStyles.title_a16, { textAlign: 'left', width: '100%', marginBottom: 10 }]}>Choose which business sector(s) your promotion falls under:</Text>

					<View style={{ position: 'relative', flex: 1, width: '100%' }} >
						<DropdownSingle name="sector" data={sectors} value={state.sector} onChange={handleInputChange} />
						{errors.sector && <Text style={[styles.error, { textAlign: 'left' }]}>{errors.sector}</Text>}
					</View>
					<Text style={[MainStyles.title_a16, { textAlign: 'left', width: '100%', marginBottom: 10 }]}>Upload Promotion Display Picture</Text>

				<TouchableOpacity onPress={chooseDisplayImage} style={{ width: '100%' }}>
					<Layout style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',backgroundColor: '#FAF9FD', borderColor: '#612bc1', borderWidth: 1, borderRadius: 10, borderStyle: 'dashed', padding: 20 }} >
						<Image source={require('../../../../assets/images/icon_pic_upload.png')} style={{ width: 48, height: 48 }} />
						<Text style={[MainStyles.title_a16, { textAlign: 'center', color: '#612bc1', marginTop: 20, paddingStart: 40, paddingEnd: 40 }]}>Add an image for the banner of your promotion</Text>
						<Text style={[MainStyles.title_a14, { textAlign: 'center', color: '#612bc1', marginTop: 10 }]}>Image specifications: 640px x 360px</Text>
						<Text style={[MainStyles.title_a14, { textAlign: 'center', color: '#612bc1' }]}>Image size: max 5MB</Text>
						{state.displayImage && <Image source={{ uri: state.displayImage }} style={{ width: '100%', height: 200, marginTop: 15, borderRadius: 8 }} onLoadStart={() => console.log('Loading image...')} onLoad={() => console.log('Image loaded')} onError={(error) => console.log('Error loading image', error)} />}
					</Layout>
				</TouchableOpacity>

                <View style={{ position: 'relative', marginTop: 15, width: '100%' }} >
                	<InputLabel label="Promotion Title" name="promoTitle" value={state.promoTitle} onChange={handleInputChange} placeholder="Write title here" status="basic" bg={errors.title ? '#ffe6e6' : '#f2f2f2'} />
					{errors.title && <Text style={[styles.error]}>{errors.title}</Text>}
				</View>

                <View style={{ position: 'relative', marginTop: 15, width: '100%' }} >
                	<InputMultiline label="Promotion Caption" name="promoCaption" value={state.promoCaption} onChange={handleInputChange} placeholder="Write a short description up to 120 characters about your promotion" status="basic" bg={errors.caption ? '#ffe6e6' : '#f2f2f2'} />
					{errors.caption && <Text style={[styles.error]}>{errors.caption}</Text>}
				</View>

                <View style={{ position: 'relative', marginTop: 15, width: '100%' }} >
                	<InputMultiline label="Promotion Description" name="promoDesc" value={state.promoDesc} onChange={handleInputChange} placeholder="Write a longer description up to 500 characters about your promotion" status="basic" bg={errors.desc ? '#ffe6e6' : '#f2f2f2'} />
					{errors.desc && <Text style={[styles.error]}>{errors.desc}</Text>}
				</View>

                <View style={{ position: 'relative', marginTop: 15, width: '100%' }} >
					{/* <InputLabel label="Price" name="promoPrice" value={state.promoPrice} onChange={handleInputChange} status="basic" placeholder="Write product price" bg={errors.price ? '#ffe6e6' : '#f2f2f2'} /> */}
					<InputLabelNumpad label="Price" name="promoPrice" value={state.price} onChange={handleInputChange} placeholder="Write product price" status="basic" bg={errors.price ? '#ffe6e6' : '#f2f2f2'} />
					{errors.price && <Text style={[styles.error]}>{errors.price}</Text>}
				</View>

                <View style={{ marginTop: 5 }} />
                {/* <InputLabel label="Sale Item (Optional)" name="promoSiOp" value={state.promoSiOp} onChange={handleInputChange} status="basic" placeholder="Original Price" bg="#f2f2f2" /> */}
				<InputLabelNumpad label="Sale Item (Optional)" name="promoSiOp" value={state.promoSiOp} onChange={handleInputChange} placeholder="Original Price" status="basic" bg="#f2f2f2" />
                {/* <InputOnly mt={5} name="promoSiMp" value={state.promoSiMp} onChange={handleInputChange} status="primary" placeholder="Marked Down Price" bg="#f2f2f2" /> */}
				<InputNumpad name="promoSiMp" value={state.promoSiMp} onChange={handleInputChange} placeholder="Marked Down Price" status="basic" mt={10} bg="#f2f2f2" />

                <View style={{ position: 'relative', marginTop: 15, width: '100%' }} >
					<Label title="Promotion Start Date" textalign="left" mb={5} status="basic" fontsize={16} />
					<DateSelect value={state.promoStartDate} name="promoStartDate" onChange={handleInputChange} bg={errors.startDate ? '#ffe6e6' : '#f2f2f2'}  />
					{errors.startDate && <Text style={[styles.error]}>{errors.startDate}</Text>}
				</View>

                <View style={{ position: 'relative', marginTop: 15, width: '100%' }} >
					<Label title="Promotion End Date" textalign="left" mb={5} status="basic" fontsize={16} />
					<DateSelect value={state.promoEndDate} name="promoEndDate" onChange={handleInputChange} bg={errors.endDate ? '#ffe6e6' : '#f2f2f2'}  />
					{errors.endDate && <Text style={[styles.error]}>{errors.endDate}</Text>}
				</View>

                <View style={{ marginTop: 15 }} />
                <InputLabel label="Promotion Location (Optional)" name="promoLocAdd1" value={state.promoLocAdd1} onChange={handleInputChange} status="basic" placeholder="Address line 1" bg="#f2f2f2"  />
                <View style={{ marginTop: 5 }} />
                <InputOnly name="promoLocAdd2" value={state.promoLocAdd2} onChange={handleInputChange} placeholder="Address line 2" bg="#f2f2f2"  />
                <View style={{ marginTop: 5 }} />
                <InputOnly name="promoLocCity" value={state.promoLocCity} onChange={handleInputChange} placeholder="City" bg="#f2f2f2"  />
                <View style={{ marginTop: 5 }} />
                <InputOnly name="promoLocProvince" value={state.promoLocProvince} onChange={handleInputChange}placeholder="Province" bg="#f2f2f2"  />
                <View style={{ marginTop: 5 }} />
                <InputZip name="promoLocZipCode" value={state.promoLocZipCode} onChange={handleInputChange} placeholder="ZIP Code" bg="#f2f2f2"  />
                <ButtonPrimary name="Submit Changes" width="100%" marginTop={25} onpress={validateForm}/>
            </Layout>
        </ScrollView>


      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
	error: {
		position: 'absolute',
		top: 1,
		right: 0,
		textAlign: 'right',
        width: '100%',
        color: 'red',
        opacity: 0.5,
		fontSize: 12,
    },
});

export default Edit;