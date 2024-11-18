import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import doctorsData from '../data/doctors.json';
import { Doctor } from '../context/interfaces';
import DoctorSearch from '../components/DoctorSearch';
import FieldSelection from '../components/FieldSelection';
import ToggleableCard from '../components/ToggleableCard';

type FieldSelectionNavigationProp = StackNavigationProp<RootStackParamList>;

const fields = ['Orthopedics', 'Cardiology', 'Neurology', 'Pediatrics', 'Dermatology'];

const FieldSelectionScreen = () => {
  const navigation = useNavigation<FieldSelectionNavigationProp>();
  const context = useContext(AppContext);
  const theme = useTheme();

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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>      
      <ToggleableCard title="Search Doctor by Name" onPress={() => toggleSection('doctor')} />
      <Animated.View style={{ height: doctorHeight }}>
        {expandedSection === 'doctor' && (
          <DoctorSearch doctorsData={doctorsData} onSelectDoctor={handleDoctorSelect} />
        )}
      </Animated.View>

      <ToggleableCard title="Select a Medical Field" onPress={() => toggleSection('field')} />
      <Animated.View style={{ height: fieldHeight }}>
        {expandedSection === 'field' && (
          <FieldSelection fields={fields} onSelectField={handleFieldSelect} />
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
});

export default FieldSelectionScreen;
