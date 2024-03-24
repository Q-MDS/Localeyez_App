import React from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../components/TopNavArrowTitle";
import AccordianList from "../../../components/AccordianList";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { SafeAreaView, ScrollView } from "react-native";
import { Layout } from "@ui-kitten/components";

const Community = (props) => 
{
    const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5", "Option 6", "Option 7"];
    const selfCare = ["Childres", "Old Age Pensioners", "Community Projects", "Conservation"];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavArrowTitle title="Community" alignment="start" navigation={props.navigation} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, {alignItems: 'center', backgroundColor: '#fff'}]}>
                    <AccordianList title="Charity Organisations" options={options} bgColor="#F5F5F5" />
                    <AccordianList title="Non Profits" options={options} bgColor="#F5F5F5" />
                    <AccordianList title="NGO's" options={options} bgColor="#F5F5F5" />
                    <AccordianList title="Support Groups" options={options} bgColor="#F5F5F5" />
                    <AccordianList title="Self-Care" options={selfCare} bgColor="#F5F5F5" />
                </Layout>
            </ScrollView>
        <BotNavShopper selected={1} />
        </SafeAreaView>
    );
};

export default Community;