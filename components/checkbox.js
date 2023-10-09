import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,  } from 'react-native';

const CustomCheckbox = ({ label, isChecked, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
      <View
        style={[
          styles.checkbox,
          isChecked ? styles.checked : styles.unchecked,
        ]}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 15,
    height: 15,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 5,
  },
  checked: {
    backgroundColor: '#000',
  },
  unchecked: {
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 12,
  },
});

export default CustomCheckbox;
