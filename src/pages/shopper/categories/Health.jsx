import React from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../components/TopNavArrowTitle";
import AccordianList from "../../../components/AccordianList";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { SafeAreaView, ScrollView } from "react-native";
import { Layout } from "@ui-kitten/components";

const Health = (props) => 
{
    const sports = ["Gyms", "Sports Clubs", "Spa's", "Outdoor Activities"];
    const doctors = ["General Practitioners", "Physicians", "Physiotherapists", "Chiropractors", "Surgeons", "Dental", "Homeopathic", "Mental Health", "Peadiatric", "Other Specialists"];
    const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5", "Option 6", "Option 7"];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavArrowTitle title="Health" alignment="start" navigation={props.navigation} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, {alignItems: 'center', backgroundColor: '#fff'}]}>
                    <AccordianList title="Sports & Recreation" options={sports} bgColor="#F5F5F5" />
                    <AccordianList title="Doctors & Specialists" options={doctors} bgColor="#F5F5F5" />
                    <AccordianList title="Health Stores & Pharmacies" options={options} bgColor="#F5F5F5" />
                    <AccordianList title="Hospitals & Trauma Centres" options={options} bgColor="#F5F5F5" />
                </Layout>
            </ScrollView>
        <BotNavShopper selected={1} />
        </SafeAreaView>
    );
};

export default Health;