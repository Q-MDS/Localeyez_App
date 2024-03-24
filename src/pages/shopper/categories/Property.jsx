import React from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../components/TopNavArrowTitle";
import AccordianList from "../../../components/AccordianList";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { SafeAreaView, ScrollView } from "react-native";
import { Layout } from "@ui-kitten/components";

const Property = (props) => 
{
    const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5", "Option 6", "Option 7"];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavArrowTitle title="Property" alignment="start" navigation={props.navigation} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, {alignItems: 'center', backgroundColor: '#fff'}]}>
                    <AccordianList title="For Sale (Agents)" options={options} bgColor="#F5F5F5" />
                    <AccordianList title="To Rent (Agents)" options={options} bgColor="#F5F5F5" />
                    <AccordianList title="Commercial (Agents)" options={options} bgColor="#F5F5F5" />
                    <AccordianList title="Legal (Property Law firms)" options={options} bgColor="#F5F5F5" />
                </Layout>
            </ScrollView>
        <BotNavShopper selected={1} />
        </SafeAreaView>
    );
};

export default Property;