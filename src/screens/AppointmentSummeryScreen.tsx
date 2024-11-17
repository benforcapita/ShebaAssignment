import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

type AppointmentSummaryNavigationProp = StackNavigationProp<RootStackParamList>;

const AppointmentSummaryScreen = () => {
  const navigation = useNavigation<AppointmentSummaryNavigationProp>();
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('AppContext is undefined. Ensure you are within an AppProvider.');
  }

  const { appointmentDetails, setAppointmentDetails } = context;

  if (!appointmentDetails || !appointmentDetails.doctor) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.emptyText}>No appointment details available.</Text>
      </View>
    );
  }

  const { doctor, date, time } = appointmentDetails;

  const handleNewAppointment = () => {
    setAppointmentDetails(null);
    navigation.navigate(ScreenNames.FieldSelectionScreen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment Confirmed</Text>
      <Text style={styles.detailText}>Doctor: {doctor.name}</Text>
      <Text style={styles.detailText}>Field: {doctor.field}</Text>
      <Text style={styles.detailText}>Date: {date}</Text>
      <Text style={styles.detailText}>Time: {time}</Text>
      <TouchableOpacity style={styles.button} onPress={handleNewAppointment}>
        <Text style={styles.buttonText}>Book Another Appointment</Text>
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
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default AppointmentSummaryScreen;
