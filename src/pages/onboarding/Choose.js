import React from 'react';
import MainStyles from '../../assets/styles/MainStyles';
import { TitleOne } from '../../components/TitleOne';
import TextOne from '../../components/TextOne';
import { ButtonPrimary } from '../../components/ButtonPrimary';
import { SafeAreaView, View, Image  } from 'react-native';
import { Layout } from '@ui-kitten/components';

const Choose = (props) => 
{
    const handleUserLogin = () => 
    {
        props.navigation.navigate('LoginUser');
    }

    const handleBusinessLogin = () => 
    {
        props.navigation.navigate('LoginBusiness');
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <Layout style={MainStyles.layout_container_grid}>
            	<View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
					<Image source={require('../../assets/images/app_pic_2.png')} style={{ width: '100%' }} />
				</View>
                <View style={{ flexDirection: 'column', flex: 1, alignItems: 'space-between', justifyContent: 'flex-start', width: '100%' }}>
                    {/* <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 250, width: '100%' }}>
                        <Image source={require('../../assets/images/pic_holder.png')} style={{ width: 112, height: 112 }} />aaa
                    </View> */}
                    <Layout style={[MainStyles.layout_container]}>
                        <TitleOne title="Choose which option applies to you:" textAlign="center" status="basic" />
                        <Layout style={{ flexDirection: 'column', flex: 1, alignItems: 'center', width: '100%' }}>
                            <Layout style={{ width: '100%', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <TextOne title="Sign up or login as a user" status="basic" />
                                <ButtonPrimary name="User" width="100%" marginTop={15} onpress={handleUserLogin} />
                            </Layout>
                            <Layout style={{ width: '100%', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <TextOne title="Sign up or login as a business" status="basic"/>
                                <ButtonPrimary name="Business" width="100%" marginTop={15} onpress={handleBusinessLogin}/>
                            </Layout>
                            
                        </Layout>
                    </Layout>
                </View>
            </Layout>
        </SafeAreaView>
    )
}

export default Choose;
