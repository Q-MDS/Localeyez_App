import React from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { InputLabelEmail } from "../../../components/InputLabelEmail";
import { InputLabel } from "../../../components/InputLabel";
import { InputLabelNumpad } from "../../../components/InputLabelNumpad";
import { TopNavArrowTitle } from "../../../components/TopNavArrowTitle";
import { Label } from "../../../components/Label";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Layout, Select, SelectItem, IndexPath } from "@ui-kitten/components";
import { ButtonPrimary } from "../../../components/ButtonPrimary";

const radius = ['5km radius', '10km radius', '15km radius', '20km radius', '25km radius', '30km radius', '35km radius', '40km radius', '45km radius', '50km radius'];

const Edit = (props) => 
{
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath('30km radius'));
    const displayValue = radius[5];

    const renderOption = (title, index) => (
        <SelectItem key={index} title={title} />
    );

    const handleSubmit = () => 
    {
        props.navigation.navigate('ShopperAccHome');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Edit Profile" alignment="start" navigation={props.navigation} goBackTo="BusinessDashboard" />
            <Layout style={[MainStyles.layout_container ]}>
                <InputLabelEmail label="Email" placeholder="example@email.com" />
                <View style={{ marginTop: 15 }} />
                <InputLabel label="First Name" placeholder="E.g. John" />
                <View style={{ marginTop: 15 }} />
                <InputLabel label="Last Name" placeholder="E.g. Barron" />
                <View style={{ marginTop: 15 }} />
                <InputLabelNumpad label="Phone Number" placeholder="000 000 0000" />
                <View style={{ marginTop: 15 }} />
                <Label title="Geo-Location Range (Optional)" fontweight="bold" />
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
                <Layout style={{ flexDirection: 'column', justifyContent: 'flex-end', flex: 1, width: '100%', paddingBottom: 50 }} >
                    <ButtonPrimary name="Submit Changes" width="100%" onpress={handleSubmit} />
                </Layout>
            </Layout>
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

export default Edit;