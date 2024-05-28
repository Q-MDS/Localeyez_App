import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    BottomNavigation,
    BottomNavigationTab,
    Icon,
} from '@ui-kitten/components';

const LeftIcon = (props) => <Icon {...props} name="briefcase-outline" />;

const MidIcon = (props) => <Icon {...props} name="book-outline" />;

const RightIcon = (props) => <Icon {...props} name="headphones-outline" />;

export const BotNav = (props) => 
{
    const [selectedIndex, setSelectedIndex] = React.useState(props.selected);
    const navigation = useNavigation();

    const navigateToScreen = (index) => {
        setSelectedIndex(index);
        switch (index) {
            case 0:
                navigation.navigate('AdminNewBusinessHome', {refresh: true});
                break;
            case 1:
                navigation.navigate('AdminAllBusinessHome');
                break;
            case 2:
                navigation.navigate('AdminSupportHome');
                break;
            default:
                break;
        }
    };

    return (
        <BottomNavigation
            selectedIndex={selectedIndex}
            indicatorStyle={{ backgroundColor: '#612bc1' }}
            onSelect={navigateToScreen}
        >
            <BottomNavigationTab icon={LeftIcon} />
            <BottomNavigationTab icon={MidIcon} />
            <BottomNavigationTab icon={RightIcon} />
        </BottomNavigation>
    );
};
