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
        console.log('Item pressed', id);
        props.navigation.navigate('AdminAllBusinessView');
    }

    return (
        <>
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavLrgTitleIcon title="All Businesses" navigation={props.navigation} />
            <Divider style={{ height: 2, backgroundColor: '#DEDDE7' }} />
            <Layout style={MainStyles.layout_container_grid}>
            <ListIconRowThree selectItem = {selectItem} />
            </Layout>
            <Divider style={{ height: 2, backgroundColor: '#DEDDE7' }} />
            <BotNav selected={1} />
        </SafeAreaView>
        </>
    )
};

export default Home;
