import React, { useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';
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
  const theme = useTheme();

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
      <View style={styles.innerContainer}>
        <List.Section>
          <List.Subheader style={[styles.title, { color: theme.colors.primary }]}>
            Select a Doctor
          </List.Subheader>
          {filteredDoctors.map((doctor) => (
            <List.Item
              key={doctor.id}
              title={doctor.name}
              description={doctor.field}
              onPress={() => handleDoctorSelect(doctor)}
              style={styles.option}
              titleStyle={styles.optionTitle}
              descriptionStyle={styles.optionSubtitle}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
            />
          ))}
          {filteredDoctors.length === 0 && (
            <List.Item
              title="No doctors available for the selected field."
              titleStyle={styles.emptyText}
            />
          )}
        </List.Section>
      </View>

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
    textAlign: 'center',
  },
  option: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },

});

export default DoctorSelectionScreen;
