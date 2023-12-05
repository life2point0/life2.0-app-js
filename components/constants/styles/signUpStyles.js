import { StyleSheet } from 'react-native';

const signUpStyles = StyleSheet.create({
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

export { signUpStyles }