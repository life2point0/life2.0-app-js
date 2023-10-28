import { Chip as ReactNativeChip } from 'react-native-paper'

const Chip = ({label, selected, onChipClick}) => {
    return (
        <ReactNativeChip
            selected={selected}
            onPress={() => onChipClick(label)}
        >
        { label }
      </ReactNativeChip>
    )
}

export { Chip }