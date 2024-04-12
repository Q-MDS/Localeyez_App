import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import DbUtils from '../../../../services/DbUtils';
import MainStyles from '../../../../assets/styles/MainStyles';
import { SafeAreaView, TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { Layout, Divider, Icon, Card, Tab, TabView, Text } from '@ui-kitten/components';
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
	const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [selectedTab, setSelectedTab] = useState(0);
	const [promotions, setPromotions] = useState([]);
	const [events, setEvents] = useState([]);
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
	const [displayImage, setDisplayImage] = useState('');

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
		setDisplayImage(parsedProfile.displayImage);
    }

	const getPromotions = async () => 
	{
		const data = await DbUtils.getItem('promotions');
		const parsedData = JSON.parse(data);

		setPromotions(parsedData);
		// console.log('Promotions: ', parsedData);
	}

	const getEvents = async () => 
	{
		const data = await DbUtils.getItem('events');
		const parsedData = JSON.parse(data);

		setEvents(parsedData);
	}

	useFocusEffect(React.useCallback(() => 
	{
		const fetchProfile = async () => 
		{
			await getProfile();
			await getPromotions();
			await getEvents();
		};

		fetchProfile();
	}, []));

	const handleEditProfile = () => 
    {
        props.navigation.navigate('BusProfEdit');
    };

	const handleAddPromo = () => 
    {
        props.navigation.navigate('BusProfProAdd');
    };

	const handleEditPromo = (index) => 
    {
		console.log('Edit promo pressed: ', index);
        props.navigation.navigate('BusProfProEdit', { id: index });
    };

    const handleAddEvent = () => 
    {
        props.navigation.navigate('BusProfEvtAdd');
    };

    const handleEditEvent = (index) => 
    {
        props.navigation.navigate('BusProfEvtEdit', { id: index });
    };

    useEffect(() => 
    {
        console.log('Set bottom nav index to 1');
        setSelectedBotTab(1);
    }, []);

	function formatDate(dateString) 
	{
		if (dateString === "") return "No date set.";
		const date = new Date(dateString);
		const formattedDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
		return formattedDate;
	  }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TopNavTitle title='Business Profile' alignment='start' />
                <Layout style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingRight: 10, marginTop: 10 }}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={handleEditProfile}>
                        <IconText title="Edit Profile" iconname="edit" fontsize={12} width={18} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => handleAddEvent()}>
                        <IconText title="Add Event" iconname="plus-circle" fontsize={12} width={18} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }} onPress={handleAddPromo}>
                        <IconText title="Add Promotion" iconname="plus-circle" fontsize={12} width={18} />
                    </TouchableOpacity>
                </Layout>
                <Divider style={{ height: 2, width: '100%', backgroundColor: '#DEDDE7', marginTop: 10 }} />

                <Layout style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', height: 200, width: '100%' }}>
					{displayImage ? <Image source={{ uri: displayImage }} style={{ width: '100%', height: 200 }} /> : null}
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
                    <Layout style={[MainStyles.layout_container, {backgroundColor: '#f5f5f5', paddingStart: 15, paddingEnd: 15}]}>    
                        <TitleOne title={companyName} />
                        <View style={{ marginTop: 10 }} />
                        <TextTwo title={businessBio} />
                        <View style={{ marginTop: 15 }} />
                        <IconText title={`${addressOne}, ${addressTwo}, ${city}, ${province}, ${zipCode}`} iconname="compass-outline" fontsize={14} width={18} />
                        <IconText title={contactNumber} iconname="phone-call-outline" fontsize={14} width={18} />
                        <IconText title="4.5 Rating - See all reviews" iconname="star-outline" fontsize={14} width={18} />
                        <Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} />
						
						<TabView
							selectedIndex={selectedIndex}
							onSelect={index => setSelectedIndex(index)}
							style={{ width: '100%' }}
						>
						<Tab title='Promotions'>			
							<Layout style={styles.tabContainer}>
								<Layout style={{ alignItems: 'center',backgroundColor: 'white', borderRadius: 10, width: '100%', paddingTop: 30, paddingBottom: 30 }} >
									<TextOne title="You have no promotions listed" />
									<ButtonPrimary name="Add Promotion" marginTop={15} onpress={handleAddPromo} />
								</Layout>
								{promotions && promotions.map((record, index) => (
										<Card key={index} style={{ width: '100%', marginBottom: 15 }}  onPress={() => handleEditPromo(index)}>
											<View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', width: '100%', height: 140 }} >
												{record.display_image 
												? 
												<Image source={{ uri: record.display_image }} style={{ width: '100%', height: '100%' }} /> 
												:
												<Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 64, height: 64 }} /> 
												}
											</View>
											<TitleFour title={record.promo_title} fontsize={16} mt={10}  />
											<TextTwo title={record.promo_caption} />
											<TextTwo title={record.sector} fontweight='bold' mt={5} mb={10} width="100%" />
											<View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between'}} >
												<IconText title={`R${record.sale_item_mp}`} iconname="pricetags-outline" fontsize={14} width={18} textAlign='left' />
												<TextTwo title={`R${record.sale_item_op}`} fontweight='normal' mt={5} mb={5} underline="line-through" fontsize={14} textalign="left" flex={1} ps={15} />
												<IconText title={formatDate(record.start_date)} iconname="clock-outline" fontsize={14} width={18} textAlign='right' />
											</View>
										</Card>
									))}
							</Layout>
						</Tab>
						<Tab title='Events'>
							<Layout style={styles.tabContainer}>
								<Layout style={{ alignItems: 'center',backgroundColor: 'white', borderRadius: 10, width: '100%', paddingTop: 30, paddingBottom: 30 }} >
									<TextOne title="You have no events listed" />
									<ButtonPrimary name="Add Event" marginTop={15} onpress={handleAddEvent} />
								</Layout>
								{events && events.map((record, index) => 
								(
										<Card key={index} style={{ width: '100%', marginBottom: 15 }} onPress={() => handleEditEvent(index)}>
											<View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', width: '100%', height: 140 }} >
												{record.display_image 
												? 
												<Image source={{ uri: record.display_image }} style={{ width: '100%', height: '100%' }} /> 
												:
												<Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 64, height: 64 }} /> 
												}
											</View>
											<TitleFour title={record.event_title} fontsize={16} mt={10} />
											<TextTwo title={record.event_caption} />
											<TextTwo title={record.sector} fontweight='bold' mt={5} mb={10} width="100%" />
											<IconText title={formatDate(record.start_date)} iconname="pricetags-outline" fontsize={14} width={18} textAlign='left' />
											<IconText title={record.loc_add_one} iconname="clock-outline" fontsize={14} width={18} textAlign='right' />
										</Card>
								))}
							</Layout>
						</Tab>
					</TabView>
				</Layout>
			</ScrollView>
		<Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} />
		<BotNavBusiness selected={selectedBotTab}/>
	</SafeAreaView>
    );
};

const styles = StyleSheet.create({
	tabContainer: {
	  alignItems: 'center',
	  justifyContent: 'center',
	  width: '100%'
	},
  });

export default Home;