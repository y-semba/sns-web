import React from 'react';
import styles from './Target.module.css';

const Target = () => {
  return (
    <section className={`${styles.targetSection} sectionContainer`}>
      <h2 className="sectionTitle">
        このような皆様に<br />
        導入をおすすめします
      </h2>

      <div className={styles.targetWrapper}>
        {/* ターゲット1: 先生方 */}
        <div className={styles.targetItem}>
          <div className={styles.circle}>
            <span className={styles.icon}>👩‍🏫</span>
          </div>
          <h3 className={styles.targetTitle}>小中学校・高等学校の<br />先生方</h3>
          <p className={styles.targetDesc}>
            情報モラルの授業教材として。また、クラス内のSNSトラブルを未然に防ぎ、生徒指導の負担を軽減したいとお考えの先生に。
          </p>
        </div>

        {/* ターゲット2: 教育委員会 */}
        <div className={styles.targetItem}>
          <div className={styles.circle}>
            <span className={styles.icon}>🏢</span>
          </div>
          <h3 className={styles.targetTitle}>教育委員会の<br />担当者様</h3>
          <p className={styles.targetDesc}>
            GIGAスクール構想における「実践的なデジタル教材」として。地域全体での情報リテラシー向上と、安全なICT環境の構築に。
          </p>
        </div>

        {/* ターゲット3: 保護者 */}
        <div className={styles.targetItem}>
          <div className={styles.circle}>
            <span className={styles.icon}>🏠</span>
          </div>
          <h3 className={styles.targetTitle}>お子様のSNS利用が<br />心配な保護者様</h3>
          <p className={styles.targetDesc}>
            いきなり一般のSNSを使わせるのが不安なご家庭に。学校管理下のクローズドな環境で、正しい使い方を身につけさせることができます。
          </p>
        </div>
      </div>
    </section>
  );
};

export default Target;