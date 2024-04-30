import React, { useState, useEffect } from "react";
import DbUtils from "../../../services/DbUtils";
import Toast from 'react-native-toast-message';
import { getNotifications } from "../../../services/api_helper";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../components/TopNavArrowTitle";
import { TopNavBack } from "../../../components/TopNavBack";
import { Text, Avatar, List, ListItem, Layout } from "@ui-kitten/components";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import DividerTop from "../../../components/DividerTop";
import { NotiCard } from "../../../components/NotiCard";

const NotiList = (props) => 
{
	const [token, setToken] = useState('');
	const [shopperId, setShopperId] = useState(0);
	const [isReady, setIsReady] = useState(false);
	const [notifications, setNotifications] = useState([]);

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
			
			setIsReady(true);
		};

		fetchData();
	}, []);

	useEffect(() => 
	{
		const getNotis = async () => 
		{
			if (isReady)
			{
				const apiRecord = {user_id: shopperId};

				const res = await getNotifications(token, apiRecord);
				const status = res.status;
		
				if (status)
				{
					// console.log('Notis:', res.data);
					setNotifications(res.data);
					
					Toast.show({
						type: 'success',
						position: 'bottom',
						text1: 'Success',
						text2: 'Notifications have been downloaded.',
						visibilityTime: 1000,
						autoHide: true,
						topOffset: 30,
						bottomOffset: 40,
					});
				} 
				else 
				{
					Toast.show({
						type: 'error',
						position: 'bottom',
						text1: 'Server error',
						text2: 'There was a problen fetching notifications.',
						visibilityTime: 1000,
						autoHide: true,
						topOffset: 30,
						bottomOffset: 40,
					});
				}
			}
		}

		if (isReady)
		{
			console.log('Ready to get notis');
			getNotis();
		}
		
	}, [isReady]);

	const handleCardPress = (businessName, linkType, linkRecord) => 
	{
		if (linkType == 0)
		{
			props.navigation.navigate('SearchPromotionView', { promotion: linkRecord });
			return;
		}
		else 
		{
			props.navigation.navigate('SearchEventView', { event: linkRecord });
			return;
		}
	}

    return (
        <SafeAreaView style={{ flex: 1 }}>
			<TopNavBack title={`Notifications`} alignment="start" navigation={props.navigation} pops={1} />
			<DividerTop />
			<ScrollView style={styles.container}>
                <Layout style={{ flex: 1, marginTop: 15 }}>
					{notifications && notifications.length === 0 && (
					<Layout style={{ alignItems: 'center',backgroundColor: 'white', borderRadius: 10, width: '100%', paddingTop: 30, paddingBottom: 30 }} >
						{/* <TextOne title="There are no events to display" /> */}
						<Text category="p1" status="primary">There are no notifications to display</Text>
					</Layout>
					)}
					{notifications && notifications.map((item, index) => 
					
						<NotiCard key={index} business={item.notification.business_name} title={item.notification.noti_title} desc={item.notification.noti_desc} onPress={() => handleCardPress(item.notification.business_name, item.notification.link_type, item.link_record)} />
					)}
                </Layout>
				</ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
		backgroundColor: 'white',
    },
  });

export default NotiList;