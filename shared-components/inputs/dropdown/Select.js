import React, { useState } from "react"
import { View, Text } from "react-native"
import { IconButton } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker'


const Select = ({ label, value, styles, multiple, options, onItemClick }) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const mappedOptions = options.map((option) => ({ value: option.id, label: option.name }))

  const selectedLabels = value.map((item) => {
    const matchedOption = mappedOptions.find((option) => option.value === item);
    return matchedOption ? matchedOption.label : "";
  })

  const handleItemClick = (selectedValue) => {
    const updatedItems = selectedValue.map(item => item.value)
    onItemClick(updatedItems)
  }

  return (
    <View style={styles.container} key={label}>
      {label && <Text style={styles.label}> {label}</Text>}
        <DropDownPicker
            open={showDropDown}
            multiple={multiple}
            value={value}
            items={mappedOptions}
            showArrowIcon={true}
            style={styles.dropdown}
            mode='BADGE'
            showTickIcon={true}
            listMode='MODAL'
            searchTextInputStyle={styles.textField}
            searchContainerStyle={{ borderColor: 'lightgrey' }}
            selectedItemContainerStyle={{
                backgroundColor: "#FFF2CB",
                borderBottomWidth: 1,
                borderColor: 'lightgrey'
             }}
            setOpen={() => setShowDropDown(true)}
            onClose={ () => setShowDropDown(false)}
            onLayout={ () => setShowDropDown(false)}
            onSelectItem={(value) => handleItemClick(value)}
            searchable={true}
            CloseIconComponent={() => (
                <IconButton 
                  icon="check" 
                  size={26} 
                  mode='contained'
                />
            )}
            TickIconComponent={() => (
                <IconButton 
                  icon="check" 
                  size={18} 
                  iconColor='#FFC003'
                />
            )}
        />
    </View>
  )
}

export { Select }
