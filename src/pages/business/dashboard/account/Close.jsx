import React, { useState, useEffect } from 'react';
import DbUtils from '../../../../services/DbUtils';
import { closeBusinessAccount } from '../../../../services/api_helper';
import MainStyles from '../../../../assets/styles/MainStyles';
import { SafeAreaView, View, Image, ActivityIndicator } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import { ButtonText } from '../../../../components/ButtonText';

const CloseAccount = (props) => 
{
	const [businessId, setBusinessId] = useState('');
	const [token, setToken] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const getBusniessId = async () => 
	{
		await DbUtils.getItem('business_id')
		.then((id) => 
		{
			setBusinessId(JSON.parse(id));
		});
	}

	const getToken = async () => 
	{
		const token = await DbUtils.getItem('token')
		.then((token) => 
		{
			setToken(JSON.parse(token));
		});
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

	const clearAsyncStorage = async () => 
	{
		await DbUtils.clear()
		.then(() =>
		{
			props.navigation.navigate('LoginBusiness');
		});
	}

    const handleDelete = async () => 
    {
		const data = 
		{
			business_id: businessId,
		}

		try 
		{
			await closeBusinessAccount(token, data)
			.then((res) =>
			{
				// Clear aync storage
				clearAsyncStorage();
				console.log('Business profile updated: ', res);
			});
		}
		catch (error)
		{
			console.log('Server or network error: ', error);
		}
    }

    const handleKeep = () => 
    {
        props.navigation.navigate('BusDashAccHome');
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <Layout style={[MainStyles.column_container, { backgroundColor: '#f2f2f2', paddingTop: 50, paddingBottom: 50}]}>
				<View style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
					<Image source={require('../../../../assets/images/localeyez_logo_p.png')} style={{ objectFit: 'contain' }} />
				</View>
                <View style={{ flexDirection: 'column', flex: 1, alignItems: 'space-between', justifyContent: 'center', width: '100%' }}>
					<Text style={[MainStyles.title_a28, { width: "100%", textAlign: 'center', marginTop: 40, marginBottom: 40 }]}>Thank you for using Localeyez</Text>
					<Text style={[MainStyles.title_a16, { width: "100%", textAlign: 'center', marginBottom: 40}]}>Closing the account is an action that cannot be reversed. Once closed, the email address is released and can be used for creating a new Localeyez account. Your previous data will not be stored.</Text>
				</View>
				<View>
                    {/* <Text category="h5" status="basic" style={{ fontWeight: 'bold', marginTop: 15, width: '100%', textAlign: 'center' }}>Thank you for using Localeyez</Text>
                    <Text category="p1" status="primary" style={{ marginTop: 15, width: '100%', textAlign: 'center' }}>Closing the account is an action that cannot be reversed. Once closed, the email address is released and can be used for creating a new Localeyez account. Your previous data will not be stored.</Text> */}
                    <View style={{ marginTop: 40 }} />
                    <ButtonPrimary name="Delete Account" width="100%" onpress={handleDelete} />
					<View style={{ marginTop: 15 }} />
                    <ButtonText name="Keep Account" width="100%" onpress={handleKeep} />
                </View>
            </Layout>
        </SafeAreaView>

    )
};

export default CloseAccount;