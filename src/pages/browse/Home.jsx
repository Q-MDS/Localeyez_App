import React, { useState, useEffect } from "react";
import DbUtils from "../../services/DbUtils";
import { useFocusEffect } from '@react-navigation/native';
import MainStyles from "../../assets/styles/MainStyles";
import { InputSearch } from "../../components/InputSearch";
import { TopNavBrowseDashboard } from "../../components/TopNavBrowseDashboard";
import { BotNavBrowse } from "../../components/BotNavBrowse";
import { BotNavShopper } from "../../components/BotNavShopper";
import { SafeAreaView, ScrollView, Image, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";

const Home = (props) => 
{
    const gotoCatTravel = () => 
    {
        props.navigation.navigate('BrowseTravel');
    }

    const gotoCatProperty = () => 
    {
        props.navigation.navigate('BrowseProperty');
    }

    const gotoCatCommunity = () => 
    {
        props.navigation.navigate('BrowseCommunity');
    }

    const gotoCatEducation = () => 
    {
        props.navigation.navigate('BrowseEducation');
    }

    const gotoCatHealth = () => 
    {
        props.navigation.navigate('BrowseHealth');
    }

    const gotoCatShopping = () => 
    {
        props.navigation.navigate('BrowseShopping');
    }

    const gotoCatEntertainment = () => 
    {
        props.navigation.navigate('BrowseEntertainment');
    }

    const gotoCatServices = () => 
    {
        props.navigation.navigate('BrowseServices');
    }

	const handleReadMore = () => 
	{
		props.navigation.navigate('BrowseRegister');
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TopNavBrowseDashboard title="Browse Businesses" navigation={props.navigation}  />
                <Layout style={[MainStyles.layout_container, {backgroundColor: '#fafafa', paddingStart: 20, paddingEnd: 20}]}>
                    <Layout style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
						<ScrollView style={{ width: '100%' }}>
                        <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',  width: '100%', flex: 1, marginBottom: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={gotoCatTravel} >   
                                        <Image source={require('../../assets/images/cat_travel.png')} style={{ borderRadius: 10, width: '100%',  objectFit: 'scale-down'  }} />
                                    </TouchableOpacity>
                                </View>
                            <View style={{ width: 10 }} />
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={gotoCatProperty} >   
                                    <Image source={require('../../assets/images/cat_property.png')} style={{ borderRadius: 10, width: '100%', objectFit: 'scale-down'  }} />
                                </TouchableOpacity>
                            </View>
                        </Layout>

                        <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', flex: 1, marginBottom: 10 }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={gotoCatCommunity} > 
                                    <Image source={require('../../assets/images/cat_community.png')} style={{ borderRadius: 10, width: '100%', objectFit: 'scale-down'  }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 10 }} />
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={gotoCatEducation} > 
                                    <Image source={require('../../assets/images/cat_education.png')} style={{ borderRadius: 10, width: '100%', objectFit: 'scale-down'  }} />
                                </TouchableOpacity>
                            </View>
                        </Layout>
                        
                        <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', flex: 1, marginBottom: 10 }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={gotoCatHealth} > 
                                    <Image source={require('../../assets/images/cat_health.png')} style={{ borderRadius: 10, width: '100%', objectFit: 'scale-down' }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 10 }} />
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={gotoCatShopping} > 
                                    <Image source={require('../../assets/images/cat_shopping.png')} style={{ borderRadius: 10, width: '100%', objectFit: 'scale-down'  }} />
                                </TouchableOpacity>
                            </View>
                        </Layout>
                        
                        <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', flex: 1, marginBottom: 0 }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={gotoCatEntertainment} > 
                                    <Image source={require('../../assets/images/cat_entertainment.png')} style={{ borderRadius: 10, width: '100%', objectFit: 'scale-down'  }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 10 }} />
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={gotoCatServices} > 
                                    <Image source={require('../../assets/images/cat_services.png')} style={{ borderRadius: 10, width: '100%', objectFit: 'scale-down'  }} />
                                </TouchableOpacity>
                            </View>
                        </Layout>

						<TouchableOpacity onPress={handleReadMore} style={{ alignITEMS: 'center', width: '100%', backgroundColor: '#612bc1', borderRadius: 10, marginTop: 15 }}>
							<Text style={{ fontSize: 15, fontWeight: '500', textAlign: 'center', color: '#fff', padding:10, borderTopColor: '#deded7', borderTopWidth: 1, borderBottomColor: '#deded7', borderBottomWidth: 1 }}>Read more about the benfits of signing up</Text>
						</TouchableOpacity>
					</ScrollView>
                    </Layout>
                </Layout>
                <BotNavBrowse selected={0} navigation={props.navigation} />
        </SafeAreaView>

    );
};

export default Home;