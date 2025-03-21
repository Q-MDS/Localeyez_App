import React, { useState, useEffect, useReducer} from 'react';
import api from '../../../../services/api';
import MainStyles from '../../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../../components/TopNavBack';
import { SafeAreaView, TouchableOpacity, ScrollView, View, Image, Linking  } from 'react-native';
import { Layout, Text, Card, Divider } from '@ui-kitten/components';
import TextTwo from '../../../../components/TextTwo';
import { BotNavShopper } from '../../../../components/BotNavShopper';
import { IconText } from '../../../../components/IconText';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import IconMap from '../../../../assets/images/IconMap';
import IconShare from '../../../../assets/images/IconShare';

const Home = (props: any) => 
{
	const [promotion, setPromotion] = useState<any>(props.route.params.promotion);
	const [businessId, setBusinessId] = useState('');

	useEffect(() => 
	{
		setBusinessId(promotion.business_id);
	}, []);

	const handleShare = async () => 
	{
		const baseUrl = api.getUri();
		const url = baseUrl + `/share/init/p/${promotion.id}`;

		Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
	};

	const handleBusProfile = () => 
	{
		props.navigation.navigate('ShopperNotiBusView', {businessId: businessId});
	}
	
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
        	<TopNavBack title={`Back: Promotion List`} alignment="start" navigation={props.navigation} pops={1} />
				<Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>
					{/* Page title */}
					<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginBottom: 10 }} />
					<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#612bc1' }}>View Promotion</Text>
						<TouchableOpacity onPress={handleShare}>
							<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 110, borderRadius: 8, marginTop: 10, padding: 8, paddingStart: 15, paddingEnd: 15, backgroundColor: '#612bc1' }}>
								<IconShare />
								<Text style={[MainStyles.title_a13, { textAlign: 'left', color: '#FFFFFF' }]}>SHARE</Text>
							</View>
						</TouchableOpacity>
					</View>
					<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginBottom: 5 }} />
					{/* Promotion details */}
					<ScrollView style={{ width: '100%' }}>
						{/* Image */}
						{/* Promo heading: title, caption, description */}
						<Card style={{ backgroundColor: '#efeaf9', borderRadius: 10, marginTop: 5, marginBottom: 10 }}>
							<Layout style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 250, width: '100%', marginBottom: 20 }}>
								<Image source={{uri: promotion.display_image}} style={{ width: '100%', height: '100%', borderRadius: 10, borderColor: '#ccc', borderWidth: 1 }} />
							</Layout>
							<Text style={[MainStyles.title_a24, {color: '#612bc1', fontWeight: 'bold'}]}>{promotion.promo_title}</Text>
							<View style={{ marginTop: 5 }} />
							<Text style={[MainStyles.title_a16, MainStyles.textItalic]}>{promotion.promo_caption}</Text>
							<View style={{ marginTop: 5 }} />
							<Text style={[MainStyles.title_a14]}>{promotion.promo_desc}</Text>
						</Card>

							<Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left', color: '#612bc1', marginTop: 20, marginBottom: 10 }}>Promotion Details</Text>

							<View style={{ width: '100%', flexDirection: 'column',  marginBottom: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 5 }}>
								<Text style={[MainStyles.title_a13, MainStyles.mb_1, { fontWeight: 'bold', textAlign: 'left', color: '#612bc1' }]}>Price</Text>
								<Text style={{ fontSize: 15, textAlign: 'left', flex: 1 }}>{promotion.promo_price}</Text>
							</View>
							<View style={{ width: '100%', flexDirection: 'column',  marginBottom: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 5 }}>
								<Text style={[MainStyles.title_a13, MainStyles.mb_1, { fontWeight: 'bold', textAlign: 'left', color: '#612bc1' }]}>Sale Price</Text>
								<Text style={{ fontSize: 15, textAlign: 'left', flex: 1 }}>{promotion.sale_item_op}</Text>
							</View>
							<View style={{ width: '100%', flexDirection: 'column',  marginBottom: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 5 }}>
								<Text style={[MainStyles.title_a13, MainStyles.mb_1, { fontWeight: 'bold', textAlign: 'left', color: '#612bc1' }]}>Marked Down Price</Text>
								<Text style={{ fontSize: 15, textAlign: 'left', flex: 1 }}>{promotion.sale_item_mp === null || promotion.sale_item_mp === "" ? "-" : promotion.sale_item_mp}</Text>
							</View>

							<Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left', color: '#612bc1', marginTop: 20, marginBottom: 10 }}>Promotion Dates</Text>

							<View style={{ width: '100%', flexDirection: 'column',  marginBottom: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 5 }}>
								<Text style={[MainStyles.title_a13, MainStyles.mb_1, { fontWeight: 'bold', textAlign: 'left', color: '#612bc1' }]}>Promotion Starts</Text>
								<Text style={{ fontSize: 15, textAlign: 'left', flex: 1 }}>{promotion.start_date}</Text>
							</View>
							<View style={{ width: '100%', flexDirection: 'column',  marginBottom: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 5 }}>
								<Text style={[MainStyles.title_a13, MainStyles.mb_1, { fontWeight: 'bold', textAlign: 'left', color: '#612bc1' }]}>Promotion Ends</Text>
								<Text style={{ fontSize: 15, textAlign: 'left', flex: 1 }}>{promotion.end_date}</Text>
							</View>

							<Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left', color: '#612bc1', marginTop: 20, marginBottom: 10 }}>Location</Text>

							<View style={{ width: '100%', flexDirection: 'column', marginBottom: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 5 }}>
								<Text style={[MainStyles.title_a13, MainStyles.mb_1, { fontWeight: 'bold', textAlign: 'left', color: '#612bc1' }]}>Where</Text>
								<View style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
									<Text style={{ fontSize: 15, textAlign: 'left', flex: 1 }}>{`${promotion.loc_add_one || '-'}`}</Text>
									<Text style={{ fontSize: 15, textAlign: 'left', flex: 1 }}>{`${promotion.loc_add_two || '-'}`}</Text>
									<Text style={{ fontSize: 15, textAlign: 'left', flex: 1 }}>{`${promotion.loc_city || '-'}`}</Text>
									<Text style={{ fontSize: 15, textAlign: 'left', flex: 1 }}>{`${promotion.loc_province || '-'}`}</Text>
									<Text style={{ fontSize: 15, textAlign: 'left', flex: 1 }}>{`${promotion.loc_zip_code || '-'}`}</Text>
								</View>
							</View>
							{promotion.loc_add_one !== null && promotion.loc_add_one !== "" ? 
							(
								<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', columnGap: 5, marginBottom: 20 }} onPress={() => openMap(promotion.loc_add_one, promotion.loc_add_two, promotion.loc_city, promotion.loc_province, promotion.loc_zip_code)}>
									<IconMap />
									<Text style={{ color: '#000', fontSize: 14 }}>View on map</Text>
								</TouchableOpacity>
							) : (
								<View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 5, marginBottom: 20, opacity: 0.3 }}>
									<IconMap />
									<Text style={{ color: '#000', fontSize: 14 }}>View on map</Text>
								</View>
							)}

						<ButtonPrimary name="View Business Profile" width="100%" onpress={handleBusProfile}/>

					</ScrollView>
				</Layout>
        	<BotNavShopper selected={1} />
        </SafeAreaView>
	)
}

export default Home;
