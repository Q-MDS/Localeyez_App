import React from 'react';
import { Input } from '@ui-kitten/components';

export const InputLabelEmail = (props) => 
{
    const [value, setValue] = React.useState();

    return (
        <Input
            label={props.label}
            placeholder={props.placeholder}
            keyboardType="email-address"
            value={value}
            size="large"
            style={{ borderRadius: 15 }}
            onChangeText={nextValue => setValue(nextValue)}
        />
    );
};
