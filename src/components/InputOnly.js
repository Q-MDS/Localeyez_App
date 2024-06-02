import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Text } from '@ui-kitten/components';

export const InputOnly = (props) => {

  return (
    <Input
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
