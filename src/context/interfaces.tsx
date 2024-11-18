export interface Doctor {
  id: number;
  name: string;
  field: string;
  availableDates: string[];
  timeSlots: string[];
}
export interface User {
  id: number;
  name: string;
  appointments: Appointment[];
}
export interface Appointment {
  id: number;
  doctor: Doctor;
  date: string;
  time: string;
}
