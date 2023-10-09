
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Field = (props) => {
  return (
    <TextInput
      {...props}
      style={styles.input}
      placeholderTextColor="black" 
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 100,
    color: 'black',
    paddingHorizontal: 10,
    width: '78%',
    backgroundColor: 'rgb(220, 220, 220)',
    marginVertical: 10,
  },
});

export default Field;