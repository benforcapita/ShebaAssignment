import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

type OTPScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const OTPScreen = () => {
  const [otp, setOtp] = useState('');
  const navigation = useNavigation<OTPScreenNavigationProp>();

  const handleVerifyOTP = () => {
    if (otp.length === 5) {
      Alert.alert('Success', 'OTP Verified');
      navigation.navigate(ScreenNames.FieldSelectionScreen);
    } else {
      Alert.alert('Error', 'Please enter a 5-digit OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter 5-digit OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={5}
        autoFocus
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify OTP</Text>
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
    textAlign: 'center',
    fontSize: 18,
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
});

export default OTPScreen;
