import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card } from '@ui-kitten/components';
import TextTwo from './TextTwo';
import {IconText} from './IconText';

export const CardItem = (props) => 
{
    return (
        // <Layout style={styles.container}>
            <Card style={styles.card}>
                <View style={styles.image}>
                    <Image source={require('../assets/images/pic_holder.png')} style={{ width: 112, height: 112 }} />
                </View>
                    <TextTwo title={props.name} textalign="left" fontsize={16} fontweight="bold" mb={10} mt={15} />
                    <TextTwo title="Lorem ipsum dolor, sit amet conse ctetur adipisicing elit." textalign="left" fontsize={14} width="100%" mb={10} />
                    <TextTwo title="Business Name" textalign="left" fontsize={14} fontweight="bold" mb={10} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between'}} >
                        <IconText title="$200" iconname="pricetags-outline" fontsize={14} width={18} textAlign='left' />
                        <IconText title="11PM 05.03.2024" iconname="clock-outline" fontsize={14} width={18} textAlign='right' />
                    </View>

                {/* <Text>
                    {props.description}
                </Text> */}
            </Card>
        // </Layout>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        width: '100%',
    },

    image: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 150,
        backgroundColor: '#f9f9ff',
    },

    title: {
        width: '100%',
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    }
});