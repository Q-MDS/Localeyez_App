import React, { useEffect } from 'react';
import DbUtils from '../../services/DbUtils';
import MainStyles from '../../assets/styles/MainStyles';
import TitleZero from '../../components/TitleZero';
import TextOne from '../../components/TextOne';
import { ButtonPrimary } from '../../components/ButtonPrimary';
import { SafeAreaView, View, Image, TouchableOpacity  } from 'react-native';
import { Layout } from '@ui-kitten/components';

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
        <SafeAreaView style={{flex: 1}}>
            <Layout style={MainStyles.layout_container_grid}>
				<View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
					<Image source={require('../../assets/images/app_pic_1.png')} style={{ width: '100%' }} />
				</View>
                <View style={{ flexDirection: 'column', flex: 1, alignItems: 'space-between', justifyContent: 'flex-start', width: '100%' }}>
					<View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 20 }}>
						<Image source={require('../../assets/images/localeyez_logo.png')} style={{ width: 320 }} />
					</View>
                        <Layout style={[MainStyles.layout_container]}>
                            <TitleZero title="Stay in the know, live in the now" />
                            <View style={{ marginTop: 20, width: '100%' }} >
                                <TextOne textAlign="center" title="Support Local Communities" status="basic" fontsize={18} />
                            </View>
                            <Layout style={{ width: '100%', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
							{/* <TouchableOpacity onPress={() => handleGetStarted()}> */}
                            	<ButtonPrimary name="Get Started" width="100%" onpress={handleGetStarted} />
							{/* </TouchableOpacity> */}
                        </Layout>
                    </Layout>
                </View>
            </Layout>
        </SafeAreaView>
    )
}

export default Start;
