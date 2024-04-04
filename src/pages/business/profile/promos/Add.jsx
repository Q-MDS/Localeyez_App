import React, { useState, useEffect } from 'react';
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

const sectors = ['Select...', 'Shopping', 'Travel', 'Health & Wellness', 'Entertainment', 'Education & Employment', 'Property', 'Services', 'Community'];

const Add = (props) => 
{
	const [businessId, setBusinessId] = useState('');
	const [token, setToken] = useState('');
    const [promoStartDate, setPromoStartDate] = React.useState('');
    const [promoEndDate, setPromoEndDate] = React.useState('');
	const [sector, setSector] = useState('');
	const [displayImage, setDisplayImage] = useState(null);
	const [promoTitle, setPromoTitle] = useState('');
	const [promoCaption, setPromoCaption] = useState('');
	const [promoDescription, setPromoDescription] = useState('');
	const [price, setPrice] = useState('');
	const [saleItemOP, setSaleItemOP] = useState('');
	const [saleItemMP, setSaleItemMP] = useState('');
	const [address1, setAddress1] = useState('');
	const [address2, setAddress2] = useState('');
	const [city, setCity] = useState('');
	const [province, setProvince] = useState('');
	const [zipCode, setZipCode] = useState('');

	const getBusniessId = async () => 
	{
		const id = await DbUtils.getItem('business_id');
		
		setBusinessId(id);
	}

	const getToken = async () => 
	{
		const token = await DbUtils.getItem('token');
		
		setToken(token);
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
				setDisplayImage(response.assets[0].uri);
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
			businessId: businessId,
            sector: sector,
            diaplyImage: displayImage,
            title: promoTitle,
            caption: promoCaption,
            description: promoDescription,
            price: price,
            saleItemOp: saleItemOP, 
            saleItemMp: saleItemMP, 
            startDate: promoStartDate,
            endDate: promoEndDate,   
            locAddOne: address1,   
            locAddTwo: address2,   
            locCity: city,   
            locProvince: province,   
            locZipCode: zipCode,   
            created: new Date().toLocaleDateString()
        }];
        let stringified = JSON.stringify(promotionData);
        // await DbUtils.setItem('promotions', stringified);
		addData(promotionData);

		// Send to server
		try 
		{
			const res = await addPromotion(token, promotionData);
			
			props.navigation.navigate('BusProfProHome');
		} 
		catch (error) 
		{
			// console.error("XXX", error);
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

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavArrowTitle title="Add Promotion" alignment="start" navigation={props.navigation} goBackTo="BusProProAddEditBack" />
        <DividerTop />
        <ScrollView>
            <Layout style={[MainStyles.layout_container, {backgroundColor: '#fff'}]}>
                <TitleFour title="Choose which business sector(s) your promotion falls under:" />
				<SelectSingle options={sectors} onSelect={handleSector} />
                <TitleFour title="Upload Display Picture" mb={10} />
				<TouchableOpacity onPress={chooseDisplayImage} style={{ width: '100%' }}>
					<Layout style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: '#b8b7c8', borderWidth: 1, borderRadius: 10, padding: 20 }} >
						<Icon name="upload-outline" fill="#B2AEDB" style={{ width: 48, height: 48 }} />
						<TextTwo title="Add an image for the banner of your promotion" textalign="center" fontsize={13} mb={10} />
						<TextTwo title="Image specification 640 x 360px" textalign="center" fontsize={12} />
						<TextTwo title="Image size: max 5MB" textalign="center" fontsize={12} />
						{displayImage && <Image source={{ uri: displayImage }} style={{ width: '100%', height: 200, marginTop: 15, borderRadius: 8 }} onLoadStart={() => console.log('Loading image...')} onLoad={() => console.log('Image loaded')} onError={(error) => console.log('Error loading image', error)} />}
					</Layout>
				</TouchableOpacity>
                <View style={{ marginTop: 15 }} />
                <InputLabel label="Promotion Title" value={promoTitle} setValue={setPromoTitle} placeholder="Write product name" />
                <View style={{ marginTop: 15 }} />
                <InputMultiline label="Promotion Caption" value={promoCaption} setValue={setPromoCaption} placeholder="Write a description up to 120 characters" />
                <View style={{ marginTop: 15 }} />
                <InputMultiline label="Promotion Description" value={promoDescription} setValue={setPromoDescription} placeholder="Write a longer description of the promotion up to 500 characters" />
                <View style={{ marginTop: 15 }} />
                <InputLabel label="Price" value={price} setValue={setPrice} placeholder="Write product price" />
                <View style={{ marginTop: 15 }} />
                <InputLabel label="Sale Item (Optional)" value={saleItemOP} setValue={setSaleItemOP} placeholder="Original price" />
                <InputLabel mt={5} value={saleItemMP} setValue={setSaleItemMP} placeholder="Marked down price" />
                <View style={{ marginTop: 15 }} />
                <TitleFour title="Promotion Start Date" mb={10} />
                <DateSelect value={promoStartDate} setDate={setPromoStartDate} />
                <View style={{ marginTop: 15 }} />
                <TitleFour title="Promotion End Date" mb={10} />
                <DateSelect value={promoEndDate} setDate={setPromoEndDate} />
                <View style={{ marginTop: 15 }} />
                <InputLabel placeholder="Address line 1" value={address1} setValue={setAddress1} label="Promotion Location (Optional)" />
                <View style={{ marginTop: 5 }} />
                <InputLabel placeholder="Address line 2" value={address2} setValue={setAddress2} />
                <View style={{ marginTop: 5 }} />
                <InputLabel placeholder="City" value={city} setValue={setCity} />
                <View style={{ marginTop: 5 }} />
                <InputLabel placeholder="Province" value={province} setValue={setProvince} />
                <View style={{ marginTop: 5 }} />
                <InputLabel placeholder="ZIP Code" value={zipCode} setValue={setZipCode} />
                <ButtonPrimary name="Upload Promotion" width="100%" marginTop={25} onpress={handleUpload}/>
            </Layout>
        </ScrollView>


      </SafeAreaView>
    );
};

export default Add;