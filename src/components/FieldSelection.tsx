import React from 'react';
import { List, TouchableRipple } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

interface FieldSelectionProps {
  fields: string[];
  onSelectField: (field: string) => void;
}

const FieldSelection: React.FC<FieldSelectionProps> = ({ fields, onSelectField }) => {
  const theme = useTheme();
  return (
    <List.Section>
      {fields.map((field) => (
        <TouchableRipple key={field} onPress={() => onSelectField(field)} style={[styles.card, { backgroundColor: theme.colors.surface }]}>  
          <List.Item
            title={field}
            titleStyle={{ color: theme.colors.shadow }}
            right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary} />}
          />
        </TouchableRipple>
      ))}
    </List.Section>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default FieldSelection;
