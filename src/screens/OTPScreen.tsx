import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button as PaperButton, Text, useTheme, Dialog, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';

type OTPScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const OTPScreen = () => {
  const [otp, setOtp] = useState('');
  const navigation = useNavigation<OTPScreenNavigationProp>();
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');

  const showDialog = (title: string, content: string) => {
    setDialogTitle(title);
    setDialogContent(content);
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  const handleVerifyOTP = () => {
    if (otp.length === 5) {
      showDialog('Success', 'OTP Verified');
      navigation.navigate(ScreenNames.UserAppointmentsScreen);
    } else {
      showDialog('Error', 'Please enter a 5-digit OTP');
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
      <PaperButton
        mode="contained"
        onPress={handleVerifyOTP}
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        textColor={theme.colors.onPrimary}
      >
        Verify OTP
      </PaperButton>
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
