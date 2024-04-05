import React from 'react';
import { View, TouchableOpacity, Text  } from 'react-native';

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
			<View style={{ height: 100 }}></View>
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
