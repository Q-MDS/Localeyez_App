import React from 'react';
import { Tab, TabBar } from '@ui-kitten/components';

export const TabsBusProf = (props) => {

  	return (
		<TabBar
		selectedIndex={props.value}
		onSelect={index => props.onchange(index)}
		tabBarStyle={{ backgroundColor: '#612BC1', fontSize: 23 }}
		>
		<Tab title='Business Profile' />
		<Tab title='Business Sectors' />
		</TabBar>
  	);
};