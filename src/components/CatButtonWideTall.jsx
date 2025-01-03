import React from 'react';
import MainStyles from '../assets/styles/MainStyles';
import { TouchableOpacity, View, Image, Text } from 'react-native';

const CatButtonWideTall = (props) => 
{
	const bgColor = props.bgColor;
	const btnText = props.btnText;

	return (
		<TouchableOpacity onPress={props.onPress} style={{ height: 190, width: '100%', flex:1, borderRadius: 10, paddingTop: 0, paddingBottom: 20, marginBottom: 25, backgroundColor: bgColor }}>
			<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
					<Image source={props.btnImage} style={{ alignSelf: 'center', marginTop: 10 }} />
					<Text style={[MainStyles.title_a16, {textAlign: 'center', marginTop: 10, color: '#220622', paddingStart: 5, paddingEnd: 5}]}>{btnText}</Text>
				</View>
			</View>
		</TouchableOpacity>
  	)
}

export default CatButtonWideTall;