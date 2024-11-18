import React, { useContext, useState } from 'react';
import { View, StyleSheet, } from 'react-native';
import { Text, Button as PaperButton, useTheme, Dialog, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as fs from 'expo-file-system';
import { Doctor } from '../context/interfaces';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
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
      <SafeAreaView style={[styles.centeredContainer, { backgroundColor: theme.colors.background }]}>  
        <Text style={[styles.emptyText, { color: theme.colors.onSurface }]}>No appointment details available.</Text>
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
      const directoryUri = fs.documentDirectory + 'data/';
      const fileUri = directoryUri + 'appointments.json';
      const dirInfo = await fs.getInfoAsync(directoryUri);
      if (!dirInfo.exists) {
        await fs.makeDirectoryAsync(directoryUri, { intermediates: true });
      }

      let appointments: { id: string; doctor: Doctor; date: string; time: string; }[] = [];
      const fileInfo = await fs.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        await fs.writeAsStringAsync(fileUri, JSON.stringify(appointments), { encoding: fs.EncodingType.UTF8 });
      } else {
        const fileData = await fs.readAsStringAsync(fileUri, { encoding: fs.EncodingType.UTF8 });
        appointments = JSON.parse(fileData);
      }

      const newAppointment = { ...appointmentDetails, id: generateUUID() };
      appointments.push(newAppointment);

      await fs.writeAsStringAsync(fileUri, JSON.stringify(appointments, null, 2), { encoding: fs.EncodingType.UTF8 });
      console.log('Appointment saved successfully!');

      setVisible(true);
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  const hideDialog = () => setVisible(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>  
      <Text style={[styles.title, { color: theme.colors.primary }]}>Appointment Confirmed</Text>
      <Text style={[styles.detailText, { color: theme.colors.onSurface }]}>Doctor: {doctor.name}</Text>
      <Text style={[styles.detailText, { color: theme.colors.onSurface }]}>Field: {doctor.field}</Text>
      <Text style={[styles.detailText, { color: theme.colors.onSurface }]}>Date: {date}</Text>
      <Text style={[styles.detailText, { color: theme.colors.onSurface }]}>Time: {time}</Text>
      <PaperButton
        mode="contained"
        onPress={handleNewAppointment}
        style={styles.button}
        buttonColor={theme.colors.primary}
        textColor={theme.colors.onPrimary}
      >
        Back to Main Menu
      </PaperButton>
      <PaperButton
        mode="contained"
        onPress={saveAppointmentToFile}
        style={styles.button}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
    alignSelf: 'center',
  },
});

export default AppointmentSummaryScreen;
