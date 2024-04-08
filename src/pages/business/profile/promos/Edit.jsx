import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import DbUtils from '../../../../services/DbUtils';
import { updPromotion } from '../../../../services/api_helper';
import Toast from 'react-native-toast-message';
import MainStyles from '../../../../assets/styles/MainStyles';
import { TopNavBackTitleIcon } from '../../../../components/TopNavBackTitleIcon';
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';
import DividerTop from '../../../../components/DividerTop';
import TextTwo from '../../../../components/TextTwo';
import { TitleFour } from '../../../../components/TitleFour';
import { InputLabel } from '../../../../components/InputLabel';
import { InputMultiline } from '../../../../components/InputMultiline';
import { DateSelect } from '../../../../components/DateSelect';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';

const Edit = (props) => 
{
    const today = new Date();
    const fiveDaysFromNow = new Date();
    fiveDaysFromNow.setDate(today.getDate() + 5);
	const [remoteId, setRemoteId] = useState('');
	const [businessId, setBusinessId] = useState('');
	const [token, setToken] = useState('');
	const [sector, setSector] = useState('');
	const [displayImage, setDisplayImage] = useState(null);
	const [promoTitle, setPromoTitle] = useState('');
	const [promoCaption, setPromoCaption] = useState('');
	const [promoDesc, setPromoDesc] = useState('');
	const [promoPrice, setPromoPrice] = useState('');
	const [promoSiOp, setPromoSiOp] = useState('');
	const [promoSiMp, setPromoSiMp] = useState('');
    const [promoStartDate, setPromoStartDate] = React.useState(new Date());
    const [promoEndDate, setPromoEndDate] = React.useState(fiveDaysFromNow);
	const [promoLocAdd1, setPromoLocAdd1] = useState('');
	const [promoLocAdd2, setPromoLocAdd2] = useState('');
	const [promoLocCity, setPromoLocCity] = useState('');
	const [promoLocProvince, setPromoLocProvince] = useState('');
	const [promoLocZipCode, setPromoLocZipCode] = useState('');

	console.log('Edit promo for id :: ', props.route.params.id);

	const getPromotions = async () => 
	{
		const data = await DbUtils.getItem('promotions');
		const parsedData = JSON.parse(data);
		console.log('Parsed Data :xxx: ', parsedData);
		showPromotion(parsedData[props.route.params.id]);
	}

	const getToken = async () => 
	{
		const token = await DbUtils.getItem('token');
		
		setToken(token);
	}

	const showPromotion = (record) => 
	{
		setRemoteId(record.remoteId);
		setBusinessId(record.businessId);
		setSector(record.sector);
		setDisplayImage(record.diaplyImage);
		setPromoTitle(record.title);
		setPromoCaption(record.caption);
		setPromoDesc(record.description);
		setPromoPrice(record.price);
		setPromoSiOp(record.saleItemOp);
		setPromoSiMp(record.saleItemMp);
		let st = new Date(record.startDate).getTime();
		let et = new Date(record.endDate).getTime();
		setPromoStartDate(st);
		setPromoEndDate(et);
		setPromoLocAdd1(record.locAddOne);
		setPromoLocAdd2(record.locAddTwo);
		setPromoLocCity(record.locCity);
		setPromoLocProvince(record.locProvince);
		setPromoLocZipCode(record.locZipCode);
	}

	useEffect(() => 
	{
		const fetchPromotions = async () => 
		{
			await getPromotions();
			await getToken();
		};

		fetchPromotions();
	}, [])

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

    const handleSubmit = async () => 
    {
		// Get the current array of records
		const data = await DbUtils.getItem('promotions');
		const parsedData = JSON.parse(data);
	  
		// Update the record at the specified index
		const updatedData = parsedData.map((record, index) => {
		  if (index === Number(props.route.params.id)) {
			// This is the record to update
			return {
			  ...record,
			  diaplyImage: displayImage,
			  title: promoTitle,
			  caption: promoCaption,
			  description: promoDesc,
			  price: promoPrice,
			  saleItemOp: promoSiOp,
			  saleItemMp: promoSiMp,
			  startDate: promoStartDate,
			  endDate: promoEndDate,
			  locAddOne: promoLocAdd1,
			  locAddTwo: promoLocAdd2,
			  locCity: promoLocCity,
			  locProvince: promoLocProvince,
			  locZipCode: promoLocZipCode,
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

		// Send to server
		try 
		{
			const promotionData = [{
				updateId: remoteId,
				businessId: businessId,
				sector: sector,
				displayImage: displayImage,
				title: promoTitle,
				caption: promoCaption,
				description: promoDesc,
				price: promoPrice,
				saleItemOp: promoSiOp, 
				saleItemMp: promoSiMp, 
				startDate: promoStartDate,
				endDate: promoEndDate,   
				locAddOne: promoLocAdd1,   
				locAddTwo: promoLocAdd2,   
				locCity: promoLocCity,   
				locProvince: promoLocProvince,   
				locZipCode: promoLocZipCode,   
				updated: new Date().toLocaleDateString()
			}];
			let record = JSON.stringify(promotionData);

			const res = await updPromotion(token, record);
			console.log('Fuck joe biden: ', res);
			// props.navigation.navigate('BusProfProHome');
		} 
		catch (error) 
		{
			console.error("XXX", error);
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

        props.navigation.navigate('BusProfProHome');
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* <TopNavArrowTitle title="Add Promotion" alignment="start" navigation={props.navigation} /> */}
        <TopNavBackTitleIcon title="Edit Promotion" alignment="start" navigation={props.navigation} goBackTo="BusProProAddEditBack" goDelete="BusProfProDelete" />
        <DividerTop />
        <ScrollView>
            <Layout style={[MainStyles.layout_container, {backgroundColor: '#fff'}]}>
                <TitleFour title="Edit Promotion Display Image" mb={10} />


				<TouchableOpacity onPress={chooseDisplayImage} style={{ width: '100%' }}>
					<Layout style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: '#b8b7c8', borderWidth: 1, borderRadius: 10, padding: 20 }} >
						<Icon name="upload-outline" fill="#B2AEDB" style={{ width: 48, height: 48 }} />
						<TextTwo title="Add an image for the banner of your promotion" textalign="center" fontsize={13} mb={10} />
						<TextTwo title="Image specification 640 x 360px" textalign="center" fontsize={12} />
						<TextTwo title="Image size: max 5MB" textalign="center" fontsize={12} />
						{displayImage && <Image source={{ uri: displayImage }} style={{ width: '100%', height: 200, marginTop: 15, borderRadius: 8 }} onLoadStart={() => console.log('Loading image...')} onLoad={() => console.log('Image loaded')} onError={(error) => console.log('Error loading image', error)} />}
					</Layout>
				</TouchableOpacity>


                {/* <Layout style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', borderRadius: 10, height: 200 }} >
                    <View style={{ position: 'absolute', top: 15, right: 15, width: 36, height: 36, backgroundColor: '#1E1C4E', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                        <Icon name="edit-2-outline" fill="#fff" style={{ width: 24, height: 24 }} />
                    </View>
                    <Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 64, height: 64 }} />
                </Layout> */}



                <View style={{ marginTop: 15 }} />
                <InputLabel label="Promotion Title" value={promoTitle} setValue={setPromoTitle} placeholder="Cake Sale!" />
                <View style={{ marginTop: 15 }} />
                <InputMultiline label="Promotion Caption" value={promoCaption} setValue={setPromoCaption} placeholder="Write a caption" />
                <View style={{ marginTop: 15 }} />
                <InputMultiline label="Promotion Description" value={promoDesc} setValue={setPromoDesc} placeholder="Write a description" />
                <View style={{ marginTop: 15 }} />
                <InputLabel label="Price" value={promoPrice} setValue={setPromoPrice} placeholder="$200" />
                <View style={{ marginTop: 15 }} />
                <InputLabel label="Sale Item (Optional)" value={promoSiOp} setValue={setPromoSiOp} placeholder="$300" />
                <InputLabel mt={5} value={promoSiMp} setValue={setPromoSiMp} placeholder="$200" />
                <View style={{ marginTop: 15 }} />
                <TitleFour title="Promotion Start Date" mb={10} />
                <DateSelect value={promoStartDate} setDate={setPromoStartDate} />
                <View style={{ marginTop: 15 }} />
                <TitleFour title="Promotion End Date" mb={10} />
                <DateSelect value={promoEndDate} setDate={setPromoEndDate} />
                <View style={{ marginTop: 15 }} />
                <InputLabel label="Promotion Location (Optional)" value={promoLocAdd1} setValue={setPromoLocAdd1} placeholder="18 Street" />
                <View style={{ marginTop: 5 }} />
                <InputLabel value={promoLocAdd2} setValue={setPromoLocAdd2} placeholder="Suburb" />
                <View style={{ marginTop: 5 }} />
                <InputLabel value={promoLocCity} setValue={setPromoLocCity} placeholder="Cape Town" />
                <View style={{ marginTop: 5 }} />
                <InputLabel value={promoLocProvince} setValue={setPromoLocProvince} placeholder="Western Cape" />
                <View style={{ marginTop: 5 }} />
                <InputLabel value={promoLocZipCode} setValue={setPromoLocZipCode} placeholder="9901" />
                <ButtonPrimary name="Submit Changes" width="100%" marginTop={25} onpress={handleSubmit}/>
            </Layout>
        </ScrollView>


      </SafeAreaView>
    );
};

export default Edit;