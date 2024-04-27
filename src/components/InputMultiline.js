import React from 'react';
import { Input } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const InputMultiline = (props) => {


  return (
    <Input
        label={props.label}
		name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        multiline={true}
		numberOfLines={props.numLines}
		textStyle={{ textAlignVertical: 'top', padding: 10, paddingTop: 15, marginStart: 0, color: '#8C89B7'}}
        status='basic'
		onChangeText={(newValue) => props.onChange(props.name, newValue)} 
		style={{ borderRadius: 20 }}
    />
  );
};
