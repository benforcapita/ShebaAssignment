import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';

type OTPScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const OTPScreen = () => {
  const [otp, setOtp] = useState('');
  const navigation = useNavigation<OTPScreenNavigationProp>();
  const theme = useTheme();

  const handleVerifyOTP = () => {
    if (otp.length === 5) {
      Alert.alert('Success', 'OTP Verified');
      navigation.navigate(ScreenNames.UserAppointmentsScreen);
    } else {
      Alert.alert('Error', 'Please enter a 5-digit OTP');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>Enter OTP</Text>
      <TextInput
        label="5-digit OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={5}
        autoFocus
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleVerifyOTP}
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        textColor={theme.colors.onPrimary}
      >
        Verify OTP
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
});

export default OTPScreen;
