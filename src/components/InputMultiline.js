import React from 'react';
import { Input, Text } from '@ui-kitten/components';
import { View } from 'react-native';

export const InputMultiline = (props) => 
{
	const renderLabel = () => {
		if (props.label !== '') {
			return(
			<View>
			<Text status={props.status} style={{ fontSize: 14, fontWeight: 'bold', color: '#612bc1', paddingBottom: 10 }}>{props.label}</Text>
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
			multiline={true}
			numberOfLines={props.numLines}
			textStyle={{ paddingTop: 10, paddingBottom: 10, marginStart: 0, height: props.height, textAlignVertical: 'top'}}
			status='basic'
			onChangeText={(newValue) => props.onChange(props.name, newValue)} 
			style={{ borderRadius: 10, borderWidth: 0, backgroundColor: props.bg}}
		/>
  	);
};
