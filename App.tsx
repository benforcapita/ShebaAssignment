import React from 'react';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation';
import { registerRootComponent } from 'expo';
import { PaperProvider } from 'react-native-paper';
import 'reflect-metadata';


const App = () => {
  return (
    <PaperProvider>
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </PaperProvider>
  );
};

registerRootComponent(App);
export default App;
