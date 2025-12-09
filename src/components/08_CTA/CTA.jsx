import React from 'react';
import styles from './CTA.module.css';

const CTA = () => {
  return (
    <section id="cta" className={`${styles.cta} sectionContainer`}>
      <h2 className={styles.title}>
        まずは無料で、<br />
        安全なSNS体験を始めませんか？
      </h2>
      <p className={styles.text}>
        資料請求、デモ版のご利用など、お気軽にお問い合わせください。<br />
        導入のご相談も受け付けております。
      </p>
      <div className={styles.buttonWrapper}>
        <a href="#contact" className={styles.button}>
          お問い合わせ・資料請求
        </a>
      </div>
    </section>
  );
};

// 👇 ここが抜けていた原因です！必ず書いてください！
export default CTA;