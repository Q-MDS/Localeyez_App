import React, { useState, useEffect } from 'react';
import DbUtils from '../../../services/DbUtils';
import { TopNavBack } from '../../../components/TopNavBack';
import { getShopperBookings } from '../../../services/api_helper';
import MainStyles from '../../../assets/styles/MainStyles';
import { ActivityIndicator, SafeAreaView, FlatList, View, Text } from 'react-native';
import { Layout, Divider, Card } from '@ui-kitten/components';

const BookingsList = ({navigation, route}) => 
{
	const [bookings, setBookings] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getShopperId = async () => 
	{
		const shopperId = await DbUtils.getItem('shopper_id');

		return JSON.parse(shopperId);
	}

	const shopperBookings = async (shopperId) => 
	{
		const data = {shopper_id: shopperId}
		const res = await getShopperBookings(data);

		if (res.status)
		{
			return res.records;
		}
	}

	useEffect(() => 
	{
		const fetchData = async () =>
		{
			setIsLoading(true);
			const shopperId = await getShopperId();

			const res = await shopperBookings(shopperId);

			// const records = res.records;

			setBookings(res);

			console.log('res bookingsa',  res);

			setIsLoading(false);
		}

		fetchData();
	}, []);

	const formatDate = (timestamp) => 
	{
		const date = new Date(timestamp * 1000);
		return date.toLocaleString(); // This will format the date and time based on the user's locale
	};

	const renderItem = ({ item }) => (
		<Card style={{ flex: 1, marginBottom: 10 }}>
			<View>
				<Text style={{ fontSize: 13, color: '#612bc1' }}>Company Name:</Text>
				<Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>{item.company_name}</Text>

				<Text style={{ fontSize: 13, color: '#612bc1' }}>Booking Made:</Text>
				<Text style={{ fontSize: 16, marginBottom: 5 }}>{formatDate(item.booking_add_date)}</Text>
				
				<Text style={{ fontSize: 13, color: '#612bc1' }}>Booking For:</Text>
				<Text style={{ fontSize: 16, marginBottom: 5 }}>{formatDate(item.booking_for_date)}</Text>

				<Text style={{ fontSize: 13, color: '#612bc1' }}>Booking Message:</Text>
				<Text style={{ fontSize: 16, marginBottom: 5 }}>{item.booking_msg}</Text>
			</View>
		</Card>
    );

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
			<TopNavBack title="Back" alignment="start" navigation={navigation} pops={1} />
			<Layout style={[{ paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff' }]}>
				{/* Page title */}
				<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginBottom: 10 }} />
				<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: 15, marginBottom: 20 }}>
					<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#612bc1', width: '100%' }}>Bookings List</Text>
				</View>
				<FlatList
                    data={bookings}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
			</Layout>
		</SafeAreaView>
	)
}

export default BookingsList;