import React, { createContext, useState, ReactNode } from 'react';

interface User {
  email: string;
}

interface AppContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

