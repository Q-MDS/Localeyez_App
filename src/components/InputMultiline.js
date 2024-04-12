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
		textStyle={{ paddingStart: 0, marginStart: 0, color: '#8C89B7'}}
        status='basic'
		onChangeText={(newValue) => props.onChange(props.name, newValue)} 
    />
  );
};

const styles = StyleSheet.create({
    input: {
      marginVertical: 2,
    },
    inputTextStyle: {
      minHeight: 64,
	  paddingStart: 0,
	  marginStart: 0
    },
  });