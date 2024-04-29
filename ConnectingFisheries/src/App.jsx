import React from 'react';
import AppRoutes from './routes/AppRoutes';
import './App.css';
import NavBar from './components/NavBar';


function App() {
  return (
   
      <div>
        <NavBar />
        <AppRoutes />
      </div>
   
  );
}

export default App;