import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

export const Label = (props) => (
    <>
        <Text status={props.status} style={[styles.text, { lineHeight: props.lineheight, textDecorationLine: props.underline, textAlign: props.textalign, fontWeight: props.fontweight, fontSize: props.fontsize, marginTop: props.mt, marginBottom: props.mb}]}>{props.title}</Text>
    </>
);

const styles = StyleSheet.create(
{
    text: {
		width: '100%',
        fontSize: 14,
        opacity: 1,
    },
});
