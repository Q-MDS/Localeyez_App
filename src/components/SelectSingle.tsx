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
		// props.onselect(displayValue);
  	}

	  const handleSelect = (index: IndexPath | IndexPath[]) => 
	  {
		  let singleIndex: IndexPath;
		  if (Array.isArray(index)) {
			  singleIndex = index[0];
		  } else {
			  singleIndex = index;
		  }
		  setSelectedIndex(singleIndex);
		  const selectedValue = props.options[singleIndex.row];
		  props.onSelect(selectedValue);
	  };

	return (
		<Layout style={styles.container} level="1">
			<Select
			selectedIndex={selectedIndex}
			placeholder="Default"
			onSelect={handleSelect}
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
