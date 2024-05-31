import React from 'react';
import MainStyles from '../assets/styles/MainStyles';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Card, Layout, Avatar, Divider, Icon, Text } from '@ui-kitten/components';
import TextTwo from './TextTwo';

export const NotiCard = (props:any) => 
{
	console.log('props.pic', props.notiAdded);
	const strOne = props.title.split(" just listed");
	const businessName = strOne[0];
	const strTwo = props.title.split(businessName);

	const timestamp = props.notiAdded;
	const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds
	console.log('props.pic', currentTimestamp);
	const elapsedSeconds = currentTimestamp - timestamp;

	const elapsedDays = Math.floor(elapsedSeconds / (60 * 60 * 24));
	const elapsedHours = Math.floor((elapsedSeconds % (60 * 60 * 24)) / (60 * 60));

	console.log(`Elapsed time: ${elapsedDays} days and ${elapsedHours} hours`);

    return (
        <TouchableOpacity style={[styles.card,]}  onPress={props.onPress} >
			<Layout style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }} >
				<Image 
				source={props.pic ? { uri: props.pic } : require('../assets/images/pic_holder.png')} 
				style={{ width: 64, height: 64, marginEnd: 15, borderRadius:32, borderColor: 'black', borderWidth: 1 }} 
				/>
				<Layout style={{ flexDirection: 'row', flex: 1, backgroundColor: 'white' }}>
				<Text style={{ flexDirection: 'row', width: '85%' }}>
					<Text style={{ fontWeight: 'bold' }}>{businessName}</Text>
					<Text>{strTwo}</Text>
				</Text>
				{elapsedDays > 0 
				? 
				<Text style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1, textAlign: 'right', opacity: 0.5 }}>{`${elapsedDays}d`}</Text> 
				: 
				<Text style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1, textAlign: 'right', opacity: 0.5 }}>{`${elapsedHours}h`}</Text>
				}
				
				</Layout>
				
			</Layout>
		</TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
		flex: 1,
		marginStart: 20,
		marginEnd: 20,
		marginTop: 10,
		paddingBottom: 20,
		marginBottom: 10,
		borderBottomColor: '#dedde7',
		borderBottomWidth: 1,
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