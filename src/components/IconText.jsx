import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';

export const IconText = (props) => 
{
    return (
    <View style={[styles.container]}>
		<View style={{ flexDirection: 'row', alignItems: 'start', height: '100%' }}>
        	<Icon style={styles.icon} fill='#612BC1' name={props.iconname} width={props.width} />
		</View>
        <Text status={props.status} style={[styles.text, { fontSize: props.fontsize, lineHeight: props.lineheight, textDecorationLine: props.underline, textAlign: props.textalign, fontWeight: props.fontweight, opacity: props.opacity}]}>{props.title}</Text>
    </View>
    );
};

const styles = StyleSheet.create(
{
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
