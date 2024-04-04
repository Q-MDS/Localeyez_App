import React, { useState, useEffect} from 'react';
import DbUtils from '../../../../services/DbUtils';
import Toast from 'react-native-toast-message';
import { addEvent } from '../../../../services/api_helper';
import MainStyles from '../../../../assets/styles/MainStyles';
import { launchImageLibrary } from 'react-native-image-picker';
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
import { TimeSelect } from '../../../../components/TimeSelect';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';

const sectors = ['Select...', 'Shopping', 'Travel', 'Health & Wellness', 'Entertainment', 'Education & Employment', 'Property', 'Services', 'Community'];

const Add = (props) => 
{
	const [businessId, setBusinessId] = useState('');
	const [token, setToken] = useState('');
	const [sector, setSector] = useState('');
	const [displayImage, setDisplayImage] = useState(null);
	const [eventTitle, setEventTitle] = useState('');
	const [eventCaption, setEventCaption] = useState('');
	const [eventDescription, setEventDescription] = useState('');
	const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
	const [eventStartTime, setEventStartTime] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');
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

	const handleStartTime = (time) => 
	{
		setEventStartTime(time);
	};

	const handleEndTime = (time) => 
	{
		setEventEndTime(time);
	};

	const handleUpload = async () => 
    {
		const promotionData = [{
			businessId: businessId,
            sector: sector,
            diaplyImage: displayImage,
            title: eventTitle,
            caption: eventCaption,
            description: eventDescription,
            startDate: eventStartDate,
            endDate: eventEndDate,   
            startTime: eventStartTime,
            endTime: eventEndTime,   
            locAddOne: address1,   
            locAddTwo: address2,   
            locCity: city,   
            locProvince: province,   
            locZipCode: zipCode,   
            created: new Date().toLocaleDateString()
        }];
        let stringified = JSON.stringify(promotionData);
        
		addData(promotionData);

		// Send to server
		try 
		{
			const res = await addEvent(token, promotionData);
			
			props.navigation.navigate('BusProfProHome');
		} 
		catch (error) 
		{
			// console.error("XXX", error);
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

    return (
      	<SafeAreaView style={{ flex: 1 }}>
		<TopNavArrowTitle title="Add Event" alignment="start" navigation={props.navigation} goBackTo="BusProfEvtAddEditBack" />
        <DividerTop />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, {backgroundColor: '#fff'}]}>
                    <TitleFour title="Choose which business sector(s) your event falls under:" />
                    <SelectSingle options={sectors} onSelect={handleSector} />
                    <TitleFour title="Upload Display Picture" mb={10} />
					<TouchableOpacity onPress={chooseDisplayImage} style={{ width: '100%' }}>
						<Layout style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: '#b8b7c8', borderWidth: 1, borderRadius: 10, padding: 20 }} >
							<Icon name="upload-outline" fill="#B2AEDB" style={{ width: 48, height: 48 }} />
							<TextTwo title="Add an image for the banner of your event" textalign="center" fontsize={13} mb={10} />
							<TextTwo title="Image specification 640 x 360px" textalign="center" fontsize={12} />
							<TextTwo title="Image size: max 5MB" textalign="center" fontsize={12} />
							{displayImage && <Image source={{ uri: displayImage }} style={{ width: '100%', height: 200, marginTop: 15, borderRadius: 8 }} onLoadStart={() => console.log('Loading image...')} onLoad={() => console.log('Image loaded')} onError={(error) => console.log('Error loading image', error)} />}
						</Layout>
					</TouchableOpacity>
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Event Title" value={eventTitle} setValue={setEventTitle} placeholder="Event Title" />
                    <View style={{ marginTop: 15 }} />
                    <InputMultiline label="Event Caption" value={eventCaption} setValue={setEventCaption} placeholder="Write a description up to 120 characters" />
                    <View style={{ marginTop: 15 }} />
                    <InputMultiline label="Event Description" value={eventDescription} setValue={setEventDescription} placeholder="Write a longer description of the event up to 500 characters" />
                    <View style={{ marginTop: 15 }} />
                    <TitleFour title="Event Start Date" mb={10} />
                    <DateSelect value={eventStartDate} setDate={setEventStartDate} />
                    <View style={{ marginTop: 15 }} />
                    <TitleFour title="Event End Date" mb={10} />
                    <DateSelect value={eventEndDate} setDate={setEventEndDate} />
                    <View style={{ marginTop: 15 }} />
                    <TitleFour title="Event Time" />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <TextTwo title="Starts:&nbsp;&nbsp;" fontsize={12} width={60} />
                        <TimeSelect time={8} mt={10} onSelect={handleStartTime} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <TextTwo title="Ends:&nbsp;&nbsp;" fontsize={12} width={60} />
                        <TimeSelect time={12} mt={10} onSelect={handleEndTime} />
                    </View>
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Event Location (Optional)" value={address1} setValue={setAddress1} placeholder="Address line 1" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel value={address2} setValue={setAddress2} placeholder="Address line 2" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel value={city} setValue={setCity} placeholder="City" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel value={province} setValue={setProvince} placeholder="Province" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel value={zipCode} setValue={setZipCode} placeholder="ZIP Code" />
                    <ButtonPrimary name="Upload Event" width="100%" marginTop={25} onpress={handleUpload}/>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Add;