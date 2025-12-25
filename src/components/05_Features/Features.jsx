import React from 'react';
import styles from './Features.module.css';
// 👇 画像をインポート
// import dashboardImage from './dashboard.png';

const Features = () => {
  return (
    <section className={`${styles.featuresSection} sectionContainer`}>
      <h2 className="sectionTitle">
        安心・安全を実現する<br />
        主な機能
      </h2>
      {/* === 下段：先生向け機能（テキスト＋画像） === */}
      <div className={styles.teacherSection}>
        <h3 className={styles.subHeading}>先生向け管理機能</h3>

        <div className={styles.teacherLayout}>
          {/* 左側：説明テキスト（元々のカードの文章をここにまとめました） */}
          <div className={styles.teacherText}>
            <div className={styles.featureBlock}>
              <h4 className={styles.blockTitle}>📊 管理ダッシュボード</h4>
              <p>
                グループの発言内容をAIが解析。指導の必要なタイミングを教えてくれます。
                ブロックされた投稿の内容を、ひと目で把握できます。
              </p>
            </div>
            <div className={styles.featureBlock}>
              <h4 className={styles.blockTitle}>🏫 クローズドな環境</h4>
              <p>
                学校やクラス単位で独立した環境を提供。外部の不特定多数と接触することなく、安全にSNS学習を行えます。
              </p>
            </div>
          </div>

          {/* 右側：ダッシュボード画像 */}
          <div className={styles.dashboardWrapper}>
            <img
              src={dashboardImage}
              alt="先生用管理ダッシュボード画面"
              className={styles.dashboardImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;