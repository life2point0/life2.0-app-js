import { Chip as ReactNativeChip } from 'react-native-paper'

const Chip = ({label, selected, onChipClick}) => {
    return (
        <ReactNativeChip
            selected={selected}
            onPress={() => onChipClick(label)}
            selectedColor={selected ? '#FFC003' : '#333'}
            showSelectedCheck={false}
            selectedBackgroundColor='#333'
            style={{ borderRadius: 5, backgroundColor: selected ? '#333' : '#fff'}}
        >
        { label }
      </ReactNativeChip>
    )
}

export { Chip }