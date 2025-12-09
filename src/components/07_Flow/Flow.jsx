import React from 'react';
import styles from './Flow.module.css';

const Flow = () => {
  const steps = [
    {
      num: '01',
      title: 'お問い合わせ',
      desc: 'まずはフォームよりお気軽にご連絡ください。資料請求のみも可能です。',
    },
    {
      num: '02',
      title: 'デモ・ヒアリング',
      desc: 'オンラインにて実際の画面（デモ版）をご覧いただきながら、学校様の課題をお伺いします。',
    },
    {
      num: '03',
      title: '無料トライアル',
      desc: '特定のクラスや学年で、期間限定の試験導入を実施。生徒や先生の反応をご確認いただけます。',
    },
    {
      num: '04',
      title: '本導入・運用開始',
      desc: 'アカウントを発行し、全校での利用を開始します。導入後の活用サポートも行います。',
    },
  ];

  return (
    <section className={`${styles.flowSection} sectionContainer`}>
      <h2 className="sectionTitle">
        導入までの流れ
      </h2>

      <div className={styles.flowContainer}>
        {steps.map((step, index) => (
          <div key={index} className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNum}>STEP {step.num}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
            </div>
            <p className={styles.stepDesc}>{step.desc}</p>

            {/* 最後のステップ以外に矢印を表示 */}
            {index !== steps.length - 1 && (
              <div className={styles.arrowIcon}>▼</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Flow;