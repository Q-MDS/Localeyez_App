import React, { useState, useEffect, useReducer} from 'react';
import DbUtils from '../../../../services/DbUtils';
import Toast from 'react-native-toast-message';
import { addEvent } from '../../../../services/api_helper';
import { eventImage } from '../../../../services/api_upload';
import MainStyles from '../../../../assets/styles/MainStyles';
import { launchImageLibrary } from 'react-native-image-picker';
import { TopNav } from '../../../../components/TopNav';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image, BackHandler, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { Layout, Text, Card, Divider } from '@ui-kitten/components';
import DividerTop from '../../../../components/DividerTop';
import { InputLabel } from '../../../../components/InputLabel';
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
	const [errors, setErrors] = useState({ sector: '', errTitle: '', caption: '', desc: '', startDate: '', endDate: '', startTime: '', endTime: '' });

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
				visibilityTime: 2000,
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

	const validateForm = () => 
	{
		let tempErrors = {};

		if (!state.sector)
		{
			tempErrors = { ...tempErrors, sector: 'Sector is required' };
		}
		if (!state.title || state.title === '')
		{
			tempErrors = { ...tempErrors, errTitle: 'Title is required' };
		}
		if (!state.caption || state.caption === '')
		{
			tempErrors = { ...tempErrors, caption: 'Caption is required' };
		}
		if (!state.desc || state.desc === '')
		{
			tempErrors = { ...tempErrors, desc: 'Description is required' };
		}
		if (!state.startDate || state.startDate === '')
		{
			tempErrors = { ...tempErrors, startDate: 'Start date is required' };
		}
		if (!state.endDate || state.endDate === '')
		{
			tempErrors = { ...tempErrors, endDate: 'End date is required' };
		}
		if (!state.startTime || state.startTime === '')
		{
			tempErrors = { ...tempErrors, startTime: 'Start time is required' };
		}
		if (!state.endTime || state.endTime === '')
		{
			tempErrors = { ...tempErrors, endTime: 'End time is required' };
		}
		setErrors(tempErrors);

		if (Object.keys(tempErrors).length === 0)
		{
			handleUpload(); 
		} 
		else 
		{
			Alert.alert(
				"Validation error",
				"One or more fields are missing or invalid. Please check the form and try again.",
				[
					{
					text: "Ok",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel"
					}
				]
			);
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
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
		{/* <TopNavBack title="Add event" alignment="start" navigation={props.navigation} pops={1} /> */}
		<TopNav title="Back: Business Profile" alignment="start" navigation={props.navigation} nav="BusProfEvtAddEditBack" />
			<Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>
				{/* Page title */}
				<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginBottom: 10 }} />
				<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
					<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#612bc1', width: '100%' }}>Add Event</Text>
				</View>
				<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginTop: 5 }} />

				<ScrollView style={{ width: '100%' }}>

                <Card style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 20, marginBottom: 20 }}>
					<Label title="Choose which business sector(s) your event falls under:" textalign="left" mb={5} status="basic" fontsize={14} fontweight='bold' />
					<View style={{ position: 'relative', flex: 1, width: '100%' }} >
						<DropdownSingle name="sector" data={sectors} value={state.sector} onChange={handleInputChange} />
						{errors.sector && <Text style={[styles.error, { textAlign: 'left' }]}>{errors.sector}</Text>}
					</View>
				</Card>

				<Text style={[MainStyles.title_a14, { color: '#612bc1', fontWeight: 'bold', textAlign: 'left', width: '100%', marginBottom: 10 }]}>Upload Event Display Picture</Text>
				<TouchableOpacity onPress={chooseDisplayImage} style={{ width: '100%', marginBottom: 10 }}>
					<Layout style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',backgroundColor: '#efeaf9', borderColor: '#612bc1', borderWidth: 1, borderRadius: 10, borderStyle: 'dashed', padding: 20 }} >
						<Image source={require('../../../../assets/images/icon_pic_upload.png')} style={{ width: 48, height: 48 }} />
						<Text style={[MainStyles.title_a16, { textAlign: 'center', color: '#000000', marginTop: 20, paddingStart: 40, paddingEnd: 40 }]}>Add an image for the banner of your event</Text>
						<Text style={[MainStyles.title_a14, { textAlign: 'center', color: '#000000', marginTop: 10 }]}>Image specifications: 640px x 360px</Text>
						<Text style={[MainStyles.title_a14, { textAlign: 'center', color: '#000000' }]}>Image size: max 5MB</Text>
						{state.displayImage && <Image source={{ uri: state.displayImage }} style={{ width: '100%', height: 200, marginTop: 15, borderRadius: 8 }} onLoadStart={() => console.log('Loading image...')} onLoad={() => console.log('Image loaded')} onError={(error) => console.log('Error loading image', error)} />}
					</Layout>
				</TouchableOpacity>

				<Card style={{ marginBottom: 10 }}>
                    <View style={{ width: '100%' }} >
                    	<InputLabel label="Event Title" name="title" value={state.title} onChange={handleInputChange} placeholder="Write title here" status="basic" bg={errors.errTitle ? '#ffe6e6' : '#f2f2f2'} />
						{errors.errTitle && <Text style={[styles.error]}>{errors.errTitle}</Text>}
					</View>
				</Card>

				<Card style={{ marginBottom: 10 }}>
                    <View style={{ width: '100%' }} >
                    	<InputMultiline label="Event Caption" name="caption" value={state.caption} onChange={handleInputChange} status="basic" placeholder="Write a short description up to 120 characters about your event" bg={errors.caption ? '#ffe6e6' : '#f2f2f2'}  />
						{errors.caption && <Text style={[styles.error]}>{errors.caption}</Text>}
					</View>
				</Card>

				<Card style={{ marginBottom: 10 }}>
                    <View style={{ width: '100%' }} >
                    	<InputMultiline label="Event Description" name="desc" value={state.desc} onChange={handleInputChange} status="basic" placeholder="Write a longer description up to 500 characters about your event" bg={errors.desc ? '#ffe6e6' : '#f2f2f2'} />
						{errors.desc && <Text style={[styles.error]}>{errors.desc}</Text>}
					</View>
				</Card>

				<Card style={{ marginBottom: 10 }}>
                    <View style={{ width: '100%' }} >
						<Label title="Event Start Date" textalign="left" mb={5} status="basic" fontsize={14} fontweight="bold" />
						<DateSelect name="startDate" value={state.startDate} onChange={handleInputChange} bg={errors.desc ? '#ffe6e6' : '#f2f2f2'} />
						{errors.startDate && <Text style={[styles.error]}>{errors.startDate}</Text>}
					</View>

                    <View style={{ position: 'relative', marginTop: 15, width: '100%' }} >
						<Label title="Event End Date" textalign="left" mb={5} status="basic" fontsize={14} fontweight="bold" />
						<DateSelect name="endDate" value={state.endDate} onChange={handleInputChange} bg={errors.desc ? '#ffe6e6' : '#f2f2f2'} />
						{errors.endDate && <Text style={[styles.error]}>{errors.endDate}</Text>}
					</View>

                    <View style={{ marginTop: 15 }} />
					<Label title="Event Time" textalign="left" mb={5} status="basic" fontsize={14} fontweight="bold" />
					<View style={{ position: 'relative', flexDirection: 'row', alignItems: 'center' }} >
						<Text style={[MainStyles.title_a14, { textAlign: 'left', color: '#220622', width: 70, paddingEnd: 10 }]}>Starts:</Text>
						<DropdownSingle name="startTime" data={data} value={state.startTime} onChange={handleInputChange} />
						{errors.startTime && <Text style={[styles.error]}>{errors.startTime}</Text>}
                    </View>

                    <View style={{ position: 'relative', flexDirection: 'row', alignItems: 'center' }} >
						<Text style={[MainStyles.title_a14, { textAlign: 'left', color: '#220622', width: 70, paddingEnd: 10 }]}>Ends:</Text>
						<DropdownSingle name="endTime" data={data} value={state.endTime} onChange={handleInputChange} />
						{errors.endTime && <Text style={[styles.error]}>{errors.endTime}</Text>}
                    </View>
				</Card>

				<Card style={{ marginBottom: 20 }}>
                    <InputLabel label="Event Location (Optional)" name="addressOne" value={state.addressOne} onChange={handleInputChange} status="basic" placeholder="Address line 1" bg="#f2f2f2"  />
                    <View style={{ marginTop: 5 }} />
                    <InputOnly name="addressTwo" value={state.addressTwo} onChange={handleInputChange} placeholder="Address line 2" bg="#f2f2f2"  />
                    <View style={{ marginTop: 5 }} />
                    <InputOnly name="city" value={state.city} onChange={handleInputChange} placeholder="City" bg="#f2f2f2"  />
                    <View style={{ marginTop: 5 }} />
                    <InputOnly name="province" value={state.province} onChange={handleInputChange} placeholder="Province" bg="#f2f2f2"  />
                    <View style={{ marginTop: 5 }} />
                    <InputZip name="zipCode" value={state.zipCode} onChange={handleInputChange} placeholder="ZIP Code" bg="#f2f2f2"  />
				</Card>

                    <ButtonPrimary name="Upload Event" width="100%" onpress={validateForm}/>
            </ScrollView>
                </Layout>
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