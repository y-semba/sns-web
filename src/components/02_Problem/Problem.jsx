import React from 'react';
import styles from './Problem.module.css';

const Problem = () => {
  return (
    <section className="sectionContainer"> {/* 背景は白なので共通スタイルのみ */}
      <h2 className="sectionTitle">こんな課題、ありませんか？</h2>

      <ul className={styles.problemList}>
        <li>子どもたちのSNSトラブル（誹謗中傷、いじめ）が後を絶たない。</li>
        <li>SNSの「使い方」は教えたいが、安全に「実践」させる場がない。</li>
        {/* <li>講演会やプリント学習だけでは、本当に身についているか不安だ。</li> */}
        <li>トラブルが起きてからの事後指導に疲弊している。</li>
      </ul>
    </section>
  );
};

export default Problem;