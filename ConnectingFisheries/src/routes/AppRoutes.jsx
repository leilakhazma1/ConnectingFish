import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Home from '../pages/Home';
import About from '../pages/About';
import MapofFisheries from '../pages/MapofFisheries';
import YourFish from '../pages/YourFish';
import Catalogue from '../pages/Catalogue';
import Login from '../components/LogIn';
import SignUp from '../components/SignUp';

function AppRoutes() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<MapofFisheries />} />
        <Route path="/yourfish" element={<YourFish />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
