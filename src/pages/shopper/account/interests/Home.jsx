import React from "react";
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../../components/TopNavArrowTitle";
import { SafeAreaView, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import TextOne from "../../../../components/TextOne";
import { TextIcon } from "../../../../components/TextIcon";
import TextTwo from "../../../../components/TextTwo";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";

const Home = (props) => 
{
    const handleAddInterests = () => 
    {
        console.log('Add More Interests clicked!');
        props.navigation.navigate('ShopperAccIntAdd');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Edit Interests" alignment="start" navigation={props.navigation} goBackTo="BusinessDashboard" />
            <Layout style={[MainStyles.layout_container ]}>
            <Text category="h6" status="primary" style={{ fontWeight: 'bold', marginBottom: 15 }}>Current Interests</Text>
                <Layout style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', padding: 20, backgroundColor: '#f8f8fc', borderRadius: 20 }}>
                    <TextOne title="Health & Wellness" textAlign="left" fontweight="bold" width="100%" />
                    <TextIcon title="• Health Stores & Pharmacies" iconname="trash-2-outline" fontsize={13} width={20} mt={5} mb={0} />
                    <TextTwo title="• Sports & Recreation" textalign="left" fontsize={13} width="100%" mt={5} />
                    <TextIcon title="Gyms" iconname="trash-2-outline" fontsize={13} width={20} mt={5} mb={0} pl={7} />
                    <TextIcon title="Sports Clubs" iconname="trash-2-outline" fontsize={13} width={20} mt={5} mb={0} pl={7} />
                </Layout>
                <View style={{ marginTop: 25 }} />
                <Layout style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', padding: 20, backgroundColor: '#f8f8fc', borderRadius: 20 }}>
                    <TextOne title="Shopping" textAlign="left" fontweight="bold" width="100%" />
                    <TextIcon title="• Stationary & Gifts" iconname="trash-2-outline" fontsize={13} width={20} mt={5} mb={0} />
                    <TextTwo title="• Fashion & Beauty" textalign="left" fontsize={13} width="100%" mt={5} />
                    <TextIcon title="Clothing" iconname="trash-2-outline" fontsize={13} width={20} mt={5} mb={0} pl={7} />
                    <TextIcon title="Accessories" iconname="trash-2-outline" fontsize={13} width={20} mt={5} mb={0} pl={7} />
                </Layout>
                <ButtonPrimary name="Add More Interests" width="100%" marginTop={25} onpress={handleAddInterests} />
            </Layout>
        </SafeAreaView>
    );
};

export default Home;