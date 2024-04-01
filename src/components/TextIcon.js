import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';

// const iconImage = (props) => (
//     <Icon
//       {...props}
//       name='arrow-back'
//     />
//   );


export const TextIcon = (props) => 
{
    return (
    <View style={[styles.container, {marginTop: props.mt, marginBottom: props.mb}]}>
        <Text status="primary" style={[styles.text, {fontSize: props.fontsize, paddingStart: props.pl}]}>{props.title}</Text>
        <Icon style={styles.icon} fill='#5D5A88' name={props.iconname} width={props.width} />
    </View>
    );
};

const styles = StyleSheet.create(
{
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        flex: 1,
        fontSize: 16,
        opacity: 0.7,
        margin: 2,
    },
    icon: {
        width: 32,
        height: 32,
      },
});
