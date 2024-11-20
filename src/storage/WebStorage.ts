import { Appointment, User } from '../context/interfaces';
import { StorageInterface } from './StorageInterface';

class WebStorage implements StorageInterface {
  async saveUser(user: any): Promise<void> {
    localStorage.setItem(`user_${user.id}`, JSON.stringify(user));
  }

  async getUser(userId: string): Promise<User> {
    const user = localStorage.getItem(`user_${userId}`);
    return user ? JSON.parse(user) : null;
  }

  async saveAppointment(appointment: any): Promise<void> {
    localStorage.setItem(`appointment_${appointment.id}`, JSON.stringify(appointment));
  }

  async getAppointment(appointmentId: string): Promise<Appointment> {
    const appointment = localStorage.getItem(`appointment_${appointmentId}`);
    return appointment ? JSON.parse(appointment) : null;
  }

  async deleteAppointment(appointmentId: string): Promise<void> {
    localStorage.removeItem(`appointment_${appointmentId}`);
  }

  async getAllAppointments(): Promise<Appointment[]> {
    const appointments: Appointment[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('appointment_')) {
        const appointmentData = localStorage.getItem(key);
        if (appointmentData) {
          const appointment = JSON.parse(appointmentData);
          appointments.push(appointment);
        }
      }
    }
    return appointments;
  }

  async logAllAppointments(): Promise<void> {
    // Check if there are any appointment keys
    const appointmentKeys = Object.keys(localStorage).filter(key => key.startsWith('appointment_'));
    if (appointmentKeys.length === 0) {
      console.log('No appointments found. Initializing storage.');
      // Optionally, initialize with a default or empty state
    }
    
    console.log('All appointment keys:', appointmentKeys);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('appointment_')) {
        const appointmentData = localStorage.getItem(key);
        if (appointmentData) {
          const appointment = JSON.parse(appointmentData);
          console.log('Appointment:', appointment);
        }
      }
    }
  }
}

export default WebStorage;
