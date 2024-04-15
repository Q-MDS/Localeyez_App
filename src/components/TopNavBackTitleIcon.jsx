import React from 'react';
import { Icon, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const backIcon = (props) => (<Icon {...props} name='arrow-back-outline' /> );
const deleteIcon = (props) => (<Icon {...props} name='trash-2-outline' /> );

const BackAction = (props) => (
    <TopNavigationAction icon={backIcon} onPress={() => props.goBackTo ? props.navigation.navigate(props.goBackTo) : props.navigation.goBack()} />
);

export const TopNavBackTitleIcon = (props) => 
{
	console.log('Eggs: ' + props.deleteId);
    const deletePage = props.goDelete;
	const deleteId = props.deleteId;
    const DeleteAction = (props) => (
        <TopNavigationAction icon={deleteIcon} onPress={() => props.navigation.navigate(deletePage, {deleteId: deleteId})} />
    );

    return (
        <TopNavigation
            title={(evaProps) => <Text {...evaProps} style={{color: '#131141', fontSize: 16, fontWeight: 'bold'}}>{props.title}</Text>}
            accessoryRight={() => <DeleteAction navigation={props.navigation} />}
            accessoryLeft ={() => <BackAction navigation={props.navigation} />}
        />
    );
};
