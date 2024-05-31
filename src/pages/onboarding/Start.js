import React, { useEffect } from 'react';
import DbUtils from '../../services/DbUtils';
import MainStyles from '../../assets/styles/MainStyles';
import { TopNavBack } from '../../components/TopNavBack';
import TitleZero from '../../components/TitleZero';
import TextOne from '../../components/TextOne';
import { ButtonPrimary } from '../../components/ButtonPrimary';
import { SafeAreaView, View, Image, TouchableOpacity  } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

const Start = (props) => 
{
    const handleGetStarted = () =>  
    {
        props.navigation.navigate('OnboardingChoose');
    }

	useEffect(() => 
	{
		// Leaving clear here for security purposes. If user is logged out and the app is started there should be no data in the db.
		// Commenting out for testing purposes.
		// DbUtils.clear();
	}, []);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
                <View style={[MainStyles.column_container, {paddingTop: 80, paddingBottom: 80}]}>
					<View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 20 }}>
						<Image source={require('../../assets/images/localeyez_logo_p.png')} style={{ width: 320 }} />
					</View>
					<Text style={{ fontSize: 38, fontWeight: '600', textAlign: 'center', color: '#220622'}}>Stay in the know, live in the now.</Text>
					<Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', color: '#220622'}}>Support Local Communities</Text>
					<ButtonPrimary name="Get Started" width="100%" onpress={handleGetStarted} />
                </View>
        </SafeAreaView>
    )
}

export default Start;
