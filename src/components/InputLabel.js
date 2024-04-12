import React from 'react';
import { Input } from '@ui-kitten/components';

export const InputLabel = (props) => {

//   const [value, setValue] = React.useState();

  return (
    <Input
        label={props.label}
		name={props.name}
        placeholder={props.placeholder}
        value={props.value}
		secureTextEntry={props.secureTextEntry}
        onChangeText={(newValue) => props.onChange(props.name, newValue)} 
		size="large"
		textStyle={{ paddingStart: 0, marginStart: 0, color: '#8C89B7'}}
        style={{ marginTop: props.mt, marginBottom: props.mb, width: props.width}}
		status='basic'
    />
  );
};