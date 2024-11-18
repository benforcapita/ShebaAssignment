import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#005eb8', // Deep blue
    accent: '#ffcc00', // Bright yellow
    background: '#ffffff', // White
    surface: '#f5f5f5', // Light gray
    text: '#333333', // Dark gray
    disabled: '#cccccc', // Medium gray
    placeholder: '#999999', // Light gray
    backdrop: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
  },
  fonts: {
    regular: {
      fontFamily: 'Roboto-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Roboto-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Roboto-Thin',
      fontWeight: 'normal',
    },
  },
  roundness: 4,
};

export default theme;
