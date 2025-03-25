import React, { useState, useEffect, useReducer } from 'react';
import DbUtils from '../../../../services/DbUtils';
import { launchImageLibrary } from 'react-native-image-picker';
import { updEvent } from '../../../../services/api_helper';
import { updEventImage } from '../../../../services/api_upload';
import { delEventPic } from '../../../../services/api_helper';
import Toast from 'react-native-toast-message';
import MainStyles from '../../../../assets/styles/MainStyles';
import { TopNavBackTitleIcon } from '../../../../components/TopNavBackTitleIcon';
import { Linking, SafeAreaView, ScrollView, View, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
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
import IconMap from '../../../../assets/images/IconMap';

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

const Edit = (props) => 
{
	const [state, dispatch] = useReducer(reducer, initialState);

	const [remoteId, setRemoteId] = useState('');
	const [businessId, setBusinessId] = useState('');
	const [token, setToken] = useState('');
	const [isUploading, setIsUploading] = useState(false);
	const [isNewPic, setIsNewPic] = useState(false);
	const [imageType, setImageType] = useState('');
	const [base64Data, setBase64Data] = useState('');
	const [errors, setErrors] = useState({ sector: '', title: '', caption: '', desc: '', startDate: '', endDate: '', startTime: '', endTime: '' });

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
			business_id: businessId,
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
				visibilityTime: 2000,
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
			handleSubmit();
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

	const handleDeleteImage = async () => 
	{
		Alert.alert(
			"Delete Image",
			"Are you sure you want to delete this image?",
			[
				{
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
				},
				{ text: "OK", onPress: () => deleteImage() }
			]
		);
	}

	const deleteImage = async () =>
	{
		handleInputChange('displayImage', "");
		
		const data = [{
			event_id: remoteId,
		}];

		let record = JSON.stringify(data);
		await delEventPic(token, record)
		.then((res) => 
		{
			console.log('Image deleted:', res);
			Toast.show({
				type: 'success',
				position: 'bottom',
				text1: 'Image deleted',
				visibilityTime: 1000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		});

		// Get the current array of records
		const eventRecord = await DbUtils.getItem('events');
		const parsedData = JSON.parse(eventRecord);
		const updatedData = parsedData.map((record, index) => 
		{
			if (index === Number(props.route.params.id)) 
			{
				return {...record, display_image: ""};
			} 
			else 
			{
				return record;
			}
		});

		await DbUtils.setItem('events', JSON.stringify(updatedData));
	}

			const openMap = (addressOne, addressTwo, city, province, zipcode) => 
			{
				const address = `${addressOne}, ${addressTwo}, ${city}, ${province}, ${zipcode}`;
				const encodedAddress = encodeURIComponent(address);
				const url = `https://www.google.com/maps?q=${encodedAddress}`;
				console.log('GPS: ', encodedAddress);
				
				Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
			};

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
        <TopNavBackTitleIcon title="Back: Business Profile" alignment="start" navigation={props.navigation} goBackTo="BusProProAddEditBack" goDelete="BusProfEvtDelete" deleteId={remoteId} />
			<Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>
				{/* Page title */}
				<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginBottom: 10 }} />
				<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
					<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#612bc1', width: '100%' }}>Edit Event</Text>
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
						{state.displayImage && 
						<>
						<View style={{ marginTop: 15 }} />
						<TouchableOpacity onPress={handleDeleteImage}>
							<Text style={[MainStyles.title_a14, { width: '100%', textAlign: 'center', marginTop: 5, color: '#000000' }]}>Delete Image</Text>
						</TouchableOpacity>
						</>
						}
					</Layout>
				</TouchableOpacity>

				<Card style={{ marginBottom: 10 }}>
                    <View style={{ width: '100%' }} >
						<InputLabel label="Event Title" name="title" value={state.title} onChange={handleInputChange} status="basic" placeholder="Write title here" bg={errors.title ? '#ffe6e6' : '#f2f2f2'} />
						{errors.title && <Text style={[styles.error]}>{errors.title}</Text>}
					</View>
				</Card>

				<Card style={{ marginBottom: 10 }}>
                    <View style={{ width: '100%' }} >
						<InputMultiline label="Event Caption" name="caption" value={state.caption} onChange={handleInputChange} status="basic" placeholder="Write a short description up to 120 characters about your event" bg={errors.caption ? '#ffe6e6' : '#f2f2f2'} />
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
						<DateSelect name="startDate" value={state.startDate} onChange={handleInputChange} bg={errors.startDate ? '#ffe6e6' : '#f2f2f2'} />
						{errors.startDate && <Text style={[styles.error]}>{errors.startDate}</Text>}
					</View>

                    <View style={{ marginTop: 15, width: '100%' }} >
						<Label title="Event Start Date" textalign="left" mb={5} status="basic" fontsize={14} fontweight="bold" />
						<DateSelect name="endDate" value={state.endDate} onChange={handleInputChange} bg={errors.endDate ? '#ffe6e6' : '#f2f2f2'} />
						{errors.endDate && <Text style={[styles.error]}>{errors.endDate}</Text>}
					</View>

                    <View style={{ marginTop: 15 }} />
					<Label title="Event Time" textalign="left" mb={5} status="basic"  fontsize={14} fontweight="bold" />
                    <View style={{ position: 'relative', flexDirection: 'row', alignItems: 'center' }} >
						<Text style={[MainStyles.title_a14, { textAlign: 'left', color: '#220622', width: 70, paddingEnd: 10 }]}>Starts:</Text>
                        <DropdownSingle name="startTime" data={data} value={state.startTime} onChange={handleInputChange} />
						{errors.startTime && <Text style={[styles.error]}>{errors.startTime}</Text>}
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
						<Text style={[MainStyles.title_a14, { textAlign: 'left', color: '#220622', width: 70, paddingEnd: 10 }]}>Ends:</Text>
                        <DropdownSingle name="endTime" data={data} value={state.endTime} onChange={handleInputChange} />
						{errors.endTime && <Text style={[styles.error]}>{errors.endTime}</Text>}
                    </View>
				</Card>

				<Card style={{ marginBottom: 20 }}>
                    <InputLabel label="Event Location (Optional)" name="addressOne" value={state.addressOne} onChange={handleInputChange} status="basic" placeholder="Address 1" bg="#f2f2f2"  />
                    <View style={{ marginTop: 5 }} />
                    <InputOnly name="addressTwo" value={state.addressTwo} onChange={handleInputChange}  placeholder="Address 2" bg="#f2f2f2" />
                    <View style={{ marginTop: 5 }} />
                    <InputOnly name="city" value={state.city} onChange={handleInputChange}  placeholder="City" bg="#f2f2f2"  />
                    <View style={{ marginTop: 5 }} />
                    <InputOnly name="province" value={state.province} onChange={handleInputChange}  placeholder="Province" bg="#f2f2f2"  />
                    <View style={{ marginTop: 5 }} />
                    <InputZip name="zipCode" value={state.zipCode} onChange={handleInputChange}  placeholder="Zip code" bg="#f2f2f2"  />
                    <View style={{ marginTop: 5 }} />
					<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', columnGap: 5, marginTop: 10 }} onPress={() => openMap(state.addressOne, state.addressTwo, state.city, state.province, state.zipCode)}>
						<IconMap />
						<Text style={{ color: '#000', fontSize: 14 }}>View on map</Text>
					</TouchableOpacity>
				</Card>
				<ButtonPrimary name="Submit Changes" width="100%" onpress={validateForm}/>
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

export default Edit;