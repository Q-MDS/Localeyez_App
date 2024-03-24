import React from "react";
import { TopNavArrowTitle } from "../../../../components/TopNavArrowTitle";
import { SafeAreaView, View } from "react-native";
import { Layout, Card, Text } from "@ui-kitten/components";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";

const Choose = (props) => 
{
    const chooseFree = () => 
    {
        console.log('Choose Free Account');
        props.navigation.navigate('SignupUserFreeOne');
    }
    const choosePaid = () => 
    {
        console.log('Choose Paid Account');
        props.navigation.navigate('SignupUserMonthlyOne');
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="Pricing Plan" alignment="start" navigation={props.navigation} />
            <Layout style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', padding: 40, paddingTop: 15 }}>
                <Card style={{ flex: 1, width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} onPress={chooseFree}>
                    <Text category="h5" status="primary" style={{textAlign: 'center', marginBottom: 10}}>Free Account</Text>
                    <Text category="s1" status="primary" style={{textAlign: 'center'}}>Signup for free and get access to stay in the know of the events happening in your area.</Text>
                    <Text category="h2" style={{textAlign: 'center', marginTop: 25}}>$0</Text>
                    <ButtonPrimary name="Learn More" marginTop={15} />
                </Card>
                <View style={{ marginTop: 40 }} />
                <Card style={{ flex: 1, width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} onPress={choosePaid}>
                    <Text category="h5" status="primary" style={{textAlign: 'center', marginBottom: 10}}>Localeyez Member</Text>
                    <Text category="s1" status="primary" style={{textAlign: 'center'}}>A small amount a month can save you big time with access to stay in the know of the events happening in your area.</Text>
                    <Text category="h2" style={{textAlign: 'center', marginTop: 25}}>$10</Text>
                    <ButtonPrimary name="Learn More" marginTop={15} />
                </Card>
            </Layout>

        </SafeAreaView>
    )

};

export default Choose;