import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme, Card } from 'react-native-paper';

interface ToggleableCardProps {
  title: string;
  onPress: () => void;
}

const ToggleableCard: React.FC<ToggleableCardProps> = ({ title, onPress }) => {
  const theme = useTheme();
  return (
    <Card onPress={onPress} style={[styles.card, { backgroundColor: theme.colors.surface }]}>  
      <Card.Content>
        <Text style={[styles.title, { color: theme.colors.primary }]}>{title}</Text>
      </Card.Content>
    </Card>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ToggleableCard;
