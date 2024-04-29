import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home'
import About from '../pages/About';
import MapofFisheries from '../pages/MapofFisheries';
import YourFish from '../pages/YourFIsh'
import NavBar from '../components/NavBar';

function AppRoutes() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<MapofFisheries />} />
        <Route path="/yourfish" element={<YourFish />} />
      </Routes>
    </>
  );
}

export default AppRoutes;