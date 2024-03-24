import React from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { SafeAreaView, View } from "react-native";
import { Layout, Divider, Text } from "@ui-kitten/components";
import { TitleOne } from "../../../components/TitleOne";
import { InputMultiline } from "../../../components/InputMultiline";
import { ButtonPrimary } from "../../../components/ButtonPrimary";

const ContactForm = (props) => 
{
    // const [selectedBotTab, setSelectedBotTab] = useState(2);

    // useEffect(() => 
    // {
    //     console.log('Set bottom nav index to 1');
    //     setSelectedBotTab(3);
    // }, []);

    const handleSendMessage = () => 
    {
        props.navigation.navigate('ShopperContactConfirm');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <Layout style={[MainStyles.layout_container, {alignItems: 'center', backgroundColor: '#fff'}]}>
                <View style={{ marginTop: 50 }} />
                <TitleOne title="Contact Admin" />
                <Text category="p2" status="primary" style={{ textAlign: 'center', marginTop: 10, marginBottom: 20 }}>Please contact admin when you have an issue such as reporting a user, system issues etc.</Text>
                <View style={{ marginTop: 50 }} />
                <Text category="h6" status="primary" style={{ width: '100%' }}>Write a message to Admin</Text>
                <View style={{ marginTop: 15 }} />
                <InputMultiline placeholder="Write your message here" style={{ marginTop: 10 }} />
                <ButtonPrimary name="Send Message" width="100%" marginTop={25} onpress={handleSendMessage}/>
            </Layout>
            <Divider style={{ height: 1, width: '100%', backgroundColor: '#DEDDE7', marginTop: 20 }} />
            <BotNavShopper selected={3} />
        </SafeAreaView>
    );
};

export default ContactForm;