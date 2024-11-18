import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Text, Button, useTheme, List, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import * as fs from 'expo-file-system';
import { Appointment } from '../context/interfaces';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserAppointmentsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const context = useContext(AppContext);
  const theme = useTheme();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const fileUri = fs.documentDirectory + 'data/appointments.json';
        const fileInfo = await fs.getInfoAsync(fileUri);
        if (fileInfo.exists) {
          const fileData = await fs.readAsStringAsync(fileUri, { encoding: fs.EncodingType.UTF8 });
          const parsedAppointments = JSON.parse(fileData);
          const validAppointments = parsedAppointments.filter((appointment: Appointment) => appointment.id !== null && appointment.id !== undefined);
          setAppointments(validAppointments);
        }
      } catch (error) {
        console.error('Error reading appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const deleteAppointment = async (id: string) => {
    try {
      const updatedAppointments = appointments.filter((appointment) => appointment.id.toString() !== id);
      setAppointments(updatedAppointments);

      const fileUri = fs.documentDirectory + 'data/appointments.json';
      await fs.writeAsStringAsync(fileUri, JSON.stringify(updatedAppointments, null, 2), { encoding: fs.EncodingType.UTF8 });
      console.log('Appointment deleted successfully!');
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const confirmDelete = (id: string) => {
    Alert.alert(
      'Cancel Appointment',
      'Do you want to cancel this appointment?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => deleteAppointment(id) },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }: { item: Appointment }) => {
    return (
      <TouchableOpacity onPress={() => confirmDelete(item.id.toString())} style={styles.appointmentCard}>
        <List.Item
          title={`Doctor: ${item.doctor.name}`}
          description={`Date: ${item.date} | Time: ${item.time}`}
          left={props => <List.Icon {...props} icon="calendar" />}
        />
      </TouchableOpacity>
    );
  };

  if (appointments.length === 0) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <Text style={styles.emptyText}>No appointments available.</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate(ScreenNames.FieldSelectionScreen)}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Book New Appointment
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>Your Appointments</Text>
      <List.Section>
        {appointments.map((item) => (
          <React.Fragment key={item.id.toString()}>
            {renderItem({ item })}
            <Divider />
          </React.Fragment>
        ))}
      </List.Section>
      <Button
        mode="contained"
        onPress={() => navigation.navigate(ScreenNames.FieldSelectionScreen)}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Book New Appointment
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 16,
  },
});

export default UserAppointmentsScreen;