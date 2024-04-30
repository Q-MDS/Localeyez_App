import React, { useState, useEffect, useReducer} from 'react';
import MainStyles from '../../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../../components/TopNavBack';
import { SafeAreaView, ScrollView, View, Image  } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import TextTwo from '../../../../components/TextTwo';
import { BotNavShopper } from '../../../../components/BotNavShopper';
import { IconText } from '../../../../components/IconText';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';

const Home = (props: any) => 
{
	const [event, setEvent] = useState<any>(props.route.params.event);
	
	const handleBusProfile = () => 
	{

	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`View Event`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
				<Layout style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 250, width: '100%' }}>
					{/* <Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 112, height: 112 }} /> */}
					<Image source={{uri: event.display_image}} style={{ width: '100%', height: '100%' }} />
				</Layout>
				
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>
					<Text category='h5' status="primary" style={{ paddingStart: 10,marginTop: 20 }} >{event.event_title}</Text>
					<Text category='p1' status="primary" style={{ paddingStart: 10,marginTop: 20 }} >{event.event_caption}</Text>
					<Text category='p1' status="primary" style={{ paddingStart: 10,marginTop: 20 }} >{event.event_desc}</Text>
					<View style={{  width: '100%', height: 1, backgroundColor: '#DEDDE7', marginTop: 20, marginBottom: 20}}/>
					<Text category='p1' status="primary" style={{ fontWeight: 'bold', paddingStart: 10 }} >Date & Time:</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', paddingStart: 10}} >
						<IconText title={`${event.start_date}`} iconname="calendar-outline" fontsize={14} width={18} textAlign='left' />
						<TextTwo title={`${event.start_time}`} fontweight='normal' mt={5} mb={5} fontsize={14} textalign="left" flex={1} ps={15} />
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', paddingStart: 10}} >
						<IconText title={`${event.loc_add_one} ${event.loc_add_two} ${event.loc_city} ${event.loc_province} ${event.loc_zip_code}`} iconname="pin-outline" fontsize={14} width={18} textAlign='left' />
					</View>
					<ButtonPrimary name="View business profile" width="100%" marginTop={40} onpress={handleBusProfile}/>
                </Layout>
            </ScrollView>
        <BotNavShopper selected={1} />
        </SafeAreaView>
	)
}

export default Home;
