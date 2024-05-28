import React from 'react';
import { Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const TitleTwo = (props) => (
  <>
    <Text style={styles.text} status={props.status} category="h2">
      {props.title}
    </Text>
  </>
);

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 2,
    },
  });