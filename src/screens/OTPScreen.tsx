import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { TextInput, Button as PaperButton, Text, useTheme, Dialog, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import centralizedStyles from '../styles/centralizedStyles';

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
    <SafeAreaView style={[centralizedStyles.container, { backgroundColor: theme.colors.background }]}>
       <View style={centralizedStyles.container}>
      <Text style={[centralizedStyles.title, { color: theme.colors.primary }]}>Enter OTP</Text>
      <TextInput
        label="5-digit OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={5}
        autoFocus
        style={centralizedStyles.input}
      />
      <PaperButton
        mode="contained"
        onPress={handleVerifyOTP}
        style={[centralizedStyles.button,{ backgroundColor: theme.colors.secondary }]}
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
    </SafeAreaView>
  );
};


export default OTPScreen;
