import React, { useState, useEffect, useReducer} from 'react';
import DbUtils from '../../../../services/DbUtils';
import Toast from 'react-native-toast-message';
import { addEvent } from '../../../../services/api_helper';
import { eventImage } from '../../../../services/api_upload';
import MainStyles from '../../../../assets/styles/MainStyles';
import { launchImageLibrary } from 'react-native-image-picker';
import { TopNavArrowTitle } from '../../../../components/TopNavArrowTitle';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image, BackHandler, ActivityIndicator } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';
import DividerTop from '../../../../components/DividerTop';
import { TitleFour } from '../../../../components/TitleFour';
import { InputLabel } from '../../../../components/InputLabel';
import TextTwo from '../../../../components/TextTwo';
import { InputMultiline } from '../../../../components/InputMultiline';
import { DateSelect } from '../../../../components/DateSelect';
import { TimeSelect } from '../../../../components/TimeSelect';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import DropdownSingle from '../../../../components/DropdownSingle';

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
	  case 'ADD_EVENT':
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

	const [businessId, setBusinessId] = useState('');
	const [token, setToken] = useState('');
	const [isUploading, setIsUploading] = useState(false);
	const [imageType, setImageType] = useState('');
	const [base64Data, setBase64Data] = useState('');

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'ADD_EVENT',
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

	const uploadFile = async (eventId) => 
	{
		const formData = new FormData();
		formData.append('business_id', businessId);
		formData.append('event_id', eventId);
		formData.append('image_type', imageType);
		formData.append('image', base64Data);

		try 
		{
			const response = await eventImage(token, formData);
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

	// const handleSector = (sector) => 
	// {
	// 	setSector(sector);
	// };

	// const handleStartTime = (time) => 
	// {
	// 	setEventStartTime(time);
	// };

	// const handleEndTime = (time) => 
	// {
	// 	setEventEndTime(time);
	// };

	const handleUpload = async () => 
    {
		setIsUploading(true);

		const eventData = [{
			business_id: businessId,
            sector: state.sector,
            display_image: state.displayImage,
            event_title: state.title,
            event_caption: state.caption,
            event_description: state.desc,
            start_date: state.startDate,
            end_date: state.endDate,   
            start_time: state.startTime,
            end_time: state.endTime,   
            loc_add_one: state.addressOne,   
            loc_add_two: state.addressTwo,   
            loc_city: state.city,   
            loc_province: state.province,   
            loc_zip_code: state.zipCode,   
            created: new Date().toLocaleDateString()
        }];
        let stringified = JSON.stringify(eventData);
        
		// Send to server
		let insertId = 0;
		try 
		{
			const res = await addEvent(token, eventData);
			
			if (res.status)
			{
				insertId = res.data;

				// Use id and bus id to upload the image: UPLOAD
				const fileUrl = await uploadFile(insertId);

				const record = [{
					id: insertId,
					business_id: businessId,
					sector: state.sector,
					display_image: fileUrl,
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
					created: new Date().toLocaleDateString()
				}];
				
				addData(record);

				setIsUploading(false);
		
				props.navigation.navigate('BusProfProHome');

				console.log('Event uploaded successfully', insertId);
			}
		} 
		catch (error) 
		{
			Toast.show({
				type: 'error',
				position: 'bottom',
				text1: 'There was an error uploading the event',
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
			const jsonValue = await DbUtils.getItem('events');
			let parsedValue = jsonValue != null ? JSON.parse(jsonValue) : [];
			let currentArray = Array.isArray(parsedValue) ? parsedValue : [];
			const updatedArray = [...currentArray, ...newArray];
			
			await DbUtils.setItem('events', JSON.stringify(updatedArray));
		} 
		catch(e) 
		{
		  console.log(e);
		}
	}

	useEffect(() => 
	{
		const backAction = () => 
		{
			console.log('Back action');
			props.navigation.navigate('BusProfEvtAddEditBack');
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
      	<SafeAreaView style={{ flex: 1 }}>
		<TopNavArrowTitle title="Add Event" alignment="start" navigation={props.navigation} goBackTo="BusProfEvtAddEditBack" />
        <DividerTop />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, {backgroundColor: '#fff'}]}>
                    <TitleFour title="Choose which business sector(s) your event falls under:" />
					<View style={{ flex: 1, width: '100%' }} >
						<DropdownSingle name="sector" data={sectors} value={state.sector} onChange={handleInputChange} />
					</View>
                    <TitleFour title="Upload Display Picture" mb={10} />
					<TouchableOpacity onPress={chooseDisplayImage} style={{ width: '100%' }}>
						<Layout style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: '#b8b7c8', borderWidth: 1, borderRadius: 10, padding: 20 }} >
							<Icon name="upload-outline" fill="#B2AEDB" style={{ width: 48, height: 48 }} />
							<TextTwo title="Add an image for the banner of your event" textalign="center" fontsize={13} mb={10} />
							<TextTwo title="Image specification 640 x 360px" textalign="center" fontsize={12} />
							<TextTwo title="Image size: max 5MB" textalign="center" fontsize={12} />
							{state.displayImage && <Image source={{ uri: state.displayImage }} style={{ width: '100%', height: 200, marginTop: 15, borderRadius: 8 }} onLoadStart={() => console.log('Loading image...')} onLoad={() => console.log('Image loaded')} onError={(error) => console.log('Error loading image', error)} />}
						</Layout>
					</TouchableOpacity>
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Event Title" name="title" value={state.title} onChange={handleInputChange} placeholder="Event Title" />
                    <View style={{ marginTop: 15 }} />
                    <InputMultiline label="Event Caption" name="caption" value={state.caption} onChange={handleInputChange} placeholder="Write a description up to 120 characters" />
                    <View style={{ marginTop: 15 }} />
                    <InputMultiline label="Event Description" name="desc" value={state.desc} onChange={handleInputChange} placeholder="Write a longer description of the event up to 500 characters" />
                    <View style={{ marginTop: 15 }} />
                    <TitleFour title="Event Start Date" mb={10} />
					<DateSelect name="startDate" value={state.startDate} onChange={handleInputChange} />
                    <View style={{ marginTop: 15 }} />
                    <TitleFour title="Event End Date" mb={10} />
                    <DateSelect name="endDate" value={state.endDate} onChange={handleInputChange} />
                    <View style={{ marginTop: 15 }} />
                    <TitleFour title="Event Time" />
					<View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <TextTwo title="Starts:&nbsp;&nbsp;" fontsize={12} width={60} />
						<DropdownSingle name="startTime" data={data} value={state.startTime} onChange={handleInputChange} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <TextTwo title="Ends:&nbsp;&nbsp;" fontsize={12} width={60} />
						<DropdownSingle name="endTime" data={data} value={state.endTime} onChange={handleInputChange} />
                    </View>
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Event Location (Optional)" name="addressOne" value={state.addressOne} onChange={handleInputChange} placeholder="Address line 1" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel name="addressTwo" value={state.addressTwo} onChange={handleInputChange} placeholder="Address line 2" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel name="city" value={state.city} onChange={handleInputChange} placeholder="City" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel name="province" value={state.province} onChange={handleInputChange} placeholder="Province" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel name="zipCode" value={state.zipCode} onChange={handleInputChange} placeholder="ZIP Code" />
                    <ButtonPrimary name="Upload Event" width="100%" marginTop={25} onpress={handleUpload}/>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Add;