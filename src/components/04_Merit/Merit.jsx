import React from 'react';
import styles from './Merit.module.css';

// ▼▼▼ 1. 画像をインポートします ▼▼▼
import studentImg from './student.png';
import teachImg from './teach.png';
import blockCommentImg from './blockcomment.png';
import observeImg from './observe.png';

const Merit = () => {
  return (
    <section className={`${styles.meritSection} sectionContainer`}>
      <h2 className={`sectionTitle ${styles.sectionTitle}`}>
        安心・安全を実現する<br />
        主な機能
      </h2>

      <div className={styles.meritContainer}>
        {/* ...（上の「子ども向け」「教職員向け」カード部分は変更なしなので省略）... */}
        {/* ▼▼▼ 左のカード：子ども向け機能 ▼▼▼ */}
        <div className={styles.featureCard}>
          <div className={styles.cardHeader}>
            <h3>子ども向け機能</h3>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.topSection}>
              <div className={styles.illustrationArea}>
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

      {/* ▼▼▼ ここからレイアウトを変更しました ▼▼▼ */}
      <div className={styles.teacherSection}>
        <h3 className={styles.subHeading}>先生向け管理機能</h3>

        {/* 新しいラッパー：説明と写真を横並びにするためのコンテナ */}
        <div className={styles.teacherFeaturesGrid}>

          {/* --- 左側のブロック（写真1とその説明） --- */}
          <div className={styles.teacherFeatureBlock}>
            {/* [写真1の説明] */}
            <div className={styles.featureDescription}>
              <h4 className={styles.blockTitle}>📊 ブロック機能とログ確認</h4>
              <p>
                誰がどのような不適切な投稿をしようとしてブロックされたか、ひと目で把握できます。トラブルを未然に防ぎ、公務に集中できる環境を作ります。
              </p>
            </div>
            {/* [写真1] */}
            <div className={styles.featureImageWrapper}>
              <img
                src={blockCommentImg}
                alt="コメントブロック機能のイメージ"
                className={styles.featureImage} // クラス名を変更
              />
            </div>
          </div>

          {/* --- 右側のブロック（写真2とその説明） --- */}
          <div className={styles.teacherFeatureBlock}>
            {/* [写真2の説明] */}
            <div className={styles.featureDescription}>
              <h4 className={styles.blockTitle}>🏫 AI見守りと指導提言</h4>
              <p>
                グループの発言内容をAIが解析し、指導が必要なタイミングを教えてくれます。クラス全体の利用状況を可視化し、クローズドな環境で安全に運用できます。
              </p>
            </div>
            {/* [写真2] */}
            <div className={styles.featureImageWrapper}>
              <img
                src={observeImg}
                alt="見守り機能のイメージ"
                className={styles.featureImage} // クラス名を変更
              />
            </div>
          </div>

        </div>
      </div>
      {/* ▲▲▲ 変更ここまで。一番下にあった画像エリアは削除しました ▲▲▲ */}

    </section>
  );
};

export default Merit;