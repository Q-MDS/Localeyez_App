import React, { useState, useEffect } from 'react';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../components/TopNavBack';
import { SafeAreaView, ScrollView, View, Image  } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { BotNavBrowse } from '../../../components/BotNavBrowse';
import { IconText } from '../../../components/IconText';
import { ButtonPrimary } from '../../../components/ButtonPrimary';

const Home = (props: any) => 
{
	const [event, setEvent] = useState<any>(props.route.params.event);
	const [businessId, setBusinessId] = useState('');
	const startDate = event.start_date;
	const parts = startDate.split('T');

	useEffect(() => 
		{
			setBusinessId(event.business_id);
		}, []);

	const handleBusProfile = () => 
	{
		props.navigation.navigate('ShopperNotiBusView', {businessId: businessId});
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`View Event`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
				<Layout style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 250, width: '100%' }}>
					{/* <Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 112, height: 112 }} /> */}
					<Image source={{uri: event.display_image}} style={{ width: '100%', height: '100%' }} />
				</Layout>
				
                <Layout style={[MainStyles.column_container, { paddingTop: 0, paddingStart: 30, paddingEnd: 30, backgroundColor: '#fff'}]}>
					<Text style={[MainStyles. title_a24, { marginTop: 20, width: '100%' }]} >{event.event_title}</Text>
					<Text style={[MainStyles. title_a16, { opacity: 0.7, lineHeight: 20, marginTop: 5, width: '100%' }]} >{event.event_caption}</Text>
					<Text style={[MainStyles. title_a16, { opacity: 0.7, lineHeight: 20, marginTop: 20, width: '100%' }]} >{event.event_desc}</Text>
					<View style={{ width: '100%', height: 1, backgroundColor: '#DEDDE7', marginTop: 20, marginBottom: 20 }}/>
					<Text style={[MainStyles.title_a16, { width: '100%' }]}>Date & Time</Text>
					<IconText status="basic" title={`${parts[0]} at ${event.start_time}`} iconname="calendar" width={18} fontsize={14} fontweight="600" opacity={0.7} style={{ fontSize: 14, fontWeight: '600', lineHeight: 23, color: '#6A6A6A', opacity: 0.7, width: '100%' }} />
					<Text style={[MainStyles.title_a16, { width: '100%', marginTop: 20 }]}>Location</Text>
					<Text status="basic" style={{ fontSize: 14, fontWeight: '600', lineHeight: 23, color: '#220622', opacity: 0.8, width: '100%' }}>{`${event.loc_add_one ? event.loc_add_one : '-'}\n${event.loc_add_two ? event.loc_add_two : '-'}\n${event.loc_city ? event.loc_city : '-'}\n${event.loc_province ? event.loc_province : '-'}\n${event.loc_zip_code ? event.loc_zip_code : '-'}`}</Text>
					<ButtonPrimary name="View business profile" width="100%" marginTop={40} onpress={handleBusProfile}/>
                </Layout>
            </ScrollView>
        <BotNavBrowse selected={1} />
        </SafeAreaView>
	)
}

export default Home;
