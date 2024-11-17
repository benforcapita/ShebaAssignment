import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<SignUpScreenNavigationProp>();

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
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkContainer} onPress={() => navigation.navigate(ScreenNames.LoginScreen)}>
        <Text style={styles.linkText}>Already have an account? Log In</Text>
      </TouchableOpacity>
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
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  linkContainer: {
    marginTop: 16,
  },
  linkText: {
    color: '#007BFF',
    textAlign: 'center',
  },
});

export default SignUpScreen;
