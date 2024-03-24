import React, {useState} from 'react';
import MainStyles from '../../../assets/styles/MainStyles';
import Collapsible from 'react-native-collapsible';
import { Checkbox } from '../../../components/Checkbox';
import { TopNavArrowTitle } from '../../../components/TopNavArrowTitle';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Layout, Divider, Icon } from '@ui-kitten/components';
import { TitleThree } from '../../../components/TitleThree';
import { ButtonPrimary } from '../../../components/ButtonPrimary';

const StepTwo = (props) => 
{
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [checked, setChecked] = useState(false);

    const handleSubmit = () =>
    {
        props.navigation.navigate('SignupUserChoose');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Tell us your interests" alignment="start" navigation={props.navigation} />
            {/* <DividerTop /> */}
            <ScrollView style={{ backgroundColor: 'white' }}>
                <Layout style={[MainStyles.layout_container]}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setIsCollapsed(!isCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1, marginBottom: 10 }}>
                            <TitleThree title="Shopping" mb={5} flex={1} onPress={() => setIsCollapsed(!isCollapsed)}  />
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
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setIsCollapsed(!isCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
                            <TitleThree title="Travel" mb={5} flex={1} onPress={() => setIsCollapsed(!isCollapsed)}  />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
                    <Divider style={{ width: '100%', height: 1, marginTop: 10, marginBottom: 15, backgroundColor: '#DEDDE7' }} />
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setIsCollapsed(!isCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
                            <TitleThree title="Health & Wellness" mb={5} flex={1} onPress={() => setIsCollapsed(!isCollapsed)}  />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
                    <Divider style={{ width: '100%', height: 1, marginTop: 10, marginBottom: 15, backgroundColor: '#DEDDE7' }} />
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setIsCollapsed(!isCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
                            <TitleThree title="Entertainemnt" mb={5} flex={1} onPress={() => setIsCollapsed(!isCollapsed)}  />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
                    <Divider style={{ width: '100%', height: 1, marginTop: 10, marginBottom: 15, backgroundColor: '#DEDDE7' }} />
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setIsCollapsed(!isCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
                            <TitleThree title="Education & Employment" mb={5} flex={1} onPress={() => setIsCollapsed(!isCollapsed)}  />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
                    <Divider style={{ width: '100%', height: 1, marginTop: 10, marginBottom: 15, backgroundColor: '#DEDDE7' }} />
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setIsCollapsed(!isCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
                            <TitleThree title="Services" mb={5} flex={1} onPress={() => setIsCollapsed(!isCollapsed)}  />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
                    <Divider style={{ width: '100%', height: 1, marginTop: 10, marginBottom: 15, backgroundColor: '#DEDDE7' }} />
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setIsCollapsed(!isCollapsed)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 }}>
                            <TitleThree title="Community" mb={5} flex={1} onPress={() => setIsCollapsed(!isCollapsed)}  />
                            <Icon name="arrow-ios-downward-outline" fill="#B2AEDB" style={{ width: 32, height: 32 }} />
                        </View>
                    </TouchableOpacity>
                    <Divider style={{ width: '100%', height: 1, marginTop: 10, marginBottom: 15, backgroundColor: '#DEDDE7' }} />
                    <ButtonPrimary name="Submit" width="100%" marginTop={25} onpress={handleSubmit}/>
                </Layout>
                
                
            </ScrollView>
        </SafeAreaView>
    );
};

export default StepTwo;