import React from 'react';
import { Input, Text } from '@ui-kitten/components';

export const InputPhoneNumber = (props: any) => 
{
  	return (
		<Input
        placeholder={props.placeholder}
        value={props.value}
        keyboardType="phone-pad"
		textStyle={{ height: 35,paddingStart: 0, marginStart: 0}}
        style={{ marginTop: props.mt, marginBottom: props.mb, width: props.width, backgroundColor: props.bg}}
        onChangeText={(newValue) => props.onChange(props.name, newValue)} 
    />
  	);
};