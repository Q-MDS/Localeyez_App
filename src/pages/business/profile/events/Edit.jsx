import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import DbUtils from '../../../../services/DbUtils';
import MainStyles from '../../../../assets/styles/MainStyles';
import { TopNavBackTitleIcon } from '../../../../components/TopNavBackTitleIcon';
import { SafeAreaView, ScrollView, View, Image } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';
import DividerTop from '../../../../components/DividerTop';
import { TitleFour } from '../../../../components/TitleFour';
import { InputLabel } from '../../../../components/InputLabel';
import TextTwo from '../../../../components/TextTwo';
import { InputMultiline } from '../../../../components/InputMultiline';
import { DateSelect } from '../../../../components/DateSelect';
import { TimeSelect } from '../../../../components/TimeSelect';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';

const Add = (props) => 
{
	const [promotion, setPromotion] = useState([]);

    const today = new Date();
    const fiveDaysFromNow = new Date();
    fiveDaysFromNow.setDate(today.getDate() + 5);
    const [eventStartDate, setEventStartDate] = React.useState(new Date());
    const [eventEndDate, setEventEndDate] = React.useState(fiveDaysFromNow);

	console.log('Edit event for id: ', props.route.params.id);

	const getPromotions = async () => 
	{
		const data = await DbUtils.getItem('promotions');
		const parsedData = JSON.parse(data);

		setPromotion(parsedData[Number(props.route.params.id)]);
		console.log('Promotions: ', promotion);
	}

	const showPromotion = () => 
	{

	}

	useFocusEffect(React.useCallback(() => 
	{
		const fetchPromotions = async () => 
		{
			await getPromotions();
			showPromotion();
		};

		fetchPromotions();
	}, []));

    const handleUpload = () => 
    {
        props.navigation.navigate('BusProfProHome');
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* <TopNavArrowTitle title="Add Promotion" alignment="start" navigation={props.navigation} /> */}
        <TopNavBackTitleIcon title="Edit Event" alignment="start" navigation={props.navigation} goBackTo="BusProProAddEditBack" goDelete="BusProfEvtDelete" />
        <DividerTop />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, {backgroundColor: '#fff'}]}>
                    <TitleFour title="Edit Event Display Image" mb={10} />
                    <Layout style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', borderRadius: 10, height: 200 }} >
                    <View style={{ position: 'absolute', top: 15, right: 15, width: 36, height: 36, backgroundColor: '#1E1C4E', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                        <Icon name="edit-2-outline" fill="#fff" style={{ width: 24, height: 24 }} />
                    </View>
                    <Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 64, height: 64 }} />
                </Layout>
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Event Title" placeholder="Skin Care Opening" />
                    <View style={{ marginTop: 15 }} />
                    <InputMultiline label="Event Title" placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />
                    <View style={{ marginTop: 15 }} />
                    <InputMultiline label="Event Description" placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos facere est ullam eum deleniti, assumenda magni illo molestias nostrum qui. Deleniti corporis similique temporibus ex eaque." />
                    <View style={{ marginTop: 15 }} />
                    <TitleFour title="Event Start Date" mb={10} />
                    <DateSelect value={eventStartDate} setDate={setEventStartDate} />
                    <View style={{ marginTop: 15 }} />
                    <TitleFour title="Event End Date" mb={10} />
                    <DateSelect value={eventEndDate} setDate={setEventEndDate} />
                    <View style={{ marginTop: 15 }} />
                    <TitleFour title="Event Time" />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <TextTwo title="Starts:&nbsp;&nbsp;" fontsize={12} width={60} />
                        <TimeSelect mt={10} time={8} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <TextTwo title="Ends:&nbsp;&nbsp;" fontsize={12} width={60} />
                        <TimeSelect mt={10} time={17} />
                    </View>
                    <View style={{ marginTop: 15 }} />
                    <InputLabel placeholder="18 Lane Street" label="Event Location (Optional)" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel placeholder="Suburb" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel placeholder="Cap Town" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel placeholder="Western Cape" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel placeholder="9901" />
                    <ButtonPrimary name="Submit Changes" width="100%" marginTop={25} onpress={handleUpload}/>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Add;