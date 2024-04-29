import React from 'react';
import { SafeAreaView, ScrollView, View, Image} from 'react-native';
import { TopNavBack } from '../../../../../components/TopNavBack';
import { Layout, Text } from '@ui-kitten/components';
import { ButtonPrimary } from '../../../../../components/ButtonPrimary';

const WriteConfirm = (props: any) => 
{
	const handelGotoSearch = () =>
	{
		props.navigation.pop(3);
	}

	const handleHome = () =>
	{
		props.navigation.navigate('ShopperHome');
	}

	return (
	<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
	<TopNavBack title="Review sent confirmation"  alignment="start" navigation={props.navigation}/>
		<View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 250, width: '100%' }}>
			<Image source={require('../../../../../assets/images/pic_holder.png')} style={{ width: 112, height: 112 }} />
		</View>
		<Layout style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 40, backgroundColor: 'white' }}>
			<Text category='h5' status="primary" style={{ paddingStart: 15,  }} >Thank you for your review!</Text>
			<Text category='p1' status="primary" style={{ marginTop: 40 }} >We appreciate all reviews on this platform!</Text>
		</Layout>
		<Layout style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1, paddingBottom: 30, paddingStart: 20, paddingEnd: 20, backgroundColor: 'white' }}>
			<ButtonPrimary name="Go Back to Business Page" width="100%" marginTop={25} onpress={handelGotoSearch}/>
			<ButtonPrimary name="Go To Home Page" width="100%" marginTop={25} onpress={handleHome}/>
		</Layout>
	</SafeAreaView>
	)
}

export default WriteConfirm
