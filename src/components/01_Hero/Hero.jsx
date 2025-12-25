import React from 'react';
import styles from './Hero.module.css';
import CotoriHeroImage from './cotori_hero.png'

const Hero = () => {
  return (
    <section className={`${styles.heroSection} sectionContainer`}>

      {/* コンテンツエリア（これを中心に配置します） */}
      <div className={styles.contentArea}>
        <h1 className={styles.catchCopy}>
          その言葉、私たちが見守ります。<br />
          <span className={styles.highlight}>Cotori</span>が提供する<br />新しいSNS教育。
        </h1>
        <p className={styles.description}>
          Cotoriは、業界初、使って学ぶ学校向けのSNSプラットフォームです。<br />
          SNS教材でありながら、実際にコミュニケーションツールとして使える<br />
          プライベートSNS機能を備えています。
        </p>
        <img
          src={CotoriHeroImage}
          alt="子ども向け機能のイラスト"
          className={styles.CotoriHeroImage}
        />
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