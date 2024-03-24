import React from 'react';
import MainStyles from '../../../../assets/styles/MainStyles';
import { TopNavArrowTitle } from '../../../../components/TopNavArrowTitle';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';
import DividerTop from '../../../../components/DividerTop';
import { TitleFour } from '../../../../components/TitleFour';
import { SelectMulti } from '../../../../components/SelectMulti';
import { InputLabel } from '../../../../components/InputLabel';
import TextTwo from '../../../../components/TextTwo';
import { InputMultiline } from '../../../../components/InputMultiline';
import { DateSelect } from '../../../../components/DateSelect';
import { TimeSelect } from '../../../../components/TimeSelect';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';

const Add = (props) => 
{
    const [eventStartDate, setEventStartDate] = React.useState('');
    const [eventEndDate, setEventEndDate] = React.useState('');

    const handleUpload = () => 
    {
        props.navigation.navigate('BusProfProHome');
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* <TopNavArrowTitle title="Add Promotion" alignment="start" navigation={props.navigation} /> */}
        <TopNavArrowTitle title="Add Event" alignment="start" navigation={props.navigation} goBackTo="BusProfEvtAddEditBack" />
        <DividerTop />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, {backgroundColor: '#fff'}]}>
                    <TitleFour title="Choose which business sector(s) your event falls under:" />
                    <SelectMulti mt={10} />
                    <TitleFour title="Upload Display Picture" mb={10} />
                    <Layout style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: '#b8b7c8', borderWidth: 1, borderRadius: 10, padding: 20 }} >
                        <Icon name="upload-outline" fill="#B2AEDB" style={{ width: 48, height: 48 }} />
                        <TextTwo title="Add an image for the banner of your event" textalign="center" fontsize={13} mb={10} />
                        <TextTwo title="Image specification 640 x 360px" textalign="center" fontsize={12} />
                        <TextTwo title="Image size: max 5MB" textalign="center" fontsize={12} />
                    </Layout>
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Event Title" placeholder="Write product name" />
                    <View style={{ marginTop: 15 }} />
                    <InputMultiline label="Event Title" placeholder="Write a description up to 120 characters" />
                    <View style={{ marginTop: 15 }} />
                    <InputMultiline label="Event Description" placeholder="Write a longer description of the event up to 500 characters" />
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
                        <TimeSelect mt={10} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <TextTwo title="Ends:&nbsp;&nbsp;" fontsize={12} width={60} />
                        <TimeSelect mt={10} />
                    </View>
                    <View style={{ marginTop: 15 }} />
                    <InputLabel placeholder="Address line 1" label="Event Location (Optional)" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel placeholder="Address line 2" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel placeholder="City" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel placeholder="Province" />
                    <View style={{ marginTop: 5 }} />
                    <InputLabel placeholder="ZIP Code" />
                    <ButtonPrimary name="Upload Event" width="100%" marginTop={25} onpress={handleUpload}/>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Add;