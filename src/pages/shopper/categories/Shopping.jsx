import React from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../components/TopNavArrowTitle";
import AccordianList from "../../../components/AccordianList";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { SafeAreaView, ScrollView } from "react-native";
import { Layout } from "@ui-kitten/components";

const Shopping = (props) => 
{
    const fashion = ["Clothing", "Shoes", "Accessories", "Make-Up & Cosmetics", "Bath & Body", "Clothing Designers & Stylists", "Hair Stylists & Products", "Make-Up Artisits", "Skin & Beauty Technicians", "Costume Hire"];
    const home = ["Furniture", "Fixtures & Fittings", "Homeware & Decor", "Electronics & Appliances"];
    const groceries = ["Food & Beverage", "Local Markets & Homemade Goods", "Household Goods"];
    const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5", "Option 6", "Option 7"];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavArrowTitle title="Shopping" alignment="start" navigation={props.navigation} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, {alignItems: 'center', backgroundColor: '#fff'}]}>
                    <AccordianList title="Fashion & Beauty" options={fashion} bgColor="#F5F5F5" />
                    <AccordianList title="Home" options={home} bgColor="#F5F5F5" />
                    <AccordianList title="Groceries" options={groceries} bgColor="#F5F5F5" />
                    <AccordianList title="Hardware & Electrical" options={options} bgColor="#F5F5F5" />
                    <AccordianList title="Stationary & Gifts" options={options} bgColor="#F5F5F5" />
                    <AccordianList title="Children" options={options} bgColor="#F5F5F5" />
                </Layout>
            </ScrollView>
        <BotNavShopper selected={1} />
        </SafeAreaView>
    );
};

export default Shopping;