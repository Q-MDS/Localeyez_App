import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import DbUtils from '../../../services/DbUtils';
import Toast from 'react-native-toast-message';
import { getNewBusinesses } from '../../../services/api_admin';
import MainStyles from '../../../assets/styles/MainStyles';
import { Divider } from '@ui-kitten/components';
import { TopNavLrgTitleIcon } from '../../../components/TopNavLrgTitleIcon';
import { BotNav } from '../../../components/BotNav';
import { Layout, Text } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { BusCard } from '../../../components/BusCard';
import { ButtonPrimary } from '../../../components/ButtonPrimary';

const Home = (props) => 
{
	const [token, setToken] = useState('');
	const [isReady, setIsReady] = useState(false);
	const [records, setRecords] = useState([]);
	const [numRecs, setNumRecs] = useState(0);
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
		
		const res = await getNewBusinesses(token, apiData);
		const status = res.status;
		
		if (status)
		{
			setRecords(res.records);
			setNumRecs(res.records.length);
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
			setGotRecords(false);

			Toast.show({
				type: 'error',
				position: 'bottom',
				text1: 'Server error',
				text2: res.message,
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
			fetchRecords();
		}
	}, [isReady]);

	useFocusEffect(React.useCallback(() => 
	{
		const fetchData = async () => 
		{
			await getToken();
			setIsReady(true);
			if (isReady)
			{
				setGotRecords(false);
				fetchRecords();
			}
		};

		fetchData();
	}, []));

	const handleRefresh = () => 
	{
		setGotRecords(false);
		fetchRecords();
	}

	const handleViewBusiness = (record) => 
	{
		props.navigation.navigate('AdminNewBusinessView', { record: record });
	}

    return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavLrgTitleIcon title="New Businesses" navigation={props.navigation} />
			<Divider style={{ height: 2, backgroundColor: '#DEDDE7' }} />
			<Layout style={{ width: '100%', marginTop: 10, marginBottom: 10, paddingStart: 20, paddingEnd: 20 }}>
				<ButtonPrimary name="Refresh" width="100%" onpress={handleRefresh}/>
			</Layout>
			<Layout style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10, marginBottom: 10, paddingStart: 20, paddingEnd: 20 }}>
				<Text category="s1" status="primary">Total Records: {numRecs}</Text>
			</Layout>
			<Divider style={{ height: 2, backgroundColor: '#DEDDE7' }} />
			<ScrollView>
			<Layout style={MainStyles.layout_container_grid}>
				{gotRecords && records.length > 0 
				? (
					records.map((record, index) => (
						<BusCard key={index} record={record} navigation={props.navigation} index={index} onpress={() => handleViewBusiness(record)} />
					))
					) : (
					<Text category='p1' style={{ paddingStart: 10, paddingTop: 10 }}>No records found</Text>
					)}
			</Layout>
			</ScrollView>
			<BotNav selected={0} />
		</SafeAreaView>
    )
};

export default Home;
