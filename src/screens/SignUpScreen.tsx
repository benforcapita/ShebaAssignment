import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import * as Crypto from 'expo-crypto';
import { Platform } from 'react-native';
import WebStorage from '../storage/WebStorage';
import NativeStorage from '../storage/NativeStorage';
import { StorageInterface } from '../storage/StorageInterface';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const storage: StorageInterface = Platform.OS === 'web' ? new WebStorage() : new NativeStorage();

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const theme = useTheme();

  const hashPassword = async (password: string): Promise<string> => {
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
  };

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    console.log('Starting sign-up process');
    console.log('User input:', { name, email, password });

    try {
      const hashedPassword = await hashPassword(password);
      console.log('Hashed password:', hashedPassword);
      const user = { id: email, password: hashedPassword };
      await storage.saveUser(user);
      Alert.alert('Success', 'Account created successfully.');
      navigation.navigate(ScreenNames.LoginScreen);
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>Sign Up</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
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
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleSignUp}
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        textColor={theme.colors.onPrimary}
      >
        Sign Up
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate(ScreenNames.LoginScreen)}
        style={styles.linkButton}
        textColor={theme.colors.primary}
      >
        Already have an account? Log In
      </Button>
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
  linkButton: {
    marginTop: 16,
  },
});

export default SignUpScreen;
