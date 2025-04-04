import React from 'react';
import { StyleSheet } from 'react-native';
import { Datepicker, Layout } from '@ui-kitten/components';

export const DateSelect = (props) => 
{
    return (
        <Layout
        style={[styles.container]}
        level='1'
        >

      <Datepicker
        date={props.value}
		name={props.name}
		onSelect={newValue => props.onChange(props.name, newValue)}
		controlStyle={{paddingStart: 0, marginStart: 0, backgroundColor: props.bg, borderWidth: 0, borderRadius: 5, width: '100%'}}
		status='primary'
      />

        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});