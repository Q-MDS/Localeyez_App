import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Card, Layout, Avatar, Divider, Icon, Text } from '@ui-kitten/components';
import TextTwo from './TextTwo';

export const BusCard = (props:any) => 
{
	const bg = props.index % 2 === 0 ? '#f9f8fd' : 'white';

	
    return (
        <Card style={[styles.card, { backgroundColor: bg }]} onPress={props.onpress} >
			<Layout style={{ flexDirection: 'row', alignItems: 'center', width: '100%', }} >
				{/* <Image source={{ uri: props.record.profile_pic }} style={{ width: 64, height: 64, marginEnd: 15, borderRadius:32, borderColor: 'black', borderWidth: 1 }} /> */}
				<Image 
				source={props.record.profile_pic ? { uri: props.record.profile_pic } : require('../assets/images/pic_holder.png')} 
				style={{ width: 64, height: 64, marginEnd: 15, borderRadius:32, borderColor: 'black', borderWidth: 1 }} 
				/>
				<Layout style={{ flexDirection: 'column', flex: 1, backgroundColor: bg }}>
					<TextTwo title={props.record.company_name} fontweight="bold" fontsize={16} status="primary" width='100%' />
					<TextTwo title="Sectors" fontWeight="bold" status="basic" />
					<TextTwo title={props.record.sectors && JSON.parse(props.record.sectors).length > 0 ? JSON.parse(props.record.sectors).join(" • ") : "No sectors"} status="basic" />
				</Layout>
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