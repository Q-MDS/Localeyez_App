import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { Icon } from '@ui-kitten/components';

export const DropdownMultiSelect = (props:any) => 
{
	const [selected, setSelected] = React.useState<string[]>([]);
	return (
		<MultiSelect
			style={[styles.dropdown]}
			placeholderStyle={styles.placeholderStyle}
			selectedTextStyle={styles.selectedTextStyle}
			inputSearchStyle={styles.inputSearchStyle}
			iconStyle={styles.iconStyle}
			itemTextStyle={{ color: 'black'}}
			activeColor='#E9E8F9'
			search
			data={props.data}
			labelField="label"
			valueField="value"
			placeholder={props.placeholder}
			searchPlaceholder="Search..."
			// value={selected}
			value={props.value}
			// onChange={item => { setSelected(item); }}
			onChange={item => { props.onChange(item); }}
			renderLeftIcon={() => ( <Icon name={props.icon} fill="#5D5A88" style={{ width: 24, height: 24, marginEnd: 10 }} /> )}
			selectedStyle={styles.selectedStyle}
		/>		
	)
};

const styles = StyleSheet.create({
	dropdown: {
		width: '100%',
		flex: 1,
		height: 50,
		backgroundColor: 'transparent',
		borderBottomColor: 'gray',
		borderBottomWidth: 0.5,
	  },
	  placeholderStyle: {
		fontSize: 16,
		color: '#000',
	  },
	  selectedTextStyle: {
		fontSize: 14,
		color: '#000',
	  },
	  iconStyle: {
		width: 20,
		height: 20,
	  },
	  inputSearchStyle: {
		height: 40,
		fontSize: 16,
		color: '#000',
	  },
	  icon: {
		marginRight: 5,
	  },
	  selectedStyle: {
		borderRadius: 12,
		color: '#000',
		backgroundColor: '#E9E8F9'
	  },
  });


