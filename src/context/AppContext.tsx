import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { User, Doctor, Appointment } from './interfaces';


interface AppContextProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  selectedField: string | null;
  setSelectedField: Dispatch<SetStateAction<string | null>>;
  selectedDoctor: Doctor | null;
  setSelectedDoctor: Dispatch<SetStateAction<Doctor | null>>;
  appointmentDetails: Appointment | null;
  setAppointmentDetails: Dispatch<SetStateAction<Appointment | null>>;
  userAppointments: Appointment[];
  setUserAppointments: Dispatch<SetStateAction<Appointment[]>>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointmentDetails, setAppointmentDetails] = useState<Appointment | null>(null);
  const [userAppointments, setUserAppointments] = useState<Appointment[]>([]);

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
        userAppointments,
        setUserAppointments,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
