import React from 'react';
import MainStyles from '../assets/styles/MainStyles';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Layout, Avatar, Divider, Icon, Text } from '@ui-kitten/components';
import TextTwo from './TextTwo';
import {IconText} from './IconText';

export const ReviewCard = (props:any) => 
{
	let firstChar = "";
	if (props.firstName) 
	{
		firstChar = props.firstName.charAt(0).toUpperCase();
	} 
	let lastChar = "";
	if (props.lastName) 
	{
		lastChar = props.lastName.charAt(0).toUpperCase();
	} 

    return (
        <Card style={[MainStyles.card_review, {marginBottom: 20}]} status="primary" onPress={() => props.onPress} >
			<TouchableOpacity onPress={props.onPress}>
			<Layout style={{ flexDirection: 'row', alignItems: 'center' }} >
				<View style={styles.avatar}>
                    <Text style={styles.avatarText}>{`${firstChar}${lastChar}`}</Text>
                </View>
				{props.lastName ? (
					<Text category="h5" status="primary" style={{ fontWeight: 'normal', opacity: 0.6 }}>{`${props.firstName} ${props.lastName}`}</Text>
				) : (
					<Text category="h5" status="primary" style={{ fontWeight: 'normal', opacity: 0.6 }}>{`${props.firstName}`}</Text>
				)}
				
			</Layout>
			<Divider style={{ marginTop: 10, marginBottom: 10 }} />
			<Layout style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }} >
				<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }} >
				{Array.from({ length: props.rating }).map((_, index) => (
  					<Icon key={index} name="star" fill="#5D5A88" style={{ width: 16, height: 16, marginEnd: 10 }} />
				))}
				</Layout>
				<Text category="h6" status="primary" style={{ width: '100%', marginTop: 15 }}>{props.title}</Text>
				<Text category="p2" status="basic" style={{ width: '100%', marginTop: 5 }}>{props.review}</Text>
			</Layout>
			</TouchableOpacity>
		</Card>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        width: '100%',
    },

    image: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 150,
        backgroundColor: '#f9f9ff',
    },

    title: {
        width: '100%',
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
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