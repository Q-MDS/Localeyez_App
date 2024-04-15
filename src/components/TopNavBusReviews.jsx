import React from 'react';
import { Text, TopNavigation, Icon, Layout } from '@ui-kitten/components';

export const TopNavBusReviews = (props) => 
{
    return (
        <TopNavigation
        title={(evaProps) => <Text {...evaProps} style={{color: '#131141', fontSize: 20, fontWeight: 'bold'}}>{props.title}</Text>}
        alignment="start"
        accessoryRight={<Layout style={{ flexDirection: 'row', alignItems: 'center' }}><Icon name="star" fill='#000' style={{ width: 16, height: 16}}/><Text category='p2'>{props.rating}</Text></Layout>}
        />
    );
};