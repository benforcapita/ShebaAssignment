import React, { createContext, useState, ReactNode } from 'react';

interface User {
  email: string;
}

interface Doctor {
  id: number;
  name: string;
  field: string;
  availableDates: string[];
  timeSlots: string[];
}

interface AppointmentDetails {
  doctor: Doctor | null;
  date: string | null;
  time: string | null;
}

interface AppContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  selectedField: string | null;
  setSelectedField: (field: string | null) => void;
  selectedDoctor: Doctor | null;
  setSelectedDoctor: (doctor: Doctor | null) => void;
  appointmentDetails: AppointmentDetails | null;
  setAppointmentDetails: (details: AppointmentDetails | null) => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails | null>(null);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        selectedField,
        setSelectedField,
        selectedDoctor,
        setSelectedDoctor,
        appointmentDetails,
        setAppointmentDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
