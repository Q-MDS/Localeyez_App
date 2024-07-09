import React from 'react';
import { StyleSheet, View, TouchableOpacity, Linking, Touchable } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';

export const IconPhone = (props) => 
{
	const handlePhone = async () =>
	{
		const number = 'tel:' + props.title;
		
		const canOpen = await Linking.canOpenURL(number);

		if (canOpen)
		{
			await Linking.openURL(number);
		}
		else
		{
			console.log(`Cant use this number`);
		}
	}
	
    return (
    <View style={[styles.container]}>
        <Icon style={styles.icon} fill='#612BC1' name={props.iconname} width={props.width} />
		<TouchableOpacity onPress={handlePhone}>
        	<Text status={props.status} style={[styles.text, { fontSize: props.fontsize, lineHeight: props.lineheight, textDecorationLine: props.underline, textAlign: props.textalign, fontWeight: props.fontweight, opacity: props.opacity}]}>{props.title}</Text>
		</TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create(
{
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
		width: '100%',
		// borderColor: 'red',
		// borderWidth: 1,
		margin: 0,
		padding: 0
    },
    text: {
        flexDirection: 'row',
        alignItems: 'center',
		fontSize: 16,
        margin: 2,
		marginStart: 5,
    },
    icon: {
        width: 24,
        height: 28,
      },
});
