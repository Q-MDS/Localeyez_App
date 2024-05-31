import React from 'react';
import { View } from 'react-native';
import { Input, Text } from '@ui-kitten/components';

export const InputLabelEmail = (props) => 
{
    const renderLabel = () => {
		if (props.label !== '') {
			return(
			<View>
			<Text status={props.status} style={{ fontSize: 16, color: '#220622', paddingBottom: 5 }}>{props.label}</Text>
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
            style={{ marginTop: props.mt, marginBottom: props.mb, width: props.width, backgroundColor: '#f2f2f2', borderWidth: 0}}
			textStyle={{ paddingStart: 0, marginStart: 0}}
            // onChangeText={props.setValue}
			onChangeText={(newValue) => props.onChange(props.name, newValue)} 
        />
    );
};
