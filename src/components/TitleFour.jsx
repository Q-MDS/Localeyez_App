import React from 'react';
import { Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const TitleFour = (props) => (
  <>
    <Text style={[styles.text, {flex: props.flex, fontSize: props.fontsize, textAlign: props.textalign, marginTop: props.mt, marginBottom: props.mb}]} status={props.status}>
      {props.title}
    </Text>
  </>
);

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 2,
        marginStart: 0,
        marginLeft: 0,
        textAlign: 'left',
        width: '100%',
    },
  });