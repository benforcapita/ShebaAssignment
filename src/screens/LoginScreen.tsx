import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import LoginPageButton from '../components/loginButton';
import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const theme = useTheme();

  const validateUser = async (email: string, password: string) => {
    const filePath = `${FileSystem.documentDirectory}users.json`;
    const fileInfo = await FileSystem.getInfoAsync(filePath);
    if (!fileInfo.exists) {
      return false;
    }
    const data = await FileSystem.readAsStringAsync(filePath, { encoding: 'utf8' });
    const users = JSON.parse(data);
    const user = users.find((u: { email: string }) => u.email === email);
    if (!user) {
      return false;
    }
    const hashedInputPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    return user.password === hashedInputPassword;
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    const isValidUser = await validateUser(email, password);
    if (isValidUser) {
      Alert.alert('Success', 'Login successful!');
      navigation.navigate(ScreenNames.OTPScreen);
    } else {
      Alert.alert('Error', 'Invalid email or password.');
    }
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
