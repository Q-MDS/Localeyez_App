import React from 'react';
import { Icon, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const backIcon = (props) => (<Icon {...props} name='arrow-back-outline' /> );
const deleteIcon = (props) => (<Icon {...props} name='trash-2-outline' /> );

const BackAction = (props) => (
    // <TopNavigationAction icon={backIcon} onPress={() => props.navigation.goBack()} />
    <TopNavigationAction icon={backIcon} onPress={() => props.navigation.pop(props.pops)} />
);

export const TopNavBack = (props) => 
{
    return (
        <TopNavigation
            accessoryLeft ={() => <BackAction navigation={props.navigation} />}
            title={(evaProps) => <Text {...evaProps} style={{color: '#131141', fontSize: 20, fontWeight: 'bold'}}>{props.title}</Text>}
        />
    );
};
