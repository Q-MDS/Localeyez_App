import React from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

export const SelectMulti = (props) => {

const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  return (
    <Layout
      style={styles.container}
      level='1'
    >
      <Select
        multiSelect={true}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
        style={{ marginTop: props.mt, marginBottom: props.mb }}
      >
        <SelectItem title='Shopping' />
        <SelectItem title='Travel' />
        <SelectItem title='Health & Wellness' />
      </Select>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: '100%'
  },
});