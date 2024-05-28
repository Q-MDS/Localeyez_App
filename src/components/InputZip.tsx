import React from 'react';
import { Input } from '@ui-kitten/components';

export const InputZip = (props: any) => 
{
  	return (
		<Input
        placeholder={props.placeholder}
        value={props.value}
        keyboardType="number-pad"
        style={{ marginTop: props.mt, marginBottom: props.mb, width: props.width, marginStart: 0}}
		textStyle={{ paddingTop: 5, paddingBottom: 5, marginStart: 0}}
        // onChangeText={props.setValue}
		onChangeText={(newValue) => props.onChange(props.name, newValue)} 
        onChange={props.onChange}
    />
  	);
};