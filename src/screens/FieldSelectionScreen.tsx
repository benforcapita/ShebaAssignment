import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { RootStackParamList, ScreenNames } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

type FieldSelectionNavigationProp = StackNavigationProp<RootStackParamList>;

const fields = ['Orthopedics', 'Cardiology', 'Neurology', 'Pediatrics', 'Dermatology'];

const FieldSelectionScreen = () => {
  const navigation = useNavigation<FieldSelectionNavigationProp>();
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('AppContext is undefined. Ensure you are within an AppProvider.');
  }

  const { setSelectedField } = context;

  const handleFieldSelect = (field: string) => {
    setSelectedField(field);
    navigation.navigate(ScreenNames.DoctorSelectionScreen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Medical Field</Text>
      <FlatList
        data={fields}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleFieldSelect(item)}
          >
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  optionText: {
    fontSize: 18,
  },
});

export default FieldSelectionScreen;
