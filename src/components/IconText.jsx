import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';

export const IconText = (props) => 
{
    return (
    <View style={[styles.container]}>
        <Icon style={styles.icon} fill='#5D5A88' name={props.iconname} width={props.width} />
        <Text status={props.status} style={[styles.text, { fontSize: props.fontsize, lineHeight: props.lineheight, textDecorationLine: props.underline, textAlign: props.textalign, fontWeight: props.fontweight}]}>{props.title}</Text>
    </View>
    );
};

const styles = StyleSheet.create(
{
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
		// borderColor: 'red',
		// borderWidth: 1,
		margin: 0,
		padding: 0
    },
    text: {
        flexDirection: 'row',
        alignItems: 'center',
		fontSize: 16,
        opacity: 0.7,
        margin: 2,
		marginStart: 10
    },
    icon: {
        width: 24,
        height: 28,
      },
});
