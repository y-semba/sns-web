import React from 'react';
import styles from './Solution.module.css';
import feedbackImage from './feedback.png';

const Solution = () => {
  return (
    <section className={`${styles.solution} sectionContainer`}>
      <h2 className="sectionTitle">
        Cotoriが、安全な「実践の場」を提供します。
      </h2>
      {/* 実践の場 青文字？*/}

      <div className={styles.solutionContent}>
        {/* PCでは左に画像、右にテキスト */}
        <div className={styles.imagePlaceholder}>
          <img
            src={feedbackImage}
            alt="AIフィードバックの画面イメージ"
            className={styles.solutionImage} // CSSで装飾するためのクラスを追加
          />
        </div>
        <div className={styles.textBlock}>
          <h3>AIによるリアルタイム指導</h3>
          <p>
            生徒が言葉を投稿しようとすると、AIが瞬時に分析します。
            攻撃性・倫理性はもちろん文脈の適切さまで判断して、理由やアドバイスを返答します。
          </p>
          <h3>送信ブロック</h3>
          <p>
            投稿をブロックすると同時に「なぜその言葉が良くないのか」をAIが分かりやすくフィードバック。子どもたち自身に気づきを与えます。
          </p>
        </div>
      </div>
    </section>
  );
};

export default Solution;