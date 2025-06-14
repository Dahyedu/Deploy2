import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SpecServices from './pages/SpecServices.tsx';
import GenServices from './pages/GenServices';
import './animations.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/specservices" element={<SpecServices />} />
      <Route path="/genservices" element={<GenServices />} />
    </Routes>
  );
}

export default App;