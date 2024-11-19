import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, useTheme, Dialog, Portal, Button as PaperButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import LoginPageButton from '../components/loginButton';
import { Platform } from 'react-native';
import WebStorage from '../storage/WebStorage';
import NativeStorage from '../storage/NativeStorage';
import { StorageInterface } from '../storage/StorageInterface';
import * as Crypto from 'expo-crypto';
import { AppContext } from '../context/AppContext';
import centralizedStyles from '../styles/centralizedStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

const storage: StorageInterface = Platform.OS === 'web' ? new WebStorage() : new NativeStorage();

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const theme = useTheme();
  const context = useContext(AppContext);


  if (!context) {
    throw new Error('AppContext is undefined. Ensure you are within an AppProvider.');
  }


  const hashPassword = async (password: string): Promise<string> => {
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
  };

  const validateUser = async (email: string, password: string) => {
    const user = await storage.getUser(email);
    if (!user) {
      return false;
    }
    const hashedInputPassword = await hashPassword(password);
    return user.password === hashedInputPassword;
  };

  const showDialog = (title: string, content: string) => {
    setDialogTitle(title);
    setDialogContent(content);
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  const handleLogin = async () => {
    if (!email || !password) {
      showDialog('Error', 'Please enter both email and password.');
      return;
    }
    const isValidUser = await validateUser(email, password);
    if (isValidUser) {
      const user = await storage.getUser(email);
      if (!user) {
        return false;
      }
      context.setUser( user);
      showDialog('Success', 'Login successful!');
      navigation.navigate(ScreenNames.OTPScreen);
    } else {
      showDialog('Error', 'Invalid email or password.');
    }
  };

  const handleSignUpNavigate = () => {
    navigation.navigate(ScreenNames.SignUpScreen);
  };

  return (
    <SafeAreaView style={[centralizedStyles.container, { backgroundColor: theme.colors.surface }]}>
      <Text style={[centralizedStyles.title, { color: theme.colors.primary }]}>Login</Text>
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
        autoCapitalize="none"
        style={centralizedStyles.input}
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
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{dialogTitle}</Dialog.Title>
          <Dialog.Content>
            <Text>{dialogContent}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={hideDialog}>OK</PaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = {};

export default LoginScreen;
