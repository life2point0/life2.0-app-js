import React from 'react';
import { TextInput, View, Text } from 'react-native';

export const TextField = ({ field, form, ...props }) => {
  const { name } = field;
  const { touched, errors } = form;

  return (
    <View>
      <TextInput
        style={{
            paddingTop: '8px',
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 12,
            backgroundColor: '#fff',
            height: 40
        }}
        {...props}
        onChangeText={form.handleChange(name)}
        onBlur={form.handleBlur(name)}
        value={form.values[name]}
      />
      {touched[name] && errors[name] && <Text>{errors[name]}</Text>}
    </View>
  );
};
