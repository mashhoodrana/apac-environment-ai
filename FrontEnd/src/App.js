import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import NDVI from './pages/NDVI';
import Temperature from './pages/Temperature';
import Albedo from './pages/Albedo';
import Analysis from './pages/Analysis';
import Results from './pages/Results';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ndvi" element={<NDVI />} />
            <Route path="/temperature" element={<Temperature />} />
            <Route path="/albedo" element={<Albedo />} />
            <Route path="/analyze" element={<Analysis />} />
            <Route path="/results/:id" element={<Results />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
