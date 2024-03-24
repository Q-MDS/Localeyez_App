import React from 'react';
import { Tab, TabBar } from '@ui-kitten/components';

export const TabsSearch = (props) => {

//   const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <TabBar
      selectedIndex={props.selected}
      onSelect={index => props.onchange(index)}
      style={{ width: '100%', height: 50, backgroundColor: '#f5f5f5'}}
    >
      <Tab title='Businesses' />
      <Tab title='Promotions' />
      <Tab title='Events' />
    </TabBar>
  );
};