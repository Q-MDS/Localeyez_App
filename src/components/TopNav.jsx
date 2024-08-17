import React from 'react';
import { Icon, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const backIcon = (props) => (<Icon {...props} name='arrow-back-outline' /> );

export const TopNav = (props) => 
{
	const nav = props.nav;

	const BackAction = (props) => (
		<TopNavigationAction icon={backIcon} onPress={() => props.navigation.navigate(nav)} />
	);

    return (
        <TopNavigation
            accessoryLeft ={() => <BackAction navigation={props.navigation} />}
            title={(evaProps) => <Text {...evaProps} style={{color: '#00000080', fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase'}}>{props.title}</Text>}
        />
    );
};
