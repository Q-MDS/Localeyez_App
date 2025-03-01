import React, { useState, useEffect } from 'react';
import DbUtils from '../../../services/DbUtils';
import MainStyles from '../../../assets/styles/MainStyles';
import { closeShopperAccount } from '../../../services/api_helper';
import { Platform, SafeAreaView, View, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { ButtonSecondary } from '../../../components/ButtonSecondary';
import { ButtonText } from '../../../components/ButtonText';

const Close = (props) => 
{
	const [token, setToken] = useState('');
	const [shopperId, setShopperId] = useState(0);

	const getToken = async () => 
	{
		const getToken = await DbUtils.getItem('shopper_token');

		setToken(JSON.parse(getToken));
	}

	const getShopperId = async () => 
	{
		const id = await DbUtils.getItem('shopper_id');
		
		setShopperId(JSON.parse(id));
	}

	useEffect(() => 
	{
		const fetchData = async () => 
		{
			await getToken();
			await getShopperId();
		};

		fetchData();
	}, []);

	const clearAsyncStorage = async () => 
	{
		await DbUtils.clear();
		props.navigation.navigate('OnboardingStart');
	}
	
    const handleDelete = async () => 
    {
		const data = { shopper_id: shopperId }

		try 
		{
			const res = await closeShopperAccount(token, data);
			if (res.status)
			{
				clearAsyncStorage();

				if (Platform.OS === 'ios')
				{
					// Do revenueCat subscription delete
				}
				else 
				{
					// CP: Is it possible to cancel a Stripe subscription from react native
					// Delete Stripe subscription from server
				}
			}
		}
		catch (error)
		{
			console.log('Server or network error: ', error);
		}
    }

    const handleKeep = () => 
    {
        props.navigation.navigate('ShopperAccHome');
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <Layout style={[MainStyles.column_container, { backgroundColor: '#f2f2f2', paddingTop: 50, paddingBottom: 50}]}>
				<View style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
					<Image source={require('../../../assets/images/localeyez_logo_p.png')} style={{ objectFit: 'contain' }} />
				</View>


				<View style={{ flexDirection: 'column', flex: 1, alignItems: 'space-between', justifyContent: 'center', width: '100%' }}>
					<Text style={[MainStyles.title_a28, { width: "100%", textAlign: 'center', marginTop: 40, marginBottom: 40 }]}>Thank you for using Localeyez</Text>
					<Text style={[MainStyles.title_a16, { width: "100%", textAlign: 'center', marginBottom: 40}]}>Closing the account is an action that cannot be reversed. Once closed, the email address is released and can be used for creating a new Localeyez account. Your previous data will not be stored.</Text>
				</View>

				<View>
                    <View style={{ marginTop: 40 }} />
                    <ButtonPrimary name="Delete Account" width="100%" onpress={handleDelete} />
					<View style={{ marginTop: 15 }} />
                    <ButtonText name="Keep Account" width="100%" onpress={handleKeep} />
                </View>


                {/* <View style={{ flexDirection: 'column', flex: 1, alignItems: 'space-between', justifyContent: 'center', width: '100%', paddingStart: 30, paddingEnd: 30 }}>
                    <Text category="h5" status="primary" style={{ fontWeight: 'bold', marginTop: 15, width: '100%', textAlign: 'center' }}>Thank you for using Localeyez</Text>
                    <Text category="p1" status="basic" style={{ marginTop: 15, width: '100%', textAlign: 'center' }}>Closing the account is an action that cannot be reversed. Once closed, the email address is released and can be used for creating a new Localeyez account. Your previous data will not be stored.</Text>
                    <View style={{ marginTop: 50 }} />
                    <ButtonPrimary name="Delete Account" width="100%" onpress={handleClose} />
                    <View style={{ marginTop: 15 }} />
                    <ButtonSecondary name="Go Back" width="100%" onpress={handleBack} />
                </View> */}
            </Layout>
        </SafeAreaView>

    )
};

export default Close;