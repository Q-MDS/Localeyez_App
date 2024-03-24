import React, {useState, useEffect} from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBusReviews } from "../../../components/TopNavBusReviews";
import { BotNavBusiness } from "../../../components/BotNavBusiness";
import { SafeAreaView, ScrollView } from "react-native";
import { Layout, Divider, Card, Text, Avatar, Icon } from "@ui-kitten/components";

const ReviewList = (props) => 
{
    const [selectedBotTab, setSelectedBotTab] = useState(2);

    useEffect(() => 
    {
        console.log('Set bottom nav index to 1');
        setSelectedBotTab(2);
    }, []);

    const handelView = () => 
    {
        props.navigation.navigate('ReviewView');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TopNavBusReviews title='Your Reviews' />
                <ScrollView>
                    <Layout style={[MainStyles.layout_container, {backgroundColor: '#fff'}]}>
                        <Card style={[MainStyles.card_review, {marginBottom: 20}]} status="primary" onPress={() => handelView()} >
                            <Layout style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <Avatar source={require('../../../assets/images/list_icon.png')} style={{ width: 64, height: 64, marginEnd: 15 }} />
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
                                <Text category="p2" status="primary" style={{ width: '100%', marginTop: 5 }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis saepe inventore.</Text>
                            </Layout>
                        </Card>
                        <Card style={[MainStyles.card_review, {marginBottom: 20}]} status="primary" >
                            <Layout style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <Avatar source={require('../../../assets/images/list_icon_td.png')} style={{ width: 64, height: 64, marginEnd: 15 }} />
                                <Text category="h5" status="primary" style={{ fontWeight: 'normal', opacity: 0.6 }}>Robert J.</Text>
                            </Layout>
                            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                            <Layout style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }} >
                                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }} >
                                    <Icon name="star" fill="#5D5A88" style={{ width: 16, height: 16, marginEnd: 10 }} />
                                    <Icon name="star" fill="#5D5A88" style={{ width: 16, height: 16, marginEnd: 10 }} />
                                    <Icon name="star" fill="#5D5A88" style={{ width: 16, height: 16, marginEnd: 10 }} />
                                    <Icon name="star" fill="#5D5A88" style={{ width: 16, height: 16, marginEnd: 10 }} />
                                </Layout>
                                <Text category="h6" status="primary" style={{ width: '100%', marginTop: 15 }}>Very happy with the service</Text>
                                <Text category="p2" status="primary" style={{ width: '100%', marginTop: 5 }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis saepe inventore.</Text>
                            </Layout>
                        </Card>
                        <Card style={[MainStyles.card_review, {marginBottom: 20}]} status="primary" >
                            <Layout style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <Avatar source={require('../../../assets/images/list_icon_td.png')} style={{ width: 64, height: 64, marginEnd: 15 }} />
                                <Text category="h5" status="primary" style={{ fontWeight: 'normal', opacity: 0.6 }}>Robert J.</Text>
                            </Layout>
                            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                            <Layout style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }} >
                                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }} >
                                    <Icon name="star" fill="#5D5A88" style={{ width: 16, height: 16, marginEnd: 10 }} />
                                    <Icon name="star" fill="#5D5A88" style={{ width: 16, height: 16, marginEnd: 10 }} />
                                    <Icon name="star" fill="#5D5A88" style={{ width: 16, height: 16, marginEnd: 10 }} />
                                    <Icon name="star" fill="#5D5A88" style={{ width: 16, height: 16, marginEnd: 10 }} />
                                </Layout>
                                <Text category="h6" status="primary" style={{ width: '100%', marginTop: 15 }}>Very happy with the service</Text>
                                <Text category="p2" status="primary" style={{ width: '100%', marginTop: 5 }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis saepe inventore.</Text>
                            </Layout>
                        </Card>

                    </Layout>
                </ScrollView>
                <Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} />
                <BotNavBusiness selected={selectedBotTab}/>
            </SafeAreaView>
    );
};

export default ReviewList;