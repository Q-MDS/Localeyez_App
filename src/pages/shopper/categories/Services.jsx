import React from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../components/TopNavArrowTitle";
import AccordianList from "../../../components/AccordianList";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { SafeAreaView, ScrollView } from "react-native";
import { Layout } from "@ui-kitten/components";

const Services = (props) => 
{
    const home = ["Building", "Interiors", "Plumbing", "Electrical", "Painting", "Landscaping", "Cleaning", "Pest Control", "Veterinary & Pet Parlours", "Security", "Communications & Connectivity"];
    const selfcare = ["Hairdressers & Stylists", "Beauty Spa's"];
    const financial = ["Banks", "Bureau De Change", "Financial Management", "Accountants", "Insurance"];
    const psc = ["Water", "Electricity", "Roads", "Police", "Fire Department", "Accident & Emerency"];
    const legal = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5", "Option 6", "Option 7"];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavArrowTitle title="Services" alignment="start" navigation={props.navigation} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, {alignItems: 'center', backgroundColor: '#fff'}]}>
                    <AccordianList title="Home" options={home} bgColor="#F5F5F5" />
                    <AccordianList title="Self-Care" options={selfcare} bgColor="#F5F5F5" />
                    <AccordianList title="Financial" options={financial} bgColor="#F5F5F5" />
                    <AccordianList title="Public Service Contacts" options={psc} bgColor="#F5F5F5" />
                    <AccordianList title="Legal" options={legal} bgColor="#F5F5F5" />
                </Layout>
            </ScrollView>
        <BotNavShopper selected={1} />
        </SafeAreaView>
    );
};

export default Services;