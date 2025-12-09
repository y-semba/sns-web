import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={`${styles.heroSection} sectionContainer`}>

      {/* コンテンツエリア（これを中心に配置します） */}
      <div className={styles.contentArea}>
        <h1 className={styles.catchCopy}>
          その言葉、<span className={styles.highlight}>AI</span>が見守ります。<br />
          未来を育てる<br />新しいSNS教育。
        </h1>
        <p className={styles.description}>
          [学習用SNS]は、AIによるリアルタイムフィードバックで、<br />
          子どもたちの「自律的な判断力」を育む教育プラットフォームです。<br />
          監視ではなく、気づきを。
        </p>
        {/* <div className={styles.ctaButtons}>
          <a href="#flow" className={`${styles.button} ${styles.buttonPrimary}`}>
            導入の流れを見る
          </a>
          <a href="#cta" className={`${styles.button} ${styles.buttonSecondary}`}>
            お問い合わせ
          </a>
        </div> */}
      </div>

      {/* 背景の装飾（AIのオーラ）だけ残して、文字の裏に配置します */}
      <div className={styles.decoCircle}></div>

    </section>
  );
};

export default Hero;