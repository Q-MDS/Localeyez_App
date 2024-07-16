import React from 'react';
import MainStyles from '../../assets/styles/MainStyles';
import { TopNavBack } from '../../components/TopNavBack';
import { TitleOne } from '../../components/TitleOne';
import TextOne from '../../components/TextOne';
import { ButtonPrimary } from '../../components/ButtonPrimary';
import { ButtonSecondary } from '../../components/ButtonSecondary';
import { SafeAreaView, View, Image  } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

const Choose = (props) => 
{
    const handleBrowse = () => 
    {
        props.navigation.navigate('BrowseHome');
    }

    const handleUserLogin = () => 
    {
        props.navigation.navigate('LoginUser');
    }

    const handleBusinessLogin = () => 
    {
        props.navigation.navigate('LoginBusiness');
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
			<TopNavBack navigation={props.navigation} pops={1} />
			<Layout style={[MainStyles.column_container, {paddingTop: 0}]}>
				<View style={{ flex: 1 }} />
				<Text style={MainStyles.title_one}>Choose which option applies to you:</Text>
				<View style={{ marginBottom: 50 }}>
					{/* <Text style={{ fontSize: 17, fontWeight: '700', textAlign: 'left', color: '#220622'}}>Sign up or login as a user</Text> */}
					<ButtonPrimary name="Browse Businesses" width="100%" marginTop={15} onpress={handleBrowse} />
				</View>
				<View style={{ marginBottom: 50 }}>
					<Text style={{ fontSize: 17, fontWeight: '500', textAlign: 'center', color: '#220622'}}>Sign up or login as a user</Text>
					<ButtonSecondary name="User Login" width="100%" marginTop={15} onpress={handleUserLogin} />
				</View>
				<View>
					<Text style={{ fontSize: 17, fontWeight: '500', textAlign: 'center', color: '#220622'}}>Sign up or login as a business</Text>
					<ButtonSecondary name="Business Login" width="100%" marginTop={15} onpress={handleBusinessLogin}/>
				</View>
				<View style={{ flex: 1 }} />
			</Layout>
        </SafeAreaView>
    )
}

export default Choose;
