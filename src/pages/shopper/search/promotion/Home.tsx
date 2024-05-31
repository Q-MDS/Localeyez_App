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
        <TopNavBack title={`View Promotion`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
				<Layout style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 250, width: '100%' }}>
					<Image source={{uri: promotion.display_image}} style={{ width: '100%', height: '100%' }} />
				</Layout>
				
                <Layout style={[MainStyles.column_container, { paddingTop: 0, paddingStart: 30, paddingEnd: 30, backgroundColor: '#fff'}]}>
					<Text style={[MainStyles. title_a24, { marginTop: 20, width: '100%' }]} >{promotion.promo_title}</Text>
					<Text style={[MainStyles. title_a16, { opacity: 0.7, lineHeight: 20, marginTop: 5, width: '100%' }]} >{promotion.promo_caption}</Text>
					<Text style={[MainStyles. title_a16, { opacity: 0.7, lineHeight: 20, marginTop: 20, width: '100%' }]} >{promotion.promo_desc}</Text>
					<View style={{ width: '100%', height: 1, backgroundColor: '#DEDDE7', marginTop: 20, marginBottom: 20 }}/>
					<Text style={[MainStyles.title_a16, { width: '100%' }]}>Price</Text>
					<IconText status="basic" title={promotion.promo_price} iconname="pricetags-outline" width={18} fontsize={16} fontweight="600" opacity={0.7} style={{ fontSize: 16, fontWeight: '600', lineHeight: 23, color: '#220622', opacity: 0.7, width: '100%' }} />
					<Text style={[MainStyles.title_a16, { width: '100%', marginTop: 20 }]}>Sale Price</Text>
					<IconText status="basic" title={promotion.sale_item_op} iconname="pricetags-outline" width={18} fontsize={16} fontweight="600" opacity={0.7} style={{ fontSize: 16, fontWeight: '600', lineHeight: 23, color: '#220622', opacity: 0.7, width: '100%' }} />
					<Text style={[MainStyles.title_a16, { width: '100%', marginTop: 20 }]}>Marked Down Price</Text>
					<IconText  status="basic"title={promotion.sale_item_mp} iconname="pricetags-outline" width={18} fontsize={16} fontweight="600" opacity={0.7} style={{ fontSize: 16, fontWeight: '600', lineHeight: 23, color: '#220622', opacity: 0.7, width: '100%' }} />
					<Text style={[MainStyles.title_a16, { width: '100%', marginTop: 20 }]}>Promotion Ends</Text>
					<IconText status="basic" title={promotion.end_date} iconname="calendar" width={18} fontsize={16} fontweight="600" opacity={0.7} style={{ fontSize: 16, fontWeight: '600', lineHeight: 23, color: '#220622', opacity: 0.7, width: '100%' }} />
					<Text style={[MainStyles.title_a16, { width: '100%', marginTop: 20 }]}>Location</Text>
					<Text status="basic" style={{ fontSize: 16, fontWeight: '600', lineHeight: 23, color: '#6A6A6A', opacity: 0.8, width: '100%' }}>{`${promotion.loc_add_one}\n${promotion.loc_add_two}\n${promotion.loc_city}\n${promotion.loc_province}\n${promotion.loc_zip_code}`}</Text>
					<ButtonPrimary name="View Business Profile" width="100%" marginTop={40} onpress={handleBusProfile}/>
                </Layout>
            </ScrollView>
        <BotNavShopper selected={1} />
        </SafeAreaView>
	)
}

export default Home;
