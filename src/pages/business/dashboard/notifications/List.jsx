import React from "react";
import MainStyles from "../../../../assets/styles/MainStyles";
import { TopNavArrowTitle } from "../../../../components/TopNavArrowTitle";
import { Text, Avatar, List, ListItem, Layout } from "@ui-kitten/components";
import { SafeAreaView, StyleSheet } from "react-native";
import DividerTop from "../../../../components/DividerTop";

const data = new Array(15).fill({
    title: 'You have a new review',
    description: 'Tasha Schofield left you a review',
});

const NotiList = (props) => 
{
    const renderItemAccessory = () => (
        <Text category="p1">1h</Text>
    );

    const renderItemIcon = (props) => (
        <Avatar {...props} source={require('../../../../assets/images/list_icon.png')} style={{ width: 64, height: 64 }} />
    )
    
    const renderItem = ({ item, index }) => (
        <ListItem
        key={index}
        title={`${item.title}`}
        description={`${item.description}`}
        accessoryLeft={renderItemIcon}
        accessoryRight={renderItemAccessory}
        onPress={handleViewReview}
        />
    );

    const handleViewReview = () => 
    {
        props.navigation.navigate('BusDashNotiView');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Notifications" alignment="start" navigation={props.navigation} goBackTo="BusinessDashboard" />
                <DividerTop />
                <Layout style={[MainStyles.layout_container_grid, {paddingEnd: 15}]}>
                    <List
                    style={styles.container}
                    data={data}
                    renderItem={renderItem}
                    />
                </Layout>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
  });

export default NotiList;