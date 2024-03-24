import React from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { IconTextIcon } from "../../../components/IconTextIcon";
import { TopNavArrowTitle } from "../../../components/TopNavArrowTitle";
import { SafeAreaView, View } from "react-native";
import { Layout, Text, Avatar, Divider } from "@ui-kitten/components";
import { IconText } from "../../../components/IconText";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../components/ButtonSecondary";
import { TouchableOpacity } from "react-native-gesture-handler";

const Home = (props) => 
{
    const [subType, setSubType] = React.useState('free');

    const handleLogout = () => 
    {
        props.navigation.navigate('LoginBusiness');
    }

    const handleCloseAccount = () => 
    {
        props.navigation.navigate('ShopperAccClose');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Account Details" alignment="start" navigation={props.navigation} goBackTo="BusinessDashboard" />
                    <Layout style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop:40, paddingBottom: 30 }}>
                        <Avatar source={require('../../../assets/images/list_icon.png')} style={{ width: 64, height: 64 }} />
                        <Text category="h6" status="primary" style={{ fontWeight: 'bold', marginTop: 15 }}>Rebecca Shapiro</Text>
                        <Text category="p1" status="primary">rebeccashapiro@gmail.com</Text>
                        {/* <IconText title="Verified Member" iconname="plus-circle" fontsize={12} width={18}  /> */}
                        <Divider style={{ height: 10, backgroundColor: 'transparent' }} />
                        <TouchableOpacity onPress={() => props.navigation.navigate('ShopperVerified')}>
                            <IconText title="Verified Member" iconname="checkmark-circle-2" fontsize={15} width={20}  />
                        </TouchableOpacity>
                    </Layout>
                    <Divider />
                <Layout style={[MainStyles.layout_container ]}>
                    <IconTextIcon title="Edit Profile" iconLeft="person-outline" iconRight="chevron-right-outline" navigation={props.navigation} onpress="ShopperAccEdit" />
                    <Divider style={{ height: 25, backgroundColor: 'transparent' }} />
                    <IconTextIcon title="Edit Interests" iconLeft="pricetags-outline" iconRight="chevron-right-outline" navigation={props.navigation} onpress="ShopperAccIntHome" />
                    <Divider style={{ height: 25, backgroundColor: 'transparent' }} />
                    {subType === 'free' ? 
                        <IconTextIcon title="Pricing Plan" iconLeft="shield-outline" iconRight="chevron-right-outline" navigation={props.navigation} onpress="ShopperAccPlanFree" />
                    :
                        <IconTextIcon title="Pricing Plan" iconLeft="shield-outline" iconRight="chevron-right-outline" navigation={props.navigation} onpress="ShopperAccPlanMem" />
                    }
                    <Divider style={{ height: 25, backgroundColor: 'transparent' }} />
                    <IconTextIcon title="Security" iconLeft="lock-outline" iconRight="chevron-right-outline" navigation={props.navigation} onpress="ShopperAccSecurity" />
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