import React from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomIcons from '../CustomIcons';
import {
    BottomNavigation,
    BottomNavigationTab,
    Icon,
} from '@ui-kitten/components';

const IconOne = (props) => <Icon {...props} name="home-outline" />;
const IconTwo = (props) => <Icon {...props} name="search-outline" />;
const IconThree = (props) => <Icon {...props} name="star-outline" />;
const IconFour = (props) => <Icon {...props} name="headphones-outline" />;

export const BotNavBrowse = (props) => 
{
    const [selectedIndex, setSelectedIndex] = React.useState(props.selected);
    const navigation = useNavigation();

	const handleMsgHome = () => 
	{
		Alert.alert(
			"Feature",
			"User dashboard options:\n\n- View notifications\n- Manage your account\n- Advanced search\n- Your reviews\n- Contact admin\n\nSignup to enable this feature.",
			[
				{
				text: "Ok",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
				},
				{ text: "Read More", onPress: () => gotoRegister() }
			]
		);
	}

	const handleMsgSearch = () => 
	{
		Alert.alert(
			"Feature",
			"Search screen:\n\n- Search by geo-range\n- Search by date range\n- Search by category\n\nSignup to enable this feature.",
			[
				{
				text: "Ok",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
				},
				{ text: "Read More", onPress: () => gotoRegister() }
			]
		);
	}

	const handleMsgReviews = () => 
	{
		Alert.alert(
			"Feature",
			"Your reviews:\n\n- View reviews you have made.\n\nSignup to enable this feature.",
			[
				{
				text: "Ok",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
				},
				{ text: "Read More", onPress: () => gotoRegister() }
			]
		);
	}

	const handleMsgSupport = () => 
	{
		Alert.alert(
			"Feature",
			"Contact support. \n\nSignup to enable this feature.",
			[
				{
				text: "Ok",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
				},
				{ text: "Read More", onPress: () => gotoRegister() }
			]
		);
	}

	const gotoRegister = () => 
		{
			props.navigation.navigate('BrowseRegister');
		};

    const navigateToScreen = (index) => {
        setSelectedIndex(index);
        switch (index) {
            case 0:
                handleMsgHome();
                break;
            case 1:
                handleMsgSearch();
                break;
            case 2:
                handleMsgReviews();
                break;
            case 3:
                handleMsgSupport();
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
