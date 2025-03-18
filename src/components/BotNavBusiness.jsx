import React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomNavigation, BottomNavigationTab, Icon} from '@ui-kitten/components';
import CustomIcons from '../CustomIcons';

const IconOne = (props) => <Icon {...props} name="home-outline" />;
const IconTwo = (props) => <Icon {...props} name="briefcase-outline" />;
const IconThree = (props) => <Icon {...props} name="star-outline" />;
const IconFour = (props) => <Icon {...props} name="headphones-outline" />;
const IconFive = (props) => <Icon {...props} name="calendar-outline" />;

export const BotNavBusiness = (props) => 
{
    const [selectedIndex, setSelectedIndex] = React.useState(props.selected);
    const navigation = useNavigation();

	// const IconOne = () => <CustomIcons name="bmi_home" size={24} color={props.selected == 0 ? '#612bc1' : '#CCCCCC'} />;
	// const IconTwo = () => <CustomIcons name="bmi_profile" size={24} color={props.selected == 1 ? '#612bc1' : '#CCCCCC'} />;
	// const IconThree = () => <CustomIcons name="bmi_reviews" size={24} color={props.selected == 2 ? '#612bc1' : '#CCCCCC'} />;
	// const IconFour = () => <CustomIcons name="bmi_support" size={24} color={props.selected == 3 ? '#612bc1' : '#CCCCCC'} />;

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
                navigation.navigate('Bookings');
                break;
            case 3:
                navigation.navigate('ReviewList');
                break;
            case 4:
                navigation.navigate('ContactForm');
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
            <BottomNavigationTab  icon={IconOne} title={"Home"} />
            <BottomNavigationTab icon={IconTwo} title={"Profile"} />
            <BottomNavigationTab  icon={IconFive} title={"Bookings"} />
            <BottomNavigationTab icon={IconThree} title={"Reviews"} />
            <BottomNavigationTab icon={IconFour} title={"Support"} />
        </BottomNavigation>
    );
};
