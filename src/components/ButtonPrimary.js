import React from 'react';
import { Button } from '@ui-kitten/components';

export const ButtonPrimary = (props) => {

    return (
        <Button onPress={props.onPress} size="large" style={{ borderRadius: 20, width: props.width, marginTop: props.marginTop }}>
            {props.name}
        </Button>
    );
};
