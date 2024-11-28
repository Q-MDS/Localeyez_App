import React, { useEffect, useState, useReducer } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBusBookings } from '../../../services/api_helper';
import { ActivityIndicator, SafeAreaView, StyleSheet, ScrollView, FlatList, TouchableOpacity, View, TextInput } from "react-native";
import MainStyles from "../../../assets/styles/MainStyles";
import { Layout, Toggle, Card, Text, Icon } from "@ui-kitten/components";
import { BotNavBusiness } from '../../../components/BotNavBusiness';
import { ButtonPrimary } from '../../../components/ButtonPrimary';

const Bookings = () => 
{
	const [isLoading, setIsLoading] = useState(true);
	const [refresh, setRefresh] = useState(false);
	const [businessId, setBusinessId] = useState('');
	const [bookings, setBookings] = useState([]);
	const [listMsg, setListMsg] = useState('');

	useEffect(() => 
	{
		const fetchSettings = async () => 
		{
			const bId = await AsyncStorage.getItem('business_id');
			
			setBusinessId(JSON.parse(bId));

			await getBusBookings(businessId)
			.then((res) => 
			{
				console.log('FUCK FUCK c xxadx ', res);
				setBookings(res.records);

				if (bookings.length > 0)
				{
					setListMsg("Upcoming bookings list")
				} 
				else 
				{
					setListMsg("No bookings");
				}

				setIsLoading(false);
			});
		}

		fetchSettings();
	}, []);

	useFocusEffect(React.useCallback(() => 
		{
			const fetchData = async () => 
			{
				await getBusBookings(businessId)
				.then((res) => 
				{
					setBookings(res.records);

					if (bookings.length > 0)
					{
						setListMsg("Upcoming bookings list")
					} 
					else 
					{
						setListMsg("No bookings");
					}

					setIsLoading(false);
				});
			};
			setIsLoading(true);
			fetchData();
		}, [refresh]));


	const renderItem = ({ item }) => (
		<Card style={{marginBottom: 5}}>
			<View>
				<View style={styles.list_row}>
					<View style={{flexDirection: 'column', width: '60%'}}>
						<Text style={styles.list_title}>Name</Text>
						<Text style={styles.list_data}>{item.shopper_name == '' ? '-' : item.shopper_name}</Text>
					</View>
					<View style={{flexDirection: 'column', width: '40%'}}>
						<Text style={styles.list_title}>Sent</Text>
						<Text style={styles.list_data}>{item.booking_add_date == 0 ? '-' : convertTimestampToDateTime(item.booking_add_date)}</Text>
					</View>
				
				</View>
				<View style={styles.list_row}>
					<View style={{flexDirection: 'column', width: '60%'}}>
						<Text style={styles.list_title}>Email</Text>
						<Text style={styles.list_data}>{item.shopper_email == '' || item.shopper_email == null ? '-' : item.shopper_email}</Text>
					</View>
					<View style={{flexDirection: 'column', width: '40%'}}>
						<Text style={styles.list_title}>Contact Number</Text>
						<Text style={styles.list_data}>{item.shopper_number == '' ? '-' : item.shopper_number}</Text>
					</View>
				</View>
				<View style={styles.list_row}>
					<View style={{flexDirection: 'column', width: '60%'}}>
						<Text style={styles.list_title}>Date Requested</Text>
						<Text style={styles.list_data}>{item.booking_for_date == 0 ? '-' : convertTimestampToDateTime(item.booking_for_date)}</Text>
					</View>
					<View style={{flexDirection: 'column', width: '40%'}}>
						<Text style={styles.list_title}>&nbsp;</Text>
						<Text style={styles.list_data}>&nbsp;</Text>
					</View>
				</View>
				<View style={styles.list_row}>
					<View style={{flexDirection: 'column', width: '100%'}}>
						<Text style={styles.list_title}>Message</Text>
						<Text style={styles.list_data}>{item.booking_msg == '' ? '-' : item.booking_msg}</Text>
					</View>
				</View>
			</View>
		</Card>
	);

	const convertTimestampToDateTime = (timestamp) => 
	{
		const date = new Date(timestamp * 1000);
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based an all
		const year = date.getFullYear();
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `${day}/${month}/${year} ${hours}:${minutes}`;
	};

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
			<Layout style={[MainStyles.layout_container, { paddingTop: 30, paddingStart: 20, paddingEnd: 20, backgroundColor: '#fff'}]}>
				{/* <ScrollView style={{ width: '100%' }}> */}
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 0 }}>	
					<Text style={[ MainStyles.title_aaa, { textAlign: 'left', flex: 1 }]}>Bookings</Text>
					<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: 50 }} onPress={() => setRefresh(!refresh)}>
						<Icon name="refresh-outline" fill={'#898989'} style={{ width: 24, height: 24, marginStart: 5}}/>
					</TouchableOpacity>
				</View>
				<View style={{ flexDirection: 'column', marginTop: 0, alignItems: 'left', justifyContent: 'center', width: '100%' }} >
					<Text style={[MainStyles.title_a15, { textAlign: 'left', marginTop: 10, paddingEnd: 10 }]}>{listMsg}</Text>
					<FlatList
					data={bookings}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderItem}
					style={{ width: '100%', paddingTop: 10 }}
				/>
				</View>
			</Layout>
            <BotNavBusiness selected={2}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
	list_row: {
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'space-between',
		rowGap: 10,
	},
	list_title: {
		fontSize: 12,
		fontWeight: 'bold',
	},
	list_data: {
		fontSize: 14,
		marginBottom: 5
	}
  });

export default Bookings;