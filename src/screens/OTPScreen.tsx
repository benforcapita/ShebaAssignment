// src/screens/FieldSelectionScreen.tsx
import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import tw from 'nativewind';

const fields = ['Orthopedics', 'Cardiology', 'Neurology', 'Pediatrics', 'Dermatology'];

const FieldSelectionScreen = () => {
  const navigation = useNavigation();
  const { setSelectedField } = useContext(AppContext);

  const handleFieldSelect = (field: string) => {
    setSelectedField(field);
    navigation.navigate('DoctorSelectionScreen');
  };

  return (
    <View style={tw`flex-1 justify-center px-4`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Select a Medical Field</Text>
      <FlatList
        data={fields}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`p-4 mb-2 border rounded`}
            onPress={() => handleFieldSelect(item)}
          >
            <Text style={tw`text-lg`}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FieldSelectionScreen;
