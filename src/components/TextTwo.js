import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

const TextTwo = (props) => (
    <>
        <Text status="primary" style={[styles.text, 
		{ 
			lineHeight: props.lineheight, 
			textDecorationLine: props.underline, 
			textAlign: props.textalign, 
			fontWeight: props.fontweight, 
			marginTop: props.mt, 
			marginBottom: props.mb, 
			width: props.width, 
			fontSize: props.fontsize, 
			flex: props.flex,
			paddingStart: props.ps
		}]}>{props.title}</Text>
    </>
);
//style={{ textDecorationLine: 'line-through' }} 

const styles = StyleSheet.create(
{
    text: {
        fontSize: 14,
        opacity: 0.7,
		// color: 'black'
    },
});

export default TextTwo;
