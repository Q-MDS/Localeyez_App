import React, { useState, useEffect, useReducer} from 'react';
import MainStyles from '../../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../../components/TopNavBack';
import { SafeAreaView, ScrollView, View, Image  } from 'react-native';
import { Layout, Text, Card, Divider } from '@ui-kitten/components';
import TextTwo from '../../../../components/TextTwo';
import { BotNavShopper } from '../../../../components/BotNavShopper';
import { IconText } from '../../../../components/IconText';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import { Label } from '../../../../components/Label';

const Home = (props: any) => 
{
	const [promotion, setPromotion] = useState<any>(props.route.params.promotion);
	const [businessId, setBusinessId] = useState('');

	useEffect(() => 
	{
		setBusinessId(promotion.business_id);
	}, []);

	const handleBusProfile = () => 
	{
		props.navigation.navigate('ShopperNotiBusView', {businessId: businessId});
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        	<TopNavBack title={`Back: Promotion List`} alignment="start" navigation={props.navigation} pops={1} />
				<Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>
					{/* Page title */}
					<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginBottom: 10 }} />
					<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#612bc1', width: '100%' }}>View Promotion</Text>
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
						<Card style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 0, marginBottom: 10 }}>
							<Label title="Promotion Details" textalign="left" mb={5} status="basic" fontsize={16} fontweight='bold' />
							<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, paddingStart: 0 }}>
								<Text style={[MainStyles.title_a14]}>Price</Text>
								<Text style={[MainStyles.title_a16, {fontWeight: 'bold'}]}>{promotion.promo_price}</Text>
							</View>
							<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, paddingStart: 0 }}>
								<Text style={[MainStyles.title_a14]}>Sale Price</Text>
								<Text style={[MainStyles.title_a16, {fontWeight: 'bold'}]}>{promotion.sale_item_op}</Text>
							</View>
							<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, paddingStart: 0 }}>
								<Text style={[MainStyles.title_a14]}>Marked Down Price</Text>
								<Text style={[MainStyles.title_a16, {fontWeight: 'bold'}]}>{promotion.sale_item_mp === null || promotion.sale_item_mp === "" ? "-" : promotion.sale_item_mp}</Text>
							</View>
							</Card>
							<Card style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 0, marginBottom: 10 }}>
								<Label title="Promotion Dates" textalign="left" mb={5} status="basic" fontsize={16} fontweight='bold' />
								<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, paddingStart: 0 }}>
									<Text style={[MainStyles.title_a14]}>Promotion Starts</Text>
									<Text style={[MainStyles.title_a16]}>{promotion.start_date}</Text>
								</View>
							<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, paddingStart: 0 }}>
								<Text style={[MainStyles.title_a14]}>Promotion Ends</Text>
								<Text style={[MainStyles.title_a16]}>{promotion.end_date}</Text>
							</View>
						</Card>
						<Card style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 10, marginBottom: 20 }}>
							<Label title="Location" textalign="left" mb={5} status="basic" fontsize={16} fontweight='bold' />
							<Text style={[MainStyles.title_a14]}>{promotion.loc_add_one === null || promotion.loc_add_one === "" ? "-" : promotion.loc_add_one}</Text>
							<Text style={[MainStyles.title_a14]}>{promotion.loc_add_two === null || promotion.loc_add_two === "" ? "-" : promotion.loc_add_two}</Text>
							<Text style={[MainStyles.title_a14]}>{promotion.loc_city === null || promotion.loc_city === "" ? "-" : promotion.loc_city}</Text>
							<Text style={[MainStyles.title_a14]}>{promotion.loc_province === null || promotion.loc_province === "" ? "-" : promotion.loc_province}</Text>
							<Text style={[MainStyles.title_a14]}>{promotion.loc_zip_code === null || promotion.loc_zip_code === "" ? "-" : promotion.loc_zip_code}</Text>
						</Card>

						<ButtonPrimary name="View Business Profile" width="100%" onpress={handleBusProfile}/>

					</ScrollView>
				</Layout>
        	<BotNavShopper selected={1} />
        </SafeAreaView>
	)
}

export default Home;
