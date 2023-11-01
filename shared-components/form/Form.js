import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Formik, Field } from 'formik';
import { LocationSelect } from '../inputs/LocationSelect/Location.js';
import { TextField } from '../inputs/textField/TextField';
import { ChipsArray } from '../inputs/chipsArray/ChipsArray';

const Form = ({ initialValues, validationSchema, fields, styles, onSubmit, isLoading }) => {

  styles = styles || defaultStyles

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit, setFieldValue, setFieldTouched }) => (
        <>
        <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={styles.container}> 
          {fields.map((formField) => {
            switch (formField.type) {
              case 'input': 
                return (
                  <React.Fragment key={formField.name}>
                    <Field name={formField.name}>
                      {({ field }) => (
                        <TextField
                          label={formField.label || null}
                          multiline={formField.multiline || null}
                          value={field.value || null}
                          placeholder={formField.placeholder || null}
                          variant={formField.variant || null}
                          maxLength={formField.maxCharCount || null}
                          hidden={formField.hidden || null}
                          styles={styles.input}
                          onChange={text => {
                            handleChange(formField.name)(text);
                            formField.maxCharCount ? formField.charCount = text.length : null
                          }}
                        />
                      )}
                    </Field>
                    { formField.maxCharCount && formField.charCount && <Text style={styles.charCount}>{formField.maxCharCount - formField.charCount} chars left</Text>}
                    { touched[formField.name] && errors[formField.name] && (
                      <Text style={styles.errorText}>{errors[formField.name]}</Text>
                    )}
                  </React.Fragment>
                );
            
              case 'location':
                console.log(formField)
                return (
                  <React.Fragment key={formField.name}>
                    <Field name={formField.name}>
                      {({ field }) => (
                        <LocationSelect
                          label={formField.label}
                          multiple={formField.multiple}
                          styles={styles.location}
                          onLocationSelect={(selectedLocation) => {
                            setTimeout(() => {
                              setFieldTouched(formField.name)
                            }, 0)
                            setFieldValue(formField.name, selectedLocation)
                          }}
                        />
                      )}
                    </Field>
                  </React.Fragment>
              );
              
              case 'chip':
                return (
                  <React.Fragment key={formField.name}>
                    <Field name={formField.name} key={formField.name}>
                      {({ field }) => (
                        <ChipsArray
                          styles={styles.chip}
                          label={formField.label}
                          options={formField.options || []}
                          selectedChips={values[field.name] || []}
                          onChipClick={(value) => setFieldValue(formField.name, value)}
                        />
                      )}
                    </Field>
                  </React.Fragment>
                );
              default:
                return null
            }
          })}
        </ScrollView>
        <PrimaryButton mode="contained" textColor='#FFC003' onPress={handleSubmit} loading={isLoading} disabled={isLoading}>
            Submit
        </PrimaryButton>
        </>
      )}
    </Formik>
  );
};

export { Form }

const defaultStyles = StyleSheet.create({
  container: {
    padding: 0
  },
  input: {
    container: {
      marginBottom: 20
    },
    textField: {
      height: 100,
      borderWidth: 1,
      borderColor: 'gray',
      padding: 8
    },
    textarea: {
      height: 400,
      padding: 8,
      borderWidth: 1,
      borderColor: 'gray'
    }
  },
  chip: {
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 20,
      gap: 8
    }
  },
  location: {
    label: {
        marginBottom: 8 
    },
    dropdown: {
        textInput: {
        borderWidth: 1,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomStartRadius: 10,
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopStartRadius: 10
      }
    }
  },
  errorText: {
    color: 'red'
  }
})