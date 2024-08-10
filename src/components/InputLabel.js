import React from 'react';
import { View } from 'react-native';
import { Input, Text } from '@ui-kitten/components';

export const InputLabel = (props) => 
{
	const renderLabel = () => {
		if (props.label !== '') {
			return(
			<View>
			<Text status={props.status} style={{ fontSize: 14, fontWeight: 'bold', color: '#612bc1', paddingBottom: 5 }}>{props.label}</Text>
			</View>
			);
		} 
		else 
		{
			return null;
		}
	};

  	return (
		<Input
			label={renderLabel}
			name={props.name}
			placeholder={props.placeholder}
			value={props.value}
			secureTextEntry={props.secureTextEntry}
			onChangeText={(newValue) => props.onChange(props.name, newValue)} 
			size="large"
			textStyle={{ paddingStart: 0, marginStart: 0}}
			style={{ marginTop: props.mt, marginBottom: props.mb, width: props.width, borderWidth: 0, backgroundColor: props.bg}}
			status='basic'
		/>
  	);
};
