import React, { useState, useEffect, useReducer} from 'react';
import MainStyles from '../../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../../components/TopNavBack';
import { SafeAreaView, ScrollView, View, Image  } from 'react-native';
import { Layout, Text, Card, Divider } from '@ui-kitten/components';
import TextTwo from '../../../../components/TextTwo';
import { BotNavShopper } from '../../../../components/BotNavShopper';
import { IconText } from '../../../../components/IconText';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';

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
				<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
					<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#612bc1', width: '100%' }}>View Promotion</Text>
				</View>
				<Divider style={{ height: 1, width: '100%', backgroundColor: '#d6d6d6', marginBottom: 10 }} />
				{/* Promotion details */}
            	<ScrollView style={{ width: '100%' }}>
					{/* Image */}
					<Layout style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 250, width: '100%' }}>
						<Image source={{uri: promotion.display_image}} style={{ width: '100%', height: '100%', borderRadius: 10, borderColor: '#ccc', borderWidth: 1 }} />
					</Layout>
					{/* Promo heading: title, caption, description */}
					<Card style={{ backgroundColor: '#efeaf9', borderRadius: 10, marginTop: 10, marginBottom: 10 }}>
						<Text style={[MainStyles.title_a24, {color: '#612bc1'}]}>{promotion.promo_title}</Text>
						<View style={{ marginTop: 5 }} />
						<Text style={[MainStyles.title_a16, MainStyles.textItalic]}>{promotion.promo_caption}</Text>
						<View style={{ marginTop: 5 }} />
						<Text style={[MainStyles.title_a14]}>{promotion.promo_desc}</Text>
					</Card>
					<Card style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 10, marginBottom: 10 }}>
						<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
							<Text style={[MainStyles.title_a16]}>Price</Text>
							<Text style={[MainStyles.title_a16]}>{promotion.promo_price}</Text>
						</View>
						<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
							<Text style={[MainStyles.title_a16]}>Sale Price</Text>
							<Text style={[MainStyles.title_a16]}>{promotion.sale_item_op}</Text>
						</View>
						<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
							<Text style={[MainStyles.title_a16]}>Marked Down Price</Text>
							<Text style={[MainStyles.title_a16]}>{promotion.sale_item_mp}</Text>
						</View>
						<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
							<Text style={[MainStyles.title_a16]}>Promotion Starts</Text>
							<Text style={[MainStyles.title_a16]}>{promotion.start_date}</Text>
						</View>
						<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
							<Text style={[MainStyles.title_a16]}>Promotion Ends</Text>
							<Text style={[MainStyles.title_a16]}>{promotion.end_date}</Text>
						</View>

					</Card>




					
				
					<Layout style={[MainStyles.column_container, { paddingTop: 0, paddingStart: 30, paddingEnd: 30, backgroundColor: '#fff'}]}>
						<View style={{ width: '100%', height: 1, backgroundColor: '#DEDDE7', marginTop: 20, marginBottom: 20 }}/>
						
						
						<Text style={[MainStyles.title_a16, { width: '100%', marginTop: 20 }]}>Location</Text>
						<Text status="basic" style={{ fontSize: 16, fontWeight: '600', lineHeight: 23, color: '#6A6A6A', opacity: 0.8, width: '100%' }}>{`${promotion.loc_add_one ? promotion.loc_add_one : '-'}\n${promotion.loc_add_two ? promotion.loc_add_two : '-'}\n${promotion.loc_city ? promotion.loc_city : '-'}\n${promotion.loc_province ? promotion.loc_province : '-'}\n${promotion.loc_zip_code ? promotion.loc_zip_code : '-'}`}</Text>
						<ButtonPrimary name="View Business Profile" width="100%" marginTop={40} onpress={handleBusProfile}/>
					</Layout>
            	</ScrollView>
			</Layout>
        <BotNavShopper selected={1} />
        </SafeAreaView>
	)
}

export default Home;
