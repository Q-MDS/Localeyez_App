import React from "react";
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../../components/TopNavArrowTitle";
import { Text, Card, Avatar, Divider, Icon } from "@ui-kitten/components";
import { SafeAreaView } from "react-native";
import DividerTop from "../../../../components/DividerTop";
import { Layout } from "@ui-kitten/components";

const NotiView = (props) => 
{
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Notifications" alignment="start" navigation={props.navigation} goBackTo="BusDashNoti" />
                <DividerTop />
                <Layout style={[MainStyles.layout_container, {paddingTop: 30}]}>
                    <Card style={[MainStyles.card_review, {marginBottom: 20}]} status="primary" >
                            <Layout style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <Avatar source={require('../../../../assets/images/list_icon.png')} style={{ width: 64, height: 64, marginEnd: 15 }} />
                                <Text category="h5" status="primary" style={{ fontWeight: 'normal', opacity: 0.6 }}>Trevor D.</Text>
                            </Layout>
                            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                            <Layout style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }} >
                                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }} >
                                    <Icon name="star" fill="#5D5A88" style={{ width: 16, height: 16, marginEnd: 10 }} />
                                    <Icon name="star" fill="#5D5A88" style={{ width: 16, height: 16, marginEnd: 10 }} />
                                    <Icon name="star" fill="#5D5A88" style={{ width: 16, height: 16, marginEnd: 10 }} />
                                    <Icon name="star" fill="#5D5A88" style={{ width: 16, height: 16, marginEnd: 10 }} />
                                    <Icon name="star" fill="#5D5A88" style={{ width: 16, height: 16 }} />
                                </Layout>
                                <Text category="h6" status="primary" style={{ width: '100%', marginTop: 15 }}>Great value for money!</Text>
                                <Text category="p2" status="primary" style={{ width: '100%', marginTop: 5 }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum provident voluptatibus voluptatum optio. Porro a velit alias deleniti dolorem nisi, ipsum ut ipsam quis officiis rerum? Aperiam ab voluptatum et.</Text>
                                <Text category="p2" status="primary" style={{ width: '100%', marginTop: 15 }}>Ipsum ut ipsam quis officiis rerum? Aperiam ab voluptatum et.</Text>
                            </Layout>
                        </Card>
                </Layout>
        </SafeAreaView>
    );
}   

export default NotiView;