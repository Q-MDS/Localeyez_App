import React from 'react';
import MainStyles from '../../assets/styles/MainStyles';
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { Layout, Text, Card } from '@ui-kitten/components';
import { ButtonPrimary } from '../../components/ButtonPrimary';

const Register = (props) => 
{
	const handleClose = () => 
	{
		props.navigation.navigate('BrowseHome');
	}

	const handleRegister = () => 
	{
		props.navigation.navigate('SignupUserStepOne');
	}
  	return (
		<SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
			<ScrollView style={{flex: 1, backgroundColor: 'white'}}>
			<Layout style={[MainStyles.column_container, { backgroundColor: '#ffffff', paddingTop: 30, paddingBottom: 30}]}>
				<View style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
					<Image source={require('../../assets/images/localeyez_logo.png')} style={{ objectFit: 'contain' }} />
				</View>
				<Text style={[MainStyles.title_a20, {marginTop: 20, marginBottom:25}]}>Signup as a user and get the following added benefits:</Text>
				<Card style={{marginBottom:10}}>
					<Text style={MainStyles.title_a14}>Advanced search facility</Text>
				</Card>
				<Card style={{marginBottom:10}}>
					<Text style={MainStyles.title_a14}>Notifications of events and promotions in the business sectors you selected under interests</Text>
				</Card>
				<Card style={{marginBottom:10}}>
					<Text style={MainStyles.title_a14}>Review businesses</Text>
				</Card>
				<Card style={{marginBottom:10}}>
					<Text style={MainStyles.title_a14}>Support</Text>
				</Card>
				<Card style={{marginBottom:10}}>
					<Text style={MainStyles.title_a14}>Standard account management options</Text>
				</Card>
					{/* <View style={{ marginBottom: 50 }}> */}
					<ButtonPrimary name="Signup" width="100%" marginTop={15} onpress={handleRegister} />
				{/* </View> */}
				<View>
				<TouchableOpacity style={{ width: '100%' }} onPress={handleClose}>
					<Text category='p1' style={{ textAlign: 'center', marginTop: 25 }}>Close</Text>
				</TouchableOpacity>
				</View>
			</Layout>
			</ScrollView>
		</SafeAreaView>
  )
}

export default Register
