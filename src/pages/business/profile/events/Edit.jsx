import React, { useState, useEffect, useReducer } from 'react';
import DbUtils from '../../../../services/DbUtils';
import { launchImageLibrary } from 'react-native-image-picker';
import { updEvent } from '../../../../services/api_helper';
import { updEventImage } from '../../../../services/api_upload';
import Toast from 'react-native-toast-message';
import MainStyles from '../../../../assets/styles/MainStyles';
import { TopNavBackTitleIcon } from '../../../../components/TopNavBackTitleIcon';
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity, BackHandler, ActivityIndicator } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';
import DividerTop from '../../../../components/DividerTop';
import { TitleFour } from '../../../../components/TitleFour';
import { InputLabel } from '../../../../components/InputLabel';
import TextTwo from '../../../../components/TextTwo';
import { InputMultiline } from '../../../../components/InputMultiline';
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
	startDate: null,
	endDate: null,
	startTime: null,
	endTime: null,
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
	  case 'EDIT_EVENT':
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

const data = [
    { label: '00:00', value: '00:00' },
    { label: '01:00', value: '01:00' },
    { label: '02:00', value: '02:00' },
    { label: '03:00', value: '03:00' },
    { label: '04:00', value: '04:00' },
    { label: '05:00', value: '05:00' },
    { label: '06:00', value: '06:00' },
    { label: '07:00', value: '07:00' },
    { label: '08:00', value: '08:00' },
    { label: '09:00', value: '09:00' },
    { label: '10:00', value: '10:00' },
    { label: '11:00', value: '11:00' },
    { label: '12:00', value: '12:00' },
    { label: '13:00', value: '13:00' },
    { label: '14:00', value: '14:00' },
    { label: '15:00', value: '15:00' },
    { label: '16:00', value: '16:00' },
    { label: '17:00', value: '17:00' },
    { label: '18:00', value: '18:00' },
    { label: '19:00', value: '19:00' },
    { label: '20:00', value: '20:00' },
    { label: '21:00', value: '21:00' },
    { label: '22:00', value: '22:00' },
    { label: '23:00', value: '23:00' },
  ];

const Add = (props) => 
{
	const [state, dispatch] = useReducer(reducer, initialState);

	const [remoteId, setRemoteId] = useState('');
	const [businessId, setBusinessId] = useState('');
	const [token, setToken] = useState('');
	const [isUploading, setIsUploading] = useState(false);
	const [isNewPic, setIsNewPic] = useState(false);
	const [imageType, setImageType] = useState('');
	const [base64Data, setBase64Data] = useState('');

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'EDIT_EVENT',
			payload: {...state, [name]: newValue}
		});
	}

	const getEvents = async () => 
	{
		const data = await DbUtils.getItem('events');
		const parsedData = JSON.parse(data);
		
		showEvent(parsedData[props.route.params.id]);
	}

	const getToken = async () => 
	{
		const token = await DbUtils.getItem('token');
		
		setToken(JSON.parse(token));
	}

	const showEvent = (record) => 
	{
		setRemoteId(record.id);
		setBusinessId(record.business_id);

		dispatch(
		{
			type: 'EDIT_EVENT',
			payload: 
			{
				sector: record.sector,
				displayImage: record.display_image,
				title: record.event_title,
				caption: record.event_caption,
				desc: record.event_desc,
				startDate: record.start_date ? new Date(record.start_date) : null,
				endDate: record.end_date ? new Date(record.end_date) : null,
				startTime: record.start_time,
				endTime: record.end_time,
				addressOne: record.loc_add_one,
				addressTwo: record.loc_add_two,
				city: record.loc_city,
				province: record.loc_province,
				zipCode: record.loc_zip_code,
			},
		});
	}

	useEffect(() => 
	{
		const fetchEvents = async () => 
		{
			await getToken();
			await getEvents();
		};

		fetchEvents();
	}, [])

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
			}
		});
	};

	const uploadFile = async (eventId) => 
	{
		const formData = new FormData();
		formData.append('business_id', businessId);
		formData.append('event_id', eventId);
		formData.append('image_type', imageType);
		formData.append('image', base64Data);

	  try 
	  {
		  const response = await updEventImage(token, formData);
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

		const eventData = [{
			updateId: remoteId,
			sector: state.sector,
			display_image: state.displayImage,
			event_title: state.title,
			event_caption: state.caption,
			event_desc: state.desc,
			start_date: state.startDate,
			end_date: state.endDate,   
			start_time: state.startTime,   
			end_time: state.endTime,   
			loc_add_one: state.addressOne,
			loc_add_two: state.addressTwo,   
			loc_city: state.city,   
			loc_province: state.province,   
			loc_zip_code: state.zipCode,   
			updated: new Date().toLocaleDateString()
		}];
		let record = JSON.stringify(eventData);

		try 
		{
			const res = await updEvent(token, record);
			
			if (res.status)
			{
				let fileUrl = state.displayImage;
				if (isNewPic)
				{
					fileUrl = await uploadFile(remoteId);
				}

				const data = await DbUtils.getItem('events');
				const parsedData = JSON.parse(data);
			
				// Update the record at the specified index
				const updatedData = parsedData.map((record, index) => 
				{
					if (index === Number(props.route.params.id)) 
					{
						// This is the record to update
						return {
						...record,
						display_image: fileUrl,
						event_title: state.title,
						event_caption: state.caption,
						event_desc: state.desc,
						start_date: state.startDate,
						end_date: state.endDate,
						start_time: state.startTime,
						end_ime: state.endTime,
						loc_add_one: state.addressOne,
						loc_add_two: state.addressTwo,
						loc_city: state.city,
						loc_province: state.province,
						loc_zip_code: state.zipCode,
						};
					} 
					else 
					{
						// This is not the record to update, so return it as is
						return record;
					}
				});

				await DbUtils.setItem('events', JSON.stringify(updatedData));

				setIsUploading(false);

				props.navigation.navigate('BusProfProHome');
			}
		} 
		catch(error) 
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

		// Get the current array of records
		// const data = await DbUtils.getItem('events');
		// const parsedData = JSON.parse(data);
	  
		// // Update the record at the specified index
		// const updatedData = parsedData.map((record, index) => {
		//   if (index === Number(props.route.params.id)) {
		// 	// This is the record to update
		// 	return {
		// 	  ...record,
		// 	  display_image: state.displayImage,
		// 	  event_title: state.title,
		// 	  event_caption: state.caption,
		// 	  event_desc: state.desc,
		// 	  start_date: state.startDate,
		// 	  end_date: state.endDate,
		// 	  start_time: state.startTime,
		// 	  end_ime: state.endTime,
		// 	  loc_add_one: state.addressOne,
		// 	  loc_add_two: state.addressTwo,
		// 	  loc_city: state.city,
		// 	  loc_province: state.province,
		// 	  loc_zip_code: state.zipCode,
		// 	};
		//   } 
		//   else 
		//   {
		// 	// This is not the record to update, so return it as is
		// 	return record;
		//   }
		// });
	  
		// Save the updated array back to async-storage
		// await DbUtils.setItem('events', JSON.stringify(updatedData));

		// Send to server
		// try 
		// {
		// 	const eventData = [{
		// 		updateId: remoteId,
		// 		sector: state.sector,
		// 		display_image: state.displayImage,
		// 		event_title: state.title,
		// 		event_caption: state.caption,
		// 		event_desc: state.desc,
		// 		start_date: state.startDate,
		// 		end_date: state.endDate,   
		// 		start_time: state.startTime,   
		// 		end_time: state.endTime,   
		// 		loc_add_one: state.addressOne,
		// 		loc_add_two: state.addressTwo,   
		// 		loc_city: state.city,   
		// 		loc_province: state.province,   
		// 		loc_zip_code: state.zipCode,   
		// 		updated: new Date().toLocaleDateString()
		// 	}];
		// 	let record = JSON.stringify(eventData);

			// const res = await updEvent(token, record);
			// console.log('Update promotion result: ', res);
		// } 
		// catch (error) 
		// {
		// 	console.error("XXX", error);
		// 	Toast.show({
		// 		type: 'error',
		// 		position: 'bottom',
		// 		text1: 'There was an error uploading the promotion',
		// 		text2: 'Please try again.',
		// 		visibilityTime: 4000,
		// 		autoHide: true,
		// 		topOffset: 30,
		// 		bottomOffset: 40,
		// 	});
		// }
        // props.navigation.navigate('BusProfProHome');
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* <TopNavArrowTitle title="Add Promotion" alignment="start" navigation={props.navigation} /> */}
        <TopNavBackTitleIcon title="Edit Event" alignment="start" navigation={props.navigation} goBackTo="BusProProAddEditBack" goDelete="BusProfEvtDelete" deleteId={remoteId} />
        <DividerTop />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, {backgroundColor: '#fff'}]}>
					<TitleFour title="Choose which business sector(s) your event falls under:" status="primary" />
					<View style={{ flex: 1, width: '100%' }} >
						<DropdownSingle name="sector" data={sectors} value={state.sector} onChange={handleInputChange} />
					</View>
                    <TitleFour title="Edit Event Display Image" mb={10} status="primary" />

					<TouchableOpacity onPress={chooseDisplayImage} style={{ width: '100%' }}>
						<Layout style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: '#b8b7c8', borderWidth: 1, borderRadius: 10, padding: 20 }} >
							<Icon name="upload-outline" fill="#B2AEDB" style={{ width: 48, height: 48 }} />
							<TextTwo title="Add an image for the banner of your promotion" textalign="center" fontsize={13} mb={10} status="basic" />
							<TextTwo title="Image specification 640 x 360px" textalign="center" fontsize={12} status="basic" />
							<TextTwo title="Image size: max 5MB" textalign="center" fontsize={12} status="basic" />
							{state.displayImage && <Image source={{ uri: state.displayImage }} style={{ width: '100%', height: 200, marginTop: 15, borderRadius: 8 }} onLoadStart={() => console.log('Loading image...')} onLoad={() => console.log('Image loaded')} onError={(error) => console.log('Error loading image', error)} />}
						</Layout>
					</TouchableOpacity>
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Event Title" name="title" value={state.title} onChange={handleInputChange} status="basic" placeholder="Skin Care Opening" />
                    <View style={{ marginTop: 15 }} />
                    <InputMultiline label="Event Caption" name="caption" value={state.caption} onChange={handleInputChange} status="basic" placeholder="Write a caption for the event" />
                    <View style={{ marginTop: 15 }} />
                    <InputMultiline label="Event Description" name="desc" value={state.desc} onChange={handleInputChange} status="basic" placeholder="Write a description for the event" />
                    <View style={{ marginTop: 15 }} />
					<Label title="Event Start Date" textalign="left" mb={5} status="basic" fontsize={13} />
                    <DateSelect name="startDate" value={state.startDate} onChange={handleInputChange} />
                    <View style={{ marginTop: 15 }} />
					<Label title="Event Start Date" textalign="left" mb={5} status="basic" fontsize={13} />
                    <DateSelect name="endDate" value={state.endDate} onChange={handleInputChange} />
                    <View style={{ marginTop: 15 }} />
					<Label title="Event Time" textalign="left" mb={5} status="basic" fontsize={13} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <TextTwo title="Starts:&nbsp;&nbsp;" fontsize={12} width={60} status="basic" />
                        <DropdownSingle name="startTime" data={data} value={state.startTime} onChange={handleInputChange} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <TextTwo title="Ends:&nbsp;&nbsp;" fontsize={12} width={60} status="basic" />
                        <DropdownSingle name="endTime" data={data} value={state.endTime} onChange={handleInputChange} />
                    </View>
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Event Location (Optional)" name="addressOne" value={state.addressOne} onChange={handleInputChange} status="basic" placeholder="Address 1" />
                    <View style={{ marginTop: 5 }} />
                    <InputOnly name="addressTwo" value={state.addressTwo} onChange={handleInputChange}  placeholder="Address 2" />
                    <View style={{ marginTop: 5 }} />
                    <InputOnly name="city" value={state.city} onChange={handleInputChange}  placeholder="City" />
                    <View style={{ marginTop: 5 }} />
                    <InputOnly name="province" value={state.province} onChange={handleInputChange}  placeholder="Province" />
                    <View style={{ marginTop: 5 }} />
                    <InputZip name="zipCode" value={state.zipCode} onChange={handleInputChange}  placeholder="Zip code" />
                    <ButtonPrimary name="Submit Changes" width="100%" marginTop={25} onpress={handleSubmit}/>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Add;