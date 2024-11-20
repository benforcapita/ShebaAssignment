import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Text, Chip, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import centralizedStyles from '../styles/centralizedStyles';
import CustomDialog from '../components/CustomDialog';
import CustomButton from '../components/CustomButton';

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
  const [visible, setVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');

  if (!selectedDoctor) {
    setDialogTitle('Error');
    setDialogContent('No doctor selected. Returning to Doctor Selection.');
    setVisible(true);
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
      setDialogTitle('Error');
      setDialogContent('Please select both a date and time.');
      setVisible(true);
    }
  };

  const hideDialog = () => {
    setVisible(false);
    if (dialogTitle === 'Error' && dialogContent === 'No doctor selected. Returning to Doctor Selection.') {
      navigation.navigate(ScreenNames.DoctorSelectionScreen);
    }
  };

  return (
    <SafeAreaView style={[centralizedStyles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[centralizedStyles.title, { color: theme.colors.primary }]}>Select Date and Time</Text>
      <Text style={[centralizedStyles.optionTitle, { color: theme.colors.onSurface }]}>Available Dates:</Text>
      <View style={centralizedStyles.chipContainer}>
        {selectedDoctor.availableDates.map((date) => (
          <Chip
            key={date}
            selected={selectedDate === date}
            onPress={() => handleDateSelect(date)}
            style={[
              centralizedStyles.chip,
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
          <Text style={[centralizedStyles.optionTitle, { color: theme.colors.onSurface }]}>Available Times:</Text>
          <View style={centralizedStyles.chipContainer}>
            {selectedDoctor.timeSlots.map((time) => (
              <Chip
                key={time}
                selected={selectedTime === time}
                onPress={() => handleTimeSelect(time)}
                style={[
                  centralizedStyles.chip,
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
      <CustomButton
        onPress={handleConfirm}
        text="Confirm Appointment"
        buttonColor='secondary'
      />
      <CustomDialog
        visible={visible}
        title={dialogTitle}
        content={dialogContent}
        onDismiss={hideDialog}
      />
    </SafeAreaView>
  );
};



export default TimeSlotSelectionScreen;
