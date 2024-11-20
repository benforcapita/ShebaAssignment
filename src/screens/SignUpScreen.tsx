import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import * as Crypto from 'expo-crypto';
import { Platform } from 'react-native';
import WebStorage from '../storage/WebStorage';
import NativeStorage from '../storage/NativeStorage';
import { StorageInterface } from '../storage/StorageInterface';
import centralizedStyles from '../styles/centralizedStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';

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
    <SafeAreaView style={[centralizedStyles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[centralizedStyles.title, { color: theme.colors.primary }]}>Sign Up</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={centralizedStyles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={centralizedStyles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={centralizedStyles.input}
      />
      <CustomButton
        onPress={handleSignUp}
        text="Sign Up"
        buttonColor='secondary'
      />
      <CustomButton
        onPress={() => navigation.navigate(ScreenNames.LoginScreen)}
        text="Already have an account? Log In"
      />
    </SafeAreaView>
  );
};

const styles = {};

export default SignUpScreen;
