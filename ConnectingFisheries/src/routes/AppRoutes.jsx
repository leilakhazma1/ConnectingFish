import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Home from '../pages/Home'
import About from '../pages/About';
import MapofFisheries from '../pages/MapofFisheries';
import YourFIsh from '../pages/YourFish'


function AppRoutes() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<MapofFisheries />} />
        <Route path="/yourfish" element={<YourFIsh />} />
      </Routes>
    </>
  );
}

export default AppRoutes;