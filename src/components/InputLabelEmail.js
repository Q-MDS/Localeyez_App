import React from 'react';
import { Input } from '@ui-kitten/components';

export const InputLabelEmail = (props) => 
{
    // const [value, setValue] = React.useState();

    return (
        <Input
			name={props.name}
            label={props.label}
            placeholder={props.placeholder}
            keyboardType="email-address"
            value={props.value}
            size="large"
            style={{ marginTop: props.mt, marginBottom: props.mb, width: props.width}}
			textStyle={{ paddingStart: 0, marginStart: 0, color: '#8C89B7'}}
            // onChangeText={props.setValue}
			onChangeText={(newValue) => props.onChange(props.name, newValue)} 
        />
    );
};
