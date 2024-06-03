import React from 'react';
import { View } from 'react-native';
import { Input, Text } from '@ui-kitten/components';

export const InputNumpad = (props) => 
{
  	return (
    <Input
        placeholder={props.placeholder}
        value={props.value}
        keyboardType="number-pad"
		textStyle={{ paddingStart: 0, marginStart: 0}}
        style={{ marginTop: props.mt, marginBottom: props.mb, width: props.width, backgroundColor: props.bg}}
        onChangeText={(newValue) => props.onChange(props.name, newValue)} 
        // onChange={props.onChange}
    />
  );
};