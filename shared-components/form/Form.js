import React from 'react'
import { Text, ScrollView, StyleSheet } from 'react-native'
import { Formik, Field } from 'formik'
import { LocationSelect } from '../inputs/LocationSelect/Location.js'
import { TextField } from '../inputs/textField/TextField'
import { ChipsArray } from '../inputs/chipsArray/ChipsArray'
import { CheckBox } from '../inputs/checkbox/Checkbox'
import Button from '../button/Button'

const Form = ({ initialValues, validationSchema, fields, styles, onSubmit, submitButtonText, isLoading }) => {

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
                            handleChange(formField.name)(text)
                            formField.maxCharCount ? formField.charCount = text.length : null
                          }}
                        />
                      )}
                    </Field>
                    
                    { formField.maxCharCount && formField.charCount !== undefined && (
                        <Text style={styles.input.charCount}>
                          {String(formField.maxCharCount - (formField.charCount || 0))} chars left
                        </Text>
                    )}

                    { touched[formField.name] && errors[formField.name] && (
                      <Text style={styles.errorText}>{errors[formField.name]}</Text>
                    )}
                  </React.Fragment>
                )
            
              case 'location':
                return (
                  <React.Fragment key={formField.name}>
                    <Field name={formField.name}>
                      {({ field }) => (
                        <LocationSelect
                          label={formField.label}
                          multiple={formField.multiple}
                          styles={styles.location}
                          preSelectedLocation={values[field.name] || null}
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
              )
              
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
                )
                case 'checkbox':
                  return (
                    <React.Fragment key={formField.name}>
                      <Field name={formField.name} key={formField.name}>
                        {({ field }) => (
                          <CheckBox
                            styles={styles.checkbox}
                            label={formField.label}
                            value={field.value || null}
                            onChange={(value) => setFieldValue(formField.name, value)}
                          />
                        )}
                      </Field>
                    </React.Fragment>
                  )
              default:
                return null
            }
          })}
        </ScrollView>
        <Button style={styles.submitButton} mode="contained" onPress={handleSubmit} loading={isLoading} disabled={isLoading}>
            {submitButtonText}
        </Button>
        </>
      )}
    </Formik>
  )
}

export { Form }

const defaultStyles = StyleSheet.create({
    container: {
        padding: 0
    },
    input: {
        container: {
          marginTop: 20,
          marginBottom: 5
        },
        label: {
          fontWeight: '500'
        },
        textField: {
          height: 40,
          borderWidth: 1.4,
          borderRadius: 5,
          borderColor: '#ccc',
          marginTop: 5,
          paddingHorizontal: 10,
          justifyContent: 'center'
        },
        textarea: {
          height: 100,
          marginTop: 5,
          padding: 10,
          textAlignVertical: 'top',
          borderWidth: 1.4,
          borderColor: '#ccc',
          borderRadius: 5
        },
        charCount: {
          fontSize: 12,
          textAlign: 'right'
        }
    },
    chip: {
        container: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 20,
            gap: 8,
        },
        label: {
            width: '100%',
            fontWeight: '500'
        }
    },
    location: {
      container: {
       marginTop: 20,
      },
      label: {
          marginBottom: 5,
          fontWeight: '500'
      },
      textField: {
        height: 40,
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderColor: '#ccc',
        borderWidth: 1.4,
        borderRadius: 5
      },
      dropdown: {
        textInput: {
          alignSelf: 'center',
          borderRadius: 28,
          borderWidth: 1,
          flex: 1,
          marginRight: 10,
          padding: 10,
          borderColor: 'lightgrey'
        },
        textInputContainer: {
          autoFocus: true,
          selectTextOnFocus: true,
          style: {
            alignSelf: 'center',
            borderRadius: 28,
            borderWidth: 1,
            flex: 1,
            marginRight: 10,
            padding: 10,
            borderColor: 'lightgrey'
          }
        }
      },
      addMoreButton: {
        marginLeft: 'auto'
      }
    },
    checkbox: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 20
      },
      label: {
        color: '#717171',
        fontWeight: '500'
      }
    },
    errorText: {
      color: 'red',
    },
    submitButton: {
      marginTop: 20,
      width: '100%'
    }
})