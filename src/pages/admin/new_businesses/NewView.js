import React from 'react';
import MainStyles from '../../../assets/styles/MainStyles';
import { TextOneBold } from '../../../components/TextOneBold';
import { TextOneIcon } from '../../../components/TextOneIcon';
import { TopNavArrowTitle } from '../../../components/TopNavArrowTitle';
import { DividerTop } from '../../../components/DividerTop';
import { TitleThree } from '../../../components/TitleThree';
import { TextOne } from '../../../components/TextOne';
import { SafeAreaView, ScrollView } from 'react-native';
import { Layout, Divider } from '@ui-kitten/components';

const NewView = (props) => 
{
    console.log('View Props: ', {...props});
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavArrowTitle title="New Business Name" alignment="center" navigation={props.navigation} />
            <DividerTop />
            <ScrollView>
            <Layout style={MainStyles.layout_container}>
                <TitleThree title="Email" />
                <TextOne title="Johnbarron@gmail.com" />
                <Divider style={{ height: 15, backgroundColor: 'transparent' }} />
                <TitleThree title="First Name" />
                <TextOne title="John" />
                <Divider style={{ height: 15, backgroundColor: 'transparent' }} />
                <TitleThree title="Last Name" />
                <TextOne title="Barron" />
                <Divider style={{ height: 15, backgroundColor: 'transparent' }} />
                <TitleThree title="Company Name" />
                <TextOne title="Maria's Diner" />
                <Divider style={{ height: 15, backgroundColor: 'transparent' }} />
                <TitleThree title="Company Phone Number" />
                <TextOne title="(123) 456-7890" />
                <Divider style={{ height: 15, backgroundColor: 'transparent' }} />
                <TitleThree title="Location" />
                <TextOne title="Address line 1" />
                <TextOne title="Address line 2" />
                <TextOne title="City" />
                <TextOne title="Province" />
                <TextOne title="ZIP Code" />
                <Divider style={{ height: 15, backgroundColor: 'transparent' }} />
                <TitleThree title="Business Bio" />
                <TextOne title="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam fugit quos, eaque tempore odio." />
                <Divider style={{ height: 15, backgroundColor: 'transparent' }} />
                <TitleThree title="Small Business" />
                <TextOne title="Yes" />
                <Divider style={{ height: 15, backgroundColor: 'transparent' }} />
                <TitleThree title="Social Media" />
                <TextOneIcon title="@mariasdiner" iconname="facebook-outline" />
                <TextOneIcon title="www.mariasdiber.com" iconname="globe-outline" />
                <Divider style={{ height: 15, backgroundColor: 'transparent' }} />
                <TitleThree title="Business Sectors" />
                <TextOneBold title="Health & Wellness" />
                <TextOne title="- Sports & Recreation" />
                <TextOne title="&nbsp;&nbsp;&nbsp;- Gyms" />
                <TextOne title="&nbsp;&nbsp;&nbsp;- Sports Clubs" />
                <TextOne title="&nbsp;&nbsp;&nbsp;- Spa's" />
                <TextOne title="&nbsp;&nbsp;&nbsp;- Outdoor Activities" />
                <Divider style={{ height: 15, backgroundColor: 'transparent' }} />
                <TextOneBold title="Entertainment" />
                <TextOne title="&nbsp;&nbsp;&nbsp;- Movies" />
                <TextOne title="&nbsp;&nbsp;&nbsp;- Entertainment Centres" />
                <TextOne title="&nbsp;&nbsp;&nbsp;- Arts" />
                <TextOne title="&nbsp;&nbsp;&nbsp;- Outdoor Leisure" />
                <TextOne title="&nbsp;&nbsp;&nbsp;- Event Hire Specialists" />
                <TextOne title="&nbsp;&nbsp;&nbsp;- Venues" />
                <TextOne title="&nbsp;&nbsp;&nbsp;- Event Planners" />
                <TextOne title="&nbsp;&nbsp;&nbsp;- Children" />
            </Layout>
            </ScrollView>
        </SafeAreaView>
    );
};

export default NewView;
