import { View } from "react-native"
import { Checkbox, Text, useTheme } from "react-native-paper"

const CheckBox = ({label, value, styles, onChange}) => {

    const handleCheckBoxChange = () => {
        onChange(!value)
    }
    const theme = useTheme()
    return (
        <View style={styles.container}> 
            <Checkbox
                status={ value === true ? 'checked' : 'unchecked' }
                onPress={handleCheckBoxChange}
            />
            <Text style={styles.label}> {label} </Text>
        </View>
    )
}

export { CheckBox }