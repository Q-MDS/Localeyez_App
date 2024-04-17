import React, { useState } from "react";
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon } from '@ui-kitten/components';

// const data = [
//     { label: '01:00', value: '01:00' },
//     { label: '02:00', value: '02:00' },
//     { label: '03:00', value: '03:00' },
//     { label: '04:00', value: '04:00' },
//     { label: '05:00', value: '05:00' },
//     { label: '06:00', value: '06:00' },
//     { label: '07:00', value: '07:00' },
//     { label: '08:00', value: '08:00' },
//   ];

  const DropdownSingle = (props) => 
  {
    // const [value, setValue] = useState(null);

    return (
      <Dropdown
	  	name={props.name} 
        style={styles.dropdown}
		itemTextStyle={{ color: 'black' }}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={props.data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={props.value}
        onChange={item => { props.onChange(props.name, item.value); }}
        renderLeftIcon={() => (
			<Icon name="arrow-ios-upward-outline" fill="#5D5A88" style={{ width: 24, height: 24, marginEnd: 10 }} />
        )}
      />
    );
  };

  export default DropdownSingle;

  const styles = StyleSheet.create({
    dropdown: {
      margin: 16,
	  marginStart: 0,
	  marginEnd: 0,
      height: 50,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
	  color: 'black',
	  flex: 1
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
	  color: 'black',
    },
    selectedTextStyle: {
      fontSize: 16,
	  color: 'black',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
	  color: 'black',
    },
  });