import React from 'react';
import { Input } from '@ui-kitten/components';

export const InputPassword = (props: any) => {

//   const [value, setValue] = React.useState();

  return (
    <Input
        label={props.label}
        placeholder={props.placeholder}
        value={props.value}
		secureTextEntry={props.secureTextEntry}
        onChangeText={(newValue) => props.onChange(props.name, newValue)} 
		textStyle={{ paddingStart: 0, marginStart: 0, color: '#8C89B7'}}
		size="large"
        style={{ marginTop: props.mt, marginBottom: props.mb, width: props.width}}
		onFocus={() => {
			props.onFocusPassword(true);
			props.onFocusConfirm(false);
		}}
    />
  );
};