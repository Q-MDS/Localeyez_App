import React from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../components/TopNavArrowTitle";
import AccordianList from "../../../components/AccordianList";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { SafeAreaView, ScrollView } from "react-native";
import { Layout } from "@ui-kitten/components";

const Education = (props) => 
{
    const schools = ["Preschools", "Primary Schools", "Secondary Schools", "Tertiary Education"];
    const learning = ["Courses", "E-Learning"];
    const employment = ["Recruitment Agencies"];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavArrowTitle title="Education & Employment" alignment="start" navigation={props.navigation} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, {alignItems: 'center', backgroundColor: '#fff'}]}>
                    <AccordianList title="Schools" options={schools} bgColor="#F5F5F5" />
                    <AccordianList title="Learning" options={learning} bgColor="#F5F5F5" />
                    <AccordianList title="Employment" options={employment} bgColor="#F5F5F5" />
                </Layout>
            </ScrollView>
        <BotNavShopper selected={1} />
        </SafeAreaView>
    );
};

export default Education;