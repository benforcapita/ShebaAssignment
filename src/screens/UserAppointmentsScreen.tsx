import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button as PaperButton, useTheme, List, Divider, Dialog, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import { Appointment, User } from '../context/interfaces';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import WebStorage from '../storage/WebStorage';
import NativeStorage from '../storage/NativeStorage';
import { StorageInterface } from '../storage/StorageInterface';

const storage: StorageInterface = Platform.OS === 'web' ? new WebStorage() : new NativeStorage();

const UserAppointmentsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const context = useContext(AppContext);
  const theme = useTheme();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [visible, setVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');
  const [appointmentId, setAppointmentId] = useState('');

  const fetchAppointments = async (user: User|null|undefined) => {
    if(user) {
      try {
        await storage.logAllAppointments();
        const appointmentsData = await storage.getAllAppointments();
        if (appointmentsData) {
          console.log('Fetched Appointments:', appointmentsData);
          const validAppointments = appointmentsData.filter((appointment: Appointment) => appointment.id !== null && appointment.id !== undefined);
          setAppointments(validAppointments);
        }
      } catch (error) {
        console.error('Error reading appointments:', error);
      }
    } else {
      console.warn('No user provided, unable to fetch appointments.');
      setAppointments([]);
    }
  };

  useEffect(() => {
    console.log('User context:', context?.user);
    fetchAppointments(context?.user);
  }, [context?.user]);

  const deleteAppointment = async (id: string) => {
    try {
      const updatedAppointments = appointments.filter((appointment) => appointment.id.toString() !== id);
      setAppointments(updatedAppointments);

      await storage.deleteAppointment(id);
      console.log('Appointment deleted successfully!');
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const confirmDelete = (id: string) => {
    setDialogTitle('Cancel Appointment');
    setDialogContent('Do you want to cancel this appointment?');
    setAppointmentId(id);
    setVisible(true);
  };

  const handleDelete = () => {
    deleteAppointment(appointmentId);
    setVisible(false);
  };

  const hideDialog = () => setVisible(false);

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
        <PaperButton
          mode="contained"
          onPress={() => navigation.navigate(ScreenNames.FieldSelectionScreen)}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Book New Appointment
        </PaperButton>
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
      <PaperButton
        mode="contained"
        onPress={() => navigation.navigate(ScreenNames.FieldSelectionScreen)}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Book New Appointment
      </PaperButton>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{dialogTitle}</Dialog.Title>
          <Dialog.Content>
            <Text>{dialogContent}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={hideDialog}>No</PaperButton>
            <PaperButton onPress={handleDelete}>Yes</PaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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