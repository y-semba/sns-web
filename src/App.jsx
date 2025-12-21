import React from 'react';
// BrowserRouter は削除し、HashRouter だけを使います
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Philosophy from './pages/Philosophy/Philosophy';
import Contact from './pages/Contact/Contact';
import ScrollToTop from "./components/ScrollToTop";
import './App.css';

function App() {
  return (
    // ↓ ここを Router (HashRouter) 一つだけにします
    <Router>
      <ScrollToTop /> {/* Routerの内側に置くのが正解 */}

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