import React from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../components/TopNavArrowTitle";
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
    const handleBusinessProfile = () => 
    {
        props.navigation.navigate('ShopperAccHome');
    }
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="AKJ Apparel" alignment="start" navigation={props.navigation} goBackTo="ShopperAccHome" />
            <DividerTop />
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 250, width: '100%' }}>
                    <Image source={require('../../../assets/images/pic_holder.png')} style={{ width: 112, height: 112 }} />
                </View>
                <ScrollView style={{ width: '100%', backgroundColor: '#ffffff' }}>
                    <Layout style={[MainStyles.layout_container ]}>
                        <Text category="h6" style={{ textAlign: 'left', marginBottom: 15 }}>Promotion Title</Text>
                        <Text category="s2" status="primary">Nobis perspiciatis veritatis doloribus fugiat eligendi assumenda quam aliquam nemo?</Text>
                        <View style={{ marginTop: 10 }} />
                        <Text category="s2" status="primary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto dignissimos ipsa, recusandae modi nulla nemo quas esse possimus iusto distinctio! Voluptas similique sint reprehenderit vero quod, obcaecati ad totam numquam aut deserunt dolore.</Text>
                        <View style={{ marginTop: 10 }} />
                        <Text category="s2" status="primary">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem mollitia autem soluta consequatur sunt ratione, consequuntur officiis. Nobis perspiciatis veritatis doloribus fugiat eligendi assumenda quam aliquam nemo?</Text>
                        <Divider style={{ height: 2, backgroundColor: '#DEDDE7', width: '100%', marginTop: 25, marginBottom: 25 }} />
                        <TextTwo title="Price" textalign="left" fontsize={16} fontweight='bold' />
                        <IconText title="$200" iconname="pricetags-outline" fontsize={16} width={18} />
                        <View style={{ marginTop: 10 }} />
                        <TextTwo title="Promotion Ends:" textalign="left" fontsize={16} fontweight='bold' />
                        <IconText title="11PM 05:04:2024" iconname="clock-outline" fontsize={16} width={18} />
                        <View style={{ marginTop: 10 }} />
                        <TextTwo title="Location:" textalign="left" fontsize={16} fontweight='bold' />
                        <IconText title="58 Lake Courtside, Cape Town, South Africa" iconname="pin-outline" fontsize={16} width={18} />
                    <ButtonPrimary name="View Business Profile" width="100%" marginTop={25} onpress={handleBusinessProfile} />
                    </Layout>
                </ScrollView>
                <BotNavShopper selected={1} navigation={props.navigation} />
        </SafeAreaView>
    );
};

export default ViewNotification;