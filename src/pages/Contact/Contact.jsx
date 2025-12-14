import React, { useEffect } from 'react';
import styles from './Contact.module.css';
import Header from '../../components/00_Header/Header';
import Footer from '../../components/99_Footer/Footer';

const Contact = () => {
  // ページ遷移時に一番上にスクロール
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('送信機能はデモのため実装されていません。\n実際にはここに送信処理が入ります。');
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.main}>
        <div className="sectionContainer">

          <div className={styles.titleArea}>
            <span className={styles.subTitle}>Contact Us</span>
            <h1 className={styles.mainTitle}>お問い合わせ</h1>
            <p className={styles.intro}>
              導入のご相談、お見積もりのご依頼など、<br />
              お気軽にお問い合わせください。
            </p>
          </div>

          <div className={styles.formContainer}>
            <form className={styles.contactForm} onSubmit={handleSubmit}>

              {/* 会社・学校名 */}
              <div className={styles.formGroup}>
                <label htmlFor="organization">会社・学校名 <span className={styles.required}>必須</span></label>
                <input type="text" id="organization" placeholder="例: 株式会社FODIS / 〇〇市立〇〇中学校" required />
              </div>

              {/* お名前 */}
              <div className={styles.formGroup}>
                <label htmlFor="name">お名前 <span className={styles.required}>必須</span></label>
                <input type="text" id="name" placeholder="例: 山田 太郎" required />
              </div>

              {/* メールアドレス */}
              <div className={styles.formGroup}>
                <label htmlFor="email">メールアドレス <span className={styles.required}>必須</span></label>
                <input type="email" id="email" placeholder="例: yamada@example.com" required />
              </div>

              {/* お問い合わせ内容 */}
              <div className={styles.formGroup}>
                <label htmlFor="message">お問い合わせ内容 <span className={styles.required}>必須</span></label>
                <textarea id="message" rows="6" placeholder="導入を検討しています。資料を送付してください。" required></textarea>
              </div>

              {/* 送信ボタン */}
              <div className={styles.buttonArea}>
                <button type="submit" className={styles.submitButton}>
                  送信する
                </button>
              </div>

            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;