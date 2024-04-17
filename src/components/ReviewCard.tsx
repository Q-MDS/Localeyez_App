import React from 'react';
import MainStyles from '../assets/styles/MainStyles';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Layout, Avatar, Divider, Icon, Text } from '@ui-kitten/components';
import TextTwo from './TextTwo';
import {IconText} from './IconText';

export const ReviewCard = (props:any) => 
{
    return (
        <Card style={[MainStyles.card_review, {marginBottom: 20}]} status="primary" onPress={() => props.onPress} >
			<Layout style={{ flexDirection: 'row', alignItems: 'center' }} >
				<Avatar source={require('../assets/images/list_icon.png')} style={{ width: 64, height: 64, marginEnd: 15 }} />
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
				<Text category="p2" status="primary" style={{ width: '100%', marginTop: 5 }}>{props.review}</Text>
			</Layout>
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
    }
});