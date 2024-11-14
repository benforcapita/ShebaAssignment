// src/screens/SignUpScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import tw from 'nativewind';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

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

      const userExists = users.some((u) => u.email === email);

      if (userExists) {
        Alert.alert('Error', 'User with this email already exists.');
      } else {
        users.push(user);
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(users));
        Alert.alert('Success', 'Account created successfully.');
        navigation.navigate('LoginScreen');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while creating the account.');
    }
  };

  return (
    <View style={tw`flex-1 justify-center px-4`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Sign Up</Text>
      <TextInput
        style={tw`border p-2 mb-4`}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={tw`border p-2 mb-4`}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={tw`border p-2 mb-4`}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={tw`bg-blue-500 p-2 rounded`}
        onPress={handleSignUp}
      >
        <Text style={tw`text-white text-center`}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`mt-4`}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={tw`text-blue-500 text-center`}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
