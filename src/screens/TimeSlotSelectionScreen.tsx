// src/screens/TimeSlotSelectionScreen.tsx
import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import tw from 'nativewind';

const TimeSlotSelectionScreen = () => {
  const navigation = useNavigation();
  const { selectedDoctor, setAppointmentDetails } = useContext(AppContext);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

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
      navigation.navigate('AppointmentSummaryScreen');
    } else {
      alert('Please select both a date and time.');
    }
  };

  return (
    <View style={tw`flex-1 p-4`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Select Date and Time</Text>
      <Text style={tw`text-lg mb-2`}>Available Dates:</Text>
      <FlatList
        data={selectedDoctor.availableDates}
        keyExtractor={(item) => item}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              tw`p-4 mr-2 border rounded`,
              item === selectedDate && tw`bg-blue-500`,
            ]}
            onPress={() => handleDateSelect(item)}
          >
            <Text
              style={[
                tw`text-lg`,
                item === selectedDate && tw`text-white`,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
      {selectedDate && (
        <>
          <Text style={tw`text-lg mt-4 mb-2`}>Available Times:</Text>
          <FlatList
            data={selectedDoctor.timeSlots}
            keyExtractor={(item) => item}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  tw`p-4 mr-2 border rounded`,
                  item === selectedTime && tw`bg-blue-500`,
                ]}
                onPress={() => handleTimeSelect(item)}
              >
                <Text
                  style={[
                    tw`text-lg`,
                    item === selectedTime && tw`text-white`,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
      <TouchableOpacity
        style={tw`bg-green-500 p-4 mt-4 rounded`}
        onPress={handleConfirm}
      >
        <Text style={tw`text-white text-center text-lg`}>Confirm Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TimeSlotSelectionScreen;
