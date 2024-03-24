import React from 'react';
import {
    Icon,
    Text,
    TopNavigation,
    TopNavigationAction,
} from '@ui-kitten/components';

// const LogoutIcon = (props) => <Icon {...props} name="log-out-outline" />;

const LogoutIcon = (props) => (
    <Icon
      {...props}
      name='log-out-outline'
    />
);

const LogoutAction = (props) => (
    <TopNavigationAction icon={LogoutIcon} onPress={() => props.navigation.navigate("Menu")} />
);

export const TopNavLrgTitleIcon = (props) => 
{
    console.log('Props zzz: ', {...props});
    return (
        <TopNavigation
            // title={props.title}
            // title={(evaProps) => ( <Text {...evaProps} style={{ color: '#131141', fontSize: 18, fontWeight: 'bold', }}>{props.title}</Text>)}
            title={(evaProps) => <Text {...evaProps} style={{color: '#131141', fontSize: 16, fontWeight: 'bold'}}>{props.title}</Text>}
            accessoryRight={() => <LogoutAction navigation={props.navigation} />}
            // accessoryLeft ={() => <BackAction navigation={props.navigation} />}
        />
    );
};
