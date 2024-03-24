import React from 'react';
import MainStyles from '../../../assets/styles/MainStyles';
import { Divider } from '@ui-kitten/components';
import { ListIconRowThree } from '../../../components/ListIconRowThree';
import { TopNavLrgTitleIcon } from '../../../components/TopNavLrgTitleIcon';
import { BotNav } from '../../../components/BotNav';
import { Layout } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';

const Home = (props) => 
{
    const selectItem = (id) => 
    {
        console.log('Support Item pressed', id);
        props.navigation.navigate('AdminSupportView');
    }

    return (
        <>
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavLrgTitleIcon title="Admin Support" navigation={props.navigation} />
            <Divider style={{ height: 2, backgroundColor: '#DEDDE7' }} />
            <Layout style={MainStyles.layout_container_grid}>
            <ListIconRowThree selectItem = {selectItem} />
            </Layout>
            <BotNav selected={2} />
        </SafeAreaView>
        </>
    )
};

export default Home;