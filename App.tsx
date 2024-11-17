import React from 'react';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation';
import { registerRootComponent } from 'expo';


const App = () => {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
};

registerRootComponent(App);
export default App;
