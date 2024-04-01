import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import DbUtils from '../../../../services/DbUtils';
import MainStyles from '../../../../assets/styles/MainStyles';
import { SafeAreaView, TouchableOpacity, Image, View } from 'react-native';
import { Layout, Divider, Icon } from '@ui-kitten/components';
import { TopNavTitle } from '../../../../components/TopNavTitle';
import { IconText } from '../../../../components/IconText';
import { TitleOne } from '../../../../components/TitleOne';
import TextOne from '../../../../components/TextOne';
import TextTwo from '../../../../components/TextTwo';
import { BotNavBusiness } from '../../../../components/BotNavBusiness';
import { TabsPromoEvent } from '../../../../components/TabsPromoEvent';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import { TitleFour } from '../../../../components/TitleFour';
import CustomIcon from '../../../../components/CustomIcon';

const Home = (props) => 
{
    const [selectedBotTab, setSelectedBotTab] = useState(1);
    const [selectedTab, setSelectedTab] = useState(0);
	const [companyName, setCompanyName] = useState('');
	const [businessBio, setBusinessBio] = useState('');
	const [addressOne, setAddressOne] = useState('');
    const [addressTwo, setAddressTwo] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [contactNumber, setContactNumber] = useState('');
	const [xUrl, setXUrl] = useState('');
    const [instgramUrl, setInstagramUrl] = useState('');
    const [facebookUrl, setFacebookUrl] = useState('');
    const [linkedinUrl, setLinkedinUrl] = useState('');
    const [wwwUrl, setWwwUrl] = useState('');

	const getProfile = async () => 
    {
        const profile = await DbUtils.getItem('business_profile');
		const parsedProfile = JSON.parse(profile);

		setCompanyName(parsedProfile.company_name);
		setBusinessBio(parsedProfile.business_bio);
		setAddressOne(parsedProfile.location[0].address_one);
		setAddressTwo(parsedProfile.location[0].address_two);
		setCity(parsedProfile.location[0].city);
		setProvince(parsedProfile.location[0].province);
		setZipCode(parsedProfile.location[0].zip);
		setContactNumber(parsedProfile.contact_number);
		setXUrl(parsedProfile.sm_x);
		setInstagramUrl(parsedProfile.sm_inst);
		setFacebookUrl(parsedProfile.sm_fb);
		setLinkedinUrl(parsedProfile.sm_linkedin);
		setWwwUrl(parsedProfile.sm_www);
    }

	useFocusEffect(React.useCallback(() => 
	{
		const fetchProfile = async () => 
		{
			await getProfile();
		};

		fetchProfile();
	}, []));
	// );
	// useEffect(() => 
	// {
	// 	const fetchProfile = async () => 
	// 	{
	// 		await getProfile();
	// 	};

	// 	fetchProfile();
	// }, []);

    const handleEditProfile = () => 
    {
        props.navigation.navigate('BusProfEdit');
    };

    const handleAddPromo = () => 
    {
        props.navigation.navigate('BusProfProAdd');
    };

    const handleAddEvent = () => 
    {
        props.navigation.navigate('BusProfEvtAdd');
    };

    useEffect(() => 
    {
        console.log('Set bottom nav index to 1');
        setSelectedBotTab(1);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TopNavTitle title='Business Profile' alignment='start' />
                <Layout style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingRight: 10, marginTop: 10 }}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={handleEditProfile}>
                        <IconText title="Edit Profile" iconname="edit" fontsize={12} width={18} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => handleEditProfile()}>
                        <IconText title="Add Event" iconname="plus-circle" fontsize={12} width={18} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }} onPress={handleAddPromo}>
                        <IconText title="Add Promotion" iconname="plus-circle" fontsize={12} width={18} />
                    </TouchableOpacity>
                </Layout>
                <Divider style={{ height: 2, width: '100%', backgroundColor: '#DEDDE7', marginTop: 10 }} />

                <Layout style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 180, width: '100%' }}>
                    <Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 112, height: 112 }} />
                </Layout>

                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#f5f5f5', paddingTop: 10, paddingBottom: 10, paddingEnd: 15 }} >
					{xUrl && <CustomIcon name="twitter" style={{ width: 32, color: '#B2AEDB' }} />}
					<View style={{ marginLeft: 8 }} />
					{instgramUrl && <CustomIcon name="instagram" style={{ width: 32, color: '#B2AEDB' }} />}
					<View style={{ marginLeft: 10 }} />
					{facebookUrl && <CustomIcon name="facebook-square" style={{ width: 32, color: '#B2AEDB' }} />}
					<View style={{ marginLeft: 10 }} />
					{linkedinUrl && <CustomIcon name="linkedin-square" style={{ width: 32, color: '#B2AEDB' }} />}
					<View style={{ marginLeft: 8 }} />
                    {wwwUrl && <Icon name="globe-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />}
                    <View style={{ position: 'absolute', left: 20, top: -60, borderColor: '#000', borderWidth: 1, borderRadius: 60, padding:  20, backgroundColor: '#f9f9ff' }} >
                        <Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 64, height: 64, borderRadius: 32 }} />
                    </View>
                    {/* <Avatar source={require('../../../../assets/images/pic_holder.png')} size="giant" style={{ position: 'absolute', left: 20, top: -40, padding: 20,  borderColor: '#000', borderWidth: 1, backgroundColor: 'red', objectFit: 'contain'  }} /> */}
                </Layout>
                <ScrollView>
                    <Layout style={[MainStyles.layout_container, {backgroundColor: '#f5f5f5'}]}>    
                        <TitleOne title={companyName} />
                        <View style={{ marginTop: 10 }} />
                        <TextTwo title={businessBio} />
                        <View style={{ marginTop: 15 }} />
                        <IconText title={`${addressOne}, ${addressTwo}, ${city}, ${province}, ${zipCode}`} iconname="compass-outline" fontsize={14} width={18} />
                        <IconText title={contactNumber} iconname="phone-call-outline" fontsize={14} width={18} />
                        <IconText title="4.5 Rating - See all reviews" iconname="star-outline" fontsize={14} width={18} />
                        <Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} />
                        <TabsPromoEvent onchange={setSelectedTab} />
                        {selectedTab === 0 ? (
                        <View style={{ width: '100%' }}>
                            <Layout style={{ alignItems: 'center',backgroundColor: 'white', borderRadius: 10, width: '100%', paddingTop: 30, paddingBottom: 30 }} >
                                <TextOne title="You have no promotions listed" />
                                <ButtonPrimary name="Add Promotion" marginTop={15} onpress={handleAddPromo} />
                            </Layout>
                            <View style={{ marginTop: 10 }} />
                            <TouchableOpacity onPress={() => props.navigation.navigate('BusProfProEdit')}>
                                <Layout style={{ alignItems: 'center',backgroundColor: 'white', borderRadius: 10, width: '100%', padding: 15, }} >
                                    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', width: '100%', height: 140 }} >
                                        <Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 64, height: 64 }} />
                                    </View>
                                    <TitleFour title="Promotion Title" fontsize={16} mt={10} />
                                    <TextTwo title="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
                                    <TextTwo title="Business Name" fontweight='bold' mt={10} width="100%" />
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between'}} >
                                        <IconText title="$200" iconname="pricetags-outline" fontsize={14} width={18} textAlign='left' />
                                        <IconText title="11PM 05.03.2024" iconname="clock-outline" fontsize={14} width={18} textAlign='right' />
                                    </View>
                                </Layout>
                            </TouchableOpacity>
                        </View>
                        ) : (
                            <View style={{ width: '100%' }}>
                                <Layout style={{ alignItems: 'center',backgroundColor: 'white', borderRadius: 10, width: '100%', paddingTop: 30, paddingBottom: 30 }} >
                                    <TextOne title="You have no events listed" />
                                    <ButtonPrimary name="Add Event" marginTop={15} onpress={handleAddEvent} />
                                </Layout>
                                <View style={{ marginTop: 10 }} />
                                <TouchableOpacity onPress={() => props.navigation.navigate('BusProfEvtEdit')}>
                                <Layout style={{ alignItems: 'center',backgroundColor: 'white', borderRadius: 10, width: '100%', padding: 15, }} >
                                    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', width: '100%', height: 140 }} >
                                        <Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 64, height: 64 }} />
                                    </View>
                                    <TitleFour title="Event Title" fontsize={16} mt={10} />
                                    <TextTwo title="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
                                    <TextTwo title="Business Name" fontweight='bold' mt={10} width="100%" />
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between'}} >
                                        <IconText title="$200" iconname="pricetags-outline" fontsize={14} width={18} textAlign='left' />
                                        <IconText title="11PM 05.03.2024" iconname="clock-outline" fontsize={14} width={18} textAlign='right' />
                                    </View>
                                </Layout>
                            </TouchableOpacity>
                            </View>
                        )}
                    </Layout>
                </ScrollView>
            <Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} />
            <BotNavBusiness selected={selectedBotTab}/>
        </SafeAreaView>
    );
};

export default Home;