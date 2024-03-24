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
import { ButtonPrimary } from '../../../../components/ButtonPrimary';

const Add = (props) => 
{
    const [promoStartDate, setPromoStartDate] = React.useState('');
    const [promoEndDate, setPromoEndDate] = React.useState('');

    const handleUpload = () => 
    {
        props.navigation.navigate('BusProfProHome');
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* <TopNavArrowTitle title="Add Promotion" alignment="start" navigation={props.navigation} /> */}
        <TopNavArrowTitle title="Add Promotion" alignment="start" navigation={props.navigation} goBackTo="BusProProAddEditBack" />
        <DividerTop />
        <ScrollView>
            <Layout style={[MainStyles.layout_container, {backgroundColor: '#fff'}]}>
                <TitleFour title="Choose which business sector(s) your promotion falls under:" />
                <SelectMulti mt={10} />
                <TitleFour title="Upload Display Picture" mb={10} />
                <Layout style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: '#b8b7c8', borderWidth: 1, borderRadius: 10, padding: 20 }} >
                    <Icon name="upload-outline" fill="#B2AEDB" style={{ width: 48, height: 48 }} />
                    <TextTwo title="Add an image for the banner of your promotion" textalign="center" fontsize={13} mb={10} />
                    <TextTwo title="Image specification 640 x 360px" textalign="center" fontsize={12} />
                    <TextTwo title="Image size: max 5MB" textalign="center" fontsize={12} />
                </Layout>
                <View style={{ marginTop: 15 }} />
                <InputLabel label="Promotion Title" placeholder="Write product name" />
                <View style={{ marginTop: 15 }} />
                <InputMultiline label="Promotion Caption" placeholder="Write a description up to 120 characters" />
                <View style={{ marginTop: 15 }} />
                <InputMultiline label="Promotion Description" placeholder="Write a longer description of the promotion up to 500 characters" />
                <View style={{ marginTop: 15 }} />
                <InputLabel label="Price" placeholder="Write product price" />
                <View style={{ marginTop: 15 }} />
                <InputLabel label="Sale Item (Optional)" placeholder="Origonal price" />
                <InputLabel mt={5} placeholder="Marked down price" />
                <View style={{ marginTop: 15 }} />
                <TitleFour title="Promotion Start Date" mb={10} />
                <DateSelect value={promoStartDate} setDate={setPromoStartDate} />
                <View style={{ marginTop: 15 }} />
                <TitleFour title="Promotion End Date" mb={10} />
                <DateSelect value={promoEndDate} setDate={setPromoEndDate} />
                <View style={{ marginTop: 15 }} />
                <InputLabel placeholder="Address line 1" label="Promotion Location (Optional)" />
                <View style={{ marginTop: 5 }} />
                <InputLabel placeholder="Address line 2" />
                <View style={{ marginTop: 5 }} />
                <InputLabel placeholder="City" />
                <View style={{ marginTop: 5 }} />
                <InputLabel placeholder="Province" />
                <View style={{ marginTop: 5 }} />
                <InputLabel placeholder="ZIP Code" />
                <ButtonPrimary name="Upload Promotion" width="100%" marginTop={25} onpress={handleUpload}/>
            </Layout>
        </ScrollView>


      </SafeAreaView>
    );
};

export default Add;