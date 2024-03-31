import React, { useState, useEffect } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { Checkbox } from './Checkbox';

const AccordianCheckboxList = (props) =>
{
	const checkboxes = props.data;

	const [show, setShow] = useState(false);
	const [activeSections, setActiveSections] = useState([]);

	const [checkedItems, setCheckedItems] = useState(
		checkboxes.reduce((acc, curr) => {
		  acc[curr.id] = curr.checked;
		  return acc;
		}, {})
	);

    const dataArray =
	[
		{ title: props.label },
	];

	const handleAccordionChange = (indexes) =>
	{
		setActiveSections(indexes);
		setShow(!show);
	};

	const handleCheckboxChange = (id) => {
		setCheckedItems(prevState => {
		  const newCheckedItems = {...prevState, [id]: !prevState[id]};
		  const allCheckboxes = checkboxes.map(checkbox => ({
			...checkbox,
			checked: !!newCheckedItems[checkbox.id]
		  }));
		  console.log('allCheckboxes xxx', allCheckboxes);
		  props.updateData(allCheckboxes);
		  return newCheckedItems;
		});
	};
	
	const renderHeader = () =>
	{
		return (
			<View style={[styles.topRow]}>
				<Text style={styles.bulletText}>{props.title}</Text>
				{show ? (
                    <Icon name="arrow-ios-upward-outline" fill="#5D5A88" style={{ width: 24, height: 24, marginEnd: 10 }} />
				) : (

					<Icon name="arrow-ios-downward-outline" fill="#5D5A88" style={{ width: 24, height: 24, marginEnd: 10 }} />
				)}
			</View>
		);
	};

	const renderContent = () =>
	{
        return (
			<View style={styles.modal}>
				{checkboxes.map((checkbox, index) => (
					<View key={index} style={{ marginTop: 5, marginBottom: 5, marginLeft: checkbox.type === 1 ? 30 : 10 }}>
					<Checkbox 
					label={checkbox.item} 
					checked={checkedItems[checkbox.id]} 
					onChange={() => handleCheckboxChange(checkbox.id)} 
					/>
					</View>
				))}
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<Accordion
			sections={dataArray}
			activeSections={activeSections}
			renderHeader={renderHeader}
			renderContent={renderContent}
			onChange={handleAccordionChange}
            touchableProps={{ underlayColor: '#D5D2F3' }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
	},
	topRow: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding : 10,
		paddingEnd: 0
	},
	bulletText: {
        flex: 1,
		fontWeight: '600',
		fontSize: 14,
		textAlign: 'left',
		alignSelf: 'center',
		color: '#131141',
	},
});

export default AccordianCheckboxList;
