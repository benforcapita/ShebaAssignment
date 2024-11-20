import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { TextInput, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import centralizedStyles from '../styles/centralizedStyles';
import CustomDialog from '../components/CustomDialog';
import CustomButton from '../components/CustomButton';

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
      <CustomButton
        onPress={handleVerifyOTP}
        text="Verify OTP"
        style={[centralizedStyles.button,{ backgroundColor: theme.colors.secondary }]}
        textColor={theme.colors.onPrimary}
      />
      <CustomDialog
        visible={visible}
        title={dialogTitle}
        content={dialogContent}
        onDismiss={hideDialog}
      />
     

      </View>
    </SafeAreaView>
  );
};


export default OTPScreen;
