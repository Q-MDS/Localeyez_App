import React, { useState, useEffect} from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavBusDashboard } from "../../../components/TopNavBusDashboard";
import { BotNavBusiness } from "../../../components/BotNavBusiness";
import { SafeAreaView } from "react-native";
import { Layout, Text, Divider, Card } from "@ui-kitten/components";
import DividerTop from "../../../components/DividerTop";
import TextTwo from "../../../components/TextTwo";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import { ButtonSecondary } from "../../../components/ButtonSecondary";

const BusinessDashboard = (props) => 
{
    const [selectedBotTab, setSelectedBotTab] = useState(0);

    useEffect(() => 
    {
        console.log('Set bottom nav index to 1');
        setSelectedBotTab(0);
    }, []);

    const gotoAddEvent = () => 
    {
        console.log('Go to add event');
		props.navigation.navigate('BusProfEvtAdd');
    }

    const gotoAddPromotion = () => 
    {
        console.log('Go to add promotion');
		props.navigation.navigate('BusProfProAdd');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavBusDashboard title="Marc" navigation={props.navigation}  />
                <DividerTop />
                <Layout style={[MainStyles.layout_container, {backgroundColor: '#fdfdfd'}]}>
                    <Text category="s1">Your business in review:</Text>

                    <Card style={{ marginTop: 10, padding: 10, borderRadius: 10, backgroundColor: '#FFF', width: '100%' }}>
                        <Text category="s2" style={{ textAlign: 'center', fontWeight: 'bold' }}>New Notifications:</Text>
                        <TextTwo title="3" textalign="center" fontsize={72} />
                    </Card>

                    <Card style={{ marginTop: 10, padding: 10, borderRadius: 10, backgroundColor: '#FFF', width: '100%' }}>
                        <Text category="s2" style={{ textAlign: 'center', fontWeight: 'bold' }}>Total number of views:</Text>
                        <TextTwo title="251" textalign="center" fontsize={72} />
                    </Card>
                    <ButtonSecondary name="Add Promotion" width="100%" marginTop={20} onpress={gotoAddPromotion} />
                    <ButtonPrimary name="Add Event" width="100%" marginTop={40} onpress={gotoAddEvent} />

                </Layout>
                <Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7' }} />
            <BotNavBusiness selected={selectedBotTab}/>
        </SafeAreaView>
    );
};

export default BusinessDashboard;