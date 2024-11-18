export enum ScreenNames {
  LoginScreen = 'LoginScreen',
  OTPScreen = 'OTPScreen',
  FieldSelectionScreen = 'FieldSelectionScreen',
  DoctorSelectionScreen = 'DoctorSelectionScreen',
  TimeSlotSelectionScreen = 'TimeSlotSelectionScreen',
  AppointmentSummaryScreen = 'AppointmentSummaryScreen',
  SignUpScreen = 'SignUpScreen',
  UserAppointmentsScreen = 'UserAppointmentsScreen',
}

export type RootStackParamList = {
  [ScreenNames.LoginScreen]: undefined;
  [ScreenNames.OTPScreen]: undefined;
  [ScreenNames.FieldSelectionScreen]: undefined;
  [ScreenNames.DoctorSelectionScreen]: undefined;
  [ScreenNames.TimeSlotSelectionScreen]: undefined;
  [ScreenNames.AppointmentSummaryScreen]: undefined;
  [ScreenNames.UserAppointmentsScreen]: undefined;
  [ScreenNames.SignUpScreen]: undefined;
}
