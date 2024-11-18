import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>;

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
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const theme = useTheme();


  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    console.log(`Email: ${email}, Password: ${password}`);
    navigation.navigate(ScreenNames.OTPScreen);
  };

  const handleSignUpNavigate = () => {
    navigation.navigate(ScreenNames.SignUpScreen);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>Login</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        style={styles.input}
      />
      <LoginPageButton
      mode={"outlined"}
      onPress={handleLogin}
      text="Login"
      color={theme.colors.secondary}
      textColor={theme.colors.onPrimary}
      />
      <LoginPageButton
        mode={"contained"}
        onPress={handleSignUpNavigate}
        text="Sign Up"
        color={theme.colors.primary}
        textColor={theme.colors.onPrimary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});

export default LoginScreen;
