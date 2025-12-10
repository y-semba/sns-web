import React from 'react';
import styles from './Features.module.css';
// 👇 画像をインポート
import dashboardImage from './dashboard.png';

const Features = () => {
  return (
    <section className={`${styles.featuresSection} sectionContainer`}>
      <h2 className="sectionTitle">
        安心・安全を実現する<br />
        主な機能
      </h2>

      {/* === 上段：生徒向け機能（カードで表示） === */}
      <h3 className={styles.subHeading}>👨‍🎓 子ども向け機能</h3>

      <div className={styles.featureGrid}>
        {/* 機能1 */}
        <div className={styles.card}>
          <div className={styles.iconWrapper}>❓</div>
          <h3 className={styles.cardTitle}>AIリアルタイム指導</h3>
          <p className={styles.cardText}>
            投稿前にAIが文章を解析。「攻撃的」「いじめ」「個人情報」などのリスクを検知し、送信を未然にブロックします。
          </p>
        </div>

        {/* 機能2 */}
        <div className={styles.card}>
          <div className={styles.iconWrapper}>💡</div>
          <h3 className={styles.cardTitle}>「なぜ？」のフィードバック</h3>
          <p className={styles.cardText}>
            単に禁止するのではなく、「なぜその言葉が相手を傷つけるのか」を具体的に提示。生徒の自律的な判断力を育てます。
          </p>
        </div>
      </div>

      {/* === 下段：先生向け機能（テキスト＋画像） === */}
      <div className={styles.teacherSection}>
        <h3 className={styles.subHeading}>👩‍🏫 先生向け管理機能</h3>

        <div className={styles.teacherLayout}>
          {/* 左側：説明テキスト（元々のカードの文章をここにまとめました） */}
          <div className={styles.teacherText}>
            <div className={styles.featureBlock}>
              <h4 className={styles.blockTitle}>📊 管理ダッシュボード</h4>
              <p>
                ブロックされた投稿の内容や回数を可視化。どの生徒がトラブルのリスクを抱えているか、ひと目で把握できます。
              </p>
            </div>
            <div className={styles.featureBlock}>
              <h4 className={styles.blockTitle}>🏫 クラス別クローズド環境</h4>
              <p>
                学校やクラス単位で独立した環境を提供。外部の不特定多数と接触することなく、安全にSNS体験を行えます。
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