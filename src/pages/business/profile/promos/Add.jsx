import React, { useState, useEffect, useReducer } from 'react';
import DbUtils from '../../../../services/DbUtils';
import Toast from 'react-native-toast-message';
import { addPromotion } from '../../../../services/api_helper';
import { launchImageLibrary } from 'react-native-image-picker';
import MainStyles from '../../../../assets/styles/MainStyles';
import { TopNavArrowTitle } from '../../../../components/TopNavArrowTitle';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';
import DividerTop from '../../../../components/DividerTop';
import { TitleFour } from '../../../../components/TitleFour';
import { SelectSingle } from '../../../../components/SelectSingle';
import { InputLabel } from '../../../../components/InputLabel';
import TextTwo from '../../../../components/TextTwo';
import { InputMultiline } from '../../../../components/InputMultiline';
import { DateSelect } from '../../../../components/DateSelect';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import DropdownSingle from '../../../../components/DropdownSingle';

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
    // const [promoStartDate, setPromoStartDate] = React.useState('');
    // const [promoEndDate, setPromoEndDate] = React.useState('');
	// const [sector, setSector] = useState('');
	// const [displayImage, setDisplayImage] = useState(null);
	// const [promoTitle, setPromoTitle] = useState('');
	// const [promoCaption, setPromoCaption] = useState('');
	// const [promoDescription, setPromoDescription] = useState('');
	// const [price, setPrice] = useState('');
	// const [saleItemOP, setSaleItemOP] = useState('');
	// const [saleItemMP, setSaleItemMP] = useState('');
	// const [address1, setAddress1] = useState('');
	// const [address2, setAddress2] = useState('');
	// const [city, setCity] = useState('');
	// const [province, setProvince] = useState('');
	// const [zipCode, setZipCode] = useState('');

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
				handleInputChange('displayImage', response.assets[0].uri);
			}
		});
	};

	const handleSector = (sector) => 
	{
		setSector(sector);
	};

    const handleUpload = async () => 
    {
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
				console.log('Promotion uploaded successfully', insertId);
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

		const record = [{
			id: insertId,
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
        
		addData(record);

		props.navigation.navigate('BusProfProHome');
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

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavArrowTitle title="Add Promotion" alignment="start" navigation={props.navigation} goBackTo="BusProProAddEditBack" />
        <DividerTop />
        <ScrollView>
            <Layout style={[MainStyles.layout_container, {backgroundColor: '#fff'}]}>
                <TitleFour title="Choose which business sector(s) your promotion falls under:" />
				<View style={{ flex: 1, width: '100%' }} >
						<DropdownSingle name="sector" data={sectors} value={state.sector} onChange={handleInputChange} />
					</View>
				{/* <SelectSingle options={sectors} onSelect={handleSector} /> */}
                <TitleFour title="Upload Display Picture" mb={10} />
				<TouchableOpacity onPress={chooseDisplayImage} style={{ width: '100%' }}>
					<Layout style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: '#b8b7c8', borderWidth: 1, borderRadius: 10, padding: 20 }} >
						<Icon name="upload-outline" fill="#B2AEDB" style={{ width: 48, height: 48 }} />
						<TextTwo title="Add an image for the banner of your promotion" textalign="center" fontsize={13} mb={10} />
						<TextTwo title="Image specification 640 x 360px" textalign="center" fontsize={12} />
						<TextTwo title="Image size: max 5MB" textalign="center" fontsize={12} />
						{state.displayImage && <Image source={{ uri: state.displayImage }} style={{ width: '100%', height: 200, marginTop: 15, borderRadius: 8 }} onLoadStart={() => console.log('Loading image...')} onLoad={() => console.log('Image loaded')} onError={(error) => console.log('Error loading image', error)} />}
					</Layout>
				</TouchableOpacity>
                <View style={{ marginTop: 15 }} />
                <InputLabel label="Promotion Title" name="title" value={state.title} onChange={handleInputChange} placeholder="Write product name" />
                <View style={{ marginTop: 15 }} />
                <InputMultiline label="Promotion Caption" name="caption" value={state.caption} onChange={handleInputChange} placeholder="Write a description up to 120 characters" />
                <View style={{ marginTop: 15 }} />
                <InputMultiline label="Promotion Description" name="desc" value={state.desc} onChange={handleInputChange} placeholder="Write a longer description of the promotion up to 500 characters" />
                <View style={{ marginTop: 15 }} />
                <InputLabel label="Price" name="price" value={state.price} onChange={handleInputChange} placeholder="Write product price" />
                <View style={{ marginTop: 15 }} />
                <InputLabel label="Sale Item (Optional)" name="saleItemOp" value={state.saleItemOp} onChange={handleInputChange} placeholder="Original price" />
                <InputLabel name="saleItemMp" value={state.saleItemMp} onChange={handleInputChange} placeholder="Marked down price" mt={5} />
                <View style={{ marginTop: 15 }} />
                <TitleFour title="Promotion Start Date" mb={10} />
                <DateSelect name="startDate" value={state.startDate} onChange={handleInputChange} />
                <View style={{ marginTop: 15 }} />
                <TitleFour title="Promotion End Date" mb={10} />
                <DateSelect name="endDate" value={state.endDate} onChange={handleInputChange} />
                <View style={{ marginTop: 15 }} />
                <InputLabel label="Promotion Location (Optional)" name="addressOne" value={state.addressOne} onChange={handleInputChange} placeholder="Address line 1" />
                <View style={{ marginTop: 5 }} />
                <InputLabel name="addressTwo" value={state.addressTwo} onChange={handleInputChange} placeholder="Address line 2" />
                <View style={{ marginTop: 5 }} />
                <InputLabel name="city" value={state.city} onChange={handleInputChange} placeholder="City" />
                <View style={{ marginTop: 5 }} />
                <InputLabel name="province" value={state.province} onChange={handleInputChange} placeholder="Province" />
                <View style={{ marginTop: 5 }} />
                <InputLabel name="zipCode" value={state.zipCode} onChange={handleInputChange} placeholder="ZIP Code" />
                <ButtonPrimary name="Upload Promotion" width="100%" marginTop={25} onpress={handleUpload}/>
            </Layout>
        </ScrollView>


      </SafeAreaView>
    );
};

export default Add;