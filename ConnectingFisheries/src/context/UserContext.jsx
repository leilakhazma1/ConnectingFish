import React, { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Create a custom hook to access the user context
export const useUser = () => useContext(UserContext);

// UserProvider component to wrap your app and provide the context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
