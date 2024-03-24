import React from 'react';
import { Icon, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props) => (
    <Icon
      {...props}
      name='arrow-back'
    />
);

const BackAction = (props) => (
    <TopNavigationAction icon={BackIcon} onPress={() => props.goBackTo ? props.navigation.navigate(props.goBackTo) : props.navigation.goBack()} />
);

export const TopNavArrowTitle = (props) => 
{
    return (
        <TopNavigation
        accessoryLeft={() => <BackAction navigation={props.navigation} goBackTo={props.goBackTo} />}
        title={(evaProps) => <Text {...evaProps} style={{color: '#131141', fontSize: 16, fontWeight: 'bold'}}>{props.title}</Text>}
        alignment={props.alignment}
        />
    );
}