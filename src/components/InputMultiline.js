import React from 'react';
import { Input } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const InputMultiline = (props) => {


  return (
    <Input
        label={props.label}
        placeholder={props.placeholder}
        value={props.value}
        multiline={true}
        textStyle={styles.inputTextStyle}
        onChangeText={props.setValue}
    />
  );
};

const styles = StyleSheet.create({
    input: {
      marginVertical: 2,
    },
    inputTextStyle: {
      minHeight: 64,
    },
  });