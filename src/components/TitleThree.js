import React from 'react';
import { Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const TitleThree = (props) => (
  <>
    <Text style={[styles.text, {flex: props.flex, textAlign: props.textalign}]} status={props.status}>
      {props.title}
    </Text>
  </>
);

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 2,
        marginLeft: 0,
    },
  });