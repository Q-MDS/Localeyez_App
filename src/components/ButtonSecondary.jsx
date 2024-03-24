import React from 'react';
import { Button } from '@ui-kitten/components';

export const ButtonSecondary = (props) => {

    return (
        <Button status="primary" appearance="outline" onPress={props.onpress} size="large" style={{ borderRadius: 20, width: props.width, marginTop: props.marginTop }}>
            {props.name}
        </Button>
    );
};
