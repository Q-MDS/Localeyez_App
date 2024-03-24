import React, { useState } from 'react';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavArrowTitle } from '../../../components/TopNavArrowTitle';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { InputLabelEmail } from '../../../components/InputLabelEmail';
import { InputLabel } from '../../../components/InputLabel';
import { InputLabelPassword } from '../../../components/InputLabelPassword';
import TextTwo from '../../../components/TextTwo';
import { SafeAreaView, ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Layout, Avatar, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { InputLabelNumpad } from '../../../components/InputLabelNumpad';
import { Label } from '../../../components/Label';

const radius = ['5km radius', '10km radius', '15km radius', '20km radius', '25km radius', '30km radius', '35km radius', '40km radius', '45km radius', '50km radius'];

const StepOne = (props) => 
{
    const [email, setEmail] = useState('');
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath('30km radius'));
    const displayValue = radius[5];

    const renderOption = (title, index) => (
        <SelectItem key={index} title={title} />
    );

    const handleNext = () => 
    {
        props.navigation.navigate('SignupUserStepTwo');
    }

    const handleLogin = () => 
    {
        props.navigation.navigate('LoginUser');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Create your Account" alignment="start" navigation={props.navigation} />
            {/* <DividerTop /> */}
            <ScrollView>
                <Layout style={MainStyles.layout_container}>
                    <View style={{ marginTop: 25 }} />
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                        <Avatar source={require('../../../assets/images/list_icon.png')} style={{ width: 82, height: 82 }} />
                    </View>
                    <View style={{ marginTop: 35 }} />
                    <InputLabelEmail label="Email" value={email} setValue={setEmail} placeholder="Enter email" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="First Name" placeholder="E.g. John" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabel label="Last Name" placeholder="E.g. Barron" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabelNumpad label="Phone Number" placeholder="(123) 456 7890" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabelPassword placeholder="Enter password" label="Password" />
                    <View style={{ marginTop: 15 }} />
                    <InputLabelPassword placeholder="Confirm password" label="Confirm Password" />
                    <View style={{ marginTop: 25 }} />
                    <Label title="Geo-Location Range" fontweight="bold" />
                        <Layout
                        style={styles.container}
                        level='1'>
                            <Select
                                style={styles.select}
                                placeholder='Default'
                                value={displayValue}
                                selectedIndex={selectedIndex}
                                onSelect={(index) => setSelectedIndex(index)}
                            >
                            {radius.map(renderOption)}
                            </Select>
                        </Layout>
                    <ButtonPrimary name="Next" width="100%" onpress={handleNext}/>
                    <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 15 }} >
                        <TextTwo title="Already have an account? " textalign="center" />
                        <TouchableOpacity onPress={handleLogin}>
                            <TextTwo title="Login" textalign="center" fontweight="bold" underline="underline" width="100%" />
                        </TouchableOpacity>
                    </Layout>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 25
    },
    select: {
      flex: 1,
      margin: 2,
      marginStart: 0
    },
  });

export default StepOne;