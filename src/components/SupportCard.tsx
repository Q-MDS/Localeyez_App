import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Card, Layout, Avatar, Divider, Icon, Text } from '@ui-kitten/components';
import TextTwo from './TextTwo';

export const SupportCard = (props:any) => 
{
	const bg = props.index % 2 === 0 ? '#f9f8fd' : 'white';
	// console.log('Props: ', props);
    return (
        <Card style={[styles.card, { backgroundColor: bg }]} onPress={props.onpress} >
			<Layout style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%', backgroundColor: bg }} >
				<Image source={{ uri: props.record.contact.profile_pic }} style={{ width: 64, height: 64, marginEnd: 15, borderRadius:32, borderColor: 'black', borderWidth: 1 }} />
				{props.record.contact_type === '0' ? (
					<Layout style={{ flexDirection: 'column', flex: 1, backgroundColor: bg }}>
						<TextTwo title={props.record.contact.company_name} status="primary" fontweight="bold" fontsize={16} width='100%' />
						<TextTwo title={`Message: ${props.record.mesage_desc.substring(0, 70) + '...'}`} status="basic" />
					</Layout>

				) : (
					<Layout style={{ flexDirection: 'column', flex: 1, backgroundColor: bg }}>
						<TextTwo title={props.record.contact.first_name} status="primary" fontweight="bold" fontsize={16} width='100%' />
						{/* <TextTwo title={`Message: ${props.record.message_desc.length > 70 ? props.record.message_desc.substring(0, 70) + '...' : props.record.message_desc}`} /> */}
						<TextTwo title={`Message: ${props.record.mesage_desc && props.record.mesage_desc.length > 70 ? props.record.mesage_desc.substring(0, 70) + '...' : props.record.mesage_desc}`} status="basic" />
					</Layout>

				)}



				
			</Layout>
		</Card>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
		flex: 1,
		marginStart: 0,
		width: '100%',
		backgroundColor: '#ff0000'
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