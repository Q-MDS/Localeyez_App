import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

export const Label = (props) => (
    <>
        <Text status="primary" style={[styles.text, { lineHeight: props.lineheight, textDecorationLine: props.underline, textAlign: props.textalign, fontWeight: props.fontweight, marginBottom: props.mb}]}>{props.title}</Text>
    </>
);

const styles = StyleSheet.create(
{
    text: {
        fontSize: 12,
        opacity: 0.7,
    },
});
