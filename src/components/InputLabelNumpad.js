import React from 'react';
import { Input } from '@ui-kitten/components';

export const InputLabelNumpad = (props) => {

  const [value, setValue] = React.useState();

  return (
    <Input
        label={props.label}
        placeholder={props.placeholder}
        value={value}
        keyboardType="number-pad"
        style={{ marginTop: props.mt, marginBottom: props.mb, width: props.width}}
        onChangeText={nextValue => setValue(nextValue)}
    />
  );
};