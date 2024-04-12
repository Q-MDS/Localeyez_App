import React from 'react';
import { TextInputMask } from 'react-native-masked-text';

export const InputPhoneNumber = (props: any) => 
{
  return (
    <TextInputMask 
	type={'custom'} 
	options={{ mask: '(999) 999-9999' }} 
	value={props.value} 
	onChangeText={(newValue) => props.onChange(props.name, newValue)} 
	placeholder={props.placeholder} 
	keyboardType="phone-pad" 
	style={{ color: '#000000', borderColor: '#e6e9f2', borderWidth: 1, width: '100%', padding: 5, borderRadius: 5, backgroundColor: '#f8f9fc' }} />
  	);
};