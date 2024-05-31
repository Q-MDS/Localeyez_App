import React, { useState, useEffect, useReducer } from 'react';
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

const initialState = {
	displayImage: null,
	profilePic: null,
	companyName: null,
	contactNumber: null,
	businessBio: null,
	addressOne: null,
	addressTwo: null,
	city: null,
	province: null,
	zipCode: null,
	xUrl: null,
	instagramUrl: null,
	facebookUrl: null,
	linkedinUrl: null,
	wwwUrl: null,
};

function reducer(state, action) 
{
	switch (action.type) 
	{
	  case 'BUSINESS_PROFILE':
		return { ...state, ...action.payload };
	  default:
		throw new Error();
	}
}

const Home = (props) => 
{
	const [state, dispatch] = useReducer(reducer, initialState);

    const [selectedBotTab, setSelectedBotTab] = useState(1);
	const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [selectedTab, setSelectedTab] = useState(0);
	const [promotions, setPromotions] = useState([]);
	const [events, setEvents] = useState([]);

	function handleInputChange(name, newValue) 
	{
		dispatch(
		{
			type: 'BUSINESS_PROFILE',
			payload: {...state, [name]: newValue}
		});
	}

	const getProfile = async () => 
    {
        const profile = await DbUtils.getItem('business_profile')
		.then((profile) => 
        {
			console.log('SHITBALLS: ', profile);
			dispatch(
			{
				type: 'BUSINESS_PROFILE',
				payload: 
				{
					displayImage: JSON.parse(profile).display_image,
					profilePic: JSON.parse(profile).profile_pic,
					companyName: JSON.parse(profile).company_name,
					businessBio: JSON.parse(profile).business_bio,
					contactNumber: JSON.parse(profile).contact_number,
					addressOne: JSON.parse(profile).loc_add_one,
					addressTwo: JSON.parse(profile).loc_add_two,
					city: JSON.parse(profile).loc_city,
					province: JSON.parse(profile).loc_province,
					zipCode: JSON.parse(profile).loc_zip_code,
					xUrl: JSON.parse(profile).sm_x,
					instagramUrl: JSON.parse(profile).sm_inst,
					facebookUrl: JSON.parse(profile).sm_fb,
					linkedinUrl: JSON.parse(profile).sm_linkedin,
					wwwUrl: JSON.parse(profile).sm_www,
				},
			});
		});
		// const parsedProfile = JSON.parse(profile);

		// setCompanyName(parsedProfile.company_name);
		// setBusinessBio(parsedProfile.business_bio);
		// setAddressOne(parsedProfile.location[0].address_one);
		// setAddressTwo(parsedProfile.location[0].address_two);
		// setCity(parsedProfile.location[0].city);
		// setProvince(parsedProfile.location[0].province);
		// setZipCode(parsedProfile.location[0].zip);
		// setContactNumber(parsedProfile.contact_number);
		// setXUrl(parsedProfile.sm_x);
		// setInstagramUrl(parsedProfile.sm_inst);
		// setFacebookUrl(parsedProfile.sm_fb);
		// setLinkedinUrl(parsedProfile.sm_linkedin);
		// setWwwUrl(parsedProfile.sm_www);
		// setDisplayImage(parsedProfile.displayImage);
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
                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, marginTop: 10 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1 }} onPress={handleEditProfile}>
                        <IconText title="Edit Profile" iconname="edit" fontsize={13} width={20} status="primary" />
                    </TouchableOpacity>
					<TouchableOpacity style={{ flexDirection: 'row',flex: 1, justifyContent: 'flex-end' }} onPress={() => handleAddEvent()}>
                        <IconText title="Add Event" iconname="plus-circle" fontsize={13} width={18} status="primary" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }} onPress={handleAddPromo}>
                        <IconText title="Add Promotion" iconname="plus-circle" fontsize={13} width={18} status="primary" />
                    </TouchableOpacity>
                </Layout>
                <Divider style={{ height: 2, width: '100%', backgroundColor: '#612BC1', marginTop: 10 }} />
				<ScrollView>
                <Layout style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: '#efe7fd', height: 200, width: '100%' }}>
					{state.displayImage ? <Image source={{ uri: state.displayImage }} style={{ width: '100%', height: '100%',  objectFit: 'cover' }} /> : null}
                </Layout>
				<Divider style={{ height: 2, width: '100%', backgroundColor: '#612BC1', marginBottom: 10 }} />
                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingTop: 5, paddingBottom: 10, paddingEnd: 15 }} >
					{state.xUrl && <Image source={require('../../../../assets/images/x_logo.png')} style={{ width: 30, height: 30 }} />}
					<View style={{ marginLeft: 8 }} />
					{state.instagramUrl && <Image source={require('../../../../assets/images/insta_logo.png')} style={{ width: 28, height: 28 }} />}
					<View style={{ marginLeft: 10 }} />
					{state.facebookUrl && <Image source={require('../../../../assets/images/fb_logo.png')} style={{ width: 32, height: 32 }} />}
					<View style={{ marginLeft: 10 }} />
					{state.linkedinUrl && <Image source={require('../../../../assets/images/link_logo.png')} style={{ width: 28, height: 28 }} />}
					<View style={{ marginLeft: 8 }} />
                    {state.wwwUrl && <Image source={require('../../../../assets/images/www_logo.png')} style={{ width: 30, height: 30 }} />}
                    <View style={{ position: 'absolute', left: 0, top: -70, borderColor: '#000', borderWidth: 0, borderRadius: 60, padding:  20, backgroundColor: 'transparent' }} >
						{state.profilePic 
						? <Image source={{ uri: state.profilePic }} style={{ width: 96, height: 96, borderRadius: 48, borderColor: 'black', borderWidth: 1  }} /> 
						: <Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 96, height: 96, borderRadius: 48, borderColor: 'black', borderWidth: 1 }} /> 
						}
                    </View>
                    {/* <Avatar source={require('../../../../assets/images/pic_holder.png')} size="giant" style={{ position: 'absolute', left: 20, top: -40, padding: 20,  borderColor: '#000', borderWidth: 1, backgroundColor: 'red', objectFit: 'contain'  }} /> */}
                </Layout>
                
				<Layout style={[MainStyles.column_container]}>    
					{/* <TitleOne title={state.companyName} status="primary" /> */}
					<Text style={[MainStyles.title_aaa]}>{state.companyName}</Text>
					<View style={{ marginTop: 5 }} />
					<Text style={[MainStyles.title_a16]}>{state.businessBio}</Text>
					{/* <TextTwo title={state.businessBio} status="basic" /> */}
					<View style={{ marginTop: 15 }} />
					<IconText title={`${state.addressOne}\n${state.addressTwo}\n${state.city}\n${state.province}\n${state.zipCode}`} iconname="compass-outline" fontsize={14} width={24} status="basic" />
					<IconText title={state.contactNumber} iconname="phone-call-outline" fontsize={14} width={20} status="basic" />
					<IconText title="4.5 Rating - See all reviews" iconname="star-outline" fontsize={14} width={20} status="basic" />
					{/* <Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} /> */}
				</Layout>
				<TabView
					selectedIndex={selectedIndex}
					onSelect={index => setSelectedIndex(index)}
					style={{ width: '100%' }}
				>
				<Tab title='Promotions'>			
				<Layout style={styles.tabContainer}>
					{promotions && promotions.length === 0 && (
					<Layout style={{ alignItems: 'center',backgroundColor: 'white', borderRadius: 10, width: '100%', paddingTop: 30, paddingBottom: 30 }} >
						<TextOne title="You have no promotions listed" status="basic" />
						<ButtonPrimary name="Add Promotion" marginTop={15} onpress={handleAddPromo} />
					</Layout>
					)}
					{promotions && promotions.map((record, index) => (
							<Card key={index} style={{ width: '100%', marginBottom: 15 }}  onPress={() => handleEditPromo(index)}>
								<View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2', width: '100%', height: 200 }} >
									{record.display_image 
									? 
									<Image source={{ uri: record.display_image }} style={{ width: '100%', height: '100%', borderRadius: 5 }} /> 
									:
									<Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 64, height: 64 }} /> 
									}
								</View>
								<Text style={[MainStyles.title_a18, {marginTop: 10, fontWeight: '700'}]}>{record.promo_title}</Text>
								<Text style={[MainStyles.title_a14, {marginTop: 5 }]}>{record.promo_caption}</Text>
								<View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', marginTop: 10}} >
									<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
										<Icon fill='#612BC1' name="pricetags-outline" width={18} height={18} />
										<Text style={[MainStyles.title_a14, { marginStart: 5, textAlign: 'left' }]}>{record.sale_item_mp}</Text>
										<Text style={[MainStyles.title_a14, { marginStart: 10, textAlign: 'left', textDecorationLine: 'line-through' }]}>{record.sale_item_op}</Text>
									</View>
									<View style={{ flex: 1 }}>
										<IconText title={formatDate(record.start_date)} iconname="clock-outline" fontsize={14} width={18} textAlign='right' status="basic"   />
									</View>
								</View>
							</Card>
						))}
				</Layout>
				</Tab>
				<Tab title='Events'>
					<Layout style={styles.tabContainer}>
						{events && events.length === 0 && (
						<Layout style={{ alignItems: 'center',backgroundColor: 'white', borderRadius: 10, width: '100%', paddingTop: 30, paddingBottom: 30 }} >
							<TextOne title="You have no events listed" status="basic" />
							<ButtonPrimary name="Add Event" marginTop={15} onpress={handleAddEvent} />
						</Layout>
						)}
						{events && events.map((record, index) => 
						(
							<Card key={index} style={{ width: '100%', marginBottom: 15 }} onPress={() => handleEditEvent(index)}>
								<View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2', width: '100%', height: 200 }} >
									{record.display_image 
									? 
									<Image source={{ uri: record.display_image }} style={{ width: '100%', height: '100%', borderRadius: 5 }} /> 
									:
									<Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 64, height: 64 }} /> 
									}
								</View>
								<Text style={[MainStyles.title_a18, {marginTop: 10, fontWeight: '700'}]}>{record.event_title}</Text>
								<Text style={[MainStyles.title_a14, {marginTop: 5 }]}>{record.event_caption}</Text>
								<Text style={[MainStyles.title_a14, {marginTop: 5, fontWeight: 'bold', marginTop: 10 }]}>{state.companyName}</Text>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
									<Icon fill='#612BC1' name="calendar-outline" width={18} height={18} />
									<Text style={[MainStyles.title_a14, {marginStart: 10 }]}>{formatDate(record.start_date)}</Text>
								</View>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
									<Icon fill='#612BC1' name="pin-outline" width={18} height={18} />
									{/* <Text style={[MainStyles.title_a14, {marginStart: 10 }]}>{`${record.loc_add_one}, ${record.loc_add_two}, ${record.loc_city}`}</Text> */}
									<Text style={[MainStyles.title_a14, {marginStart: 10 }]}>{`${record.loc_add_one || '-', record.loc_add_two || '-', record.loc_city || '-'}`}</Text>
								</View>
							</Card>
						))}
					</Layout>
				</Tab>
			</TabView>
				
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