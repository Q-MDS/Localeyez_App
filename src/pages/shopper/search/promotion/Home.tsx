import React, { useState, useEffect, useReducer} from 'react';
import MainStyles from '../../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../../components/TopNavBack';
import { SafeAreaView, ScrollView, View, Image  } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import TextTwo from '../../../../components/TextTwo';
import { BotNavShopper } from '../../../../components/BotNavShopper';

const Home = (props: any) => 
{
	const [promotion, setPromotion] = useState<any>(props.route.params.promotion);
console.log('Promotion: ', promotion);	
	console.log('PROMOTION: ', promotion);
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavBack title={`View Promotion`} alignment="start" navigation={props.navigation} pops={1} />
            <ScrollView>
				<Layout style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 250, width: '100%' }}>
					{/* <Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 112, height: 112 }} /> */}
					<Image source={{uri: promotion.display_image}} style={{ width: '100%', height: '100%' }} />
				</Layout>
				
                <Layout style={[MainStyles.layout_container, { paddingTop: 0, paddingStart: 15, paddingEnd: 15, backgroundColor: '#fff'}]}>
					<Text category='h5' status="primary" style={{ paddingStart: 10,marginTop: 40 }} >{promotion.promo_title}</Text>
					<Text category='p1' status="primary" style={{ paddingStart: 10,marginTop: 20 }} >{promotion.promo_caption}</Text>
					<Text category='p1' status="primary" style={{ paddingStart: 10,marginTop: 20 }} >{promotion.promo_desc}</Text>
					<View style={{  width: '100%', height: 1, backgroundColor: '#DEDDE7', marginTop: 20, marginBottom: 20}}/>
                </Layout>
				
            </ScrollView>
        <BotNavShopper selected={1} />
        </SafeAreaView>
	)
}

export default Home;
