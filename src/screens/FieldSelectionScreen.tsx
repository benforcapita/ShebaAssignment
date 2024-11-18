import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, StyleSheet, TextInput, FlatList, Animated, TouchableOpacity } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import doctorsData from '../data/doctors.json';
import { Doctor } from '../context/interfaces';

type FieldSelectionNavigationProp = StackNavigationProp<RootStackParamList>;

const fields = ['Orthopedics', 'Cardiology', 'Neurology', 'Pediatrics', 'Dermatology'];

const FieldSelectionScreen = () => {
  const navigation = useNavigation<FieldSelectionNavigationProp>();
  const context = useContext(AppContext);
  const theme = useTheme();

  const [doctorName, setDoctorName] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState<string[]>([]);
  const [expandedSection, setExpandedSection] = useState<'doctor' | 'field' | null>(null);
  const doctorHeight = useRef(new Animated.Value(0)).current;
  const fieldHeight = useRef(new Animated.Value(0)).current;

  if (!context) {
    throw new Error('AppContext is undefined. Ensure you are within an AppProvider.');
  }

  const { setSelectedField, setSelectedDoctor } = context;

  const handleFieldSelect = (field: string) => {
    setSelectedField(field);
    navigation.navigate(ScreenNames.DoctorSelectionScreen);
  };

  const handleDoctorSelect = (doctorName: string) => {
    const selectedDoctor = doctorsData.find((doctor) => doctor.name === doctorName);
    if (selectedDoctor) {
      const doctor: Doctor = {
        id: selectedDoctor.id,
        name: selectedDoctor.name,
        field: selectedDoctor.field,
        availableDates: selectedDoctor.availableDates,
        timeSlots: selectedDoctor.timeSlots,
      };
      setSelectedDoctor(doctor);
      navigation.navigate(ScreenNames.TimeSlotSelectionScreen);
    }
  };

  const toggleSection = (section: 'doctor' | 'field') => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
    if (section === 'doctor') {
      Animated.timing(doctorHeight, {
        toValue: expandedSection === 'doctor' ? 0 : 300,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(fieldHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else if (section === 'field') {
      Animated.timing(fieldHeight, {
        toValue: expandedSection === 'field' ? 0 : 300,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(doctorHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  useEffect(() => {
    if (doctorName.length >= 3) {
      const fetchDoctors = async () => {
        // Extract doctor names from the JSON data
        const allDoctors = doctorsData.map((doctor) => doctor.name);
        setFilteredDoctors(allDoctors.filter((doc) => doc.toLowerCase().includes(doctorName.toLowerCase())));
      };
      fetchDoctors();
    } else {
      setFilteredDoctors([]);
    }
  }, [doctorName]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>      
      <TouchableOpacity onPress={() => toggleSection('doctor')} style={styles.card}>
        <List.Subheader style={[styles.title, { color: theme.colors.primary }]}>Search Doctor by Name</List.Subheader>
      </TouchableOpacity>
      <Animated.View style={{ height: doctorHeight }}>
        {expandedSection === 'doctor' && (
          <TextInput
            placeholder="Search Doctor by Name"
            value={doctorName}
            onChangeText={setDoctorName}
            style={styles.searchBar}
          />
        )}
        {expandedSection === 'doctor' && filteredDoctors.length > 0 && (
          <FlatList
            data={filteredDoctors}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <List.Item
                title={item}
                onPress={() => handleDoctorSelect(item)}
                style={[styles.option, { borderBottomColor: theme.colors.onSurface }]}
                titleStyle={[styles.optionText, { color: theme.colors.onSurface }]}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
              />
            )}
          />
        )}
      </Animated.View>

      <TouchableOpacity onPress={() => toggleSection('field')} style={styles.card}>
        <List.Subheader style={[styles.title, { color: theme.colors.primary }]}>Select a Medical Field</List.Subheader>
      </TouchableOpacity>
      <Animated.View style={{ height: fieldHeight }}>
        {expandedSection === 'field' && (
          <List.Section>
            {fields.map((field) => (
              <List.Item
                key={field}
                title={field}
                onPress={() => handleFieldSelect(field)}
                style={[styles.option, { borderBottomColor: theme.colors.onSurface }]}
                titleStyle={[styles.optionText, { color: theme.colors.onSurface }]}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
              />
            ))}
          </List.Section>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  option: {
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 18,
  },
});

export default FieldSelectionScreen;
