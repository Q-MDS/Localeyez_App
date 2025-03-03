import React, {useState, useEffect} from "react";
import DbUtils from "../../../../services/DbUtils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import MainStyles from "../../../../assets/styles/MainStyles";
import { delEvent } from "../../../../services/api_helper";
import { SafeAreaView, View, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import TextTwo from "../../../../components/TextTwo";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";
import { ButtonText } from "../../../../components/ButtonText";
import { TitleThree } from "../../../../components/TitleThree";

const Delete = (props) => 
{
	const [token, setToken] = useState('');

	const getToken = async () => 
	{
		const token = await DbUtils.getItem('token');
		
		setToken(JSON.parse(token));
	}

	useEffect(() => 
	{
		const fetchToken = async () => 
		{
			await getToken();
		};

		fetchToken();
	}, []);

    const handleDelete = async () => 
    {
		const deleteId = props.route.params.deleteId;
		await deleteEvent(deleteId);

		try 
		{
			const delete_id = {id: deleteId};

			let data = JSON.stringify(delete_id);

			const res = await delEvent(token, data);
		} 
		catch (error) 
		{
			Toast.show({
				type: 'error',
				position: 'bottom',
				text1: 'There was an error deleting the event',
				text2: 'Please try again.',
				visibilityTime: 2000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		}

        props.navigation.navigate('BusProfProHome');
    }

	async function deleteEvent(deleteId) 
	{
		// Retrieve the events array from AsyncStorage
		const jsonValue = await AsyncStorage.getItem('events');
		let events = jsonValue != null ? JSON.parse(jsonValue) : [];
	  
		// Find the index of the promotion with the specified id
		const index = events.findIndex(promotion => promotion.id === deleteId);

		// If a promotion with the specified id was found, remove it from the array
		if (index !== -1) 
		{
			events.splice(index, 1);
	  
			// Store the updated events array back in AsyncStorage
			const newJsonValue = JSON.stringify(events);
			await AsyncStorage.setItem('events', newJsonValue);
		}
	}

    const handleDiscard = () => 
    {
        props.navigation.navigate('BusProfProHome');
    }
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <Layout style={[MainStyles.column_container, { backgroundColor: '#f2f2f2', paddingStart: 0, paddingEnd: 0, paddingTop: 80, paddingBottom: 0}]}>
				<View style={{ flex: 1 }} />
				<View style={{ backgroundColor: 'white', padding: 30, width: '100%', borderTopStartRadius: 30, borderTopEndRadius: 30 }}>
					<Text style={[MainStyles.title_a28, {textAlign: 'center', marginBottom: 40 }]}>Are you sure you want to delete your event?</Text>
					<Text style={[MainStyles.title_a16, {textAlign: 'center', marginBottom: 40}]}>If you delete the event, all the event details will be discarded.</Text>
					<ButtonPrimary name="Delete Event" width="100%" onpress={handleDelete} />
					<ButtonText name="Go back" width="100%" onpress={handleDiscard} />
				</View>
            </Layout>
        </SafeAreaView>
    );
};

export default Delete;