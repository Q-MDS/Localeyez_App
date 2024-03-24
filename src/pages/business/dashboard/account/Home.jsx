import React from "react";
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../../components/TopNavArrowTitle";
import { IconTextIcon } from "../../../../components/IconTextIcon";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../../components/ButtonSecondary";
import { SafeAreaView, View } from "react-native";
import { Layout, Text, Avatar, Divider } from "@ui-kitten/components";

const Home = (props) => 
{
    const handleLogout = () => 
    {
        props.navigation.navigate('LoginBusiness');
    }

    const handleCloseAccount = () => 
    {
        props.navigation.navigate('BusDashAccClose');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Account Details" alignment="start" navigation={props.navigation} goBackTo="BusinessDashboard" />
                    <Layout style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop:40, paddingBottom: 30 }}>
                        <Avatar source={require('../../../../assets/images/list_icon.png')} style={{ width: 64, height: 64 }} />
                        <Text category="h6" status="primary" style={{ fontWeight: 'bold', marginTop: 15 }}>John Smith</Text>
                        <Text category="p1" status="primary">johnsmith@gmail.com</Text>
                    </Layout>
                    <Divider />
                <Layout style={[MainStyles.layout_container ]}>
                    <IconTextIcon title="Edit Personal Information" iconLeft="person-outline" iconRight="chevron-right-outline" navigation={props.navigation} onpress="BusDashAccEdit" />
                    <Divider style={{ height: 25, backgroundColor: 'transparent' }} />
                    <IconTextIcon title="Pricing Plan" iconLeft="pricetags-outline" iconRight="chevron-right-outline" navigation={props.navigation} onpress="BusDashAccPricing" />
                    <Divider style={{ height: 25, backgroundColor: 'transparent' }} />
                    <IconTextIcon title="Security" iconLeft="shield-outline" iconRight="chevron-right-outline" navigation={props.navigation} onpress="BusDashAccSecurity" />
                    <Divider style={{ height: 25, backgroundColor: 'transparent' }} />
                    <IconTextIcon title="Privacy Policy" iconLeft="lock-outline" iconRight="chevron-right-outline" navigation={props.navigation} onpress="BusDashAccHome" />
                    <Layout style={{ flexDirection: 'column', justifyContent: 'center', flex: 1, width: '100%' }} >
                        <ButtonPrimary name="Sign Out" width="100%" onpress={handleLogout} />
                        <View style={{ marginTop: 15 }} />
                        <ButtonSecondary name="Close Account" width="100%" onpress={handleCloseAccount} />
                    </Layout>
                </Layout>
        </SafeAreaView>

    );
};

export default Home;