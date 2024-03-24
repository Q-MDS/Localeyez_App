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

export const TimeSelect = (props) => {

const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(props.time));
const displayValue = data[selectedIndex.row];

const renderOption = (title) => (
    <SelectItem title={title} />
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
        onSelect={(index) => setSelectedIndex(index)}
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