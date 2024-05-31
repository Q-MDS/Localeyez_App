import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Layout, Icon, Input } from '@ui-kitten/components';

const SearchIcon = (props) => (
  <Icon
    {...props}
    name='search-outline'
  />
);

const ArrowIcon = (props) => (
  <Icon
    {...props}
    name='arrow-circle-right'
  />
);

export const InputSearch = (props) => {

//   const [value, setValue] = React.useState('');

  return (
	<Layout style={{ width: '100%', position: 'relative' }}>
		<Input
		value={props.value}
		label={props.label}
		placeholder={props.placeholder}
		status="primary"
		style={{ borderRadius: 25, backgroundColor: 'white' }}
		size="large"
		onChangeText={nextValue => props.setValue(nextValue)}
		textStyle={{ marginStart: 30, marginEnd: 40, paddingTop: 5, paddingBottom: 5 }}
		/>
		<TouchableOpacity style={{ position: 'absolute', left: 10, top: 16 }} onPress={props.onpress}>
			<Image source={require('../assets/images/icon_search.png')} style={{ width: 24, height: 24, opacity: 0.8 }} />
		</TouchableOpacity>
		<TouchableOpacity style={{ position: 'absolute', right: 9, top: 9 }} onPress={props.onpress} >
			<Image source={require('../assets/images/icon_go.png')} style={{ width: 40, height: 40  }} />
		</TouchableOpacity>
	</Layout>
	
  );
};