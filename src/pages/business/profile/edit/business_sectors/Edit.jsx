import React from 'react';
import MainStyles from '../../../../../assets/styles/MainStyles';
import { TopNavArrowTitle } from '../../../../../components/TopNavArrowTitle';
import { TabsBusProf } from '../../../../../components/TabsBusProf';
import { SafeAreaView, View } from 'react-native';
import { Layout, } from '@ui-kitten/components';
import { TitleFour } from '../../../../../components/TitleFour';
import TextOne from '../../../../../components/TextOne';
import TextTwo from '../../../../../components/TextTwo';
import { ButtonPrimary } from '../../../../../components/ButtonPrimary';

const Edit = (props) => 
{
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    console.log('Selected Sectors', selectedIndex);
    if (selectedIndex === 0) 
    {
        
        props.navigation.navigate('BusProfEdit');
    }
    
    if (selectedIndex === 1) 
    {
        console.log('Goto Business Profile');
    }

    const handleAddSector = () => 
    {
        console.log('Fuck joe biden');
        props.navigation.navigate('BusProfSectorsAdd')
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <TopNavArrowTitle title="Edit Profile" alignment="start" navigation={props.navigation} goBackTo="BusProfProHome" />
        <TabsBusProf selected={1} value={selectedIndex} onchange={setSelectedIndex} />
            {/* <ScrollView style={{ display: 'flex', flex: 1 }}> */}
                <Layout style={[MainStyles.layout_container, {width: '100%'}]}>
                {/* <Layout style={[{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ff0000', flex: 1, height: '100%'}]}> */}
                    <View style={{ flex: 1, width: '100%' }}>
                    <TitleFour title="Current Business Sectors" />
                    <Layout style={{ backgroundColor: '#f8f8fc', width: '100%', borderRadius: 10, padding: 20, marginTop: 20 }}>
                        <TextOne title="Health & Wellness" fontweight='bold' />
                        <TextTwo title="• Health Stores & Pharmacies" fontsize={12} />
                        <TextTwo title="• Sports & Recreation" fontsize={12} />
                        <TextTwo title="&nbsp; Gyms" fontsize={12} />
                        <TextTwo title="&nbsp; Sports Clubs" fontsize={12} />
                    </Layout>
                    </View>
                    <View style={{ flex: 1 }} >
                    <View style={{ position: 'absolute', bottom: 50, width: '100%' }} >
                        <ButtonPrimary name="Add New Business Sector" mt={10} mb={10} width="100%" onpress={handleAddSector} />
                    </View>
                    </View>
                </Layout>
            {/* </ScrollView> */}
        </SafeAreaView>
    );
};

export default Edit;