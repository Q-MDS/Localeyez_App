import React, {useState} from 'react';
import MainStyles from '../../../../../assets/styles/MainStyles';
import Collapsible from 'react-native-collapsible';
import { TopNavArrowTitle } from '../../../../../components/TopNavArrowTitle';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Layout, Divider, Icon } from '@ui-kitten/components';
import { TitleFour } from '../../../../../components/TitleFour';
import { Checkbox } from '../../../../../components/Checkbox';
import { TitleThree } from '../../../../../components/TitleThree';

const Add = (props) => 
{
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [checked, setChecked] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Add New Business Sectors" alignment="start" navigation={props.navigation} goBackTo="BusProfSectorsEdit" />

                <Layout style={[MainStyles.layout_container, {width: '100%'}]}>
                <TitleFour title="Choose which sector your business falls under:" mb={25} />
                <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 10  }}>
                            <TitleThree title="Shopping" flex={1} onPress={() => setIsCollapsed(!isCollapsed)}  />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
                <Collapsible collapsed={isCollapsed}>
                        <Checkbox label="Fashion & Beauty" isChecked={checked} onchange={nextChecked => setChecked(nextChecked)} />
                        <View style={{ marginTop: 5 }} />
                        <Checkbox label="Home" isChecked={checked} onchange={nextChecked => setChecked(nextChecked)} />
                        <View style={{ marginTop: 5 }} />
                        <Checkbox label="Groceries" isChecked={checked} onchange={nextChecked => setChecked(nextChecked)} />
                        <View style={{ marginTop: 5 }} />
                        <Checkbox label="Hardware & Electrical" isChecked={checked} onchange={nextChecked => setChecked(nextChecked)} />
                        <View style={{ marginTop: 5 }} />
                        <Checkbox label="Stationary & Gifts" isChecked={checked} onchange={nextChecked => setChecked(nextChecked)} />
                        <View style={{ marginTop: 5 }} />
                        <Checkbox label="Children" isChecked={checked} onchange={nextChecked => setChecked(nextChecked)} />
                    </Collapsible>
                    <Divider style={{ width: '100%', height: 1, marginTop: 10, marginBottom: 15, backgroundColor: '#DEDDE7' }} />
                    <TouchableOpacity  onPress={() => setIsCollapsed(!isCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                            <TitleThree title="Travel" mb={5} flex={1} onPress={() => setIsCollapsed(!isCollapsed)}  />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
                    <Divider style={{ width: '100%', height: 1, marginTop: 10, marginBottom: 15, backgroundColor: '#DEDDE7' }} />
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setIsCollapsed(!isCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                            <TitleThree title="Health & Wellness" mb={5} flex={1} onPress={() => setIsCollapsed(!isCollapsed)}  />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
                    <Divider style={{ width: '100%', height: 1, marginTop: 10, marginBottom: 15, backgroundColor: '#DEDDE7' }} />
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setIsCollapsed(!isCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                            <TitleThree title="Entertainemnt" mb={5} flex={1} onPress={() => setIsCollapsed(!isCollapsed)}  />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
                    <Divider style={{ width: '100%', height: 1, marginTop: 10, marginBottom: 15, backgroundColor: '#DEDDE7' }} />
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setIsCollapsed(!isCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                            <TitleThree title="Education & Employment" mb={5} flex={1} onPress={() => setIsCollapsed(!isCollapsed)}  />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
                    <Divider style={{ width: '100%', height: 1, marginTop: 10, marginBottom: 15, backgroundColor: '#DEDDE7' }} />
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setIsCollapsed(!isCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                            <TitleThree title="Services" mb={5} flex={1} onPress={() => setIsCollapsed(!isCollapsed)}  />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
                    <Divider style={{ width: '100%', height: 1, marginTop: 10, marginBottom: 15, backgroundColor: '#DEDDE7' }} />
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setIsCollapsed(!isCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                            <TitleThree title="Community" mb={5} flex={1} onPress={() => setIsCollapsed(!isCollapsed)}  />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
                </Layout>
        </SafeAreaView>
    );
};

export default Add;