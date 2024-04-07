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

	// Used only for dev testing
	useEffect(() => 
	{
		// QQQ: Uncomment to clear the database :: Dev testing only
		// DbUtils.clear();
	}, []);

    return (
        <SafeAreaView style={{flex: 1}}>
            <Layout style={MainStyles.layout_container_grid}>
            
                <View style={{ flexDirection: 'column', flex: 1, alignItems: 'space-between', justifyContent: 'flex-start', width: '100%' }}>
                        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 275, width: '100%' }}>
                            <Image source={require('../../assets/images/pic_holder.png')} style={{ width: 112, height: 112 }} />
                        </View>
                        <Layout style={[MainStyles.layout_container]}>
                            <TitleZero title="Stay in the know, live in the now" />
                            <View style={{ marginTop: 20, width: '100%' }} >
                                <TextOne textAlign="center" title="Support locally with Localeyez" />
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
