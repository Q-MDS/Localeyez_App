import React from 'react';
import { View } from 'react-native';
import { CheckBox } from '@ui-kitten/components';

export const Checkbox = (props) => 
{
    //   const [checked, setChecked] = React.useState(false);

    return (
		<View>
        <CheckBox
            checked={props.checked}
            onChange={props.onChange}
            style={{ width: props.width, marginTop: props.mt, marginBottom: props.mb}}
        >
            {props.label}
        </CheckBox>
		</View>
    );
};
