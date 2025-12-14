import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Philosophy.module.css';
import Header from '../../components/00_Header/Header';
import Footer from '../../components/99_Footer/Footer';

const Philosophy = () => {
  // ページ遷移時に一番上にスクロール
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.main}>
        <div className="sectionContainer">

          {/* タイトルエリア */}
          <div className={styles.titleArea}>
            <span className={styles.subTitle}>Brand Philosophy</span>
            <h1 className={styles.mainTitle}>
              なぜ、<span className={styles.highlight}>Cotori</span> なのか。
            </h1>
            <p className={styles.intro}>
              デジタルな世界で、言葉はあまりにも軽く、<br />
              すぐに遠くへと飛んでいってしまいます。<br />
              だからこそ、私たちはその言葉を「育てる」場所を作りました。
            </p>
          </div>

          {/* ストーリーエリア */}
          <div className={styles.storyContainer}>
            <div className={styles.line}></div> {/* 真ん中の線 */}

            {/* 1. 小さな言葉 */}
            <div className={styles.storyBlock}>
              <div className={styles.iconCircle}>🐣</div>
              <div className={styles.textBox}>
                <h3>「ことり」＝ 小さな言葉</h3>
                <p>
                  子どもたちが紡ぐ言葉は、生まれたばかりの小鳥のように繊細です。
                  否定されたり、炎上したりする恐怖がない場所で、まずは自分の言葉を大切に育てることから始めます。
                </p>
              </div>
            </div>

            {/* 2. 巣で育つ */}
            <div className={styles.storyBlock}>
              <div className={styles.iconCircle}>🏠</div>
              <div className={styles.textBox}>
                <h3>巣で育つ ＝ 教室という安全基地</h3>
                <p>
                  教室内で完結するSNSという「閉鎖された空間」は、外敵のいない安全な巣です。
                  失敗しても大丈夫。先生とAIが見守る中で、デジタルの作法を安心して学べます。
                </p>
              </div>
            </div>

            {/* 3. 鳴く */}
            <div className={styles.storyBlock}>
              <div className={styles.iconCircle}>🎵</div>
              <div className={styles.textBox}>
                <h3>鳴く ＝ フィードバック社会</h3>
                <p>
                  小鳥が鳴き方を覚えるように、コミュニケーションを練習します。
                  AIからのフィードバック（さえずり）を通じて、相手に伝わる言葉、傷つけない言葉を模索します。
                </p>
              </div>
            </div>

            {/* 4. 巣立ち */}
            <div className={styles.storyBlock}>
              <div className={styles.iconCircle}>🕊️</div>
              <div className={styles.textBox}>
                <h3>巣から飛び立つ ＝ 自立と発信</h3>
                <p>
                  十分な練習（送信トレーニング）を積んだ鳥だけが、
                  やがて広いインターネットの空へ、力強く羽ばたくことができます。
                  Cotoriは、その「自立」までの助走期間です。
                </p>
              </div>
            </div>

          </div>

          {/* 締めくくり */}
          <div className={styles.conclusion}>
            <p>
              青い鳥のような拡散性のある世界へ飛び立つ前に。<br />
              ここで、言葉を育てていきませんか。
            </p>
            <Link to="/" className={styles.backButton}>
              トップページに戻る
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Philosophy;