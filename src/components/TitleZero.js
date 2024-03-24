import React from 'react';
import { Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const TitleZero = (props) => (
  <>
    <Text style={styles.text} status='primary' category="h1">
      {props.title}
    </Text>
  </>
);

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        margin: 2,
        textAlign: 'center',
    },
});

export default TitleZero;