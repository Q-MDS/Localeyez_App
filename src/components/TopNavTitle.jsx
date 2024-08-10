import React from 'react';
import { Text, TopNavigation } from '@ui-kitten/components';

export const TopNavTitle = (props) => 
{
    return (
        <TopNavigation
        title={(evaProps) => <Text {...evaProps} style={{color: '#00000080', fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase'}}>{props.title}</Text>}
        alignment={props.alignment}
        />
    );
}