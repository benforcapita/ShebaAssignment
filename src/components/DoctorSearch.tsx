import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { List, Searchbar } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { Doctor } from '../context/interfaces';

interface DoctorSearchProps {
  doctorsData: Doctor[];
  onSelectDoctor: (doctorName: string) => void;
}

const DoctorSearch: React.FC<DoctorSearchProps> = ({ doctorsData, onSelectDoctor }) => {
  const theme = useTheme();
  const [doctorName, setDoctorName] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState<string[]>([]);

  useEffect(() => {
    if (doctorName.length >= 3) {
      const fetchDoctors = async () => {
        const allDoctors = doctorsData.map((doctor) => doctor.name);
        setFilteredDoctors(allDoctors.filter((doc) => doc.toLowerCase().includes(doctorName.toLowerCase())));
      };
      fetchDoctors();
    } else {
      setFilteredDoctors([]);
    }
  }, [doctorName, doctorsData]);

  return (
    <>
      <Searchbar
        placeholder="Search Doctor by Name"
        value={doctorName}
        onChangeText={setDoctorName}
        style={{ marginBottom: 16 }}
        mode='view'
      />
      {filteredDoctors.length > 0 && (
        <FlatList
          data={filteredDoctors}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <List.Item
              title={item}
              onPress={() => onSelectDoctor(item)}
              titleStyle={{ color: theme.colors.shadow }}
              right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary} />}
            />
          )}
        />
      )}
    </>
  );
};

export default DoctorSearch;
