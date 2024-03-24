import React from 'react';
import { List, Avatar, Text, Divider, ListItem } from '@ui-kitten/components';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

// const data = new Array(15).fill({
//     title: 'Item',
//     name: 'Name',
//   });

export const ListSimple = (props) => 
{
    const renderItemIcon = () => 
    (
        <Avatar source={require('../assets/images/list_icon.png')} style={{ width: 64, height: 64, marginEnd: 10 }} />
    );

    const CustomListItem = ({ index, ...props }) => 
    (
        <ListItem style={{ backgroundColor: index % 2 === 0 ? '#fafafa' : 'white' }} {...props} />
    );

    const CustomDescription = ({ children }) => 
    (
        <View style={{ paddingLeft: 0 }}>
            <Text category='p2'>{children}</Text>
        </View> 
    );

    const renderItem = ({ item, index }) => 
    (
        <CustomListItem
        index={item.id}
        title={() => (
            <View>
                <Text style={{ fontWeight: 'bold' }}>{`${item.name}`}</Text>
            </View>
        )}
        description={<CustomDescription>{`${item.name}`}</CustomDescription>}
        accessoryLeft={renderItemIcon}
        onPress={() => props.selectItem(index)}
        />
    );

    const handlePress = () => 
    {
        console.log('Item pressed');
    };  

    return (
        <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
        <List
          style={styles.container}
          data={props.data}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});

