import React from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBack } from "../../../components/TopNavBack";
import DividerTop from "../../../components/DividerTop";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { SafeAreaView, View, Image } from "react-native";
import { Divider, Layout, Text } from "@ui-kitten/components";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import { ScrollView } from "react-native-gesture-handler";
import TextTwo from "../../../components/TextTwo";
import { IconText } from "../../../components/IconText";

const ViewNotification = (props) => 
{
	const linkType = props.route.params.linkType;
	console.log('Link Type Is: ', props.route.params.linkRecord);

    const handleViewBusiness = () => 
    {
        props.navigation.navigate('ShopperNotiList', {businessId: businessId});
    }

	console.log('ViewNotification Props:', props.route.params.linkRecord.promo_title);
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
			<TopNavBack title={props.route.params.businessName} alignment="start" navigation={props.navigation} pops={1} />
            <DividerTop />
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 250, width: '100%' }}>
                    <Image source={require('../../../assets/images/pic_holder.png')} style={{ width: 112, height: 112 }} />
                </View>

				{linkType === 0 ? (
					<ScrollView style={{ width: '100%', backgroundColor: '#ffffff' }}>
                    <Layout style={[MainStyles.layout_container ]}>
                        <Text category="h4" style={{ textAlign: 'left', marginBottom: 15 }}>{props.route.params.linkRecord.promo_title}</Text>
                        <Text category="h6" status="primary">{props.route.params.linkRecord.promo_caption}</Text>
                        <View style={{ marginTop: 10 }} />
                        <Text category="s2" status="primary">{props.route.params.linkRecord.promo_desc}</Text>
                        <View style={{ marginTop: 10 }} />
                        <Divider style={{ height: 2, backgroundColor: '#DEDDE7', width: '100%', marginTop: 25, marginBottom: 25 }} />
                        <TextTwo title="Price" textalign="left" fontsize={16} fontweight='bold' />
                        <IconText title={`${props.route.params.linkRecord.promo_price}`} iconname="pricetags-outline" fontsize={16} width={18} />
                        <View style={{ marginTop: 10 }} />
                        <TextTwo title="Promotion Ends:" textalign="left" fontsize={16} fontweight='bold' />
                        <IconText title={props.route.params.linkRecord.end_date} iconname="clock-outline" fontsize={16} width={18} />
                        <View style={{ marginTop: 10 }} />
                        <TextTwo title="Location:" textalign="left" fontsize={16} fontweight='bold' />
                        <IconText title={`${props.route.params.linkRecord.loc_add_one} ${props.route.params.linkRecord.loc_add_two} ${props.route.params.linkRecord.loc_city} ${props.route.params.linkRecord.loc_province} ${props.route.params.linkRecord.loc_zip_code}`} iconname="pin-outline" fontsize={16} width={18} />
                    	<ButtonPrimary name="View Business Profile sss" width="100%" marginTop={25} onpress={handleClose} />
                    </Layout>
                </ScrollView>
				) : (
					<ScrollView style={{ width: '100%', backgroundColor: '#ffffff' }}>
                    <Layout style={[MainStyles.layout_container ]}>
                        <Text category="h4" style={{ textAlign: 'left', marginBottom: 15 }}>{props.route.params.linkRecord.event_title}</Text>
                        <Text category="h6" status="primary">{props.route.params.linkRecord.event_caption}</Text>
                        <View style={{ marginTop: 10 }} />
                        <Text category="s2" status="primary">{props.route.params.linkRecord.event_desc}</Text>
                        <View style={{ marginTop: 10 }} />
                        <Divider style={{ height: 2, backgroundColor: '#DEDDE7', width: '100%', marginTop: 25, marginBottom: 25 }} />
                        <TextTwo title="Start Date" textalign="left" fontsize={16} fontweight='bold' />
                        <IconText title={`${props.route.params.linkRecord.start_date}`} iconname="pricetags-outline" fontsize={16} width={18} />
                        <TextTwo title="Start Time" textalign="left" fontsize={16} fontweight='bold' />
                        <IconText title={`${props.route.params.linkRecord.start_time}`} iconname="pricetags-outline" fontsize={16} width={18} />

                        <TextTwo title="End Date" textalign="left" fontsize={16} fontweight='bold' />
                        <IconText title={`${props.route.params.linkRecord.end_date}`} iconname="pricetags-outline" fontsize={16} width={18} />
                        <TextTwo title="End Time" textalign="left" fontsize={16} fontweight='bold' />
                        <IconText title={`${props.route.params.linkRecord.end_time}`} iconname="pricetags-outline" fontsize={16} width={18} />

                        <View style={{ marginTop: 10 }} />
                        <TextTwo title="Location:" textalign="left" fontsize={16} fontweight='bold' />
                        <IconText title={`${props.route.params.linkRecord.loc_add_one} ${props.route.params.linkRecord.loc_add_two} ${props.route.params.linkRecord.loc_city} ${props.route.params.linkRecord.loc_province} ${props.route.params.linkRecord.loc_zip_code}`} iconname="pin-outline" fontsize={16} width={18} />
                    	<ButtonPrimary name="View Business Profile" width="100%" marginTop={25} onpress={handleViewBusiness} />
                    </Layout>
                </ScrollView>
				)}
                <BotNavShopper selected={1} navigation={props.navigation} />
        </SafeAreaView>
    );
};

export default ViewNotification;