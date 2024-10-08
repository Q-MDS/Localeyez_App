import React from 'react';
import { View } from 'react-native';
import { Input, Text } from '@ui-kitten/components';

export const InputLabelEmail = (props) => 
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
			name={props.name}
            label={renderLabel}
            placeholder={props.placeholder}
            keyboardType="email-address"
            value={props.value}
            size="large"
            style={{ marginTop: props.mt, marginBottom: props.mb, width: props.width, backgroundColor: props.bg, borderWidth: 0}}
			textStyle={{ paddingStart: 0, marginStart: 0}}
            // onChangeText={props.setValue}
			onChangeText={(newValue) => props.onChange(props.name, newValue)} 
        />
    );
};
