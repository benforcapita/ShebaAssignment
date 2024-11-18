import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as fs from 'expo-file-system';

const AppointmentSummaryScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const context = useContext(AppContext);
  const theme = useTheme();

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
      const fileUri = fs.documentDirectory + 'data/appointments.json';
      const fileInfo = await fs.getInfoAsync(fileUri);
      let appointments = [];
      if (fileInfo.exists) {
        const fileData = await fs.readAsStringAsync(fileUri, { encoding: fs.EncodingType.UTF8 });
        appointments = JSON.parse(fileData);
      }
      appointments.push(appointmentDetails);
      await fs.writeAsStringAsync(fileUri, JSON.stringify(appointments, null, 2), { encoding: fs.EncodingType.UTF8 });
      console.log('Appointment saved successfully!');
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>  
      <Text style={[styles.title, { color: theme.colors.primary }]}>Appointment Confirmed</Text>
      <Text style={[styles.detailText, { color: theme.colors.onSurface }]}>Doctor: {doctor.name}</Text>
      <Text style={[styles.detailText, { color: theme.colors.onSurface }]}>Field: {doctor.field}</Text>
      <Text style={[styles.detailText, { color: theme.colors.onSurface }]}>Date: {date}</Text>
      <Text style={[styles.detailText, { color: theme.colors.onSurface }]}>Time: {time}</Text>
      <Button
        mode="contained"
        onPress={handleNewAppointment}
        style={styles.button}
        buttonColor={theme.colors.primary}
        textColor={theme.colors.onPrimary}
      >
        Back to Main Menu
      </Button>
      <Button
        mode="contained"
        onPress={saveAppointmentToFile}
        style={styles.button}
        buttonColor={theme.colors.primary}
        textColor={theme.colors.onPrimary}
      >
        Save Appointment
      </Button>
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
