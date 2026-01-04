import React from 'react';
import styles from './NewsList.module.css';

// ニュースデータ
const newsItems = [
  {
    id: 1,
    title: 'Cotoriの紹介チラシを公開しました！',
    thumbnail: '/news/flyer.png',
    pdfUrl: '/news/LP2026_fodis.pdf',
    date: '2026.01.04'
  },
];

const NewsList = () => {
  return (
    <div className={styles.newsSection}>
      {/* Companyのタイトルスタイルと完全に一致させました */}
      <h2 className={styles.sectionTitle}>
        News
      </h2>

      <div className={styles.grid}>
        {newsItems.map((item) => (
          <a
            key={item.id}
            href={item.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.imageWrapper}>
              {item.thumbnail ? (
                <img src={item.thumbnail} alt={item.title} className={styles.image} />
              ) : (
                <div className={styles.noImage}>No Image</div>
              )}
            </div>
            <div className={styles.content}>
              <span className={styles.date}>{item.date}</span>
              <p className={styles.cardTitle}>{item.title}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsList;