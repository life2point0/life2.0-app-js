import { Chip } from "../../chip/Chip"
import { View, Text } from "react-native"

const ChipsArray = ({styles, label, options, selectedChips, onChipClick}) => {

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
  
  return (
      <View style={styles.container}>
        { label &&  <Text style={styles.label}>{ label}</Text> }
        {options.map((option) => (
          <Chip 
            key={option}
            label={option}
            selected={selectedChips.includes(option)}
            onChipClick={() => handleChipClick(option)}
          />
        ))}
    </View>
  )
}

export { ChipsArray }