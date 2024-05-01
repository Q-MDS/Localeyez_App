import React from 'react';
import { View} from 'react-native';
import MainStyles from '../../../assets/styles/MainStyles';
import { TopNavBack } from '../../../components/TopNavBack';
import { ContactCard } from '../../../components/ContactCard';
import { BotNav } from '../../../components/BotNav';
import { Layout, Divider } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';
import TextTwo from '../../../components/TextTwo';

const SupportView = (props) => 
{
	const record = props.route.params.record;
console.log('Record: ', record);

    return (
        <>
        <SafeAreaView style={{ flex: 1 }}>
        <TopNavBack title="Admin message" alignment="start" navigation={props.navigation} pops={1} />
            <Divider style={{ height: 2, backgroundColor: '#DEDDE7' }} />
                <Layout style={ MainStyles.layout_container_grid }>
					{record.contact_type === '0' && <ContactCard title={record.contact.company_name} email={record.contact.email} image={record.contact.profile_pic} />}	
					{record.contact_type === '1' && <ContactCard title={`${record.contact.first_name} ${record.contact.last_name}`} email={record.contact.email} image={record.contact.profile_pic} />}	


                    
                    <Divider style={{ width: '100%', backgroundColor: '#DEDDE7', height: 1 }} />
                    <View style={{ padding: 30, }}>
                        <TextTwo lineheight={25} title={record.mesage_desc} />
                    </View>
                </Layout>
            <BotNav selected={2} />
        </SafeAreaView>
        </>
    )
};

export default SupportView;