import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* ロゴエリア */}
        <div className={styles.logo}>
          <a href="#">株式会社FODIS</a>
        </div>

        {/* ナビゲーションメニュー */}
        <nav className={styles.nav}>
          <ul>
            {/* <li><a href="#problem">課題</a></li>
            <li><a href="#solution">解決策</a></li>
            <li><a href="#features">機能</a></li>
            <li><a href="#flow">導入の流れ</a></li> */}
            {/* お問い合わせボタンを目立たせる */}
            <li>
              <a href="#cta" className={styles.contactButton}>
                お問い合わせ
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;