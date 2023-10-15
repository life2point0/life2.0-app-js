import React from 'react';
import { TextInput, View, Text } from 'react-native';

export const TextField = ({ field, form, ...props }) => {
  const { name } = field;
  const { touched, errors } = form;

  return (
    <View>
      <TextInput
        style={{
            paddingTop: '2%',
            borderWidth: 1,
            borderRadius: '5%',
            paddingHorizontal: '5%',
            backgroundColor: '#fff',
            height: '10%'
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
