import React, { useState, useEffect } from 'react';
import DbUtils from '../../../services/DbUtils';
import Toast from 'react-native-toast-message';
import { getAllBusinesses } from '../../../services/api_admin';
import MainStyles from '../../../assets/styles/MainStyles';
import { Divider } from '@ui-kitten/components';
import { TopNavLrgTitleIcon } from '../../../components/TopNavLrgTitleIcon';
import { BotNav } from '../../../components/BotNav';
import { Layout, Text } from '@ui-kitten/components';
import { SafeAreaView, ScrollView } from 'react-native';
import { BusCard } from '../../../components/BusCard';

const Home = (props) => 
{
    const [token, setToken] = useState('');
	const [isReady, setIsReady] = useState(false);
	const [records, setRecords] = useState([]);
	const [gotRecords, setGotRecords] = useState(false);

	const getToken = async () => 
	{
		const token = await DbUtils.getItem('admin_token');
		
		setToken(JSON.parse(token));
	}

	useEffect(() => 
	{
		const fetchData = async () => 
		{
			await getToken();
			setIsReady(true);
		};

		fetchData();
	}, []);

	const fetchRecords = async () => 
	{
		const apiData = {};
		
		const res = await getAllBusinesses(token, apiData);
		const status = res.status;
		
		if (status)
		{
			setRecords(res.records);
			setGotRecords(true);
			
			Toast.show({
				type: 'success',
				position: 'bottom',
				text1: 'Success',
				text2: 'Records have been downloaded.',
				visibilityTime: 1000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});

		} 
		else 
		{
			setGotPromotions(false);

			Toast.show({
				type: 'error',
				position: 'bottom',
				text1: 'Server error',
				text2: 'There was a problen fetching the records.',
				visibilityTime: 1000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		}
	}

	useEffect(() => 
	{
		if (isReady) 
		{
			console.log('NB - > Token:', token);
			fetchRecords();

		}
	}, [isReady]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
			<TopNavLrgTitleIcon title="All Businesses" navigation={props.navigation} />
			<Divider style={{ height: 2, backgroundColor: '#DEDDE7' }} />
			<ScrollView>
			<Layout style={MainStyles.layout_container_grid}>
				{gotRecords && records.length > 0 
				? (
					records.map((record, index) => (
						<BusCard key={index} record={record}  navigation={props.navigation} index={index} />
					))
					) : (
					<Text>No records found</Text>
					)}
			</Layout>
			</ScrollView>
			<BotNav selected={0} />
		</SafeAreaView>
    )
};

export default Home;
