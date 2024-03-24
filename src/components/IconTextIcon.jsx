import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';

export const IconTextIcon = (props) => 
{
    console.log('props: ', props);
    return (
        <TouchableOpacity style={{ width: '100%' }} onPress={() => props.navigation.navigate(props.onpress)} >
            <View style={styles.container}>
                <Icon style={styles.icon} fill='#5D5A88' name={props.iconLeft} width={props.width} />
                <Text status="primary" style={[styles.text, { flex: 1, paddingLeft: 10, fontSize: props.fontsize, lineHeight: props.lineheight, textDecorationLine: props.underline, textAlign: props.textalign, fontWeight: props.fontweight}]}>{props.title}</Text>
                <Icon style={styles.icon} fill='#5D5A88' name={props.iconRight} width={props.width} />
            </View>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create(
{
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        opacity: 0.7,
        margin: 2,
    },
    icon: {
        width: 32,
        height: 32,
      },
});
