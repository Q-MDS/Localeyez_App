import React from 'react';
import { CheckBox } from '@ui-kitten/components';

export const Checkbox = (props) => 
{
    //   const [checked, setChecked] = React.useState(false);

    return (
        <CheckBox
            checked={props.isChecked}
            onChange={props.onchange}
            style={{ width: '100%'}}
        >
            {props.label}
        </CheckBox>
    );
};
