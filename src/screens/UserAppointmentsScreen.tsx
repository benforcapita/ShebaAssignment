import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Text, useTheme, List, Divider, Card } from 'react-native-paper';
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
import centralizedStyles from '../styles/centralizedStyles';
import CustomButton from '../components/CustomButton';
import ConfirmationDialog from '../components/ConfirmationDialog';

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
      <Card onPress={() => confirmDelete(item.id.toString())} style={centralizedStyles.appointmentCard}>
        <List.Item
          title={`Doctor: ${item.doctor.name}`}
          description={`Date: ${item.date} | Time: ${item.time}`}
          left={props => <List.Icon {...props} icon="calendar" />}
        />
      </Card>
    );
  };

  if (appointments.length === 0) {
    return (
      <SafeAreaView style={centralizedStyles.container}>
        <View>
        <Text style={centralizedStyles.emptyText}>No appointments available.</Text>
        <CustomButton
          onPress={() => navigation.navigate(ScreenNames.FieldSelectionScreen)}
          text="Book New Appointment"
          buttonColor='secondary'
        />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={centralizedStyles.container}>
      <Text style={[centralizedStyles.title, { color: theme.colors.primary }]}>Your Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Divider />}
        contentContainerStyle={{ paddingBottom: 100 }} // Add padding to prevent overlap
      />
      <View style={{ position: 'absolute', bottom: '10%', right:'5%',left:'5%' }}>
        <CustomButton
          onPress={() => navigation.navigate(ScreenNames.FieldSelectionScreen)}
          text="Book New Appointment"
          buttonColor='secondary'
        />
      </View>
        <ConfirmationDialog
          visible={visible}
          title={dialogTitle}
          content={dialogContent}
          onConfirm={handleDelete}
          onCancel={hideDialog}
        />
    </SafeAreaView>
  );
};


export default UserAppointmentsScreen;