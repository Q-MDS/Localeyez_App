import React from 'react';
import { Input } from '@ui-kitten/components';

export const InputLabelNumpad = (props) => {

  return (
    <Input
        label={props.label}
        placeholder={props.placeholder}
        value={props.value}
        keyboardType="number-pad"
        style={{ marginTop: props.mt, marginBottom: props.mb, width: props.width}}
        onChangeText={props.setValue}
    />
  );
};