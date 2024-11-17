import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from '../navigation/types';

type FieldSelectionNavigationProp = StackNavigationProp<RootStackParamList>;

const fields = ['Orthopedics', 'Cardiology', 'Neurology', 'Pediatrics', 'Dermatology'];

const FieldSelectionScreen = () => {
  const navigation = useNavigation<FieldSelectionNavigationProp>();
  const context = useContext(AppContext);
  const theme = useTheme();

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
      <View style={styles.innercerContainer}>
        <List.Section>
          <List.Subheader style={[styles.title, { color: theme.colors.primary }]}>
            Select a Medical Field
          </List.Subheader>
          {fields.map((field) => (
            <List.Item
              key={field}
              title={field}
              onPress={() => handleFieldSelect(field)}
              style={styles.option}
              titleStyle={styles.optionText}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
            />
          ))}
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
  optionText: {
    fontSize: 18,
  },
  innercerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default FieldSelectionScreen;
