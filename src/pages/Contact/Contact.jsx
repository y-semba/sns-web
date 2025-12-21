// Contact.js
import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';
import Header from '../../components/00_Header/Header';
import Footer from '../../components/99_Footer/Footer';

const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    // 環境変数からIDを読み込む（コード上にIDは残りません）
    const SERVICE_ID = process.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          alert('お問い合わせを送信しました！');
          setIsSending(false);
          e.target.reset(); // フォームを空にする
        },
        (error) => {
          console.error('FAILED...', error.text);
          alert('送信に失敗しました。時間をおいて再度お試しください。');
          setIsSending(false);
        },
      );
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
              導入のご相談、お見積もりのご依頼など、<br />お気軽にお問い合わせください。
            </p>
          </div>

          <div className={styles.formContainer}>
            {/* ref={form} を追加し、onSubmitをsendEmailに変更 */}
            <form ref={form} className={styles.contactForm} onSubmit={sendEmail}>

              {/* name属性を追加（重要） */}
              <div className={styles.formGroup}>
                <label htmlFor="organization">会社・学校名 <span className={styles.required}>必須</span></label>
                <input type="text" id="organization" name="organization" placeholder="例: 株式会社FODIS" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="name">お名前 <span className={styles.required}>必須</span></label>
                <input type="text" id="name" name="user_name" placeholder="例: 山田 太郎" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">メールアドレス <span className={styles.required}>必須</span></label>
                <input type="email" id="email" name="user_email" placeholder="例: yamada@example.com" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">お問い合わせ内容 <span className={styles.required}>必須</span></label>
                <textarea id="message" name="message" rows="6" placeholder="お問い合わせ内容をご記入ください。" required></textarea>
              </div>

              <div className={styles.buttonArea}>
                <button type="submit" className={styles.submitButton} disabled={isSending}>
                  {isSending ? '送信中...' : '送信する'}
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