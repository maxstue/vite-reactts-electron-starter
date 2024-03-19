import React, { createContext, FC, useState } from 'react';

interface AppContextProps {
  children: React.ReactNode;
}

interface ContextValue {
  username: string;
  setUsername: (username: string) => void;
  profileList: unknown[];
  setProfileList: (profileList: unknown[]) => void;
}

export const Context = createContext<ContextValue | null>(null);

// eslint-disable-next-line react/function-component-definition
const AppContext: FC<AppContextProps> = ({ children }) => {
  const [username, setUsername] = useState<string>('Chandan Sayed');
  const [profileList, setProfileList] = useState<unknown[]>([]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <Context.Provider value={{ username, setUsername, profileList, setProfileList }}>{children}</Context.Provider>;
};

export default AppContext;
