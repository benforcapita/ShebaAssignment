import React, { useContext, useState } from 'react';
import { View, StyleSheet, } from 'react-native';
import { Text, Button as PaperButton, useTheme, Dialog, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import WebStorage from '../storage/WebStorage';
import NativeStorage from '../storage/NativeStorage';
import { StorageInterface } from '../storage/StorageInterface';
import centralizedStyles from '../styles/centralizedStyles';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const storage: StorageInterface = Platform.OS === 'web' ? new WebStorage() : new NativeStorage();

const saveAppointment = async (appointment: any) => {
  await storage.saveAppointment(appointment);
  // Handle post-save actions
};

const AppointmentSummaryScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const context = useContext(AppContext);
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  if (!context) {
    throw new Error('AppContext is undefined. Ensure you are within an AppProvider.');
  }

  const { appointmentDetails, setAppointmentDetails } = context;

  if (!appointmentDetails || !appointmentDetails.doctor) {
    return (
      <SafeAreaView style={[centralizedStyles.centeredContainer, { backgroundColor: theme.colors.background }]}>  
        <Text style={[centralizedStyles.emptyText, { color: theme.colors.onSurface }]}>No appointment details available.</Text>
      </SafeAreaView>
    );
  }

  const { doctor, date, time } = appointmentDetails;

  const handleNewAppointment = () => {
    setAppointmentDetails(null);
    navigation.navigate(ScreenNames.UserAppointmentsScreen);
  };

  const saveAppointmentToFile = async () => {
    try {
      const newAppointment = { ...appointmentDetails, id: generateUUID() };
      await saveAppointment(newAppointment);
      console.log('Appointment saved successfully!');
      setVisible(true);
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  const hideDialog = () => setVisible(false);

  return (
    <SafeAreaView style={[centralizedStyles.container, { backgroundColor: theme.colors.background }]}>  
      <Text style={[centralizedStyles.title, { color: theme.colors.primary }]}>Appointment Confirmed</Text>
      <View style={centralizedStyles.centeredTextContainer}>
      <Text style={[centralizedStyles.detailText, { color: theme.colors.onSurface }]}>Doctor: {doctor.name}</Text>
      <Text style={[centralizedStyles.detailText, { color: theme.colors.onSurface }]}>Field: {doctor.field}</Text>
      <Text style={[centralizedStyles.detailText, { color: theme.colors.onSurface }]}>Date: {date}</Text>
      <Text style={[centralizedStyles.detailText, { color: theme.colors.onSurface }]}>Time: {time}</Text>
      </View>
      <PaperButton
        mode="contained"
        onPress={handleNewAppointment}
        style={centralizedStyles.button}
        buttonColor={theme.colors.primary}
        textColor={theme.colors.onPrimary}
      >
        Back to Main Menu
      </PaperButton>
      <PaperButton
        mode="contained"
        onPress={saveAppointmentToFile}
        style={centralizedStyles.button}
        buttonColor={theme.colors.primary}
        textColor={theme.colors.onPrimary}
      >
        Save Appointment
      </PaperButton>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Success</Dialog.Title>
          <Dialog.Content>
            <Text>Appointment saved successfully!</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={() => { hideDialog(); navigation.navigate(ScreenNames.UserAppointmentsScreen) }}>OK</PaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

export default AppointmentSummaryScreen;
