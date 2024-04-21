import React from 'react';
import MainStyles from '../assets/styles/MainStyles';
import { StyleSheet, View } from 'react-native';
import { Card, Layout, Avatar, Divider, Icon, Text } from '@ui-kitten/components';
import TextTwo from './TextTwo';

export const NotiCard = (props:any) => 
{
	const firstChar = props.business.charAt(0).toUpperCase();

    return (
        <Card style={[styles.card,]}  onPress={props.onPress} >
			<Layout style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }} >
				{/* <Avatar source={require('../assets/images/list_icon.png')} style={{ width: 64, height: 64, marginEnd: 15 }} /> */}
				<View style={styles.avatar}>
                    <Text style={styles.avatarText}>{firstChar}</Text>
                </View>
				<Layout style={{ flexDirection: 'column', flex: 1 }}>
					<TextTwo title={props.title} fontweight="bold" fontsize={16} width='100%' />
					<TextTwo title={props.desc} />
				</Layout>
				
			</Layout>
		</Card>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
		flex: 1,
		marginStart: 15,
		marginEnd: 15,
		marginBottom: 10,
		borderRadius: 10,
    },

    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: 15,
    },
    avatarText: {
        color: '#fff',
        fontSize: 24,
    },
});