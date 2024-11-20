import React, { useState, useContext } from 'react';
import { TextInput, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import CustomButton from '../components/CustomButton';
import { Platform } from 'react-native';
import WebStorage from '../storage/WebStorage';
import NativeStorage from '../storage/NativeStorage';
import { StorageInterface } from '../storage/StorageInterface';
import * as Crypto from 'expo-crypto';
import { AppContext } from '../context/AppContext';
import centralizedStyles from '../styles/centralizedStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomDialog from '../components/CustomDialog';

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
      <CustomButton
        onPress={handleLogin}
        text="Login"
        mode="outlined"
        style={{ marginBottom: 8 }}
        textColor={theme.colors.onPrimary}
        buttonColor='secondary'
      />
      <CustomButton
        onPress={handleSignUpNavigate}
        text="Sign Up"
        mode="contained"
        textColor={theme.colors.onPrimary}
      />
        <CustomDialog
          visible={visible}
          title={dialogTitle}
          content={dialogContent}
          onDismiss={hideDialog}
        />
    </SafeAreaView>
  );
};


export default LoginScreen;
