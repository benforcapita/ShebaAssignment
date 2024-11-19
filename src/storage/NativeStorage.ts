import { Appointment, User } from '../context/interfaces';
import { StorageInterface } from './StorageInterface';
import * as FileSystem from 'expo-file-system';



class NativeStorage implements StorageInterface {
  private userDir = FileSystem.documentDirectory + 'users/';
  private appointmentDir = FileSystem.documentDirectory + 'appointments/';

  private async ensureDirectoryExists(directory: string): Promise<void> {
    const dirInfo = await FileSystem.getInfoAsync(directory);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
    }
  }

  async saveUser(user: any): Promise<void> {
    await this.ensureDirectoryExists(this.userDir);
    const fileUri = this.userDir + `${user.id}.json`;
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(user));
  }

  async getUser(userId: string): Promise<User> {
    const fileUri = this.userDir + `${userId}.json`;
    const user = await FileSystem.readAsStringAsync(fileUri);
    return JSON.parse(user);
  }

  async saveAppointment(appointment: any): Promise<void> {
    await this.ensureDirectoryExists(this.appointmentDir);
    const fileUri = this.appointmentDir + `${appointment.id}.json`;
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(appointment));
  }

  async getAppointment(appointmentId: string): Promise<Appointment> {
    if (!appointmentId) {
      throw new Error('Invalid appointment ID');
    }
    const fileUri = this.appointmentDir + `${appointmentId}.json`;
    console.log('Fetching appointment with ID:', appointmentId);
    console.log('Expected file URI:', fileUri);
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) {
      console.error('Appointment file not found for ID:', appointmentId);
      throw new Error('Appointment not found');
    }
    const appointment = await FileSystem.readAsStringAsync(fileUri);
    return JSON.parse(appointment);
  }

  async deleteAppointment(appointmentId: string): Promise<void> {
    const fileUri = this.appointmentDir + `${appointmentId}.json`;
    await FileSystem.deleteAsync(fileUri, { idempotent: true });
  }

  async cleanInvalidAppointments(): Promise<void> {
    const dirInfo = await FileSystem.readDirectoryAsync(this.appointmentDir);
    for (const fileName of dirInfo) {
      const fileUri = this.appointmentDir + fileName;
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists || !fileName.endsWith('.json')) {
        continue;
      }
      const appointmentId = fileName.replace('.json', '');
      try {
        await this.getAppointment(appointmentId);
      } catch (error) {
        console.warn(`Deleting invalid appointment file: ${fileName}`);
        await FileSystem.deleteAsync(fileUri, { idempotent: true });
      }
    }
  }

  async getAllAppointments(): Promise<Appointment[]> {
    const appointments: Appointment[] = [];
    const directoryInfo = await FileSystem.readDirectoryAsync(this.appointmentDir);
    for (const fileName of directoryInfo) {
      if (fileName.endsWith('.json')) {
        const fileUri = `${this.appointmentDir}/${fileName}`;
        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        const appointment = JSON.parse(fileContent);
        appointments.push(appointment);
      }
    }
    return appointments;
  }

  async logAllAppointments(): Promise<void> {
    const directoryInfo = await FileSystem.readDirectoryAsync(this.appointmentDir);
    console.log('All appointment files:', directoryInfo);
    for (const fileName of directoryInfo) {
      if (fileName.endsWith('.json')) {
        const fileUri = `${this.appointmentDir}/${fileName}`;
        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        const appointment = JSON.parse(fileContent);
        console.log('Appointment:', appointment);
      }
    }
  }
}

export default NativeStorage;
