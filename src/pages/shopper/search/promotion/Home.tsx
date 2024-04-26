import React, { useState, useEffect, useReducer} from 'react';
import { SafeAreaView, ScrollView, View, Image  } from 'react-native';
import { Layout } from '@ui-kitten/components';
import TextTwo from '../../../../components/TextTwo';

const Home = (props: any) => 
{
	const [promotion, setPromotion] = useState<any>(props.route.params.promotion);
	
	console.log('PROMOTION: ', promotion);
	return (
		<View>
			<TextTwo fontsize={32} title="View search result: Promotion" />
		</View>
	)
}

export default Home;
