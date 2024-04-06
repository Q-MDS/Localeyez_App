import React from 'react';
import { Input } from '@ui-kitten/components';

export const InputPassword = (props: any) => {

//   const [value, setValue] = React.useState();

  return (
    <Input
        label={props.label}
        placeholder={props.placeholder}
        value={props.value}
		secureTextEntry={true}
        onChangeText={props.setValue}
		textStyle={{ paddingStart: 0, marginStart: 0}}
        style={{ marginTop: props.mt, marginBottom: props.mb, width: props.width}}
    />
  );
};