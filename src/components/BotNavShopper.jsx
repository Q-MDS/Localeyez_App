import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    BottomNavigation,
    BottomNavigationTab,
    Icon,
} from '@ui-kitten/components';

const IconOne = (props) => <Icon {...props} name="home-outline" />;

const IconTwo = (props) => <Icon {...props} name="search-outline" />;

const IconThree = (props) => <Icon {...props} name="star-outline" />;

const IconFour = (props) => <Icon {...props} name="headphones-outline" />;

export const BotNavShopper = (props) => 
{
    const [selectedIndex, setSelectedIndex] = React.useState(props.selected);
    const navigation = useNavigation();

    const navigateToScreen = (index) => {
        setSelectedIndex(index);
        switch (index) {
            case 0:
                navigation.navigate('ShopperHome');
                break;
            case 1:
                navigation.navigate('Search');
                break;
            case 2:
                navigation.navigate('ShopperReviewList');
                break;
            case 3:
                navigation.navigate('ShopperContactAdmin');
                break;
            default:
                break;
        }
    };

    return (
        <BottomNavigation
            selectedIndex={props.selected}
            indicatorStyle={{ backgroundColor: '#612bc1' }}
            onSelect={navigateToScreen}
        >
            <BottomNavigationTab icon={IconOne} />
            <BottomNavigationTab icon={IconTwo} />
            <BottomNavigationTab icon={IconThree} />
            <BottomNavigationTab icon={IconFour} />
        </BottomNavigation>
    );
};
