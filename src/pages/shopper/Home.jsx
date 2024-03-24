import React from "react";
import MainStyles from "../../assets/styles/MainStyles";
import { InputSearch } from "../../components/InputSearch";
import { TopNavShpDashboard } from "../../components/TopNavShpDashboard.jsx";
import { BotNavShopper } from "../../components/BotNavShopper";
import { SafeAreaView, Image, View } from "react-native";
import { Layout } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";

const Home = (props) => 
{
    const gotoCatTravel = () => 
    {
        props.navigation.navigate('CatTravel');
    }

    const gotoCatProperty = () => 
    {
        props.navigation.navigate('CatProperty');
    }

    const gotoCatCommunity = () => 
    {
        props.navigation.navigate('CatCommunity');
    }

    const gotoCatEducation = () => 
    {
        props.navigation.navigate('CatEducation');
    }

    const gotoCatHealth = () => 
    {
        props.navigation.navigate('CatHealth');
    }

    const gotoCatShopping = () => 
    {
        props.navigation.navigate('CatShopping');
    }

    const gotoCatEntertainment = () => 
    {
        props.navigation.navigate('CatEntertainment');
    }

    const gotoCatServices = () => 
    {
        props.navigation.navigate('CatServices');
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavShpDashboard title="Marc" navigation={props.navigation}  />
                <Layout style={[MainStyles.layout_container, {backgroundColor: '#fafafa', paddingStart: 20, paddingEnd: 20}]}>
                    <InputSearch placeholder="Find what you're looking for..." />
                    <Layout style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 20, flex: 1 }}>

                        <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={gotoCatTravel} >   
                                        <Image source={require('../../assets/images/cat_travel.png')} style={{ borderRadius: 10, width: '100%' }} />
                                    </TouchableOpacity>
                                </View>
                            <View style={{ width: 10 }} />
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={gotoCatProperty} >   
                                    <Image source={require('../../assets/images/cat_property.png')} style={{ borderRadius: 10, width: '100%' }} />
                                </TouchableOpacity>
                            </View>
                        </Layout>

                        <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: 20 }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={gotoCatCommunity} > 
                                    <Image source={require('../../assets/images/cat_community.png')} style={{ borderRadius: 10, width: '100%' }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 10 }} />
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={gotoCatEducation} > 
                                    <Image source={require('../../assets/images/cat_education.png')} style={{ borderRadius: 10, width: '100%' }} />
                                </TouchableOpacity>
                            </View>
                        </Layout>
                        
                        <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: 20 }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={gotoCatHealth} > 
                                    <Image source={require('../../assets/images/cat_health.png')} style={{ borderRadius: 10, width: '100%' }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 10 }} />
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={gotoCatShopping} > 
                                    <Image source={require('../../assets/images/cat_shopping.png')} style={{ borderRadius: 10, width: '100%' }} />
                                </TouchableOpacity>
                            </View>
                        </Layout>
                        
                        <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={gotoCatEntertainment} > 
                                    <Image source={require('../../assets/images/cat_entertainment.png')} style={{ borderRadius: 10, width: '100%' }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 10 }} />
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={gotoCatServices} > 
                                    <Image source={require('../../assets/images/cat_services.png')} style={{ borderRadius: 10, width: '100%' }} />
                                </TouchableOpacity>
                            </View>
                        </Layout>

                    </Layout>
                        
                </Layout>
                <BotNavShopper navigation={props.navigation} />
        </SafeAreaView>

    );
};

export default Home;