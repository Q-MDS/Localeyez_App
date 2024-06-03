import React, { useState, useEffect, useReducer } from 'react';
import DbUtils from '../../../../services/DbUtils';
import Toast from 'react-native-toast-message';
import { addPromotion } from '../../../../services/api_helper';
import { promotionImage } from '../../../../services/api_upload';
import { launchImageLibrary } from 'react-native-image-picker';
import MainStyles from '../../../../assets/styles/MainStyles';
import { TopNav } from '../../../../components/TopNav';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image, BackHandler, ActivityIndicator, StyleSheet } from 'react-native';
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

const initialState = {
	sector: null,
	displayImage: null,
	title: null,
	caption: null,
	desc: null,
	price: null,
	saleItemOp: null,
	saleItemMp: null,
	startDate: null,
	endDate: null,
	addressOne: null,
	addressTwo: null,
	city: null,
	province: null,
	zipCode: null,
};

function reducer(state, action) 
{
	switch (action.type) 
	{
	  case 'ADD_PROMOTION':
		return { ...state, ...action.payload };
	  default:
		throw new Error();
	}
}

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

const Add = (props) => 
{
	const [state, dispatch] = useReducer(reducer, initialState);

	const [businessId, setBusinessId] = useState('');
	const [token, setToken] = useState('');
	const [isUploading, setIsUploading] = useState(false);
	const [imageType, setImageType] = useState('');
	const [base64Data, setBase64Data] = useState('');
	const [errors, setErrors] = useState({ sector: '', title: '', caption: '', desc: '', price: '', startDate: '', endDate: '' });

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'ADD_PROMOTION',
			payload: {...state, [name]: newValue}
		});
	}

	const getBusniessId = async () => 
	{
		const id = await DbUtils.getItem('business_id');
		
		setBusinessId(JSON.parse(id));
	}

	const getToken = async () => 
	{
		const token = await DbUtils.getItem('token');
		
		setToken(JSON.parse(token));
	}

	useEffect(() => 
	{
		const fetchProfile = async () => 
		{
			await getBusniessId();
			await getToken();
		};

		fetchProfile();
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
				setImageType(response.assets[0].type);
				setBase64Data(response.assets[0].base64);

				handleInputChange('displayImage', response.assets[0].uri);
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
		  const response = await promotionImage(token, formData);
		  console.log('Image response:', response);
		  console.log('Image response ZZZ:', response.data);
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

    const handleUpload = async () => 
    {
		// Validate: TODO

		setIsUploading(true);

		const promotionData = [{
			business_id: businessId,
            sector: state.sector,
            display_image: state.displayImage,
            promo_title: state.title,
            promo_caption: state.caption,
            promo_desc: state.desc,
            promo_price: state.price,
            sale_item_op: state.saleItemOp, 
            sale_item_mp: state.saleItemMp, 
            start_date: state.startDate,
            end_date: state.endDate,
            loc_add_one: state.addressOne,   
            loc_add_two: state.addressTwo,   
            loc_city: state.city,   
            loc_province: state.province,   
            loc_zip_code: state.zipCode,   
            created: new Date().toLocaleDateString()
        }];
        let stringified = JSON.stringify(promotionData);

		// Send to server
		let insertId = 0;
		try 
		{
			const res = await addPromotion(token, promotionData);
			
			if (res.status)
			{
				insertId = res.data;

				// Use id and bus id to upload the image: UPLOAD
				const fileUrl = await uploadFile(insertId);
				
				// Update the promotion record with the URL
				const record = [{
					id: insertId,
					business_id: businessId,
					sector: state.sector,
					display_image: fileUrl,
					promo_title: state.title,
					promo_caption: state.caption,
					promo_desc: state.desc,
					promo_price: state.price,
					sale_item_op: state.saleItemOp, 
					sale_item_mp: state.saleItemMp, 
					start_date: state.startDate,
					end_date: state.endDate,   
					loc_add_one: state.addressOne,   
					loc_add_two: state.addressTwo,   
					loc_city: state.city,   
					loc_province: state.province,   
					loc_zip_code: state.zipCode,   
					created: new Date().toLocaleDateString()
				}];
				
				// Write to ASyncStorage
				addData(record);

				setIsUploading(false);

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
    }

	const addData = async (newArray) => 
	{
		try 
		{
			const jsonValue = await DbUtils.getItem('promotions');
			let parsedValue = jsonValue != null ? JSON.parse(jsonValue) : [];
			let currentArray = Array.isArray(parsedValue) ? parsedValue : [];
			const updatedArray = [...currentArray, ...newArray];
			
			await DbUtils.setItem('promotions', JSON.stringify(updatedArray));
		} 
		catch(e) 
		{
		  console.log(e);
		}
	}

	const validateForm = () => 
	{
		let tempErrors = {};

		if (!state.sector)
		{
			tempErrors = { ...tempErrors, sector: 'Sector is required' };
		}
		if (!state.title || state.title === '')
		{
			tempErrors = { ...tempErrors, title: 'Title is required' };
		}
		if (!state.caption || state.caption === '')
		{
			tempErrors = { ...tempErrors, caption: 'Caption is required' };
		}
		if (!state.desc || state.desc === '')
		{
			tempErrors = { ...tempErrors, desc: 'Description is required' };
		}
		if (!state.price || state.price === '')
		{
			tempErrors = { ...tempErrors, price: 'Price is required' };
		}
		if (!state.startDate || state.startDate === '')
		{
			tempErrors = { ...tempErrors, startDate: 'Start date is required' };
		}
		if (!state.endDate || state.endDate === '')
		{
			tempErrors = { ...tempErrors, endDate: 'End date is required' };
		}
		setErrors(tempErrors);
		
		if (Object.keys(tempErrors).length === 0)
		{
			handleUpload(); 
		} 
	}

	useEffect(() => 
	{
		const backAction = () => 
		{
			console.log('Back action');
			props.navigation.navigate('BusProProAddEditBack');
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
	  	<TopNav title="Add event" alignment="start" navigation={props.navigation} nav="BusProProAddEditBack" />
		{/* <TopNavBack title="Add promotion" alignment="start" navigation={props.navigation} pops={1} /> */}
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
                	<InputLabel label="Promotion Title" name="title" value={state.title} onChange={handleInputChange} placeholder="Write title here" status="basic" bg={errors.title ? '#ffe6e6' : '#f2f2f2'} />
					{errors.title && <Text style={[styles.error]}>{errors.title}</Text>}
				</View>

                <View style={{ position: 'relative', marginTop: 15, width: '100%' }} >
                	<InputMultiline label="Promotion Caption" name="caption" height={100} value={state.caption} onChange={handleInputChange} placeholder="Write a short description up to 120 characters about your promotion" status="basic" bg={errors.caption ? '#ffe6e6' : '#f2f2f2'} />
					{errors.caption && <Text style={[styles.error]}>{errors.caption}</Text>}
				</View>

                <View style={{ position: 'relative', marginTop: 15, width: '100%' }} >
					<InputMultiline label="Promotion Description" name="desc" height={140} value={state.desc} onChange={handleInputChange} placeholder="Write a longer description up to 500 characters about your promotion" status="basic" bg={errors.desc ? '#ffe6e6' : '#f2f2f2'} />
					{errors.desc && <Text style={[styles.error]}>{errors.desc}</Text>}
				</View>

                <View style={{ position: 'relative', marginTop: 15, width: '100%' }} >
                	{/* <InputLabel label="Price" name="price" value={state.price} onChange={handleInputChange} placeholder="Write product price" status="basic" bg={errors.price ? '#ffe6e6' : '#f2f2f2'} /> */}
					<InputLabelNumpad name="price" label="Price" value={state.price} onChange={handleInputChange} placeholder="Write product price" status="basic" bg={errors.price ? '#ffe6e6' : '#f2f2f2'} />
					{errors.price && <Text style={[styles.error]}>{errors.price}</Text>}
				</View>

                <View style={{ marginTop: 15 }} />
                {/* <InputLabel label="Sale Item (Optional)" name="saleItemOp" value={state.saleItemOp} onChange={handleInputChange} placeholder="Original price"status="basic" bg="#f2f2f2" /> */}
				<InputLabelNumpad label="Sale Item (Optional)" name="saleItemOp" value={state.saleItemOp} onChange={handleInputChange} placeholder="Original Price" status="basic" bg="#f2f2f2" />
                {/* <InputOnly name="saleItemMp" value={state.saleItemMp} onChange={handleInputChange} placeholder="Marked down price" mt={5} bg="#f2f2f2" /> */}
				<InputNumpad name="promoSiMp" value={state.saleItemMp} onChange={handleInputChange} placeholder="Marked Down Price" status="basic" mt={10} bg="#f2f2f2" />

                <View style={{ position: 'relative', marginTop: 15, width: '100%' }} >
					<Label title="Promotion Start Date" textalign="left" mb={5} status="basic" fontsize={16} />
					<DateSelect name="startDate" value={state.startDate} onChange={handleInputChange} bg={errors.startDate ? '#ffe6e6' : '#f2f2f2'} />
					{errors.startDate && <Text style={[styles.error]}>{errors.startDate}</Text>}
				</View>

                <View style={{ position: 'relative', marginTop: 15, width: '100%' }} >
					<Label title="Promotion End Date" textalign="left" mb={5} status="basic" fontsize={16} />
					<DateSelect name="endDate" value={state.endDate} onChange={handleInputChange} bg={errors.endDate ? '#ffe6e6' : '#f2f2f2'} />
					{errors.endDate && <Text style={[styles.error]}>{errors.endDate}</Text>}
				</View>
				
                <View style={{ marginTop: 15 }} />
                <InputLabel label="Promotion Location (Optional)" name="addressOne" value={state.addressOne} onChange={handleInputChange} placeholder="Address line 1" status="basic" bg="#f2f2f2" />
                <View style={{ marginTop: 5 }} />
                <InputOnly name="addressTwo" value={state.addressTwo} onChange={handleInputChange} placeholder="Address line 2" bg="#f2f2f2" />
                <View style={{ marginTop: 5 }} />
                <InputOnly name="city" value={state.city} onChange={handleInputChange} placeholder="City" bg="#f2f2f2" />
                <View style={{ marginTop: 5 }} />
                <InputOnly name="province" value={state.province} onChange={handleInputChange} placeholder="Province" bg="#f2f2f2" />
                <View style={{ marginTop: 5 }} />
                <InputZip name="zipCode" value={state.zipCode} onChange={handleInputChange} placeholder="ZIP Code" bg="#f2f2f2" />
                <ButtonPrimary name="Upload Promotion" width="100%" marginTop={25} onpress={validateForm}/>
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

export default Add;