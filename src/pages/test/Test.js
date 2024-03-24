import {Input, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView} from 'react-native';

const Test = () => {
  const handleChange = string => {};

  return (
    <SafeAreaView>
      <Input placeholder="Place your Text" />
      <Layout>
        <Input
          placeholder="Place your Text"
          value="Fart"
          onChange={string => handleChange}
        />
        <Text category="h2">Test</Text>
      </Layout>
    </SafeAreaView>
  );
};

export default Test;
