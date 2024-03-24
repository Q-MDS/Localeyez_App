import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

export const TextOneBold = (props) => (
    <>
        <Text status="primary" style={styles.text}>{props.title}</Text>
    </>
);

const styles = StyleSheet.create(
{
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        opacity: 0.7,
        margin: 2,
    },
});
