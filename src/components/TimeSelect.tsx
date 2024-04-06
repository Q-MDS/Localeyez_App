import React from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

const data = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];

export const TimeSelect = (props: any): React.ReactElement => 
{

	const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(props.time, 1));

	let displayValue: string = '';
	if (!Array.isArray(selectedIndex)) 
	{
    	displayValue = data[selectedIndex.row];
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
		const selectedValue = data[singleIndex.row];
		props.onSelect(selectedValue);
	};

	const renderOption = (title: string, index: number) => 
	(
    	<SelectItem key={index} title={title} />
  	);

  return (
    <Layout
      style={styles.container}
      level='1'
    >
      <Select
        style={styles.select}
        placeholder='Default'
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
      >
        {data.map(renderOption)}
      </Select>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  select: {
    flex: 1,
    margin: 2,
    marginStart: 0
  },
});