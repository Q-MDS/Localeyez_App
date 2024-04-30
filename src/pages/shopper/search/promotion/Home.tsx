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

	const handleBusProfile = () => 
	{

	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`View Promotion`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
				<Layout style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 250, width: '100%' }}>
					{/* <Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 112, height: 112 }} /> */}
					<Image source={{uri: promotion.display_image}} style={{ width: '100%', height: '100%' }} />
				</Layout>
				
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>
					<Text category='h5' status="primary" style={{ paddingStart: 10,marginTop: 20 }} >{promotion.promo_title}</Text>
					<Text category='p1' status="primary" style={{ paddingStart: 10,marginTop: 20 }} >{promotion.promo_caption}</Text>
					<Text category='p1' status="primary" style={{ paddingStart: 10,marginTop: 20 }} >{promotion.promo_desc}</Text>
					<View style={{  width: '100%', height: 1, backgroundColor: '#DEDDE7', marginTop: 20, marginBottom: 20}}/>
					<Text category='p1' status="primary" style={{ fontWeight: 'bold', paddingStart: 10 }} >Price</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between'}} >
						<IconText title={`R${promotion.sale_item_mp}`} iconname="pricetags-outline" fontsize={14} width={18} textAlign='left' />
						<TextTwo title={`R${promotion.sale_item_op}`} fontweight='normal' mt={5} mb={5} underline="line-through" fontsize={14} textalign="left" flex={1} ps={15} />
					</View>
					<Text category='p1' status="primary" style={{ fontWeight: 'bold', paddingStart: 10, marginTop: 10 }} >Promotion Ends</Text>
					<Text category='p1' status="primary" style={{ paddingStart: 10,marginTop: 0 }} >{promotion.end_date}</Text>
					<Text category='p1' status="primary" style={{ fontWeight: 'bold', paddingStart: 10, marginTop: 10 }} >Location</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between'}} >
						<IconText title={`${promotion.loc_add_one} ${promotion.loc_add_two} ${promotion.loc_city} ${promotion.loc_province} ${promotion.loc_zip_code}`} iconname="pin-outline" fontsize={14} width={18} textAlign='left' />
					</View>
					<ButtonPrimary name="View business profile" width="100%" marginTop={40} onpress={handleBusProfile}/>
                </Layout>
            </ScrollView>
        <BotNavShopper selected={1} />
        </SafeAreaView>
	)
}

export default Home;
