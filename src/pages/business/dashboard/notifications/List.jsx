import React, { useState, useEffect } from "react";
import DbUtils from "../../../../services/DbUtils";
import { getBusinessNotifications } from "../../../../services/api_helper";
import Toast from 'react-native-toast-message';
import { TopNavBack } from "../../../../components/TopNavBack";
import { Layout } from "@ui-kitten/components";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import DividerTop from "../../../../components/DividerTop";
import { NotiCard } from "../../../../components/NotiCard";


const NotiList = (props) => 
{
    const [token, setToken] = useState('');
	const [businessId, setBusinessId] = useState(0);
	const [isReady, setIsReady] = useState(false);
	const [notifications, setNotifications] = useState([]);

	const getToken = async () => 
	{
		const getToken = await DbUtils.getItem('shopper_token');

		setToken(JSON.parse(getToken));
	}

	const getBusinessId = async () => 
	{
		const id = await DbUtils.getItem('business_id');
		
		setBusinessId(JSON.parse(id));
	}

	useEffect(() => 
	{
		const fetchData = async () => 
		{
			await getToken();
			await getBusinessId();
			
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
				const apiData = {business_id: businessId};
console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
				const res = await getBusinessNotifications(token, apiData);
				console.log('res:', res);
				const status = res.status;
		
				if (status)
				{
					// console.log('Notis:', res.data); asd
					setNotifications(res.data);
					console.log('res.data:', res.data);
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

	const handleCardPress = (reviewRecord) => 
	{
		console.log('Goto: Check out review, ', reviewRecord);
		// props.navigation.navigate('ShopperNotiView', { businessName: businessName, linkType: linkType, linkRecord: linkRecord });
		props.navigation.navigate('BusDashNotiView', {reviewRecord: reviewRecord});
	}

    const handleViewReview = () => 
    {
        props.navigation.navigate('BusDashNotiView');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
			<TopNavBack title="Notifications" alignment="start" navigation={props.navigation} pops={1} />

			<DividerTop />
			<ScrollView style={styles.container}>
                <Layout style={{ flex: 1, marginTop: 15 }}>
					{notifications.map((item, index) => 
					
						<NotiCard key={index} business={item.review_record.first_name} firstname={item.review_record.first_name} lastname={item.review_record.last_name} title={item.noti_title} desc={item.noti_detail} onPress={() => handleCardPress(item.review_record)} />
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
    },
  });

export default NotiList;