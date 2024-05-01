import React from 'react';
import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './context/UserContext';



function App() {
  return (
   
    <UserProvider>
    <div>
    <div>
        <LoginForm />
        {user ? <div className="avatar">{user.username.charAt(0).toUpperCase()}</div> : null}
      </div>
      <AppRoutes />
    </div>
  </UserProvider>
  );
}

export default App;