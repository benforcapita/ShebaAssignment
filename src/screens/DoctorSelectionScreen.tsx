import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import doctorsData from '../data/doctors.json';

type DoctorSelectionNavigationProp = StackNavigationProp<RootStackParamList>;

interface Doctor {
  id: number;
  name: string;
  field: string;
  availableDates: string[];
  timeSlots: string[];
}

const DoctorSelectionScreen = () => {
  const navigation = useNavigation<DoctorSelectionNavigationProp>();
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('AppContext is undefined. Ensure you are within an AppProvider.');
  }

  const { selectedField, setSelectedDoctor } = context;

  if (!selectedField) {
    Alert.alert('Error', 'No field selected. Returning to Field Selection.');
    navigation.navigate(ScreenNames.FieldSelectionScreen);
    return null;
  }

  // Filter doctors based on the selected field
  const filteredDoctors: Doctor[] = doctorsData.filter(
    (doctor: Doctor) => doctor.field === selectedField
  );

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    navigation.navigate(ScreenNames.TimeSlotSelectionScreen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Doctor</Text>
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleDoctorSelect(item)}
          >
            <Text style={styles.optionTitle}>{item.name}</Text>
            <Text style={styles.optionSubtitle}>{item.field}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No doctors available for the selected field.</Text>
        }
      />
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
    textAlign: 'center',
  },
  option: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 8,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionSubtitle: {
    fontSize: 16,
    color: '#555',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DoctorSelectionScreen;
