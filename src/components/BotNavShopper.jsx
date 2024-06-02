import React from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomIcons from '../CustomIcons';
import {
    BottomNavigation,
    BottomNavigationTab,
    Icon,
} from '@ui-kitten/components';

// const IconOne = (props) => <Icon {...props} name="home-outline" />;

// const IconTwo = (props) => <Icon {...props} name="search-outline" />;

// const IconThree = (props) => <Icon {...props} name="star-outline" />;

// const IconFour = (props) => <Icon {...props} name="headphones-outline" />;

export const BotNavShopper = (props) => 
{
    const [selectedIndex, setSelectedIndex] = React.useState(props.selected);
    const navigation = useNavigation();

	const IconOne = () => <CustomIcons name="bmi_home" size={24} color={props.selected == 0 ? '#612bc1' : '#CCCCCC'} />;
	const IconTwo = () => <CustomIcons name="bmi_search" size={24} color={props.selected == 1 ? '#612bc1' : '#CCCCCC'} />;
	const IconThree = () => <CustomIcons name="bmi_reviews" size={24} color={props.selected == 2 ? '#612bc1' : '#CCCCCC'} />;
	const IconFour = () => <CustomIcons name="bmi_support" size={24} color={props.selected == 3 ? '#612bc1' : '#CCCCCC'} />;

    const navigateToScreen = (index) => {
        setSelectedIndex(index);
        switch (index) {
            case 0:
                navigation.navigate('ShopperHome');
                break;
            case 1:
                navigation.navigate('Search', { searchFor: '' });
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
