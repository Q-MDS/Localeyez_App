import React from 'react';
import MainStyles from '../../../assets/styles/MainStyles';
import { Divider } from '@ui-kitten/components';
import { TopNavLrgTitleIcon } from '../../../components/TopNavLrgTitleIcon';
import { BotNav } from '../../../components/BotNav';
import { ListIconRowThree } from '../../../components/ListIconRowThree';
import { Layout } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';

const Home = (props) => 
{
    const selectItem = (id) => 
    {
        console.log('New Item pressed', id);
        props.navigation.navigate('AdminNewBusinessView');
    }

    return (
        <>
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavLrgTitleIcon title="New Businesses" navigation={props.navigation} />
            <Divider style={{ height: 2, backgroundColor: '#DEDDE7' }} />
            <Layout style={MainStyles.layout_container_grid}>
            <ListIconRowThree selectItem = {selectItem} />
            </Layout>
            <BotNav selected={0} />
        </SafeAreaView>
        </>
    )
};

export default Home;
