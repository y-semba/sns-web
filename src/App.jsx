import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Philosophy from './pages/Philosophy/Philosophy';
import Contact from './pages/Contact/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import Company from './pages/Company/Company';
import ScrollToTop from "./components/ScrollToTop";
import './App.css';

// ▼▼▼ GAの初期化はコンポーネントの外で1回だけやるのが安全です ▼▼▼
const GA_MEASUREMENT_ID = "G-YMNKEXW6PN";
ReactGA.initialize(GA_MEASUREMENT_ID);

// ▼▼▼ 【重要】GA計測用の「専用部品」を作ります ▼▼▼
// これなら <Router> の中に入れられるのでエラーになりません
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("GA送信:", location.pathname); // 確認用ログ
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search
    });
  }, [location]);

  return null; // 画面には何も表示しない裏方の部品
};

function App() {
  // × ここにあった useLocation は削除しました

  return (
    <Router>
      {/* ▼▼▼ ここに計測用部品を置きます ▼▼▼ */}
      <AnalyticsTracker />

      <ScrollToTop />

      <div className="App">
        <Routes>
          {/* トップページ */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/company" element={<Company />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;