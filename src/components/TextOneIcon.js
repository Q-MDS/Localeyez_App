import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';

// const iconImage = (props) => (
//     <Icon
//       {...props}
//       name='arrow-back'
//     />
//   );


export const TextOneIcon = (props) => 
{
    console.log('props: ', props);
    return (
    <View style={styles.container}>
        <Icon style={styles.icon} fill='#5D5A88' name={props.iconname} width={props.width} />
        <Text status="primary" style={styles.text}>{props.title}</Text>
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
        fontSize: 16,
        opacity: 0.7,
        margin: 2,
    },
    icon: {
        width: 32,
        height: 32,
      },
});
