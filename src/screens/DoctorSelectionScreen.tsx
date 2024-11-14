// src/screens/DoctorSelectionScreen.tsx
import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import doctorsData from '../data/doctors.json';
import tw from 'nativewind';

const DoctorSelectionScreen = () => {
  const navigation = useNavigation();
  const { selectedField, setSelectedDoctor } = useContext(AppContext);

  // Filter doctors based on the selected field
  const filteredDoctors = doctorsData.filter(
    (doctor) => doctor.field === selectedField
  );

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    navigation.navigate('TimeSlotSelectionScreen');
  };

  return (
    <View style={tw`flex-1 p-4`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Select a Doctor</Text>
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`p-4 mb-2 border rounded`}
            onPress={() => handleDoctorSelect(item)}
          >
            <Text style={tw`text-lg`}>{item.name}</Text>
            <Text style={tw`text-gray-500`}>{item.field}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default DoctorSelectionScreen;
