import React from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../components/TopNavArrowTitle";
import AccordianList from "../../../components/AccordianList";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { SafeAreaView, ScrollView } from "react-native";
import { Layout } from "@ui-kitten/components";

const Travel = (props) => 
{
    const accomodation = ["Hotels", "Guest Lodges", "BnB's", "Lodges", "Villa's And Private Homes", "Backpackers", "Other - Eg. Houseboats"];
    const transport = ["Airlines", "Train Services", "Bus Services", "Shuttle Services", "Taxi's", "Car Hire", "Chauffeur Services"];
    const travelAgents = ["International", "National", "Travel Packages"];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavArrowTitle title="Travel" alignment="start" navigation={props.navigation} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, {alignItems: 'center', backgroundColor: '#fff'}]}>
                    <AccordianList title="Accommodation" options={accomodation} bgColor="#F5F5F5" />
                    <AccordianList title="Transport" options={transport} bgColor="#F5F5F5" />
                    <AccordianList title="Travel Agents" options={travelAgents} bgColor="#F5F5F5" />
                </Layout>
            </ScrollView>
        <BotNavShopper selected={1} />
        </SafeAreaView>
    );
};

export default Travel;