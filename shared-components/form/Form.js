import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Formik, Field } from 'formik';
import { Chip } from 'react-native-paper';
import { LocationSelect } from '../inputs/LocationSelect/Location';

const Form = ({ initialValues, validationSchema, onSubmit, fields, styles, onChipClick, isLoading, updateCharCount }) => {

  styles = styles || defaultStyles
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      onChipClick={onChipClick}
      updateCharCount={updateCharCount}
    >
      {({ errors, touched, handleChange, handleSubmit, setFieldValue }) => (
        <>
        <ScrollView keyboardShouldPersistTaps='always'> 
          {fields.map((field) => {
            switch (field.type) {
              case 'text': 
                return (
                  <View style={styles.fieldContainer} key={field.name}>
                    <Text>{field.label}</Text>
                    <Field name={field.name}>
                      {({ field }) => (
                        <TextInput
                          style={styles.input}
                          value={field.value}
                        />
                      )}
                    </Field>
                    {touched[field.name] && errors[field.name] && (
                      <Text style={styles.errorText}>{errors[field.name]}</Text>
                    )}
                  </View>
                );
              
              case 'textarea':
                return (
                  <View style={styles.fieldContainer} key={field.name}>
                    <Text>{field.label}</Text>
                    <Field name={field.name}>
                      {({ field }) => (
                        <TextInput
                          style={styles.textarea}
                          value={field.value}
                          multiline
                          maxLength={field.maxCharCount}
                          onChangeText={text => {
                            handleChange(field.name)(text);
                            updateCharCount(field.name, text.length);
                          }}
                        />
                      )}
                    </Field>
                    {touched[field.name] && errors[field.name] && (
                      <Text style={styles.errorText}>{errors[field.name]}</Text>
                    )}
                    <Text style={styles.charCount}>{field.maxCharCount - field.charCount} chars left</Text>
                  </View>
                );
            
              case 'location':
                return (
                  <View style={styles.fieldContainer} key={field.name}>
                    <LocationSelect
                      field={field}
                      styles={styles}
                      setFieldValue={setFieldValue}
                    />
                  </View>
              );
              case 'chip':
                return (
                  <View style={styles.chipContainer} key={field.name}>
                    <View style={{width: '100%'}}>
                      <Text>{field.label}</Text>
                    </View>
                    {field.options.map((option) => (
                      <Chip
                        key={option}
                        selected={field.selectedChips.includes(option)}
                        onPress={() => onChipClick(option)}
                      >
                        {option}
                      </Chip>
                    ))}
                  </View>
                );
              default:
                return null
            }
          })}
        </ScrollView>
        <PrimaryButton mode="contained" onPress={handleSubmit} loading={isLoading} disabled={isLoading}>
            Submit
        </PrimaryButton>
        </>
      )}
    </Formik>
  );
};

export { Form }

const defaultStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
  },
  errorText: {
    color: 'red',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 8,
  },
});