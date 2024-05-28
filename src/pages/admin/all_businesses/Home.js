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
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { ButtonSecondary } from '../../../components/ButtonSecondary';

const Home = (props) => 
{
    const [token, setToken] = useState('');
	const [isReady, setIsReady] = useState(false);
	const [records, setRecords] = useState([]);
	const [filteredRecords, setFilteredRecords] = useState([]);
	const [numRecs, setNumRecs] = useState(0);
	const [filter, setFilter] = useState('All');
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
			setFilteredRecords(res.records);
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

	const handleViewBusiness = (record) => 
	{
		props.navigation.navigate('AdminAllBusinessView', { record: record });
	}

	const filterRecords = (filterType, active) => 
	{
		const filtered = records.filter(record => record.active === active);
		setFilteredRecords(filtered);
		setNumRecs(filtered.length);
		setFilter(filterType);
	};

	const filterAll = () => 
	{
		const filtered = records.filter(record => record.active !== '999');
		setFilteredRecords(filtered);
		setNumRecs(filtered.length);
		setFilter('All');
	};

	const handleRefresh = () => 
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
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<TopNavLrgTitleIcon title="All Businesses" navigation={props.navigation} />
			<Divider style={{ height: 2, backgroundColor: '#DEDDE7' }} />
			<Layout style={{ width: '100%', marginTop: 10, marginBottom: 10, paddingStart: 20, paddingEnd: 20 }}>
				<ButtonPrimary name="Refresh" width="100%" onpress={handleRefresh}/>
			</Layout>
			<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 10, marginBottom: 10, paddingStart: 20, paddingEnd: 20, columnGap: 5 }}>
				<ButtonSecondary name="All" onpress={() => filterAll()}/>
				<ButtonSecondary name="New" onpress={() => filterRecords('New', '2')}/>
				<ButtonSecondary name="Appr" onpress={() => filterRecords('Approved', '1')}/>
				<ButtonSecondary name="Denied" onpress={() => filterRecords('Denied', '0')}/>
			</Layout>
			<Layout style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10, marginBottom: 10, paddingStart: 20, paddingEnd: 20 }}>
				<Text category="s1" status="basic">Total Records: {numRecs}</Text>
				<Text category="s1" status="basic">Filter: {filter}</Text>
			</Layout>
			<ScrollView>
			<Layout style={MainStyles.layout_container_grid}>
				{gotRecords && filteredRecords.length > 0 
				? (
					filteredRecords.map((record, index) => (
						<BusCard key={index} record={record}  navigation={props.navigation} index={index} onpress={() => handleViewBusiness(record)} />
					))
					) : (
						<Text category='p1' style={{ paddingStart: 10, paddingTop: 10 }}>No records found</Text>
					)}
			</Layout>
			</ScrollView>
			<BotNav selected={1} />
		</SafeAreaView>
    )
};

export default Home;
