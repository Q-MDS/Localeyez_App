import React from 'react';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavArrowTitle } from '../../../components/TopNavArrowTitle';
import { TitleTwo } from '../../../components/TitleTwo';
import TextOne from '../../../components/TextOne';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { SafeAreaView, View, Image } from 'react-native';
import { Layout } from '@ui-kitten/components';

const StepFour = (props) => 
{
    const handelGetStarted = () => 
    {
        props.navigation.navigate('BusProfProHome');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle alignment="start" navigation={props.navigation} />
                <Layout style={[MainStyles.layout_container_center]}>
                    <Image source={require('../../../assets/images/congrats.png')} style={{ width: 89, height: 92 }} />
                    <View style={{ marginTop: 45 }} />
                    <TitleTwo title="Registration Complete!" />
                    <View style={{ marginTop: 25 }} />
                    <TextOne title="Your registration is under review by admin, you will be notified by email once your account is actived. In the meantime you can start building your business profile." textAlign="center" />
                    <ButtonPrimary name="Get Started" width="100%" marginTop={25} onpress={handelGetStarted}/>
                </Layout>
        </SafeAreaView>
    );
};

export default StepFour;