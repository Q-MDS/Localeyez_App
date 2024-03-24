import React from "react";
import MainStyles from "../../../assets/styles/MainStyles";
import { BotNavShopper } from "../../../components/BotNavShopper";
import { InputSearch } from "../../../components/InputSearch";
import { ButtonOutline } from "../../../components/ButtonOutline";
import { TabsSearch } from "../../../components/TabsSearch";
import { ListSimple } from "../../../components/ListSimple";
import { CardItem } from "../../../components/CardItem";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Layout, Text, Modal, Card, Button } from "@ui-kitten/components";

const busData = [
{ id: 1, name: "Business 1", description: "Description 1" },
{ id: 2, name: "Business 2", description: "Description 1" },
{ id: 3, name: "Business 3", description: "Description 1" },
{ id: 4, name: "Business 4", description: "Description 1" },
{ id: 5, name: "Business 5", description: "Description 1" },
{ id: 6, name: "Business 6", description: "Description 1" },
{ id: 7, name: "Business 7", description: "Description 1" },
{ id: 8, name: "Business 8", description: "Description 1" },

];

const Home = () => 
{
    const [selectedTab, setSelectedTab] = React.useState(0);

    const [showLocation, setShowLocation] = React.useState(false);
    const [showDateRange, setShowDateRange] = React.useState(false);
    const [showCategory, setShowCategory] = React.useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            
                <Layout style={[MainStyles.layout_container, {alignItems: 'center', backgroundColor: '#fff'}]}>
                    <InputSearch placeholder="Search for..." />
                    <Layout style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10 }}>
                        <ButtonOutline name="Location" onpress={() => { setShowLocation(true); setSelectedTab(0) }} />
                        <ButtonOutline name="Date Range" onpress={() => { setShowDateRange(true); setSelectedTab(1) }}  />
                        <ButtonOutline name="Category" onpress={() => { setShowCategory(true); setSelectedTab(2) }}  />
                    </Layout>

                    {/* Popup to select location */}
                    <Modal
                        visible={showLocation}
                        backdropStyle={styles.backdrop}
                        onBackdropPress={() => setShowLocation(false)}
                        >
                        <Card disabled={true}>
                            <Text>
                                Select Location 😻
                            </Text>
                            <Button onPress={() => setShowLocation(false)}>
                                DISMISS
                            </Button>
                        </Card>
                    </Modal>

                    {/* Popup to select date reange */}
                    <Modal
                        visible={showDateRange}
                        backdropStyle={styles.backdrop}
                        onBackdropPress={() => setShowDateRange(false)}
                        >
                        <Card disabled={true}>
                            <Text>
                                Date Range 😻
                            </Text>
                            <Button onPress={() => setShowDateRange(false)}>
                                DISMISS
                            </Button>
                        </Card>
                    </Modal>

                    {/* Popup to select category */}
                    <Modal
                        visible={showCategory}
                        backdropStyle={styles.backdrop}
                        onBackdropPress={() => setShowCategory(false)}
                        >
                        <Card disabled={true}>
                            <Text>
                                Date Range 😻
                            </Text>
                            <Button onPress={() => setShowCategory(false)}>
                                DISMISS
                            </Button>
                        </Card>
                    </Modal>

                    <View style={{ marginTop: 15 }} />
                    <TabsSearch onchange={setSelectedTab} selected={selectedTab} />
                    <ScrollView style={{ width: '100%', marginTop: 10 }}>
                        {selectedTab === 0 ? 
                        (
                            <ListSimple data={busData} />
                        ) 
                        : selectedTab === 1 ? 
                        (
                            <View styles={{ width: '100%' }}>
                                <CardItem name="Promotion 1" description="Description 1" />
                            </View>
                        ) 
                        : 
                        (
                            <View styles={{ width: '100%' }}>
                                <CardItem name="Promotion 1" description="Description 1" />
                            </View>
                        )}
                    </ScrollView>
                </Layout>
        <BotNavShopper selected={1} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      minHeight: 192,
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  });

export default Home;