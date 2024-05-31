import React from 'react';
import { TextInputMask } from 'react-native-masked-text';

export const InputPhoneNumber = (props: any) => 
{
  	return (
		<TextInputMask 
		type={'custom'} 
		options={{ mask: '+9999 999 9999' }} 
		value={props.value} 
		onChangeText={(newValue) => props.onChange(props.name, newValue)} 
		placeholder={props.placeholder} 
		placeholderTextColor="#d9d9d9"
		keyboardType="phone-pad" 
		style={{ color: '#000000', borderColor: '#e6e9f2', borderWidth: 0, width: '100%', padding: 10, paddingStart: 10, borderRadius: 5, backgroundColor: '#f2f2f2' }} />
  	);
};