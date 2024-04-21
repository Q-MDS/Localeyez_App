import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Icon, IconElement, Input, Layout, Text } from '@ui-kitten/components';

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
	<Layout style={{ width: '100%', position: 'relative' }}>
		<Input
		value={props.value}
		label={props.label}
		placeholder={props.placeholder}
		// caption={renderCaption}
		secureTextEntry={secureTextEntry}
		style={{ borderRadius: 15 }}
		size="large"
		onChangeText={(newValue) => props.onChange(props.name, newValue)} 
		textStyle={{ marginStart: 0}}
		/>
		<TouchableOpacity style={{ position: 'absolute', right: 10, top: 33 }} onPress={toggleSecureEntry}>
			<Image source={require('../assets/images/icon_eye.png')} style={{ width: 24, height: 24 }} />
		</TouchableOpacity>
	</Layout>
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