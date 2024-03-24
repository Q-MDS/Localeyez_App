import React from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../components/TopNavArrowTitle";
import AccordianList from "../../../components/AccordianList";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { SafeAreaView, ScrollView } from "react-native";
import { Layout } from "@ui-kitten/components";

const Entertainment = (props) => 
{
    const eat = ["Restaurants", "Bars", "Clubs", "Coffee Shops", "Takeaways", "Bakeries & Patisseries", "Speciality Foods", "Catering & ready Meals"];
    const activities = ["Movies", "Entertainment Centres", "Arts", "Outdoor Leisure", "Event Hire Specialists", "Venues", "Event Planners", "Children"];
    const events = ["Music", "Arts"];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavArrowTitle title="Entertainment" alignment="start" navigation={props.navigation} />
            <ScrollView>
                <Layout style={[MainStyles.layout_container, {alignItems: 'center', backgroundColor: '#fff'}]}>
                    <AccordianList title="East & Drink" options={eat} bgColor="#F5F5F5" />
                    <AccordianList title="Activities" options={activities} bgColor="#F5F5F5" />
                    <AccordianList title="Events" options={events} bgColor="#F5F5F5" />
                </Layout>
            </ScrollView>
        <BotNavShopper selected={1} />
        </SafeAreaView>
    );
};

export default Entertainment;