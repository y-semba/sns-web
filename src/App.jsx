import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // GitHub Pages用にHashRouter推奨
import LandingPage from './pages/LandingPage/LandingPage';
import Philosophy from './pages/Philosophy/Philosophy';
import Contact from './pages/Contact/Contact'; // 👈 追加
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* トップページ */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;