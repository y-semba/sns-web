import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logoImage from './FODIS1.png';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/"><img
            src={logoImage}
            alt="株式会社FODIS"
            className={styles.logoImage}
          /></Link>
        </div>

        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/philosophy" className={styles.navLink}>
                Cotoriの想い
              </Link>
            </li>

            {/* お問い合わせボタンのリンク先を修正 */}
            <li>
              <Link to="/contact" className={styles.contactButton}>
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