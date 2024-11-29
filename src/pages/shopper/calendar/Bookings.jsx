import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../components/TopNavBack';
import { Card, Divider, Icon, Layout, Tab, TabView, TextElement } from '@ui-kitten/components';
import { InputLabel } from '../../../components/InputLabel';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { Label } from '../../../components/Label';

const Bookings = ({navigation, route}) => 
{
	/** NOTES 
	 * - Available slots are fetched from the API with bookings_max
	 * 
	*/
	const [contactName, setContactName] = useState('');
	const [contactEmail, setContactEmail] = useState('');
	const [contactNumber, setContactNumber] = useState('');
	const [bookingDate, setBookingDate] = useState('');
	const [date, setDate] = useState(new Date());
  	const [open, setOpen] = useState(false);
	const [spots, setSpots] = useState([
		"24112916",
		"24112918",
		"24112918"
	]);

	console.log('Make a booking: ', route.params);

	const handleSubmit = async () => 
	{

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
							<InputLabel label="Name" value={contactName} onChange={setContactName} status="basic" placeholder="Enter name" bg={'#f2f2f2'} />
						</View>
						<View style={{ position: 'relative', width: '100%', marginTop: 15 }} >
							<InputLabel label="Email" value={contactEmail} onChange={setContactEmail} status="basic" placeholder="Enter email" bg={'#f2f2f2'} />
						</View>
						<View style={{ position: 'relative', width: '100%', marginTop: 15 }} >
							<InputLabel label="Contact Number" value={contactNumber} onChange={setContactNumber} status="basic" placeholder="Enter contact number" bg={'#f2f2f2'} />
						</View>
						<View style={{ position: 'relative', width: '100%', marginTop: 15 }} >
							<Text style={{color: 'black', width: '100%'}}>Please select a date and time for your booking:</Text>
						</View>

						<View style={{ position: 'relative', width: '100%', marginTop: 15 }} >
							<TouchableOpacity style={{ width: '100%'}} onPress={() => setOpen(true)}>
								<Label title="Select date" textalign="left" mb={5} status="basic" fontsize={14} fontweight='bold' />
								<View style={{ backgroundColor: '#f2f2f2', padding: 10, paddingTop: 14, paddingBottom: 14, borderRadius: 5 }}>
									<Text>{date.toLocaleDateString()}</Text>
								</View>
							</TouchableOpacity>
						</View>

					</Card>

					<DatePicker
					modal
					open={open}
					date={date}
					mode="date"
					onConfirm={(date) => {
						setOpen(false);
						setDate(date);
					}}
					onCancel={() => {
						setOpen(false);
					}}
					/>

					<ButtonPrimary name="Submit Changes" width="100%" onpress={handleSubmit} />


				
		</Layout>
		</ScrollView>
		</SafeAreaView>
  	)
}

export default Bookings;