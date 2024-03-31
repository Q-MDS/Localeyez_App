import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { Icon, Input, Text } from '@ui-kitten/components';

const AlertIcon = (props) => (
  <Icon
    {...props}
    name='alert-circle-outline'
  />
);

export const InputLabelPassword = (props) => {

//   const [value, setValue] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        {...props}
        name={secureTextEntry ? 'eye-off' : 'eye'}
      />
    </TouchableWithoutFeedback>
  );

  const renderCaption = ()=> {
    return (
      <View style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        <Text style={styles.captionText}>
            Should contain at least 8 symbols
        </Text>
      </View>
    );
  };

  return (
    <Input
      value={props.value}
      label={props.label}
      placeholder={props.placeholder}
      accessoryRight={renderIcon}
      secureTextEntry={secureTextEntry}
      style={{ borderRadius: 15 }}
      size="large"
      onChangeText={props.setValue}
    />
  );
};

const styles = StyleSheet.create({
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'opensans-regular',
    color: '#8F9BB3',
  },
});