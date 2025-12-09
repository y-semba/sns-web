import React from 'react';
import styles from './Solution.module.css';
import feedbackImage from './feedback.png';

const Solution = () => {
  return (
    <section className={`${styles.solution} sectionContainer`}>
      <h2 className="sectionTitle">
        学習用SNSが、安全な「実践の場」を提供します。
      </h2>

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
            生徒が攻撃的な言葉や倫理的に不適切な言葉を投稿しようとすると、AIが瞬時に分析します。
          </p>
          <h3>送信ブロックと「理由」の提示</h3>
          <p>
            投稿をブロックすると同時に「なぜその言葉が良くないのか」をAIが分かりやすくフィードバック。生徒自身に「気づき」を与えます。
          </p>
        </div>
      </div>
    </section>
  );
};

export default Solution;