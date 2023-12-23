import React, { useRef } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Formik, Field } from 'formik'
import { LocationSelect } from '../inputs/LocationSelect/Location.js'
import { TextField } from '../inputs/textField/TextField'
import { ChipsArray } from '../inputs/chipsArray/ChipsArray'
import { CheckBox } from '../inputs/checkbox/Checkbox'
import Button from '../button/Button'
import { Select } from '../inputs/dropdown/Select.js'

const Form = ({ initialValues, validationSchema, fields, styles, onSubmit, submitButtonText, isLoading }) => {

  styles = styles || defaultStyles

  const fieldRefs = {};

  fields.forEach((field) => {
    fieldRefs[field.name] = useRef();
  })


  const focusNextField = (fieldName) => {
    const fieldIndex = fields.findIndex((formField) => formField.name === fieldName);
    if (fieldIndex < fields.length - 1) {
      const nextFieldName = fields[fieldIndex + 1].name;
      fieldRefs[nextFieldName].current?.focus()
    }
  }


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit, setFieldValue, setFieldTouched }) => (
        <>
        <View style={styles.container}> 
          {fields.map((formField) => {
            switch (formField.type) {
              case 'input': 
                return (
                  <React.Fragment key={formField.name}>
                    <Field name={formField.name}>
                      {({ field }) => (
                        <TextField
                          refId={fieldRefs[formField.name]}
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
                          onSubmitEditing={() => focusNextField(formField.name)}
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
                          refId={fieldRefs[formField.name]}
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

                case 'select':
                  return (
                    <React.Fragment key={formField.name}>
                      <Field name={formField.name} key={formField.name}>
                        {({ field }) => (
                          <Select
                            styles={styles.select}
                            label={formField.label}
                            multiple={formField.multiple}
                            options={formField.options || []}
                            value={values[field.name] || null}
                            onItemClick={(value) => setFieldValue(formField.name, value)}
                          />
                        )}
                      </Field>
                    </React.Fragment>
                  )
              default:
                return null
            }
          })}
        </View>
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
    select: {
      container: {
        marginTop: 20,
        marginBottom: 5
      },
      label: {
        fontWeight: '500'
      },
      textField: {
        height: 50,
        borderWidth: 1.4,
        borderRadius: 28,
        borderColor: 'lightgrey',
        justifyContent: 'center'
      },
      dropdown: {
          borderRadius: 10,
          borderColor: 'lightgrey',
          marginTop: 5,
          maxWidth: '100%'
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
      width: '100%',
      marginTop: 20,
      marginBottom: 50
    }
})