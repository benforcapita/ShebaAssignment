import { Button } from "react-native-paper";
import {StyleSheet } from 'react-native';

interface LoginPageButtonProps {
    mode: 'text' | 'outlined' | 'contained';
    onPress: () => void;
    text: string;
    color?: string;
    textColor?: string;
  }
  
  const LoginPageButton: React.FC<LoginPageButtonProps> = ({ mode, onPress, text, color, textColor }) => {
    return (
      <Button
        mode={mode}
        onPress={onPress}
        style={styles.button}
        buttonColor={color}
        textColor={textColor}
      >
        {text}
      </Button>
    );
  };
  const styles = StyleSheet.create({
    button: {
      marginTop: 8,
    },
  });

  export default LoginPageButton