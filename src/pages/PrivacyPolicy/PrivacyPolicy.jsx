// PrivacyPolicy.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  // コンテナのスタイル
  const containerStyle = {
    padding: '40px 20px',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.8',
    color: '#333',
    fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif'
  };

  // 見出しのスタイル
  const headingStyle = {
    marginTop: '40px',
    marginBottom: '20px',
    fontSize: '1.2rem',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>プライバシーポリシー</h1>

      <p>
        株式会社FODIS（以下、「当社」といいます。）は、当社が運営するWebサイト（以下、「当サイト」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
      </p>

      <h3 style={headingStyle}>第1条（個人情報の定義）</h3>
      <p>
        「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報（個人識別情報）を指します。
      </p>

      <h3 style={headingStyle}>第2条（個人情報の収集方法）</h3>
      <p>当社は、ユーザーが当サイトを利用する際に、以下の情報を取得することがあります。</p>
      <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
        <li style={{ marginBottom: '10px' }}>
          <strong>お問い合わせフォーム等から送信される情報</strong><br />
          氏名、メールアドレス、お問い合わせ内容など
        </li>
        <li>
          <strong>自動的に収集される情報</strong><br />
          Cookie（クッキー）、アクセスログ（IPアドレス、閲覧日時、閲覧環境など）
        </li>
      </ul>

      <h3 style={headingStyle}>第3条（個人情報の利用目的）</h3>
      <p>当社が個人情報を収集・利用する目的は、以下のとおりです。</p>
      <ol style={{ paddingLeft: '20px', marginTop: '10px' }}>
        <li>お問い合わせへの対応および連絡のため</li>
        <li>当サイトの利用状況の分析および改善のため</li>
        <li>不正・不当な目的で当サイトを利用しようとするユーザーの特定をし、ご利用をお断りするため</li>
        <li>上記の利用目的に付随する目的</li>
      </ol>

      <h3 style={headingStyle}>第4条（個人情報の第三者提供）</h3>
      <p>
        当社は、法令で認められる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。
      </p>

      <h3 style={headingStyle}>第5条（アクセス解析ツールについて）</h3>
      <p>
        当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を利用しています。<br />
        このGoogle Analyticsはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。<br />
        この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
      </p>

      <h3 style={headingStyle}>第6条（プライバシーポリシーの変更）</h3>
      <p>
        本ポリシーの内容は、ユーザーに通知することなく変更することができるものとします。
        当社が別途定める場合を除いて、変更後のプライバシーポリシーは、当サイトに掲載したときから効力を生じるものとします。
      </p>

      <p style={{ marginTop: '40px', textAlign: 'right', color: '#666' }}>
        2025年12月23日 制定
      </p>

      {/* ホームに戻るボタン */}
      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <Link to="/">
          <button style={{
            padding: '12px 30px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '5px'
          }}>
            ホームに戻る
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;