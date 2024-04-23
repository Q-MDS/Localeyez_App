import React, { useState, useEffect } from 'react';
import DbUtils from '../../../services/DbUtils';
import Toast from 'react-native-toast-message';
import { register } from '../../../services/auth';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavArrowTitle } from '../../../components/TopNavArrowTitle';
import { TitleTwo } from '../../../components/TitleTwo';
import TextOne from '../../../components/TextOne';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { SafeAreaView, View, Image } from 'react-native';
import { Layout } from '@ui-kitten/components';

const StepFour = (props) => 
{
	const [businessProfile, setBusinessProfile] = useState({});
	const [businessSectors, setBusinessSectors] = useState({});
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
		const apiData = {business_profile: businessProfile, business_sectors: businessSectors};
		const res = await register(apiData);

		if (res.status)
		{
			const businessId = res.data;
			const token = res.token;

			await DbUtils.setItem('business_id', JSON.stringify(businessId));
			await DbUtils.setItem('token', token);

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
			console.log('Sum Ting Wong');

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
    }

    return (
		
        <SafeAreaView style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
            <TopNavArrowTitle alignment="start" navigation={props.navigation} />
			<Layout style={[MainStyles.layout_container_center]}>
				<Image source={require('../../../assets/images/congrats.png')} style={{ width: 89, height: 92 }} />
				<View style={{ marginTop: 45 }} />
				<TitleTwo title="Registration Complete!" />
				<View style={{ marginTop: 25 }} />
				<TextOne title="Your registration is under review by admin, you will be notified by email once your account is actived. In the meantime you can start building your business profile." textAlign="center" />
				<ButtonPrimary name="Get Started" width="100%" marginTop={35} onpress={handleGetStarted}/>
			</Layout>
        </SafeAreaView>
    );
};

export default StepFour;