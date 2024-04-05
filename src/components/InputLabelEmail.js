import React from 'react';
import { Input } from '@ui-kitten/components';

export const InputLabelEmail = (props) => 
{
    // const [value, setValue] = React.useState();

    return (
        <Input
            label={props.label}
            placeholder={props.placeholder}
            keyboardType="email-address"
            value={props.value}
            size="large"
            style={{ borderRadius: 15 }}
			textStyle={{ paddingLeft: 0 }}
            onChangeText={props.setValue}
        />
    );
};
