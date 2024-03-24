import React, { useState } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '@ui-kitten/components';

const AccordianList = (props) =>
{
	const [show, setShow] = useState(false);
	const [activeSections, setActiveSections] = useState([]);
	const dataArray =
	[
		{ title: props.label, content: props.description },
	];

	const handleAccordionChange = (indexes) =>
	{
		setActiveSections(indexes);
		setShow(!show);
	};

	const renderHeader = () =>
	{
		return (
			<View style={[styles.topRow, { padding: 10, paddingStart: 5 }]}>
				<Text style={styles.bulletText}>{props.title}</Text>
				{show ? (
                    <Icon name="arrow-ios-upward-outline" fill="#5D5A88" style={{ width: 16, height: 16, marginEnd: 10 }} />
				) : (

					<Icon name="arrow-ios-downward-outline" fill="#5D5A88" style={{ width: 16, height: 16, marginEnd: 10 }} />
				)}
			</View>
		);
	};

	const renderContent = () =>
	{
		return (
			<View style={styles.modal}>
                {props.options.map((item, index) => (
                        <Text key={index} style={styles.description}>{item}</Text>
                ))}
				{/* <Text style={styles.description}>{section.content}</Text> */}
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
		marginBottom: 10,
	},
	topRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	icon: {
		alignSelf: 'center',
	},
	bulletText: {
        flex: 1,
		fontWeight: '600',
		fontSize: 14,
		lineHeight: 16,
		textAlign: 'left',
		alignSelf: 'center',
		color: '#131141',
	},
	description: {
		fontWeight: '400',
		fontSize: 13,
		lineHeight: 24,
		textAlign: 'left',
		color: '#302D61',
	},
	modal: {
		flexGrow: 1,
		marginLeft: 5,
		marginTop: 5,
	},
});

export default AccordianList;
