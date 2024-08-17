import React from 'react';
import MainStyles from '../assets/styles/MainStyles';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
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
        <Card style={[MainStyles.card_review, {marginBottom: 20, elevation: 2}]} onPress={() => props.onPress} >
			<TouchableOpacity onPress={props.onPress}>
			<Layout style={{ flexDirection: 'row', alignItems: 'center' }} >
				
				{props.profilePic 
				? 
					<View style={{ paddingEnd: 15 }}>
						<Image source={{ uri: props.profilePic }} style={{ width: 84, height: 84, borderRadius: 42 }} /> 
					</View>
				: 
					<View style={styles.avatar}>
						<Text style={styles.avatarText}>{`${firstChar}${lastChar}`}</Text>
					</View>
				}
				{props.lastName ? (
					<View>
						<Text style={[MainStyles.title_a20, { fontWeight: 'normal' }]}>{`${props.firstName} ${lastChar}`}.</Text>
					</View>
				) : (
					<View>
						<Text category="h5" status="primary" style={{ fontWeight: 'normal', opacity: 0.6 }}>{`${props.firstName}`}</Text>
					</View>
				)}
			</Layout>

			<Divider style={{ marginTop: 10, marginBottom: 10 }} />

			<Layout style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }} >
				<Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }} >
				{Array.from({ length: props.rating }).map((_, index) => (
  					<Icon key={index} name="star" fill="#612BC1" style={{ width: 16, height: 16, marginEnd: 10 }} />
				))}
				</Layout>
				<Text style={[ MainStyles.title_a18, { width: '100%', textAlign: 'left', marginTop: 15 }]}>{props.title}</Text>
				<Text style={[ MainStyles.title_a14, { width: '100%', textAlign: 'left', marginTop: 5 }]}>{props.review.length > 25 ? `${props.review.substring(0, 25)}...` : props.review}</Text>
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
        width: 84,
        height: 84,
        borderRadius: 42,
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