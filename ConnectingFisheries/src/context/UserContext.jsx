import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');

  return (
    <UserContext.Provider value={{ 
      user, setUser, 
      role, setRole, 
      isLoggedIn, setIsLoggedIn, 
      username, setUsername,
      avatar, setAvatar 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
