import { View, TextInput, Text } from "react-native"

const TextField = ({label, value, variant, multiline, placeholder, styles, onChange}) => {
    return (
        <View style={styles.container} key={label}>
            { label && <Text style={styles.label}> { label}</Text> }
            <TextInput
                style={multiline ? styles.textarea : styles.textField}
                value={value}
                multiline={multiline}
                placeholder={placeholder}
                onChangeText={onChange}
                inputMode={variant || 'text'}

            />
        </View>
    )
}

export { TextField }