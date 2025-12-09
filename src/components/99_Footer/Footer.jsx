import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* サイト名（ロゴ） */}
        <h3 className={styles.logo}>学習用SNS</h3>

        {/* フッターリンク */}
        <ul className={styles.links}>
          <li><a href="#company" className={styles.link}>運営会社</a></li>
          <li><a href="#privacy" className={styles.link}>プライバシーポリシー</a></li>
          <li><a href="#terms" className={styles.link}>利用規約</a></li>
          <li><a href="#contact" className={styles.link}>お問い合わせ</a></li>
        </ul>

        {/* コピーライト */}
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} 学習用SNS All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;