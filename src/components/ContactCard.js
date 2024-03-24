import React from 'react';
import { TitleTwo } from './TitleTwo';
import { StyleSheet, View } from 'react-native';
import { Avatar,Text } from '@ui-kitten/components';

export const ContactCard = (props) => (
    <View style={styles.row_container}>
    <View><Avatar source={require('../assets/images/list_icon.png')} style={{ width: 82, height: 82, marginEnd: 10 }} /></View>
        <View style={styles.col_container}>
            <TitleTwo title={props.title} />
            <Text status="primary" style={styles.text}>{props.email}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create(
{
    row_container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    col_container: {
        flexDirection: 'column',
    },

    text: {
        fontSize: 16,
        opacity: 0.7,
        margin: 2,
    },
});
