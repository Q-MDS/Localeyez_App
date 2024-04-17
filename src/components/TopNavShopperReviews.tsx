import React from 'react';
import { Text, TopNavigation, Icon, Layout } from '@ui-kitten/components';

export const TopNavShopperReviews = (props:any) => 
{
    return (
        <TopNavigation
        title={(evaProps) => <Text {...evaProps} style={{color: '#131141', fontSize: 20, fontWeight: 'bold'}}>{props.title}</Text>}
        alignment="start"
        />
    );
};