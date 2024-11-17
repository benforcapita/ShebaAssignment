import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

type TimeSlotScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const TimeSlotSelectionScreen = () => {
  const navigation = useNavigation<TimeSlotScreenNavigationProp>();
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('AppContext is undefined. Ensure you are within an AppProvider.');
  }

  const { selectedDoctor, setAppointmentDetails } = context;

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  if (!selectedDoctor) {
    Alert.alert('Error', 'No doctor selected. Returning to Doctor Selection.');
    navigation.navigate(ScreenNames.DoctorSelectionScreen);
    return null;
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time selection when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      setAppointmentDetails({
        doctor: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
      });
      navigation.navigate(ScreenNames.AppointmentSummaryScreen);
    } else {
      Alert.alert('Error', 'Please select both a date and time.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Date and Time</Text>
      <Text style={styles.subtitle}>Available Dates:</Text>
      <FlatList
        data={selectedDoctor.availableDates}
        keyExtractor={(item) => item}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.option,
              selectedDate === item && styles.selectedOption,
            ]}
            onPress={() => handleDateSelect(item)}
          >
            <Text style={[styles.optionText, selectedDate === item && styles.selectedOptionText]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
      {selectedDate && (
        <>
          <Text style={styles.subtitle}>Available Times:</Text>
          <FlatList
            data={selectedDoctor.timeSlots}
            keyExtractor={(item) => item}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.option,
                  selectedTime === item && styles.selectedOption,
                ]}
                onPress={() => handleTimeSelect(item)}
              >
                <Text style={[styles.optionText, selectedTime === item && styles.selectedOptionText]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  option: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 8,
  },
  selectedOption: {
    backgroundColor: '#007BFF',
    borderColor: '#0056b3',
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    color: '#fff',
  },
  confirmButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default TimeSlotSelectionScreen;
