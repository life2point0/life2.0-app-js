import { DefaultTheme } from 'react-native-paper'
import { colors } from './colors'
import { typography } from './typography'
import { spacing } from './spacing'
import { components } from './components'

const defaultTheme = {
  ...DefaultTheme,
  mode: 'adaptive',
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    ...colors
  },
  fonts: {
    ...DefaultTheme.fonts,
    ...typography
  },
  spacing: {
    ...spacing
  },
  components: {
    ...components
  }
}

export default defaultTheme