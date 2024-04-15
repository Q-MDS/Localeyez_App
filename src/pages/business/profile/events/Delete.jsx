import React, {useState, useEffect} from "react";
import DbUtils from "../../../../services/DbUtils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { delEvent } from "../../../../services/api_helper";
import { SafeAreaView, View } from "react-native";
import { Layout } from "@ui-kitten/components";
import TextTwo from "../../../../components/TextTwo";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../../components/ButtonSecondary";
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
				visibilityTime: 4000,
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
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Layout style={{ flexDirection: 'column', width: "100%", padding: 40, paddingTop: 80, position: 'absolute', bottom: 0, borderTopStartRadius: 40, borderTopEndRadius: 40 }} >
                <TitleThree title="Are you sure you want to delete yout event?" textalign='center' />
                <TextTwo title="If you delete the event, all the event details will be discarded." width="100%" mt={25} mb={25} textalign='center' />
                <ButtonPrimary name="Delete Event" onpress={handleDelete} />
                <View style={{ marginTop: 15 }} />
                <ButtonSecondary name="Go Back" onpress={handleDiscard} />
            </Layout>
        </SafeAreaView>
    );
};

export default Delete;