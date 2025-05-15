import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NDVI from './pages/NDVI';
import Temperature from './pages/Temperature';
import Albedo from './pages/Albedo';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ndvi" element={<NDVI />} />
            <Route path="/temperature" element={<Temperature />} />
            <Route path="/albedo" element={<Albedo />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;