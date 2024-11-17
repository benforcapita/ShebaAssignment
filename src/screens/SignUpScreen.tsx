import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const theme = useTheme();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    const user = { name, email, password };
    const fileUri = `${FileSystem.documentDirectory}users.json`;

    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      let users = [];

      if (fileInfo.exists) {
        const data = await FileSystem.readAsStringAsync(fileUri);
        users = JSON.parse(data);
      }

      const userExists = users.some((u: { email: string }) => u.email === email);

      if (userExists) {
        Alert.alert('Error', 'User with this email already exists.');
      } else {
        users.push(user);
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(users));
        Alert.alert('Success', 'Account created successfully.');
        navigation.navigate(ScreenNames.LoginScreen);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while creating the account.');
    }
  };

  return (
    <View style={styles.container}>
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
        style={styles.button}
      >
        Sign Up
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate(ScreenNames.LoginScreen)}
        style={styles.linkButton}
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
    backgroundColor: '#f8f9fa',
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
