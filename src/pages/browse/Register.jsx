import React from 'react';
import MainStyles from '../../assets/styles/MainStyles';
import { SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import { Layout, Text, Card } from '@ui-kitten/components';
import { ButtonPrimary } from '../../components/ButtonPrimary';
import { ButtonText } from '../../components/ButtonText';

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
			<Layout style={[MainStyles.column_container, { backgroundColor: '#ffffff', paddingTop: 30, paddingBottom: 30}]}>
				<View style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
					<Image source={require('../../assets/images/localeyez_logo.png')} style={{ objectFit: 'contain' }} />
				</View>
				<Text style={[MainStyles.title_a20]}>Signup as a user and get the following added benefits:</Text>
				<Card>
					<Text style={MainStyles.title_a14}>Advanced search facility</Text>
				</Card>
				<Card>
					<Text style={MainStyles.title_a14}>Notifications of events and promotions in the business sectors you selected under interests</Text>
				</Card>
				<Card>
					<Text style={MainStyles.title_a14}>Review businesses</Text>
				</Card>
				<Card>
					<Text style={MainStyles.title_a14}>Support</Text>
				</Card>
				<Card>
					<Text style={MainStyles.title_a14}>Standard account management options</Text>
				</Card>
					{/* <View style={{ marginBottom: 50 }}> */}
					<ButtonPrimary name="Register" width="100%" marginTop={15} onpress={handleRegister} />
				{/* </View> */}
				<View>
				<TouchableOpacity style={{ width: '100%' }} onPress={handleClose}>
					<Text category='p1' style={{ textAlign: 'center' }}>Close</Text>
				</TouchableOpacity>
				</View>
			</Layout>
		</SafeAreaView>
  )
}

export default Register
