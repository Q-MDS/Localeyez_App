import React from 'react';
import MainStyles from '../../../../assets/styles/MainStyles';
import { TopNavBackTitleIcon } from '../../../../components/TopNavBackTitleIcon';
import { SafeAreaView, ScrollView, View, Image } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';
import DividerTop from '../../../../components/DividerTop';
import { TitleFour } from '../../../../components/TitleFour';
import { InputLabel } from '../../../../components/InputLabel';
import { InputMultiline } from '../../../../components/InputMultiline';
import { DateSelect } from '../../../../components/DateSelect';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';

const Add = (props) => 
{
    const today = new Date();
    const fiveDaysFromNow = new Date();
    fiveDaysFromNow.setDate(today.getDate() + 5);
    const [promoStartDate, setPromoStartDate] = React.useState(new Date());
    const [promoEndDate, setPromoEndDate] = React.useState(fiveDaysFromNow);

    const handleUpload = () => 
    {
        props.navigation.navigate('BusProfProHome');
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* <TopNavArrowTitle title="Add Promotion" alignment="start" navigation={props.navigation} /> */}
        <TopNavBackTitleIcon title="Edit Promotion" alignment="start" navigation={props.navigation} goBackTo="BusProProAddEditBack" goDelete="BusProfProDelete" />
        <DividerTop />
        <ScrollView>
            <Layout style={[MainStyles.layout_container, {backgroundColor: '#fff'}]}>
                <TitleFour title="Edit Promotion Display Image" mb={10} />
                <Layout style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9ff', borderRadius: 10, height: 200 }} >
                    <View style={{ position: 'absolute', top: 15, right: 15, width: 36, height: 36, backgroundColor: '#1E1C4E', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                        <Icon name="edit-2-outline" fill="#fff" style={{ width: 24, height: 24 }} />
                    </View>
                    <Image source={require('../../../../assets/images/pic_holder.png')} style={{ width: 64, height: 64 }} />
                </Layout>
                <View style={{ marginTop: 15 }} />
                <InputLabel label="Promotion Title" placeholder="Cake Sale!" />
                <View style={{ marginTop: 15 }} />
                <InputMultiline label="Promotion Caption" placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />
                <View style={{ marginTop: 15 }} />
                <InputMultiline label="Promotion Description" placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos facere est ullam eum deleniti, assumenda magni illo molestias nostrum qui. Deleniti corporis similique temporibus ex eaque." />
                <View style={{ marginTop: 15 }} />
                <InputLabel label="Price" placeholder="$200" />
                <View style={{ marginTop: 15 }} />
                <InputLabel label="Sale Item (Optional)" placeholder="$300" />
                <InputLabel mt={5} placeholder="$200" />
                <View style={{ marginTop: 15 }} />
                <TitleFour title="Promotion Start Date" mb={10} />
                <DateSelect value={promoStartDate} setDate={setPromoStartDate} />
                <View style={{ marginTop: 15 }} />
                <TitleFour title="Promotion End Date" mb={10} />
                <DateSelect value={promoEndDate} setDate={setPromoEndDate} />
                <View style={{ marginTop: 15 }} />
                <InputLabel placeholder="18 Street" label="Promotion Location (Optional)" />
                <View style={{ marginTop: 5 }} />
                <InputLabel placeholder="Suburb" />
                <View style={{ marginTop: 5 }} />
                <InputLabel placeholder="Cape Town" />
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