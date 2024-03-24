import React from 'react';
import { Button } from '@ui-kitten/components';

export const ButtonOutline = (props) => {

    return (
        <Button status="primary" appearance="outline" onPress={props.onpress} size="small" style={{ borderRadius: 20, width: props.width, marginTop: props.marginTop, backgroundColor: 'transparent' }}>
            {props.name}
        </Button>
    );
};
