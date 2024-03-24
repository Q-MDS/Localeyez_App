import React from 'react';
import { Input } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const InputMultiline = (props) => {

  const [value, setValue] = React.useState();

  return (
    <Input
        label={props.label}
        placeholder={props.placeholder}
        value={value}
        multiline={true}
        textStyle={styles.inputTextStyle}
        onChangeText={nextValue => setValue(nextValue)}
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