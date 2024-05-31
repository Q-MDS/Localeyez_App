import React, { useState, useEffect } from "react";
import DbUtils from "../../../services/DbUtils";
import { getNotifications } from "../../../services/api_helper";
import { TopNavBack } from "../../../components/TopNavBack";
import { Text, Layout } from "@ui-kitten/components";
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

				try
				{
					await getNotifications(token, apiRecord)
					.then((res) =>
					{
						if (res.status)
						{
							// Notifications were found
							setNotifications(res.data);
						} 
						else 
						{
							// No notifications found
						}
					});
				}
				catch(error)
				{
					console.log('Error:', error);
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
					<Layout style={{ alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'white', width: '100%', paddingStart: 15, paddingBottom: 30 }} >
						{/* <TextOne title="There are no events to display" /> */}
						<Text category="p1" status="basic" style={{ width: '100%' }}>There are no notifications to display</Text>
					</Layout>
					)}
					{notifications && notifications.map((item, index) => 
					
						<NotiCard key={index} pic={item.notification.noti_pic} notiAdded={item.notification.noti_added} business={item.notification.business_name} title={item.notification.noti_title} desc={item.notification.noti_desc} onPress={() => handleCardPress(item.notification.business_name, item.notification.link_type, item.link_record)} />
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