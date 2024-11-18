import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import * as fs from 'expo-file-system';
import * as Crypto from 'expo-crypto';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const theme = useTheme();

  const hashPassword = async (password: string) => {
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    return hashedPassword;
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
      const user = { name, email, password: hashedPassword };
      console.log('User data to save:', user);

      const filePath = `${FileSystem.documentDirectory}users.json`;

      try {
        const fileInfo = await fs.getInfoAsync(filePath);
        let users = [];

        if (fileInfo.exists) {
          const data = await fs.readAsStringAsync(filePath, { encoding: 'utf8' });
          users = JSON.parse(data);
        }

        const userExists = users.some((u: { email: string }) => u.email === email);

        if (userExists) {
          Alert.alert('Error', 'User with this email already exists.');
        } else {
          users.push(user);
          await fs.writeAsStringAsync(filePath, JSON.stringify(users, null, 2));
          Alert.alert('Success', 'Account created successfully.');
          navigation.navigate(ScreenNames.LoginScreen);
        }
      } catch (error) {
        console.error('Error reading or writing file:', error);
      }
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
