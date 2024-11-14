// src/screens/AppointmentSummaryScreen.tsx
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import tw from 'nativewind';

const AppointmentSummaryScreen = () => {
  const navigation = useNavigation();
  const { appointmentDetails, setAppointmentDetails } = useContext(AppContext);

  if (!appointmentDetails) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-lg`}>No appointment details available.</Text>
      </View>
    );
  }

  const { doctor, date, time } = appointmentDetails;

  const handleNewAppointment = () => {
    setAppointmentDetails(null);
    navigation.navigate('FieldSelectionScreen');
  };

  return (
    <View style={tw`flex-1 justify-center px-4`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Appointment Confirmed</Text>
      <Text style={tw`text-lg mb-2`}>Doctor: {doctor.name}</Text>
      <Text style={tw`text-lg mb-2`}>Field: {doctor.field}</Text>
      <Text style={tw`text-lg mb-2`}>Date: {date}</Text>
      <Text style={tw`text-lg mb-2`}>Time: {time}</Text>
      <TouchableOpacity
        style={tw`bg-blue-500 p-4 mt-4 rounded`}
        onPress={handleNewAppointment}
      >
        <Text style={tw`text-white text-center text-lg`}>Book Another Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppointmentSummaryScreen;
