import React, { useState, useEffect } from 'react';
import api from '../../../../services/api';
import MainStyles from '../../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../../components/TopNavBack';
import { SafeAreaView, ScrollView, View, Image, Share, Linking  } from 'react-native';
import { Layout, Text, Divider, Card } from '@ui-kitten/components';
import { BotNavShopper } from '../../../../components/BotNavShopper';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import { Label } from '../../../../components/Label';
import IconShare from '../../../../assets/images/IconShare';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconMap from '../../../../assets/images/IconMap';

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

	const handleShare = async () => 
	{
		const baseUrl = api.getUri();
		const url = baseUrl + `/share/init/e/${event.id}`;

        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));


        // try {
        //     const result = await Share.share({
        //         message: `Check out this event: ${event.name} happening on ${startSplit[0]}!`,
        //     });
        //     if (result.action === Share.sharedAction) {
        //         if (result.activityType) {
        //             // shared with activity type of result.activityType
        //         } else {
        //             // shared
        //         }
        //     } else if (result.action === Share.dismissedAction) {
        //         // dismissed
        //     }
        // } catch (error: any) {
        //     console.log(error.message);
        // }
    };

	const openMap = (addressOne: string, addressTwo: string, city: string, province: string, zipcode: string) => 
	{
		const address = `${addressOne}, ${addressTwo}, ${city}, ${province}, ${zipcode}`;
		const encodedAddress = encodeURIComponent(address);
		const url = `https://www.google.com/maps?q=${encodedAddress}`;
		console.log('GPS: ', encodedAddress);
		
		Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
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

						<Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left', color: '#612bc1', marginTop: 20, marginBottom: 10 }}>Event Start & End Dates</Text>
						<View style={{ width: '100%', flexDirection: 'column',  marginBottom: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 5 }}>
							<Text style={[MainStyles.title_a13, MainStyles.mb_1, { fontWeight: 'bold', textAlign: 'left', color: '#612bc1' }]}>Starts</Text>
							<Text style={{ fontSize: 15, textAlign: 'left', flex: 1 }}>{`${startSplit[0]} at ${event.start_time}`}</Text>
						</View>
						<View style={{ width: '100%', flexDirection: 'column',  marginBottom: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 5 }}>
							<Text style={[MainStyles.title_a13, MainStyles.mb_1, { fontWeight: 'bold', textAlign: 'left', color: '#612bc1' }]}>Ends</Text>
							<Text style={{ fontSize: 15, textAlign: 'left', flex: 1 }}>{`${endSplit[0]} at ${event.end_time}`}</Text>
						</View>

						<Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left', color: '#612bc1', marginTop: 20, marginBottom: 10 }}>Location</Text>
						<View style={{ width: '100%', flexDirection: 'column', marginBottom: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 5 }}>
								<Text style={[MainStyles.title_a13, MainStyles.mb_1, { fontWeight: 'bold', textAlign: 'left', color: '#612bc1' }]}>Where</Text>
								<View style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
									<Text style={{ fontSize: 15, textAlign: 'left', flex: 1 }}>{`${event.loc_add_one || '-'}`}</Text>
									<Text style={{ fontSize: 15, textAlign: 'left', flex: 1 }}>{`${event.loc_add_two || '-'}`}</Text>
									<Text style={{ fontSize: 15, textAlign: 'left', flex: 1 }}>{`${event.loc_city || '-'}`}</Text>
									<Text style={{ fontSize: 15, textAlign: 'left', flex: 1 }}>{`${event.loc_province || '-'}`}</Text>
									<Text style={{ fontSize: 15, textAlign: 'left', flex: 1 }}>{`${event.loc_zip_code || '-'}`}</Text>
								</View>
							</View>
							{event.loc_add_one !== null && event.loc_add_one !== "" ? 
							(
								<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', columnGap: 5, marginBottom: 20 }} onPress={() => openMap(event.loc_add_one, event.loc_add_two, event.loc_city, event.loc_province, event.loc_zip_code)}>
									<IconMap />
									<Text style={{ color: '#000', fontSize: 14 }}>View on map</Text>
								</TouchableOpacity>
							) : (
								<View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 5, marginBottom: 20, opacity: 0.3 }}>
									<IconMap />
									<Text style={{ color: '#000', fontSize: 14 }}>View on map</Text>
								</View>
							)}
						<ButtonPrimary name="View business profile" width="100%" onpress={handleBusProfile}/>
            		</ScrollView>
				</Layout>
        	<BotNavShopper selected={1} />
        </SafeAreaView>
	)
}

export default Home;
