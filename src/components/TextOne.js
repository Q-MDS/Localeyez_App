import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

const TextOne = (props) => (
    <>
        <Text status="primary" style={[styles.text, { textAlign: props.textAlign, fontWeight: props.fontweight, width: props.width }]}>{props.title}</Text>
    </>
);

const styles = StyleSheet.create(
{
    text: {
        fontSize: 16,
        opacity: 0.7,
        margin: 2,
    },
});

export default TextOne;