import React from 'react';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation';

const App = () => {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
};

export default App;
