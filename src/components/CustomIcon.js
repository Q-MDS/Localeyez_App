import React from 'react';
import VectorIcon from 'react-native-vector-icons/FontAwesome';

const CustomIcon = ({ name, style }) => (
  <VectorIcon name={name} size={style.width} color={style.color} marginBottom={3} />
);

export default CustomIcon;