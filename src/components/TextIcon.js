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
        <Text style={[styles.text, {fontSize: props.fontsize, fontWeight: props.fontweight, paddingStart: props.pl, color: '#220622'}]}>{props.title}</Text>
        <Icon style={styles.icon} fill='#612bc1' name={props.iconname} width={props.width} />
    </View>
    );
};

const styles = StyleSheet.create(
{
    container: {
        flexDirection: 'row',
        alignItems: 'center',
		width: '100%'
    },
    text: {
        flex: 1,
    },
    icon: {
        width: 32,
        height: 32,
      },
});
