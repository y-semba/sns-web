// Solution.js
import React from 'react';
import styles from './Solution.module.css';
import feedbackImage from './feedback.png';

const Solution = () => {
  return (
    <section className={`${styles.solution} sectionContainer`}>
      <h2 className="sectionTitle">
        Cotoriが、安全な「実践の場」を提供します。
      </h2>

      <div className={styles.solutionContent}>
        {/* 1. 画像エリア（上） */}
        <div className={styles.imagePlaceholder}>
          <img
            src={feedbackImage}
            alt="AIフィードバックの画面イメージ"
            className={styles.solutionImage}
          />
        </div>

        {/* 2. テキストエリア（下） */}
        <div className={styles.textBlock}>

          {/* 左側のブロック */}
          <div className={styles.featureItem}>
            <h3>AIによるリアルタイム指導</h3>
            <p>
              生徒が言葉を投稿しようとすると、AIが瞬時に分析します。
              攻撃性・倫理性はもちろん文脈の適切さまで判断して、理由やアドバイスを返答します。
            </p>
          </div>

          {/* 右側のブロック */}
          <div className={styles.featureItem}>
            <h3>送信ブロック</h3>
            <p>
              投稿をブロックすると同時に「なぜその言葉が良くないのか」をAIが分かりやすくフィードバック。子どもたち自身に気づきを与えます。
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Solution;