import { DefaultTheme } from 'react-native-paper';

const defaultTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    accent: '#FFC003',
    primary: '#000',
  },
};

export default defaultTheme;