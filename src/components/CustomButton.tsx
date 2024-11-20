import React from 'react';
import { Button as PaperButton, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import centralizedStyles from '../styles/centralizedStyles';

interface CustomButtonProps {
  mode?: 'text' | 'outlined' | 'contained';
  onPress: () => void;
  text: string;
  style?: any;
  textColor?: string;
  buttonColor?: 'primary' | 'secondary';
}

const CustomButton: React.FC<CustomButtonProps> = ({
  mode = 'contained',
  onPress,
  text,
  style,
  textColor,
  buttonColor = 'primary',
}) => {
  const theme = useTheme();

  const backgroundColor = buttonColor === 'primary' ? theme.colors.primary : theme.colors.secondary;

  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      style={[ style,centralizedStyles.button,, { backgroundColor }]}
      labelStyle={{ color: textColor || theme.colors.onPrimary }}
    >
      {text}
    </PaperButton>
  );
};


export default CustomButton;
