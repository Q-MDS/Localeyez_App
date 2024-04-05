import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { Icon, IconElement, Input, Text } from '@ui-kitten/components';

const AlertIcon = (props: any): IconElement => (
	<Icon
	  {...props}
	  name='alert-circle-outline'
	/>
  );

export const InputLabelPassword = (props: any): React.ReactElement => {

  const [value, setValue] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        {...props}
        name={secureTextEntry ? 'eye-off' : 'eye'}
      />
    </TouchableWithoutFeedback>
  );

  const renderCaption = (): React.ReactElement => {
    return (
      <View style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        <Text style={styles.captionText}>
			Should contain at least 8 characters
        </Text>
      </View>
    );
  };

  return (
    <Input
      value={props.value}
      label='Password'
      placeholder={props.placeholder}
      accessoryRight={renderIcon}
	  caption={renderCaption}
      secureTextEntry={secureTextEntry}
      style={{ borderRadius: 15 }}
      size="large"
      onChangeText={props.setValue}
	  textStyle={{ marginStart: 0}}
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