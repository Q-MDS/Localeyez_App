import React from 'react';
import { Text, TopNavigation } from '@ui-kitten/components';

export const TopNavTitle = (props) => 
{
    return (
        <TopNavigation
        title={(evaProps) => <Text {...evaProps} style={{color: '#131141', fontSize: 16, fontWeight: 'bold'}}>{props.title}</Text>}
        alignment={props.alignment}
        />
    );
}