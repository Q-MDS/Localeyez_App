import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    BottomNavigation,
    BottomNavigationTab,
    Icon,
} from '@ui-kitten/components';

const IconOne = (props) => <Icon {...props} name="home-outline" />;

const IconTwo = (props) => <Icon {...props} name="briefcase-outline" />;

const IconThree = (props) => <Icon {...props} name="star-outline" />;

const IconFour = (props) => <Icon {...props} name="headphones-outline" />;

export const BotNavBusiness = (props) => 
{
    const [selectedIndex, setSelectedIndex] = React.useState(props.selected);
    const navigation = useNavigation();

    const navigateToScreen = (index) => {
        setSelectedIndex(index);
        switch (index) {
            case 0:
                navigation.navigate('BusinessDashboard');
                break;
            case 1:
                navigation.navigate('BusProfProHome');
                break;
            case 2:
                navigation.navigate('ReviewList');
                break;
            case 3:
                navigation.navigate('ContactForm');
                break;
            default:
                break;
        }
    };

    return (
        <BottomNavigation
            selectedIndex={props.selected}
            indicatorStyle={{ backgroundColor: '#8F9BB3' }}
            onSelect={navigateToScreen}
        >
            <BottomNavigationTab icon={IconOne} />
            <BottomNavigationTab icon={IconTwo} />
            <BottomNavigationTab icon={IconThree} />
            <BottomNavigationTab icon={IconFour} />
        </BottomNavigation>
    );
};
