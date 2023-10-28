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
            textField: {
              height: 40,
              borderColor: 'black',
              borderRadius: 2,
              borderWidth: 1,
              marginTop: 5,
              paddingHorizontal: 10,
              borderRadius: 10,
              justifyContent: 'center'
            },
            textarea: {
              height: 100,
              borderColor: 'gray',
              borderWidth: 1,
              marginTop: 5,
              padding: 10,
              textAlignVertical: 'top',
              borderColor: 'black',
              borderRadius: 10,
              borderWidth: 1,
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
                marginBottom: 8
            }
        },
        location: {
            container: {
             padding: 0,
             marginBottom: 20
            },
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
        color: 'red',
        }
    }
})

export { updateProfileStyles }