import React from 'react';
import { View} from 'react-native';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavArrowTitle } from '../../../components/TopNavArrowTitle';
import { ContactCard } from '../../../components/ContactCard';
import { Divider } from '@ui-kitten/components';
import { BotNav } from '../../../components/BotNav';
import { Layout } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';
import { TextTwo } from '../../../components/TextTwo';

const SupportView = (props) => 
{

    return (
        <>
        <SafeAreaView style={{ flex: 1 }}>
        <TopNavArrowTitle title="Admin Message" navigation={props.navigation} />
            <Divider style={{ height: 2, backgroundColor: '#DEDDE7' }} />
                <Layout style={ MainStyles.layout_container_grid }>
                    <ContactCard title="Business Name" email="tashascho@gmail.com" />
                    <Divider style={{ width: '100%', backgroundColor: '#DEDDE7', height: 1 }} />
                    <View style={{ padding: 30, }}>
                        <TextTwo lineheight={25} title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate voluptas facere perferendis molestiae assumenda amet rem ducimus illo deleniti, alias minus dolores ullam labore tempora repellendus aliquid quo vero autem!" />
                        <Divider style={{ height: 15, backgroundColor: 'transparent' }} />
                        <TextTwo lineheight={25} title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor similique, ab vel aliquid ex reprehenderit repellat accusantium illum."  />
                    </View>
                </Layout>
            <BotNav selected={2} />
        </SafeAreaView>
        </>
    )
};

export default SupportView;