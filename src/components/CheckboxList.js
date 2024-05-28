import React from 'react';
import { View } from 'react-native';
import { Text, CheckBox } from '@ui-kitten/components';

export const CheckboxList = (props) => 
{
    return (
		<View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 1, paddingBottom: 15 }}>
		<Text status="primary" style={{ marginTop: 10, marginBottom: 10 }}>{props.title}</Text>
		
		{props.data.map((item, index) => (
			<CheckBox
				key={index}
				title={item.label}
				checked={item.value}
				onChange={() => props.onCheckboxChange(item.label, !item.value)}
				style={{ width: '100%', marginTop: 0, marginBottom: 5}}
			>
			{item.label}
			</CheckBox>
		))}
		</View>
    );
};
