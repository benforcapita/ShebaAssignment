import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, Chip, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';

type TimeSlotScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const TimeSlotSelectionScreen = () => {
  const navigation = useNavigation<TimeSlotScreenNavigationProp>();
  const context = useContext(AppContext);
  const theme = useTheme();

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
      <Text style={[styles.title, { color: theme.colors.primary }]}>Select Date and Time</Text>
      <Text style={styles.subtitle}>Available Dates:</Text>
      <View style={styles.chipContainer}>
        {selectedDoctor.availableDates.map((date) => (
          <Chip
            key={date}
            selected={selectedDate === date}
            onPress={() => handleDateSelect(date)}
            style={styles.chip}
          >
            {date}
          </Chip>
        ))}
      </View>
      {selectedDate && (
        <>
          <Text style={styles.subtitle}>Available Times:</Text>
          <View style={styles.chipContainer}>
            {selectedDoctor.timeSlots.map((time) => (
              <Chip
                key={time}
                selected={selectedTime === time}
                onPress={() => handleTimeSelect(time)}
                style={styles.chip}
              >
                {time}
              </Chip>
            ))}
          </View>
        </>
      )}
      <Button
        mode="contained"
        onPress={handleConfirm}
        style={styles.confirmButton}
      >
        Confirm Appointment
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
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
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  confirmButton: {
    marginTop: 16,
  },
});

export default TimeSlotSelectionScreen;
