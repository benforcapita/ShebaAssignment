import { Appointment, User } from "../context/interfaces";

export interface StorageInterface {
  saveUser(user: any): Promise<void>;
  getUser(userId: string): Promise<User>;
  saveAppointment(appointment: any): Promise<void>;
  getAppointment(appointmentId: string): Promise<Appointment>;
  deleteAppointment(appointmentId: string): Promise<void>;
  getAllAppointments(): Promise<Appointment[]>;
  logAllAppointments(): Promise<void>;
}
