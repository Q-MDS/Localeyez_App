import React, { useState, useEffect } from 'react';
import DbUtils from '../../../../services/DbUtils';
import { launchImageLibrary } from 'react-native-image-picker';
import { updEvent } from '../../../../services/api_helper';
import Toast from 'react-native-toast-message';
import MainStyles from '../../../../assets/styles/MainStyles';
import { TopNavBackTitleIcon } from '../../../../components/TopNavBackTitleIcon';
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';
import DividerTop from '../../../../components/DividerTop';
import { TitleFour } from '../../../../components/TitleFour';
import { InputLabel } from '../../../../components/InputLabel';
import TextTwo from '../../../../components/TextTwo';
import { InputMultiline } from '../../../../components/InputMultiline';
import { DateSelect } from '../../../../components/DateSelect';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import DropdownSingle from '../../../../components/DropdownSingle';

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
	const [promotion, setPromotion] = useState([]);

    // const today = new Date();
    // const fiveDaysFromNow = new Date();
    // fiveDaysFromNow.setDate(today.getDate() + 5);
	const [remoteId, setRemoteId] = useState('');
	const [businessId, setBusinessId] = useState('');
	const [token, setToken] = useState('');
	const [sector, setSector] = useState('');
	const [displayImage, setDisplayImage] = useState(null);
	const [eventTitle, setEventTitle] = useState('');
	const [eventCaption, setEventCaption] = useState('');
	const [eventDesc, setEventDesc] = useState('');
    const [eventStartDate, setEventStartDate] = useState();
    const [eventEndDate, setEventEndDate] = useState();
	const [eventStartTime, setEventStartTime] = useState('');
	const [eventEndTime, setEventEndTime] = useState('');
	const [eventLocAdd1, setEventLocAdd1] = useState('');
	const [eventLocAdd2, setEventLocAdd2] = useState('');
	const [eventLocCity, setEventLocCity] = useState('');
	const [eventLocProvince, setEventLocProvince] = useState('');
	const [eventLocZipCode, setEventLocZipCode] = useState('');

	console.log('Edit event for id: ', props.route.params.id);

	const getEvents = async () => 
	{
		const data = await DbUtils.getItem('events');
		const parsedData = JSON.parse(data);
		console.log('Parsed Data :xxx: ', parsedData);
		showEvent(parsedData[props.route.params.id]);
	}

	const getToken = async () => 
	{
		const token = await DbUtils.getItem('token');
		
		setToken(token);
	}

	const showEvent = (record) => 
	{
		setRemoteId(record.remoteId);
		setBusinessId(record.businessId);
		setSector(record.sector);
		setDisplayImage(record.diaplyImage);
		setEventTitle(record.title);
		setEventCaption(record.caption);
		setEventDesc(record.description);
		if (record.startDate != "")
		{
			setEventStartDate(new Date(record.startDate));
		} 
		else 
		{
			setEventStartDate();
		}
		if (record.endDate != "")
		{
			setEventEndDate(new Date(record.endDate));
		} 
		else 
		{
			setEventEndDate();
		}
		console.log('ST TEST:', record.startTime, 'END TEST');
		if (record.startTime != "")
		{
			setEventStartTime(record.startTime);
		} 
		else 
		{
			setEventStartTime('');
		}
		if (record.endTime != "")
		{
			setEventEndTime(record.endTime);
		} 
		else 
		{
			setEventEndTime('');
		}
		
		//setEventEndTime(record.endTime);
		setEventLocAdd1(record.locAddOne);
		setEventLocAdd2(record.locAddTwo);
		setEventLocCity(record.locCity);
		setEventLocProvince(record.locProvince);
		setEventLocZipCode(record.locZipCode);
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
		const data = await DbUtils.getItem('events');
		const parsedData = JSON.parse(data);
	  
		// Update the record at the specified index
		const updatedData = parsedData.map((record, index) => {
		  if (index === Number(props.route.params.id)) {
			// This is the record to update
			return {
			  ...record,
			  diaplyImage: displayImage,
			  title: eventTitle,
			  caption: eventCaption,
			  description: eventDesc,
			  startDate: eventStartDate,
			  endDate: eventEndDate,
			  startTime: eventStartTime,
			  endTime: eventEndTime,
			  locAddOne: eventLocAdd1,
			  locAddTwo: eventLocAdd2,
			  locCity: eventLocCity,
			  locProvince: eventLocProvince,
			  locZipCode: eventLocZipCode,
			};
		  } 
		  else 
		  {
			// This is not the record to update, so return it as is
			return record;
		  }
		});
	  
		// Save the updated array back to async-storage
		await DbUtils.setItem('events', JSON.stringify(updatedData));

		// Send to server
		try 
		{
			const eventData = [{
				updateId: remoteId,
				businessId: businessId,
				sector: sector,
				displayImage: displayImage,
				title: eventTitle,
				caption: eventCaption,
				description: eventDesc,
				startDate: eventStartDate,
				endDate: eventEndDate,   
				locAddOne: eventLocAdd1,   
				locAddTwo: eventLocAdd2,   
				locCity: eventLocCity,   
				locProvince: eventLocProvince,   
				locZipCode: eventLocZipCode,   
				updated: new Date().toLocaleDateString()
			}];
			let record = JSON.stringify(eventData);

			const res = await updEvent(token, record);
			// console.log('Update promotion result: ', res);
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
        <TopNavBackTitleIcon title="Edit Event" alignment="start" navigation={props.navigation} goBackTo="BusProProAddEditBack" goDelete="BusProfEvtDelete" />
        <DividerTop />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, {backgroundColor: '#fff'}]}>
					<TitleFour title="Choose which business sector(s) your event falls under:" />
					<View style={{ flex: 1, width: '100%' }} >
						<DropdownSingle data={sectors} value={sector} arb={setSector} />
					</View>
                    <TitleFour title="Edit Event Display Image" mb={10} />

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
                    <InputLabel label="Event Title" value={eventTitle} setValue={setEventTitle} placeholder="Skin Care Opening" />
                    <View style={{ marginTop: 15 }} />
                    <InputMultiline label="Event Caption" value={eventCaption} setValue={setEventCaption}  placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />
                    <View style={{ marginTop: 15 }} />
                    <InputMultiline label="Event Description" value={eventDesc} setValue={setEventDesc}  placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos facere est ullam eum deleniti, assumenda magni illo molestias nostrum qui. Deleniti corporis similique temporibus ex eaque." />
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
                        <DropdownSingle data={data} value={eventStartTime} arb={setEventStartTime} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <TextTwo title="Ends:&nbsp;&nbsp;" fontsize={12} width={60} />
                        <DropdownSingle data={data} value={eventEndTime} arb={setEventEndTime} />
                    </View>
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Event Location (Optional)"  value={eventLocAdd1} setValue={setEventLocAdd1} placeholder="18 Lane Street" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel value={eventLocAdd2} setValue={setEventLocAdd2}  placeholder="Suburb" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel value={eventLocCity} setValue={setEventLocCity}  placeholder="Cap Town" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel value={eventLocProvince} setValue={setEventLocProvince}  placeholder="Western Cape" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel value={eventLocZipCode} setValue={setEventLocZipCode}  placeholder="9901" />
                    <ButtonPrimary name="Submit Changes" width="100%" marginTop={25} onpress={handleSubmit}/>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Add;