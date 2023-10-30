import { StyleSheet } from 'react-native';

const updateProfileStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
        fontSize: 24, 
        fontWeight: 'bold', 
        padding: 20, 
        textAlign: 'center'
    },
    form: {
        container: {
            padding: 0,
        },
        input: {
            container: {
              marginBottom: 20
            },
            label: {
              fontWeight: 500
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
              textAlign: 'right',
              fontSize: 12,
            }
        },
        chip: {
            container: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: 20,
                gap: 8,
            },
            label: {
                width: '100%',
                marginBottom: 8,
                fontWeight: 500
            }
        },
        location: {
          container: {
           marginBottom: 20,
          },
          label: {
              marginBottom: 5,
              fontWeight: 500
          },
          textField: {
            height: 40,
            marginTop: 8,
            paddingHorizontal: 10,
            justifyContent: 'center',
            borderColor: '#ccc',
            borderWidth: 1.4,
            borderRadius: 5
          },
          dropdown: {
            textInput: {
              height: '100%',
              borderWidth: 1,
              borderColor: '#ccc'
            },
            textInputContainer: {
              height: 50,
              margin: 10,
              elevation: 0
            }
          },
          addMoreButton: {
            marginTop: 5,
            marginLeft: 'auto'
          }
        },
        errorText: {
        color: 'red',
        }
    }
})

export { updateProfileStyles }