import { Chip } from "../../chip/Chip"
import { View, Text } from "react-native"

const ChipsArray = ({styles, label, options, selectedChips, onChipClick}) => {

  const isEqualObjects = (obj1, obj2) => {
    return obj1.id === obj2.id && obj1.name === obj2.name
  }

  const handleChipClick = (value) => {
    const updatedChips = [...selectedChips]
    const index = updatedChips.indexOf(value)
    
    if (index === -1) {
      updatedChips.push(value)
    } else {
      updatedChips.splice(index, 1)
    }
    onChipClick(updatedChips)
  }

  const selectedFlags = options.map(option => selectedChips.includes(option));
  
  return (
      <View style={styles.container}>
        { label &&  <Text style={styles.label}>{ label}</Text> }
        {options.map((option) => (
          <Chip 
            key={option.name}
            label={option.name}
            selected={selectedChips.some(item => isEqualObjects(option, item))}
            onChipClick={() => handleChipClick(option)}
          />
        ))}
    </View>
  )
}

export { ChipsArray }