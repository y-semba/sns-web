// Company.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Company = () => {
  const containerStyle = {
    textAlign: 'center',
    padding: '80px 20px',
    minHeight: '60vh', // 画面の真ん中あたりに表示されるように
  };

  const buttonStyle = {
    marginTop: '30px',
    padding: '12px 30px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '20px' }}>運営会社</h2>
      <p style={{ lineHeight: '1.8', color: '#666' }}>
        現在、会社概要ページは準備中です。<br />
        公開まで今しばらくお待ちください。
      </p>

      {/* ホームに戻るボタン */}
      <Link to="/">
        <button style={buttonStyle}>ホームに戻る</button>
      </Link>
    </div>
  );
};

export default Company;