import React from 'react';
import { Button } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';

export const ButtonOutline = (props) => {

    return (
        <Button status="primary" appearance="outline" onPress={props.onpress} size="small" style={{ flex: props.setFlex, borderRadius: 20, width: props.width, marginTop: props.marginTop, backgroundColor: 'white' }}>
            {props.name}
        </Button>
    );
};
