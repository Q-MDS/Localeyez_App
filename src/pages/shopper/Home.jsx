import React, { useState, useEffect } from "react";
import DbUtils from "../../services/DbUtils";
import { useFocusEffect } from '@react-navigation/native';
import MainStyles from "../../assets/styles/MainStyles";
import { InputSearch } from "../../components/InputSearch";
import { TopNavShpDashboard } from "../../components/TopNavShpDashboard.jsx";
import { BotNavShopper } from "../../components/BotNavShopper";
import { SafeAreaView, ScrollView, Image, View } from "react-native";
import { Layout } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";

const Home = (props) => 
{
	const [shopperName, setShopperName] = useState('');
	const [searchFor, setSearchFor] = useState(''); 
	
	const getProfile = async () => 
    {
        const profile = await DbUtils.getItem('shopper_profile')
        .then((profile) => 
        {
			setShopperName(JSON.parse(profile).first_name);
        });
    }

	useFocusEffect(React.useCallback(() => 
	{
		getProfile();
	}, []));

    const gotoCatTravel = () => 
    {
        props.navigation.navigate('TravelHome');
    }

    const gotoCatProperty = () => 
    {
        props.navigation.navigate('PropertyHome');
    }

    const gotoCatCommunity = () => 
    {
        props.navigation.navigate('CommunityHome');
    }

    const gotoCatEducation = () => 
    {
        props.navigation.navigate('EducationHome');
    }

    const gotoCatHealth = () => 
    {
        props.navigation.navigate('HealthHome');
    }

    const gotoCatShopping = () => 
    {
        props.navigation.navigate('ShoppingHome');
        // props.navigation.navigate('CatShopping');
    }

    const gotoCatEntertainment = () => 
    {
        props.navigation.navigate('EntertainmentHome');
    }

    const gotoCatServices = () => 
    {
        props.navigation.navigate('ServicesHome');
    }

	const handleSearch = () => 
	{
		// Grab searchFor and open main search screen
		// Main search screen must check if it is incoming and auto execute
		   // if props.seachFor is not empty then auto else nothing
		props.navigation.navigate('Search', { searchFor: searchFor});
	}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TopNavShpDashboard title={shopperName} navigation={props.navigation}  />
                <Layout style={[MainStyles.layout_container, {backgroundColor: '#fafafa', paddingStart: 20, paddingEnd: 20}]}>
                    <InputSearch value={searchFor} setValue={setSearchFor} onpress={handleSearch} placeholder="Find what you're looking for..." />
                    <Layout style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 20}}>
				        <ScrollView style={{ width: '100%' }}>

                        <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5, flex: 1 }}>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={gotoCatTravel} >   
                                        <Image source={require('../../assets/images/cat_travel.png')} style={{ borderRadius: 10, width: '100%', objectFit: 'scale-down' }} />
                                    </TouchableOpacity>
                                </View>
                            <View style={{ width: 10 }} />
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={gotoCatProperty} >   
                                    <Image source={require('../../assets/images/cat_property.png')} style={{ borderRadius: 10, width: '100%', objectFit: 'scale-down'  }} />
                                </TouchableOpacity>
                            </View>
                        </Layout>

                        <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5, flex: 1 }}>
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
                        
                        <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5, flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={gotoCatHealth} > 
                                    <Image source={require('../../assets/images/cat_health.png')} style={{ borderRadius: 10, width: '100%', objectFit: 'scale-down'  }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 10 }} />
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={gotoCatShopping} > 
                                    <Image source={require('../../assets/images/cat_shopping.png')} style={{ borderRadius: 10, width: '100%', objectFit: 'scale-down'  }} />
                                </TouchableOpacity>
                            </View>
                        </Layout>
                        
                        <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
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

				</ScrollView>
                    </Layout>
                        
                </Layout>
                <BotNavShopper selected={0} navigation={props.navigation} />
        </SafeAreaView>

    );
};

export default Home;