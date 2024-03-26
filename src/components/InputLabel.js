import React from 'react';
import { Input } from '@ui-kitten/components';

export const InputLabel = (props) => {

//   const [value, setValue] = React.useState();

  return (
    <Input
        label={props.label}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.setValue}
        style={{ marginTop: props.mt, marginBottom: props.mb, width: props.width}}
    />
  );
};