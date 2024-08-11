import React, { useState, useEffect, useReducer } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import DbUtils from '../../../../services/DbUtils';
import MainStyles from '../../../../assets/styles/MainStyles';
import { SafeAreaView, TouchableOpacity, Image, View, StyleSheet, Linking, TextInput, ActivityIndicator } from 'react-native';
import { Layout, Divider, Icon, Card, Tab, TabView, Text } from '@ui-kitten/components';
import { TopNavTitle } from '../../../../components/TopNavTitle';
import { IconText } from '../../../../components/IconText';
import TextOne from '../../../../components/TextOne';
import { BotNavBusiness } from '../../../../components/BotNavBusiness';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';

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
	business_hours: null
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
	const [rating, setRating] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

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
			const record = JSON.parse(profile);
			dispatch(
			{
				type: 'BUSINESS_PROFILE',
				payload: 
				{
					displayImage: record.display_image,
					profilePic: record.profile_pic,
					companyName: record.company_name,
					businessBio: record.business_bio,
					contactNumber: record.contact_number,
					addressOne: record.loc_add_one,
					addressTwo: record.loc_add_two,
					city: record.loc_city,
					province: record.loc_province,
					zipCode: record.loc_zip_code,
					xUrl: record.sm_x,
					instagramUrl: record.sm_inst,
					facebookUrl: record.sm_fb,
					linkedinUrl: record.sm_linkedin,
					wwwUrl: record.sm_www,
					businessHours: JSON.parse(record.business_hours),
				},
			});
		});
    }

	const getPromotions = async () => 
	{
		const data = await DbUtils.getItem('promotions');
		const parsedData = JSON.parse(data);

		setPromotions(parsedData);
		// console.log('Promotions: ', parsedData);asdasd
	}

	const getEvents = async () => 
	{
		const data = await DbUtils.getItem('events');
		const parsedData = JSON.parse(data);

		setEvents(parsedData);
	}

	const getRating = async () => 
	{
		const rating = await DbUtils.getItem('rating')
		.then((rating) => 
		{
			setRating(JSON.parse(rating));
		});
	}

	useFocusEffect(React.useCallback(() => 
	{
		const fetchProfile = async () => 
		{
			await getProfile();
			await getPromotions();
			await getEvents();
			await getRating();
			setIsLoading(false);
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

	if (isLoading) 
	{
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
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
                <Divider style={{ height: 2, width: '100%', backgroundColor: '#00000080', marginTop: 10 }} />
				<ScrollView>
                <Layout style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: '#efe7fd', height: 200, width: '100%' }}>
					{state.displayImage ? <Image source={{ uri: state.displayImage }} style={{ width: '100%', height: '100%',  objectFit: 'cover' }} /> : null}
                </Layout>
				<Divider style={{ height: 2, width: '100%', backgroundColor: '#612BC1', marginBottom: 10 }} />
                <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingTop: 5, paddingBottom: 10, paddingEnd: 15 }} >
					{state.xUrl && 
						<TouchableOpacity onPress={() => Linking.openURL(state.xUrl)}>
							<Image source={require('../../../../assets/images/x_logo.png')} style={{ width: 30, height: 30 }} />
						</TouchableOpacity>
					}
					<View style={{ marginLeft: 8 }} />
					{state.instagramUrl && 
						<TouchableOpacity onPress={() => Linking.openURL(state.instagramUrl)}>
							<Image source={require('../../../../assets/images/insta_logo.png')} style={{ width: 28, height: 28 }} />
						</TouchableOpacity>
					}
					<View style={{ marginLeft: 10 }} />
					{state.facebookUrl && 
						<TouchableOpacity onPress={() => Linking.openURL(state.facebookUrl)}>
							<Image source={require('../../../../assets/images/fb_logo.png')} style={{ width: 32, height: 32 }} />
						</TouchableOpacity>
						}
					<View style={{ marginLeft: 10 }} />
					{state.linkedinUrl && 
						<TouchableOpacity onPress={() => Linking.openURL(state.linkedinUrl)}>
							<Image source={require('../../../../assets/images/link_logo.png')} style={{ width: 28, height: 28 }} />
						</TouchableOpacity>
					}
					<View style={{ marginLeft: 8 }} />
                    {state.wwwUrl && 
						<TouchableOpacity onPress={() => Linking.openURL(state.wwwUrl)}>
							<Image source={require('../../../../assets/images/www_logo.png')} style={{ width: 30, height: 30 }} />
						</TouchableOpacity>
					}
                    <View style={{ position: 'absolute', left: 0, top: -80, borderColor: '#000', borderWidth: 0, borderRadius: 60, padding:  20, backgroundColor: 'transparent' }} >
					{state.profilePic 
						? <Image source={{ uri: state.profilePic }} style={{ width: 96, height: 96, borderRadius: 48, borderColor: 'black', borderWidth: 2  }} /> 
						: <Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 96, height: 96, borderRadius: 48, borderColor: 'black', borderWidth: 1 }} /> 
					}
                    </View>
                    {/* <Avatar source={require('../../../../assets/images/pic_holder.png')} size="giant" style={{ position: 'absolute', left: 20, top: -40, padding: 20,  borderColor: '#000', borderWidth: 1, backgroundColor: 'red', objectFit: 'contain'  }} /> */}
                </Layout>
                
				<Layout style={[MainStyles.column_container, {paddingTop: 10, paddingStart: 20, paddingEnd: 20, paddingBottom: 0}]}>    
					<Card style={{ backgroundColor: '#efeaf9', borderRadius: 10, marginBottom: 10 }}>
						<Text style={[MainStyles.title_aaa]}>{state.companyName}</Text>
						<View style={{ marginTop: 5 }} />
						<Text style={[MainStyles.title_a16, MainStyles.textItalic]}>{state.businessBio}</Text>
						{/* <TextTwo title={state.businessBio} status="basic" /> */}
						
					</Card>

					<Card style={{ marginBottom: 10, borderRadius: 10 }}>
						<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#612bc1', width: '100%', marginBottom: 10 }}>Business Details</Text>
						<IconText title={`${state.addressOne ? state.addressOne : '-'}\n${state.addressTwo ? state.addressTwo : '-'}\n${state.city ? state.city : '-'}\n${state.province ? state.province : '-'}\n${state.zipCode ? state.zipCode : '-'}`} iconname="compass-outline" fontsize={14} width={24} status="basic" />
						<Divider style={{ marginTop: 5, marginBottom: 5 }}/>
						<IconText title={state.contactNumber === "" ? 'No number available' : 'b'} iconname="phone-call-outline" fontsize={14} width={20} status="basic" />
						<Divider style={{ marginTop: 5, marginBottom: 5 }}/>
						<IconText title={`${!rating ? "0" : rating} Rating`} iconname="star-outline" fontsize={14} width={20} status="basic" />
						<Divider style={{ marginTop: 5, marginBottom: 5 }}/>
					</Card>

					{/* Business Hours */}
					<Card style={{ marginBottom: 10, borderRadius: 10 }}>
						<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#612bc1', width: '100%', marginBottom: 10 }}>Business Hours</Text>
						{state.businessHours.map(({ day, open, close }) => (
							<View key={day}>
								<View 
									style={{ 
										flexDirection: 'row', 
										alignItems: 'center', 
										justifyContent: 'space-between', 
										columnGap: 10, 
										borderBottomColor: '#efe7fd', 
										borderBottomWidth: 1, 
										paddingTop: 5, 
										paddingBottom: 5,
										borderTopWidth: day === 'Mon' ? 1 : 0, 
										borderTopColor: day === 'Mon' ? '#efe7fd' : 'transparent', 
										}}  
										key={day}
										>
									<Text style={{ width: 35, color: 'black' }}>{day}</Text>
									<Text style={{ color: '#612bc1', fontSize: 14 }}>{open}</Text>
									<Text style={{ color: '#612bc1', fontSize: 14 }}>-</Text>
									<Text style={{ color: '#612bc1', fontSize: 14, flex: 1 }}>{close}</Text>
								</View>
							</View>
						))}
					</Card>
				</Layout>

				<TabView
					selectedIndex={selectedIndex}
					onSelect={index => setSelectedIndex(index)}
					
				>
				<Tab title='Promotions'>			
				<Layout style={[styles.tabContainer, {marginTop: 20}]}>
					{promotions && promotions.length === 0 && (
						<Card>
					{/* <Layout style={{ alignItems: 'center',backgroundColor: 'white', borderRadius: 10, width: '100%', paddingTop: 30, paddingBottom: 30 }} > */}
						<TextOne title="You have no promotions listed" status="basic" />
						<ButtonPrimary name="Add Promotion" marginTop={15} onpress={handleAddPromo} />
					{/* </Layout> */}
					</Card>
					)}
					{promotions && promotions.map((record, index) => (
						<View key={index} style={{ paddingStart: 20, paddingEnd: 20, width: '100%' }}>
							<Card style={{ marginBottom: 15, backgroundColor: '#ffffff' }}  onPress={() => handleEditPromo(index)}>
								<View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2', width: '100%', height: 200 }} >
									{record.display_image 
									? 
									<Image source={{ uri: record.display_image }} style={{ width: '100%', height: '100%', borderRadius: 5 }} /> 
									:
									<Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 64, height: 64 }} /> 
									}
								</View>
								<Text style={[MainStyles.title_a20, {marginTop: 10, fontWeight: '700', color: '#612bc1'}]}>{record.promo_title}</Text>
								<Text style={[MainStyles.title_a16, {marginTop: 5, color: '#00000080', fontStyle: 'italic' }]}>{record.promo_caption}</Text>
								<Text style={[MainStyles.title_a14, {marginTop: 5, color: '#000' }]}>{record.promo_desc}</Text>
								<View style={{ flexDirection: 'column', alignItems: 'start', width: '100%', justifyContent: 'center', marginTop: 10}} >

									<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
										{/* <Icon fill='#612BC1' name="pricetags-outline" width={18} height={18} /> */}
										{/* <Text style={[MainStyles.title_a14, { marginStart: 5, textAlign: 'left' }]}>{record.sale_item_mp}</Text> */}
										<Text style={[MainStyles.title_a13, { textAlign: 'left', color: '#612bc1' }]}>Promotional Price:</Text>
										<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1 }]}>{record.promo_price}</Text>
									</View>
									<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
										<Text style={[MainStyles.title_a13, { textAlign: 'left', color: '#612bc1' }]}>Sale Off Price:</Text>
										<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1, textDecorationLine: 'line-through' }]}>{record.sale_item_op === "" ? "-" : "999"}</Text>
									</View>
									<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
										<Text style={[MainStyles.title_a13, { textAlign: 'left', color: '#612bc1' }]}>Sale Marked Down Price:</Text>
										<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1, textDecorationLine: 'line-through' }]}>{record.sale_item_op === "" ? "-" : "999"}</Text>
									</View>
									<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
										<Text style={[MainStyles.title_a13, { textAlign: 'left', color: '#612bc1' }]}>Start Date:</Text>
										<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1 }]}>{record.start_date}</Text>
									</View>
									<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
										<Text style={[MainStyles.title_a13, { textAlign: 'left', color: '#612bc1' }]}>End Date:</Text>
										<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1 }]}>{record.end_date}</Text>
									</View>
								</View>
							</Card>
							</View>
						))}
				</Layout>
				</Tab>
				<Tab title='Events'>
					<Layout style={[styles.tabContainer, {marginTop: 20}]}>
						{events && events.length === 0 && (
						<Layout style={{ alignItems: 'center',backgroundColor: 'white', borderRadius: 10, width: '100%', paddingTop: 30, paddingBottom: 30 }} >
							<TextOne title="You have no events listed" status="basic" />
							<ButtonPrimary name="Add Event" marginTop={15} onpress={handleAddEvent} />
						</Layout>
						)}
						{events && events.map((record, index) => 
						(
							<View key={index} style={{ paddingStart: 20, paddingEnd: 20, width: '100%' }}>
								<Card key={index} style={{ marginBottom: 15, backgroundColor: '#ffffff' }} onPress={() => handleEditEvent(index)}>
									<View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2', width: '100%', height: 200, borderColor: 'black', borderWidth: 1 }} >
										{record.display_image 
										? 
										<Image source={{ uri: record.display_image }} style={{ width: '100%', height: '100%', borderRadius: 5 }} /> 
										:
										<Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 64, height: 64 }} /> 
										}
									</View>
									<Text style={[MainStyles.title_a20, {marginTop: 15, fontWeight: '700', color: '#612bc1'}]}>{record.event_title}</Text>
									<Text style={[MainStyles.title_a16, {marginTop: 5, color: '#00000080', fontStyle: 'italic' }]}>{record.event_caption}</Text>
									<Text style={[MainStyles.title_a14, {marginTop: 5, color: '#000' }]}>{record.event_desc}</Text>

									<Text style={[MainStyles.title_a16, {marginTop: 5, color: '#612bc1', fontWeight: 'bold' }]}>{state.companyName}</Text>

									<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
										<Text style={[MainStyles.title_a13, { textAlign: 'left', color: '#612bc1' }]}>Starts:</Text>
										<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1 }]}>{formatDate(record.start_date)} - {record.start_time}</Text>
									</View>
									<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
										<Text style={[MainStyles.title_a13, { textAlign: 'left', color: '#612bc1' }]}>Ends:</Text>
										<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1 }]}>{formatDate(record.end_date)} - {record.end_time}</Text>
									</View>
									<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
										<Text style={[MainStyles.title_a13, { textAlign: 'left', color: '#612bc1', height: '100%' }]}>Where:</Text>
										<View style={{ flexDirection: 'column', alignItems: 'flex-end', flex: 1 }}>
											<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1 }]}>{`${record.loc_add_one || '-'}`}</Text>
											<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1 }]}>{`${record.loc_add_two || '-'}`}</Text>
											<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1 }]}>{`${record.loc_city || '-'}`}</Text>
											<Text style={[MainStyles.title_a13, { textAlign: 'right', flex: 1 }]}>{`${record.loc_province || '-'}`}</Text>

										</View>
									</View>
								</Card>
							</View>
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
	  justifyContent: 'start',
	},
});

export default Home;