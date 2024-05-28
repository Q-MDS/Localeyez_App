import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

const TextOne = (props) => (
    <>
        <Text style={[styles.text, { textAlign: props.textAlign, fontWeight: props.fontweight, fontSize: props.fontsize, width: props.width }]} status={props.status} >{props.title}</Text>
    </>
);
//a
const styles = StyleSheet.create(
{
    text: {
        fontSize: 16,
        opacity: 0.7,
        margin: 2,
    },
});

export default TextOne;