import React, { useState, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSpots } from '../../../services/api_helper';
import { addBooking } from '../../../services/api_helper';
import { ActivityIndicator, SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../components/TopNavBack';
import { Card, Divider, Icon, Layout, Tab, TabView, TextElement } from '@ui-kitten/components';
import { InputLabel } from '../../../components/InputLabel';
import { InputMultiline } from '../../../components/InputMultiline';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { ButtonSecondary } from '../../../components/ButtonSecondary';
import { Label } from '../../../components/Label';

const initialState = {
	contactName: null,
	contactEmail: null,
	contactNumber: null,
	bookingMsg: null,
};

function reducer(state, action) 
{
	switch (action.type) 
	{
	  case 'MAKE_BOOKING':
		return { ...state, ...action.payload };
	  default:
		throw new Error();
	}
}

const CustomRadioButton = ({ label, value, selected, onSelect }) => (
	<TouchableOpacity onPress={() => onSelect(value)} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
	  <View style={{
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: selected ? '#612bc1' : '#d6d6d6',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 10,
	  }}>
		{selected ? <View style={{
		  height: 10,
		  width: 10,
		  borderRadius: 5,
		  backgroundColor: '#612bc1',
		}} /> : null}
	  </View>
	  <Text>{label}</Text>
	</TouchableOpacity>
  );

const Bookings = ({navigation, route}) => 
{
	const [state, dispatch] = useReducer(reducer, initialState);
	const [shopperId, setShopperId] = useState('');
	const [bookingDate, setBookingDate] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [date, setDate] = useState(new Date());
  	const [open, setOpen] = useState(false);
	const [picked, setPicked] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [spots, setSpots] = useState(["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "17:00"]);
	const [selectedSpot, setSelectedSpot] = useState(null);
	const [ready, setReady] = useState(false);

	// Remember to add message if there are no spots available

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'MAKE_BOOKING',
			payload: {...state, [name]: newValue}
		});
	}

	useEffect(() => 
	{
		const getShopperId = async () => 
		{
			const shopperId = await AsyncStorage.getItem('shopper_id');
			setShopperId(JSON.parse(shopperId));
			console.log('Shopper ID: ', shopperId);
		}
		
		getShopperId();

		const business = route.params.business
		console.log('Business ID 111: ', business.id);
		getBookingSpots(business.id);
	}, []);

	useEffect(() => 
	{
		console.log('PICK IT SON: ', picked);
		const business = route.params.business;
		getBookingSpots(business.id);
	}, [refresh]);

	useEffect(() => {
		if (selectedSpot !== null) {
			setReady(true);
		}
	}, [selectedSpot]);

	async function getBookingSpots(businessId) 
	{
		setIsLoading(true);
		const justDate = date.toISOString().split('T')[0];
		console.log('Fetching available times: ', justDate, " >>> ", businessId);

		const data = {"business_id":businessId, "booking_date": justDate};

		await getSpots(data)
		.then((res) =>
		{
			console.log('Spots: ', res);
			setSpots(res.records);
		});
		setIsLoading(false);
	}

	const handleSubmit = async () => 
	{
		console.log('Shopper ID Save: ', shopperId);
		const data = [
			{
				"shopper_id": shopperId,
				"business_id": route.params.business.id,
				"contact_name": state.contactName,
				"contact_email": state.contactEmail,
				"contact_number": state.contactNumber,
				"booking_message": state.bookingMsg,
				"booking_date": date.toISOString().split('T')[0],
				"booking_time": selectedSpot
			}
		];

		await addBooking(data).
		then((res) => 
		{
			console.log('Booking response: ', res);
			
		});

		// Will need to add the booking to async_storage
		navigation.goBack()

	}

	if (isLoading) 
		{
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			);
		}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavBack title="Back: Search Results" alignment="start" navigation={navigation} pops={1} />
			<ScrollView>
			<Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>
					{/* Page title */}
					<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginBottom: 10 }} />
					<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: 7 }}>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#612bc1', width: '100%' }}>Make a booking</Text>
					</View>
					<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginTop: 5 }} />
					<Text style={{color: 'black', width: '100%', marginTop: 10 }}>Please enter your contact details so your booking can be confirmed:</Text>
					<Card style={{ backgroundColor: 'white', width: '100%', borderRadius: 10, marginTop: 10, marginBottom: 10 }}>
						<View style={{ position: 'relative', width: '100%' }} >
							<InputLabel name="contactName" label="Name" value={state.contactName} onChange={handleInputChange} status="basic" placeholder="Enter name" bg={'#f2f2f2'} />
						</View>
						<View style={{ position: 'relative', width: '100%', marginTop: 15 }} >
							<InputLabel name="contactEmail" label="Email" value={state.contactEmail} onChange={handleInputChange} status="basic" placeholder="Enter email" bg={'#f2f2f2'} />
						</View>
						<View style={{ position: 'relative', width: '100%', marginTop: 15 }} >
							<InputLabel name="contactNumber" label="ContactNumber" value={state.contactNumber} onChange={handleInputChange} status="basic" placeholder="Enter contact number" bg={'#f2f2f2'} />
						</View>
						<View style={{ position: 'relative', width: '100%', marginTop: 15 }} >
							<Text style={{color: 'black', width: '100%'}}>Please select a date and time for your booking:</Text>
						</View>
						<View style={{ position: 'relative', width: '100%', marginTop: 15 }} >
						<InputMultiline name="bookingMsg" label="Message" value={state.bookingMsg} onChange={handleInputChange} height={80} placeholder="Write your message here" status="basic" style={{ marginTop: 20 }} bg={'#f2f2f2'} />
						</View>

						<View style={{ position: 'relative', width: '100%', marginTop: 15 }} >
							<TouchableOpacity style={{ width: '100%'}} onPress={() => setOpen(true)}>
								<Label title="Select date" textalign="left" mb={5} status="basic" fontsize={14} fontweight='bold' />
								<View style={{ backgroundColor: '#f2f2f2', padding: 10, paddingTop: 14, paddingBottom: 14, borderRadius: 5 }}>
									<Text>{date.toLocaleDateString()}</Text>
								</View>
							</TouchableOpacity>
						</View>

						{picked && (
							<View style={{ position: 'relative', width: '100%', marginTop: 15 }} >
								<Text>Select a time slot:</Text>


								{spots.length > 0 ? (
								spots.map((spot, index) => (
									<CustomRadioButton
									key={index}
									label={spot}
									value={spot}
									selected={selectedSpot === spot}
									onSelect={setSelectedSpot}
									/>
								))
								) : (
								<Text style={{marginTop: 10, opacity: 0.5 }}>No times available. Please try another date.</Text>
								)}


							</View>
						)}
					</Card>

					<DatePicker
					modal
					open={open}
					date={date}
					mode="date"
					onConfirm={(date) => {
						setOpen(false);
						setDate(date);
						setPicked(true);
						setRefresh(!refresh);
					}}
					onCancel={() => {
						setOpen(false);
					}}
					/>
					{ready ? 
					(
						<>
							<ButtonPrimary name="Confirm Booking" width="100%" onpress={handleSubmit} />
						</>
					) 
					: 
					(
						<>
							<ButtonPrimary name="Confirm Booking" width="100%" disabled={true} />
						</>
					)}
					<View style={{ width: '100%', marginTop: 15 }} >
						<ButtonSecondary name="Cancel" width="100%" onpress={() => navigation.goBack()} />
					</View>

				
		</Layout>
		</ScrollView>
		</SafeAreaView>
  	)
}

export default Bookings;