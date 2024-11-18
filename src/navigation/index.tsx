// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OTPScreen';
import FieldSelectionScreen from '../screens/FieldSelectionScreen';
import DoctorSelectionScreen from '../screens/DoctorSelectionScreen';
import TimeSlotSelectionScreen from '../screens/TimeSlotSelectionScreen';
import AppointmentSummaryScreen from '../screens/AppointmentSummeryScreen';
import SignUpScreen from '../screens/SignUpScreen';
import UserAppointmentsScreen from '../screens/UserAppointmentsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} options={{ headerShown: false }} />
        <Stack.Screen name={"UserAppointmentsScreen"} component={UserAppointmentsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FieldSelectionScreen" component={FieldSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DoctorSelectionScreen" component={DoctorSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TimeSlotSelectionScreen" component={TimeSlotSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AppointmentSummaryScreen" component={AppointmentSummaryScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
