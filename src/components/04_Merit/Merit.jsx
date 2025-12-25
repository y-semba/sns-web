import React from 'react';
import styles from './Merit.module.css';

// ▼▼▼ 1. 画像をインポートします（ファイル名が正しいか要確認！） ▼▼▼
import dashboardImage from './dashboard.png';
import studentImg from './student.png';
import teachImg from './teach.png';

const Merit = () => {
  return (
    <section className={`${styles.meritSection} sectionContainer`}>
      <h2 className={`sectionTitle ${styles.sectionTitle}`}>
        安心・安全を実現する<br />
        主な機能
      </h2>

      <div className={styles.meritContainer}>

        {/* ▼▼▼ 左のカード：子ども向け機能 ▼▼▼ */}
        <div className={styles.featureCard}>
          <div className={styles.cardHeader}>
            <h3>子ども向け機能</h3>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.topSection}>
              <div className={styles.illustrationArea}>
                {/* ▼▼▼ 2. src={変数名} の形にします（波括弧が重要） ▼▼▼ */}
                <img
                  src={studentImg}
                  alt="子ども向け機能のイラスト"
                  className={styles.illustrationImage}
                />
              </div>
              <ul className={styles.featureList}>
                <li>・フィードバック機能</li>
                <li>・クラス分析</li>
              </ul>
            </div>

            <div className={styles.bottomSection}>
              <h4 className={styles.orangeTitle}>
                「気づき」を与えるフィードバック
              </h4>
              <p className={styles.description}>
                Cotoriの最大の特徴は、子どもたちのメッセージをAIが文脈をもとに解析。不適切な表現だけでなく、会話の流れから逸脱した場合や、荒らし行為に興じた場合も含めて適切にリアルタイムの指導をします。多様な表現でのフィードバックで子どもたちに成長を促します。
              </p>
            </div>
          </div>
        </div>

        {/* ▼▼▼ 右のカード：教職員向け機能 ▼▼▼ */}
        <div className={styles.featureCard}>
          <div className={styles.cardHeader}>
            <h3>教職員向け機能</h3>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.topSection}>
              <div className={styles.illustrationArea}>
                {/* ▼▼▼ 2. こちらも同様に変数を使います ▼▼▼ */}
                <img
                  src={teachImg}
                  alt="教職員向け機能のイラスト"
                  className={styles.illustrationImage}
                />
              </div>
              <ul className={styles.featureList}>
                <li>・指導タイミング評価</li>
                <li>・個人分析</li>
                <li>・グループ作成 他</li>
              </ul>
            </div>

            <div className={styles.bottomSection}>
              <h4 className={styles.orangeTitle}>
                トラブルを早期発見、公務に集中
              </h4>
              <p className={styles.description}>
                教職員用管理画面では、クラス全体の利用状況を可視化し、指導タイミングを提言。また、子どもたちのチャットを分析し、個人の引き継ぎ資料を作成できます。もちろん、誰がどのような不適切な投稿をしようとしてブロックされたか、ログとして確認可能です。
              </p>
            </div>
          </div>
        </div>

      </div>

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

export default Merit;