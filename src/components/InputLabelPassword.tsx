import React from 'react';
import { TouchableWithoutFeedback, View, TouchableOpacity, Image } from 'react-native';
import { Icon, IconElement, Input, Layout, Text } from '@ui-kitten/components';

const AlertIcon = (props: any): IconElement => (
	<Icon
	  {...props}
	  name='alert-circle-outline'
	/>
);

export const InputLabelPassword = (props: any): React.ReactElement => 
{

  	const [value, setValue] = React.useState('');
  	const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  	const toggleSecureEntry = (): void => 
	{
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

	const renderLabel = (): JSX.Element => 
	{
		if (props.label !== '') 
		{
			return <><Text status={props.status} style={{ fontSize: 14, paddingBottom: 5 }}>{props.label}</Text></>;
		} 
		else 
		{
			return <><Text status={props.status} style={{ fontSize: 14, paddingBottom: 5 }}>Password</Text></>;
		}
	};

  	return (
		<Layout style={{ width: '100%', position: 'relative' }}>
			<Input
			value={props.value}
			label={renderLabel()}
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