import React from 'react';
import styles from './Merit.module.css';

const Merit = () => {
  return (
    <section className={`${styles.meritSection} sectionContainer`}>
      <h2 className="sectionTitle">
        私たちが実現する未来
      </h2>
      <p className={styles.subTitle}>
        目指すのは、AIによる監視ではなく<br />
        子どもたちの思考力・判断力・表現力の育成です。
      </p>

      <div className={styles.meritContainer}>
        {/* メリット1: 生徒の成長 */}
        <div className={styles.meritBox}>
          <div className={styles.imageAreaStudent}>
            {/* ここにイラストなどが入るイメージ */}
            <span>👨‍🎓 子ども</span>
          </div>
          <div className={styles.textArea}>
            <h3>失敗して学び、<br />自分で考える力がつく</h3>
            <p>
              チェックボタンを押した瞬間にフィードバックを受けることで、何がダメだったのかをその場で学習。<br />
              繰り返すうちに、AIの補助がなくとも適切な言葉選びができるようになります。
            </p>
          </div>
        </div>

        {/* 矢印（PC表示時のみ） */}
        <div className={styles.arrow}>⬇︎</div>

        {/* メリット2: 学校の安心 */}
        <div className={styles.meritBox}>
          <div className={styles.imageAreaTeacher}>
            <span>🏫 学校・教員</span>
          </div>
          <div className={styles.textArea}>
            <h3>トラブルを未然に防ぎつつ、<br />ほかの公務に集中できる</h3>
            <p>
              SNSトラブルの事後対応に追われる時間を削減。<br />
              ダッシュボードで生徒の傾向を把握できるため、データに基づいた効果的な指導が可能になります。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Merit;