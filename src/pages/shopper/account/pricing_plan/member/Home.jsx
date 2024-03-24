import React from "react";
import MainStyles from "../../../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../../../components/TopNavArrowTitle";
import {TextIcon} from "../../../../../components/TextIcon";
import { SafeAreaView } from "react-native";
import { Layout, Avatar, Text, Divider } from "@ui-kitten/components";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../../../components/ButtonSecondary";

const Home = (props) => 
{
    const handleCancel = () => 
    {
        props.navigation.navigate('ShopperAccPlanMemCancel');
    }

    const handleChangeCard = () => 
    {
        props.navigation.navigate('ShopperAccPlanMemUpCardDet');
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Pricing Plan" alignment="start" navigation={props.navigation} goBackTo="ShopperAccHome" />
            <Layout style={[MainStyles.layout_container, { alignItems: 'center' } ]}>
                <Avatar source={require('../../../../../assets/images/price_plan_member.png')} style={{ width: 64, height: 64 }} />
                <Text category="p1" status="primary" style={{ marginTop: 15 }}>$10/month</Text>
                <Text category="h6" status="primary" style={{ fontWeight: 'bold', marginTop: 5 }}>Localeyez Member</Text>
                <Text category="h4" style={{ width: '100%', marginTop: 40, marginBottom: 10}}>Features</Text>
                <Divider style={{width: "100%"}} />
                <TextIcon title="Access to events" iconname="checkmark-circle-2" width={32} mt={15} mb={15} />
                <Divider style={{width: "100%"}} />
                <TextIcon title="Review Businesses" iconname="checkmark-circle-2" width={32} mt={15} mb={15} />
                <Divider style={{width: "100%"}} />
                <TextIcon title="Access to Amazing Discounts" iconname="checkmark-circle-2" width={32} mt={15} mb={15} />
                <Divider style={{width: "100%"}} />
                <ButtonPrimary name="Cancel Subscription" width="100%" marginTop={35} onpress={handleCancel} />
                <ButtonSecondary name="Change Card Details" width="100%" marginTop={15} onpress={handleChangeCard} />
            </Layout>
        </SafeAreaView>
    );
};

export default Home;