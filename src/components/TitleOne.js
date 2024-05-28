import React from 'react';
import { Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const TitleOne = (props) => (
  <>
    <Text style={[styles.text, { textAlign: props.textAlign }]} status={props.status}>
      {props.title}
    </Text>
  </>
);

const styles = StyleSheet.create({
    text: {
        fontSize: 28,
        fontWeight: 'bold',
        margin: 2,
        marginStart: 0
    },
});