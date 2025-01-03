import React from 'react';
import MainStyles from '../assets/styles/MainStyles';
import { TouchableOpacity, View, Image, Text } from 'react-native';

const CatButtonMed = (props) => 
{
	const bgColor = props.bgColor;
	// const btnImage = props.btnImage;
	const btnText = props.btnText;


	return (
		<TouchableOpacity onPress={props.onPress} style={{ height: 200, flex:1, borderRadius: 10, paddingTop: 20, paddingBottom: 20, backgroundColor: bgColor }}>
		{/* <View style={{ height: 200, flex:1, borderRadius: 10, paddingTop: 20, paddingBottom: 20, backgroundColor: bgColor }}> */}
			<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
					<Image source={props.btnImage} style={{ borderRadius: 10, alignSelf: 'center', marginTop: 10 }} />
					<Text style={[MainStyles.title_a16, {textAlign: 'center', marginTop: 10, color: '#220622', paddingStart: 5, paddingEnd: 5}]}>{btnText}</Text>
				</View>
			</View>
		{/* </View> */}
		</TouchableOpacity>
  	)
}

export default CatButtonMed;