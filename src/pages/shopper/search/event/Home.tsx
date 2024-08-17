import React, { useState, useEffect } from 'react';
import MainStyles from '../../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../../components/TopNavBack';
import { SafeAreaView, ScrollView, View, Image, Share, Alert  } from 'react-native';
import { Layout, Text, Divider, Card } from '@ui-kitten/components';
import { BotNavShopper } from '../../../../components/BotNavShopper';
import { IconText } from '../../../../components/IconText';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import { Label } from '../../../../components/Label';
import IconShare from '../../../../assets/images/IconShare';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = (props: any) => 
{
	const [event, setEvent] = useState<any>(props.route.params.event);
	const [businessId, setBusinessId] = useState('');
	const startDate = event.start_date;
	const startSplit = startDate.split('T');
	const endDate = event.end_date;
	const endSplit = endDate.split('T');

	useEffect(() => 
		{
			setBusinessId(event.business_id);
		}, []);

	const handleBusProfile = () => 
	{
		props.navigation.navigate('ShopperNotiBusView', {businessId: businessId});
	}

	const handleShare = async () => {
        try {
            const result = await Share.share({
                message: `Check out this event: ${event.name} happening on ${startSplit[0]}!`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            console.log(error.message);
        }
    };

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        	<TopNavBack title={`Back: Events List`} alignment="start" navigation={props.navigation} pops={1} />
				<Layout style={[MainStyles.layout_container, { width: '100%', paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>
					{/* Page title */}
					<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginBottom: 10 }} />
					<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#612bc1' }}>View Event</Text>
						<TouchableOpacity onPress={handleShare}>
						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 110, borderRadius: 8, marginTop: 10, padding: 8, paddingStart: 15, paddingEnd: 15, backgroundColor: '#612bc1' }}>
							<IconShare />
							<Text style={[MainStyles.title_a13, { textAlign: 'left', color: '#FFFFFF' }]}>SHARE</Text>
						</View>
						</TouchableOpacity>
					</View>
					<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginBottom: 5 }} />
					<ScrollView style={{ width: '100%' }}>
						<Card style={{ backgroundColor: '#efeaf9', borderRadius: 10, marginTop: 5, marginBottom: 10, width: '100%' }}>
							<Layout style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 250, width: '100%', marginBottom: 20 }}>
								<Image source={{uri: event.display_image}} style={{ width: '100%', height: '100%', borderRadius: 10, borderColor: '#ccc', borderWidth: 1 }} />
							</Layout>
							<Text style={[MainStyles.title_a24, {color: '#612bc1', fontWeight: 'bold'}]}>{event.event_title}</Text>
							<View style={{ marginTop: 5 }} />
							<Text style={[MainStyles.title_a16, MainStyles.textItalic]}>{event.event_caption}</Text>
							<View style={{ marginTop: 5 }} />
							<Text style={[MainStyles.title_a14]}>{event.event_desc}</Text>
						</Card>
						<Card style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 0, marginBottom: 10 }}>
							<Label title="Event Start & End Dates" textalign="left" mb={5} status="basic" fontsize={16} fontweight='bold' />
							<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, paddingStart: 0 }}>
								<Text style={[MainStyles.title_a14]}>Starts</Text>
								<Text style={[MainStyles.title_a16]}>{`${startSplit[0]} at ${event.start_time}`}</Text>
							</View>
							<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, paddingStart: 0 }}>
								<Text style={[MainStyles.title_a14]}>Ends</Text>
								<Text style={[MainStyles.title_a16]}>{`${endSplit[0]} at ${event.end_time}`}</Text>
							</View>
						</Card>
						<Card style={{ backgroundColor: 'white', borderRadius: 10, marginBottom: 20 }}>
							<Label title="Location" textalign="left" mb={5} status="basic" fontsize={16} fontweight='bold' />
							<Text style={[MainStyles.title_a14]}>{event.loc_add_one === null || event.loc_add_one === "" ? "-" : event.loc_add_one}</Text>
							<Text style={[MainStyles.title_a14]}>{event.loc_add_two === null || event.loc_add_two === "" ? "-" : event.loc_add_two}</Text>
							<Text style={[MainStyles.title_a14]}>{event.loc_city === null || event.loc_city === "" ? "-" : event.loc_city}</Text>
							<Text style={[MainStyles.title_a14]}>{event.loc_province === null || event.loc_province === "" ? "-" : event.loc_province}</Text>
							<Text style={[MainStyles.title_a14]}>{event.loc_zip_code === null || event.loc_zip_code === "" ? "-" : event.loc_zip_code}</Text>
						</Card>
						<ButtonPrimary name="View business profile" width="100%" onpress={handleBusProfile}/>
            		</ScrollView>
				</Layout>
        	<BotNavShopper selected={1} />
        </SafeAreaView>
	)
}

export default Home;
