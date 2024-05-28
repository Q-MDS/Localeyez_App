import React from 'react';
import { View } from 'react-native';
import { Input, Text } from '@ui-kitten/components';

export const InputLabel = (props) => 
{
	const renderLabel = () => {
		if (props.label !== '') {
			return(
			<View>
			<Text status={props.status} style={{ fontSize: 14, paddingBottom: 5 }}>{props.label}</Text>
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
			style={{ marginTop: props.mt, marginBottom: props.mb, width: props.width}}
			status='basic'
		/>
  	);
};
