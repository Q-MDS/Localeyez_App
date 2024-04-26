import React, { useState, useEffect, useReducer} from 'react';
import { SafeAreaView, ScrollView, View, Image  } from 'react-native';
import { Layout } from '@ui-kitten/components';
import TextTwo from '../../../../components/TextTwo';

const Home = (props: any) => 
{
	const [event, setEvent] = useState<any>(props.route.params.event);
	
	console.log('EVENT: ', event);
	return (
		<View>
			<TextTwo fontsize={32} title="View search result: Event" />
		</View>
	)
}

export default Home;
