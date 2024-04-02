import React from 'react';
import { StyleSheet } from 'react-native';
import { Datepicker, Layout } from '@ui-kitten/components';

export const DateSelect = (props) => 
{
    return (
        <Layout
        style={styles.container}
        level='1'
        >

      <Datepicker
        date={props.value}
        onSelect={nextDate => props.setDate(nextDate)}
      />

        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
});