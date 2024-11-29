import React, { useState, useEffect} from "react";
import { useFocusEffect } from '@react-navigation/native';
import DbUtils from "../../../services/DbUtils";
import { getTotViews } from "../../../services/api_helper";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBusDashboard } from "../../../components/TopNavBusDashboard";
import { BotNavBusiness } from "../../../components/BotNavBusiness";
import { SafeAreaView, View } from "react-native";
import { Layout, Text, Divider, Card } from "@ui-kitten/components";
import DividerTop from "../../../components/DividerTop";
import TextTwo from "../../../components/TextTwo";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../components/ButtonSecondary";
import CustomIcons from "../../../CustomIcons";

const BusinessDashboard = (props) => 
{
	const [isReady, setIsReady] = useState(false);
	const [isApiReady, setIsApiReady] = useState(false);
	const [token, setToken] = useState('');
	const [profile, setProfile] = useState(null);
	const [firstName, setFirstName] = useState('');
	const [businessId, setBusinessId] = useState(0);
	const [totViews, setTotViews] = useState('0');
	const [totBookings, setTotBookings] = useState('0');

	const getToken = async () => 
	{
		const getToken = await DbUtils.getItem('shopper_token');

		setToken(JSON.parse(getToken));
	}

	const getProfile = async () => 
    {
        const businessProfile = await DbUtils.getItem('business_profile')
        .then((businessProfile) => 
        {
			setProfile(JSON.parse(businessProfile));
        });
    }

	useEffect(() => 
	{
		const fetchData = async () => 
		{
			await getToken();
			await getProfile();
			
			setIsReady(true);
		};

		fetchData();
	}, []);

	useEffect(() => 
	{
		if (isReady)
		{
			setFirstName(profile.first_name);
			setBusinessId(profile.id);

			setIsApiReady(true);
			console.log('Hello ',firstName);
		}
	}, [isReady]);

	useFocusEffect(React.useCallback(() => 
	{
		if (isApiReady)
		{
			const apiGetTotViews = async () => 
			{
				const apiData = {business_id: businessId};
				try
				{
					await getTotViews(token, JSON.stringify(apiData))
					.then((res) => 
					{
						if (res.status)
						{
							setTotViews(res.data);
							setTotBookings(res.bookings);
						} 
						else 
						{
							setTotViews('0');
							setTotBookings('0');
						}
					});
				}
				catch(error)
				{
					console.log('Error:', error);
				}
			}
			apiGetTotViews();
		}
	}, [isApiReady]));


    const gotoAddEvent = () => 
    {
        console.log('Go to add event');
		props.navigation.navigate('BusProfEvtAdd');
    }

    const gotoAddPromotion = () => 
    {
        console.log('Go to add promotion');
		props.navigation.navigate('BusProfProAdd');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TopNavBusDashboard title={firstName} navigation={props.navigation}  />
                <DividerTop />
                <Layout style={[MainStyles.column_container, {backgroundColor: '#ffffff'}]}>
                    <Text style={[MainStyles.title_a18, {textAlign: 'center', marginBottom: 30}]}>Your business in review:</Text>
                    {/* <Card style={{ marginTop: 10, padding: 10, borderRadius: 10, backgroundColor: '#FFF', width: '100%' }}> */}
                    <Card style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#FFF', width: '100%' }}>
							<Text style={[MainStyles.title_a16, { textAlign: 'center', fontWeight: 'bold', paddingTop: 20 }]} status="primary">Total number of views:</Text>
							<Text style={[{ fontSize: totViews > 1000 ? 65 : 100, textAlign: 'center', fontWeight: 'bold' }]} status="primary">{totViews}</Text>
							<Text style={[MainStyles.title_a16, { textAlign: 'center', fontWeight: 'bold', marginTop: 20 }]} status="primary">Bookings:</Text>
							<Text style={[{ fontSize: totViews > 1000 ? 65 : 100, textAlign: 'center', fontWeight: 'bold' }]} status="primary">33</Text>
                    </Card>
					<View style={{ flex: 1 }} />
					<View>
						<ButtonPrimary name="Add Event" width="100%" marginTop={40} onpress={gotoAddEvent} />
						<ButtonSecondary name="Add Promotion" width="100%" marginTop={20} onpress={gotoAddPromotion} />
					</View>
                </Layout>
                <Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7' }} />
            <BotNavBusiness selected={0}/>
        </SafeAreaView>
    );
};

export default BusinessDashboard;