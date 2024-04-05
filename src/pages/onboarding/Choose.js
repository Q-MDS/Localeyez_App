import React from 'react';
import MainStyles from '../../assets/styles/MainStyles';
import { TitleOne } from '../../components/TitleOne';
import TextOne from '../../components/TextOne';
import { ButtonPrimary } from '../../components/ButtonPrimary';
import { SafeAreaView, View, Image, TouchableOpacity, Text  } from 'react-native';
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
		<View>
			<TouchableOpacity onPress={() => handleUserLogin()}>
				<Text style={{ color: 'black' }}>User Login</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => handleBusinessLogin()}>
				<Text style={{ color: 'black' }}>Business Login</Text>
			</TouchableOpacity>
		</View>
    )
}

export default Choose;
