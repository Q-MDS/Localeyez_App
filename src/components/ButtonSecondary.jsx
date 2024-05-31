import React from 'react';
import { Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';

export const ButtonSecondary = (props) => {

    return (
		<TouchableOpacity onPress={props.onpress} style={{ height: 60, borderRadius: 30, width: props.width, marginTop: props.marginTop, backgroundColor: '#EFE7FD', justifyContent: 'center', alignItems: 'center' }}>
			<Text style={{ color: '#612BC1', fontSize: 16, fontWeight: '900' }}>{props.name}</Text>
		</TouchableOpacity>
    );
};
