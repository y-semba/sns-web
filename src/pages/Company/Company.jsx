import React, { useEffect } from 'react';
import Header from '../../components/00_Header/Header';
import Footer from '../../components/99_Footer/Footer';
import styles from './Company.module.css';


import myPhoto from './aboabo.jpg';

const Company = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.main}>
        <div className="sectionContainer">

          <div className={styles.titleArea}>
            <span className={styles.subTitle}>Company</span>
            <h1 className={styles.mainTitle}>会社概要</h1>
          </div>

          {/* ▼▼▼ 会社情報の表（今まで通り） ▼▼▼ */}
          <div className={styles.companyInfo}>
            <dl className={styles.infoList}>
              <div className={styles.infoRow}>
                <dt>会社名</dt>
                <dd>株式会社FODIS</dd>
              </div>
              <div className={styles.infoRow}>
                <dt>設立</dt>
                <dd>2026年6月（予定）</dd>
              </div>
              <div className={styles.infoRow}>
                <dt>事業内容</dt>
                <dd>
                  教育用SNS「Cotori」の開発・運営<br />
                  情報モラル教育の支援<br />
                  AI技術を活用した見守りシステムの開発
                </dd>
              </div>
              <div className={styles.infoRow}>
                <dt>所在地</dt>
                <dd>大阪府</dd>
              </div>
            </dl>
          </div>

          {/* ▼▼▼ 追加：代表者紹介セクション ▼▼▼ */}
          <div className={styles.representativeSection}>
            <h2 className={styles.sectionTitle}>代表紹介</h2>

            {/* 写真とプロフィールの左右レイアウト */}
            <div className={styles.profileWrapper}>
              <div className={styles.imageArea}>
                {/* ★ src={myPhoto} に書き換えてください */}
                <img src={myPhoto} alt="代表取締役写真" className={styles.profileImage} />
              </div>

              <div className={styles.textArea}>
                <p className={styles.position}>代表者</p>
                <h3 className={styles.name}>安保　遼太郎 <span className={styles.enName}>Ryotaro Abo</span></h3>
                <p className={styles.bio}>
                  大阪芸術大学写真学科を優秀賞で卒業後、表現と教育との関わりに強い関心を抱き、小学校教育を専門とする大学で研究・実践を積む。
                  教育現場での体験から、ICTやSNSが教育にもたらす可能性と課題を目の当たりにし、子ども自身が言葉を推敲し他者とつながる力を育つコミュニケーション環境の必要性を強く感じるようになる。

                  こうした背景からAIによる言語フィードバックと送信制御を組み合わせた 教育SNS「Cotori」 を構想・開発。
                  トラブル防止だけでなく、言葉を育てる体験設計に重点を置くプロダクトとして実装を進めている。<br></br><br></br>

                  2020年　三田学園高等学校　卒業<br></br>
                  2024年　大阪芸術大学　写真学科　卒業<br></br>
                  2026年　大阪教育大学　小学校専攻　在籍<br></br>
                </p>
              </div>
            </div>

            {/* 受賞歴・展示歴ブロック */}
            <div className={styles.historyBlock}>
              <h3 className={styles.historyTitle}>受賞・活動歴</h3>
              <ul className={styles.historyList}>
                <li>
                  <span className={styles.year}>2025年 10月</span>
                  <span className={styles.event}>学びを助ける支援ツール体験展示会　(主催　スノーキャンパス　公益財団法人ヤマト福祉財団 障害者福祉助成金)</span>
                </li>
                <li>
                  <span className={styles.year}>2025年　11月</span>
                  <span className={styles.event}>第4回 学生ビジネスプランコンテスト O-BUCs（オブックス） 夢賞</span>
                </li>
                <li>
                  <span className={styles.year}>2026年　2月</span>
                  <span className={styles.event}>畿央大学大学院教育学研究科プロジェクト研究会　教育における生成AIの役割と課題(予定)</span>
                </li>
                {/* 必要に応じて行を増やしてください */}
              </ul>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Company;