import React from 'react';
import { Tab, TabBar } from '@ui-kitten/components';

export const TabsBusProf = (props) => {

//   const [selectedIndex, setSelectedIndex] = React.useState(0);



  // <TabsBusProf selected={0} value={selectedIndex} onchange={setSelectedIndex} />

  return (
    <TabBar
      selectedIndex={props.value}
      onSelect={index => props.onchange(index)}
    >
      <Tab title='Business Profile' />
      <Tab title='Business Sectors' />
    </TabBar>
  );
};