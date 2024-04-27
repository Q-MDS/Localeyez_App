import React from 'react';
import { SafeAreaView, ScrollView, View, Image} from 'react-native';
import { TopNavBack } from '../../../../../components/TopNavBack';
import { Layout, Text } from '@ui-kitten/components';
import { ButtonPrimary } from '../../../../../components/ButtonPrimary';

const WriteConfirm = (props: any) => 
{
	const handelGotoSearch = () =>
	{
		props.navigation.navigate('Search');
	}

	const handleHome = () =>
	{
		props.navigation.navigate('ShopperHome');
	}

	return (
	<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
		<TopNavBack title="Review sent confirmation"  alignment="start" navigation={props.navigation}/>
		<Layout style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingBottom: 30, paddingStart: 20, paddingEnd: 20, backgroundColor: 'white', borderTopColor: '#DEDDE7', borderTopWidth: 1 }}>
			<Text category='h5' status="primary" style={{ paddingStart: 15,  }} >Thank you for your review!</Text>
			<Text category='p1' status="primary" style={{ paddingStart: 15,  }} >We appreciate all reviews on this platform!</Text>
		</Layout>
		<Layout style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1, paddingBottom: 30, paddingStart: 20, paddingEnd: 20, backgroundColor: 'white', borderTopColor: '#DEDDE7', borderTopWidth: 1 }}>
			<ButtonPrimary name="Go Back to Search Page" width="100%" marginTop={25} onpress={handelGotoSearch}/>
			<ButtonPrimary name="Go To Home Page" width="100%" marginTop={25} onpress={handleHome}/>
		</Layout>
	</SafeAreaView>
	)
}

export default WriteConfirm
