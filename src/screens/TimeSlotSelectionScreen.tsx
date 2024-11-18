import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, Chip, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        id: 0,
      });
      navigation.navigate(ScreenNames.AppointmentSummaryScreen);
    } else {
      Alert.alert('Error', 'Please select both a date and time.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>Select Date and Time</Text>
      <Text style={[styles.subtitle, { color: theme.colors.onSurface }]}>Available Dates:</Text>
      <View style={styles.chipContainer}>
        {selectedDoctor.availableDates.map((date) => (
          <Chip
            key={date}
            selected={selectedDate === date}
            onPress={() => handleDateSelect(date)}
            style={[
              styles.chip,
              selectedDate === date && { backgroundColor: theme.colors.primary },
            ]}
            textStyle={selectedDate === date ? { color: theme.colors.onPrimary } : { color: theme.colors.onSurface }}
          >
            {date}
          </Chip>
        ))}
      </View>
      {selectedDate && (
        <>
          <Text style={[styles.subtitle, { color: theme.colors.onSurface }]}>Available Times:</Text>
          <View style={styles.chipContainer}>
            {selectedDoctor.timeSlots.map((time) => (
              <Chip
                key={time}
                selected={selectedTime === time}
                onPress={() => handleTimeSelect(time)}
                style={[
                  styles.chip,
                  selectedTime === time && { backgroundColor: theme.colors.primary },
                ]}
                textStyle={selectedTime === time ? { color: theme.colors.onPrimary } : { color: theme.colors.onSurface }}
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
        buttonColor={theme.colors.primary}
        textColor={theme.colors.onPrimary}
      >
        Confirm Appointment
      </Button>
    </SafeAreaView>
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
    textAlign: 'center',
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
