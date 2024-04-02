import React from 'react';
import {StyleSheet} from 'react-native';
import {IndexPath, Layout, Select, SelectItem} from '@ui-kitten/components';

export const SelectSingle = (props: any): React.ReactElement => 
{
	const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]>(new IndexPath(0));

	let displayValue: string = '';
	if (!Array.isArray(selectedIndex)) 
	{
    	displayValue = props.options[selectedIndex.row];
		props.onselect(displayValue);
  	}

	return (
		<Layout style={styles.container} level="1">
			<Select
			selectedIndex={selectedIndex}
			placeholder="Default"
			onSelect={index => setSelectedIndex(index)}
			value={displayValue}>
			{props.options.map((option: string, index: number) => (
				<SelectItem key={index} title={option} />
			))}
			</Select>
		</Layout>
	);
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
	marginTop: 10,
	marginBottom: 20,
  },
});
