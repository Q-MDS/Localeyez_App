import React from 'react';
import { Icon, Input } from '@ui-kitten/components';

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

  const [value, setValue] = React.useState('');

  return (
    <Input
      value={value}
      label={props.label}
      placeholder={props.placeholder}
      accessoryLeft={SearchIcon}
      accessoryRight={ArrowIcon}
      style={{ borderRadius: 15 }}
      size="large"
      onChangeText={nextValue => setValue(nextValue)}
    />
  );
};