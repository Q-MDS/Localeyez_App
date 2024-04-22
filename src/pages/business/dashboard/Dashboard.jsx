import React, { useState, useEffect} from "react";
import DbUtils from "../../../services/DbUtils";
import { getTotViews } from "../../../services/api_helper";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBusDashboard } from "../../../components/TopNavBusDashboard";
import { BotNavBusiness } from "../../../components/BotNavBusiness";
import { SafeAreaView } from "react-native";
import { Layout, Text, Divider, Card } from "@ui-kitten/components";
import DividerTop from "../../../components/DividerTop";
import TextTwo from "../../../components/TextTwo";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../components/ButtonSecondary";

const BusinessDashboard = (props) => 
{
	// Todo:
	// Next screen is signup step 3 - redo the sectors page (can we use sectorsData)
	// Next is to upload pictures to the server and set pic path to a url

	// DONE
	// Get Hello, .... from profile
	// Do api call to get total views (this total is built from when a shopper goes to their profile page: Need to make a common page that fetches api data and also increases count in db)
	// Next screen is the notification screen...

	const [isReady, setIsReady] = useState(false);
	const [isApiReady, setIsApiReady] = useState(false);
	const [token, setToken] = useState('');
	const [profile, setProfile] = useState(null);
	const [firstName, setFirstName] = useState('');
	const [businessId, setBusinessId] = useState(0);
	const [totViews, setTotViews] = useState('0');

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

	useEffect(() => 
	{
		if (isApiReady)
		{
			const apiGetTotViews = async () => 
			{
				const apiData = {business_id: businessId};
				const res = await getTotViews(token, JSON.stringify(apiData));
				const status = res.status;
				//aaa a a a a a a 
		
				if (status)
				{
					setTotViews(res.data);
					// Toast.show({
					// 	type: 'success',
					// 	position: 'bottom',
					// 	text1: 'Success',
					// 	text2: 'Changes have been successfully updated.',
					// 	visibilityTime: 1000,
					// 	autoHide: true,
					// 	topOffset: 30,
					// 	bottomOffset: 40,
					// });
				} 
				else 
				{
					setTotViews('0.');
					// Toast.show({
					// 	type: 'error',
					// 	position: 'bottom',
					// 	text1: 'Server error',
					// 	text2: 'There was a problen updating your changes.',
					// 	visibilityTime: 1000,
					// 	autoHide: true,
					// 	topOffset: 30,
					// 	bottomOffset: 40,
					// });
				}
			}
			apiGetTotViews();
		}
	}, [isApiReady]);

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
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavBusDashboard title={firstName} navigation={props.navigation}  />
                <DividerTop />
                <Layout style={[MainStyles.layout_container, {backgroundColor: '#fdfdfd'}]}>
                    <Text category="s1">Your business in review:</Text>

                    {/* <Card style={{ marginTop: 10, padding: 10, borderRadius: 10, backgroundColor: '#FFF', width: '100%' }}>
                        <Text category="s2" style={{ textAlign: 'center', fontWeight: 'bold' }}>New Notifications:</Text>
                        <TextTwo title="3" textalign="center" fontsize={72} />
                    </Card> */}

                    <Card style={{ marginTop: 10, padding: 10, borderRadius: 10, backgroundColor: '#FFF', width: '100%' }}>
                        <Text category="s2" style={{ textAlign: 'center', fontWeight: 'bold' }}>Total number of views:</Text>
                        <TextTwo title={totViews} textalign="center" fontsize={72} />
                    </Card>
                    <ButtonSecondary name="Add Promotion" width="100%" marginTop={20} onpress={gotoAddPromotion} />
                    <ButtonPrimary name="Add Event" width="100%" marginTop={40} onpress={gotoAddEvent} />

                </Layout>
                <Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7' }} />
            <BotNavBusiness selected={0}/>
        </SafeAreaView>
    );
};

export default BusinessDashboard;