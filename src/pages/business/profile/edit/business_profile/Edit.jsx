import React from 'react';
import MainStyles from '../../../../../assets/styles/MainStyles';
import { TopNavArrowTitle } from '../../../../../components/TopNavArrowTitle';
import { TabsBusProf } from '../../../../../components/TabsBusProf';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';
import { TitleFour } from '../../../../../components/TitleFour';
import TextTwo from '../../../../../components/TextTwo';
import { InputLabel } from '../../../../../components/InputLabel';
import { InputMultiline } from '../../../../../components/InputMultiline';
import { Label } from '../../../../../components/Label';
import { ButtonPrimary } from '../../../../../components/ButtonPrimary';

const Edit = (props) => 
{
    const [selectedIndex, setSelectedIndex] = React.useState(0);
console.log('Selected Profile', selectedIndex);
    if (selectedIndex === 0) 
    {
        console.log('Goto Business Sectors');
    }
    
    if (selectedIndex === 1) 
    {
        props.navigation.navigate('BusProfSectorsEdit');
    }

    const handleSubmit = () => 
    {
        console.log('Submit Changes');
        props.navigation.navigate('BusProfProHome');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <TopNavArrowTitle title="Edit Profile" alignment="start" navigation={props.navigation} goBackTo="BusProfProHome" />
        <TabsBusProf selected={0} value={selectedIndex} onchange={setSelectedIndex} />
            <ScrollView style={{ width: '100%' }}>
                <Layout style={[MainStyles.layout_container, {backgroundColor: '#fff'}]}>
                    <TitleFour title="Upload Display Picture" mb={10} />
                    <Layout style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: '#b8b7c8', borderWidth: 1, borderRadius: 10, padding: 20 }} >
                        <Icon name="upload-outline" fill="#B2AEDB" style={{ width: 48, height: 48 }} />
                        <TextTwo title="Add an image for the banner of your promotion" textalign="center" fontsize={13} mb={10} />
                        <TextTwo title="Image specification 640 x 360px" textalign="center" fontsize={12} />
                        <TextTwo title="Image size: max 5MB" textalign="center" fontsize={12} />
                    </Layout>
                    <TitleFour title="Upload Banner Picture" mt={15} mb={10} />
                    <Layout style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: '#b8b7c8', borderWidth: 1, borderRadius: 10, padding: 20 }} >
                        <Icon name="upload-outline" fill="#B2AEDB" style={{ width: 48, height: 48 }} />
                        <TextTwo title="Add an image for the banner of your promotion" textalign="center" fontsize={13} mb={10} />
                        <TextTwo title="Image specification 640 x 360px" textalign="center" fontsize={12} />
                        <TextTwo title="Image size: max 5MB" textalign="center" fontsize={12} />
                    </Layout>
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Company Name" placeholder="Maria's Diner" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Company Phone Number" placeholder="(123) 456 7890)" />
                    <View style={{ marginTop: 15 }} />
                    <InputMultiline label="Location" placeholder={`Address line 1${"\n"}Address line 2${"\n"}Suburb${"\n"}City${"\n"}Province${"\n"}Zip Code`} />
                    <View style={{ marginTop: 15 }} />
                    <InputMultiline label="Business Bio" placeholder={`Write a description up to 120 characters`} />
                    <View style={{ marginTop: 15 }} />
                    <View style={{ marginTop: 15 }} />
                    <Label title="Connect Your Social Media (optional)" textalign="left" fontweight="bold" mb={5} />
                    <Icon name="twitter-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                    <InputLabel placeholder="Write X URL here" />
                    <View style={{ marginTop: 10 }} />
                    <Icon name="linkedin-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                    <InputLabel placeholder="Write Instagram URL here" />
                    <View style={{ marginTop: 10 }} />
                    <Icon name="facebook-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                    <InputLabel placeholder="Write Facebook URL here" />
                    <View style={{ marginTop: 10 }} />
                    <Icon name="linkedin-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                    <InputLabel placeholder="Write Linkedin URL here" />
                    <View style={{ marginTop: 10 }} />
                    <Icon name="globe-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                    <InputLabel placeholder="Write Website URL here" />
                    <View style={{ marginTop: 25 }} />
                    <ButtonPrimary name="Next" width="100%" onpress={handleSubmit}/>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Edit;