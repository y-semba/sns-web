import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  // ▼▼▼ ここが抜けていた部分です（スイッチの機能） ▼▼▼
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // リンクを押したらメニューを閉じる
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  // ▲▲▲ ここまで ▲▲▲

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          {/* ロゴクリック時もメニューを閉じるようにしておくと親切です */}
          <Link to="/" onClick={closeMenu}>
            <img
              src="/Fodis_web.png"
              alt="株式会社FODIS"
              className={styles.logoImage}
            />
            FODIS
          </Link>
        </div>

        {/* ハンバーガーボタン */}
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-label="メニューを開く"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* ナビゲーション */}
        {/* ここに ${isMenuOpen ? styles.open : ''} を追加して、開閉CSSを適用させます */}
        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
          <ul>
            <li>
              <Link to="/philosophy" className={styles.navLink} onClick={closeMenu}>
                Cotoriの想い
              </Link>
            </li>

            <li>
              <Link to="/contact" className={styles.contactButton} onClick={closeMenu}>
                お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;