import React, { useState, useEffect } from 'react';
import MainStyles from '../../../assets/styles/MainStyles';
import DbUtils from '../../../services/DbUtils';
import Toast from 'react-native-toast-message';
import { register } from '../../../services/auth';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { SafeAreaView, View, Image, ActivityIndicator } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

const StepFour = (props) => 
{
	const [businessProfile, setBusinessProfile] = useState({});
	const [businessSectors, setBusinessSectors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isReady, setIsReady] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	
	const getProfile = async () => 
    {
        const profile = await DbUtils.getItem('business_profile')
        .then((profile) => 
        {
			console.log('Profile: ', profile);
			setBusinessProfile(JSON.parse(profile));
        });
    }
	
	const getSectors = async () => 
    {
        const sectors = await DbUtils.getItem('business_sectors')
        .then((sectors) => 
        {
			setBusinessSectors(JSON.parse(sectors));
        });
    }

	useEffect(() => 
	{
		const fetchData = async () => 
		{
			await getProfile();
			await getSectors();
			
			setIsReady(true);
		};

		fetchData();
	}, []);


    const handleGetStarted = async () => 
    {
		try 
		{
			setIsLoading(true);

			const apiData = {business_profile: businessProfile, business_sectors: businessSectors};
			const res = await register(apiData);

			if (res.status)
			{
				const businessId = res.data;
				const token = res.token;

				await DbUtils.setItem('business_id', JSON.stringify(businessId));
				await DbUtils.setItem('token', JSON.stringify(token));

				Toast.show({
					type: 'success',
					position: 'bottom',
					text1: 'Registration Successful',
					text2: 'Thank you for registering.',
					visibilityTime: 4000,
					autoHide: true,
					topOffset: 30,
					bottomOffset: 40,
				});

				props.navigation.navigate('BusProfProHome');
			} 
			else 
			{
				console.log('Sum Ting Wong', res);

				Toast.show({
					type: 'error',
					position: 'bottom',
					text1: 'Registration Failed',
					text2: 'Please try again or contact support.',
					visibilityTime: 4000,
					autoHide: true,
					topOffset: 30,
					bottomOffset: 40,
				});
			}

			setIsLoading(false);
		}
		catch(error)
		{
			// Ooops sized error !!!
		}
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
            {/* <TopNavArrowTitle alignment="start" navigation={props.navigation} /> */}
			<Layout style={[MainStyles.column_container, { paddingTop: 100, paddingBottom: 100}]}>
				<View style={{ flex: 1 }} />
				<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
					<Image source={require('../../../assets/images/congrats.png')} style={{ width: 89, height: 92 }} />
				</View>
				<View style={{ marginTop: 45 }} />
				<View>
					<Text status="primary" style={{ fontSize: 24, fontWeight: '600', textAlign: 'center', color: '#220622' }}>Thank you for registering!</Text>
					<View style={{ marginTop: 25 }} />
					<Text status="primary" style={{ fontSize: 16, fontWeight: '600', textAlign: 'center', color: '#220622' }}>Your registration is under review by admin, you will be notified by email once your account is activated.</Text>
					<View style={{ marginTop: 25 }} />
					<Text status="primary" style={{ fontSize: 16, fontWeight: '600', textAlign: 'center', color: '#220622' }}>In the meantime, you can start building your business profile.</Text>
				</View>
				<ButtonPrimary name="Get Started" width="100%" marginTop={80} onpress={handleGetStarted}/>
				<View style={{ flex: 1 }} />
			</Layout>
        </SafeAreaView>
    );
};

export default StepFour;