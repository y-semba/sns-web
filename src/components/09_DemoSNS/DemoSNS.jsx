import React, { useState, useEffect } from 'react';
import styles from './DemoSNS.module.css';

// ▼▼▼ Firebase SDKのインポート ▼▼▼
import { initializeApp } from "firebase/app";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai";

// ▼▼▼ Firebase設定 (先ほどの「新しいアプリ」のコードを入れてください) ▼▼▼
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// アプリとVertex AIの初期化
const app = initializeApp(firebaseConfig);
const vertexAI = getVertexAI(app);

// モデル定義 (Vertex AIなので gemini-2.0-flash でOK)
const model = getGenerativeModel(vertexAI, { model: "gemini-2.0-flash" });

const DemoSNS = () => {
  const [postText, setPostText] = useState('');
  const [aiCheckResult, setAiCheckResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [posts, setPosts] = useState([]);
  const [history, setHistory] = useState([]);

  // 利用回数制限
  const [checkCount, setCheckCount] = useState(0);
  const MAX_DAILY_CHECKS = 5;

  // 太郎君のメッセージパターン
  const taroMessages = [
    '今日の数学のテスト、範囲どこだっけ？',
    '来週の修学旅行、班分けもう決まった？',
    '部活の集合時間、30分早まったらしいよ。',
    '宿題のプリントなくしちゃった…誰か見せてくれない？',
    '駅前にできた新しいカフェ、放課後行ってみない？',
    '昨日のドラマ見た？犯人まさかあの人だと思わなかった！'
  ];

  // 初期化処理
  useEffect(() => {
    const randomMessage = taroMessages[Math.floor(Math.random() * taroMessages.length)];
    const initialHistory = [{ sender: '太郎', text: randomMessage }];
    setHistory(initialHistory);

    const initialPosts = [{
      id: 1, author: '太郎', authorIcon: '👦', text: randomMessage,
      timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      aiCheck: { isOk: true, temperature: 95 }
    }];
    setPosts(initialPosts);

    // 利用回数確認
    const today = new Date().toLocaleDateString();
    const storedData = localStorage.getItem('cotori_demo_usage');
    if (storedData) {
      const { date, count } = JSON.parse(storedData);
      if (date === today) setCheckCount(count);
      else {
        localStorage.setItem('cotori_demo_usage', JSON.stringify({ date: today, count: 0 }));
        setCheckCount(0);
      }
    }
  }, []);

  const performAICheck = async (text) => {
    // 1. 制限チェック
    if (checkCount >= MAX_DAILY_CHECKS) {
      alert(`体験版の利用回数制限（1日${MAX_DAILY_CHECKS}回）に達しました。\n興味を持っていただきありがとうございます！続きはぜひお問い合わせください。`);
      return;
    }

    setIsChecking(true);
    setAiCheckResult(null);

    try {
      // 2. 履歴の整形
      const recentHistory = (history || []).slice(-10);
      const formattedHistory = recentHistory.map(msg => `${msg.sender}: ${msg.text}`).join('\n');

      // ▼▼▼ 3. プロンプト (api/check-message.js から移植した優秀なプロンプト) ▼▼▼
      const prompt = `
      あなたは小中学生が利用する教育用SNSの厳格な見守りAIです。
      生徒の「今回の発言」を、以下の【判定フロー】に従って厳密に審査してください。

      ## 【判定フロー】(この順番で思考してください)

      ### ステップ1: 不適切な表現の「絶対的」チェック (文脈無視)
      **文脈や過去の会話の流れは一切無視してください。**
      発言単体を見て、以下の要素が少しでも含まれる、または連想される場合は、即座に **isAggressive: true** と判定してください。
      過去の会話で同様の言葉が使われていたとしても、**今回の発言に含まれていればNG**です。

      * **性的な表現 (隠語・伏字・当て字を含む完全禁止)**
      * **攻撃的・暴力的・差別的な言葉** (死ね、殺す、ガイジ、ゴミ、カス、うざい、キモい、消えろ等)
      * **犯罪・非行の示唆**
      * **残虐な表現**

      ### ステップ2: 文脈的な攻撃性・いじめのチェック (最重要)
      ステップ1がクリアな場合、**直前の会話の流れ**を見て判定してください。
      言葉自体が丁寧でも、意味合いとして攻撃的、または**「攻撃的と受け取られるリスクがある」**場合はNGです。
      **「疑わしきはNG（ブロック）」の原則で厳しく判断してください。**

      * **同意の対象が曖昧な場合 (厳格に禁止)**
          * 直近の会話に「自虐」や「悪口」が含まれている場合、その後に無関係な話題が挟まっていたとしても、「それな」「わかる」などの同意語は**NG**としてください。
      * **悪口や攻撃への同調・加担**
      * **自虐やネガティブな発言への肯定**
      * **冷淡な突き放し・無視**

      ---

      ## フィードバック生成のルール
      * **isAggressive: true の場合**:
          * **aggressiveFeedback**: なぜその言葉がいけないのか、小学生にも分かるように優しく、しかし毅然と諭してください。「相手がどう思うか」を理由に挙げてください。
          * **contextMatchScore**: 0
      
      * **isAggressive: false の場合**:
          * **aggressiveFeedback**: 空文字列 ("")
          * **contextMatchScore**: 0〜100で採点

      ---

      ## 入力データ
      [これまでの会話]
      ${formattedHistory || "なし"}

      [今回の発言]
      ${text}

      ---

      ## 出力フォーマット (JSONのみ)
      回答は必ず以下のJSON形式のみで返してください。余計な文字（Markdownなど）は含めないでください。
      {
        "isAggressive": boolean,
        "aggressiveFeedback": "指導コメント(NGの場合のみ)",
        "contextMatchScore": number,
        "contextFeedback": "文脈アドバイス(OKの場合のみ)"
      }
      `;

      // 4. Vertex AIへ送信
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const textResponse = response.text();

      // JSON整形
      const cleanedText = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      const aiResponse = JSON.parse(cleanedText);

      // 5. カウントアップ & 保存
      const newCount = checkCount + 1;
      setCheckCount(newCount);
      const today = new Date().toLocaleDateString();
      localStorage.setItem('cotori_demo_usage', JSON.stringify({ date: today, count: newCount }));

      // 6. 結果セット
      let isOk = !aiResponse.isAggressive;
      const feedbackLines = [];

      if (aiResponse.isAggressive) {
        if (aiResponse.aggressiveFeedback) feedbackLines.push(`⚠️ ${aiResponse.aggressiveFeedback}`);
        else feedbackLines.push(`⚠️ 相手を傷つける可能性のある言葉が含まれています。`);
      } else {
        if (aiResponse.contextFeedback) feedbackLines.push(`🤔 ${aiResponse.contextFeedback}`);
      }

      setAiCheckResult({
        isOk,
        feedbackLines,
        temperature: aiResponse.contextMatchScore || 0,
        level: isOk ? 'safe' : 'danger'
      });

    } catch (error) {
      console.error('AIチェックエラー:', error);
      let errorMessage = 'エラーが発生しました。通信環境をご確認ください。';
      if (error.message.includes('429') || error.message.includes('Quota')) {
        errorMessage = '現在アクセスが集中しています。しばらく時間を空けてお試しください。';
      }
      setAiCheckResult({
        isOk: false,
        feedbackLines: [`⚠️ ${errorMessage}`],
        level: 'danger',
        error: true
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleCheck = () => {
    if (!postText.trim()) { alert('投稿内容を入力してください'); return; }
    performAICheck(postText);
  };

  const handlePost = () => {
    if (!postText.trim()) { alert('投稿内容を入力してください'); return; }
    if (!aiCheckResult) { alert('まずAIチェックを実行してください'); return; }
    if (!aiCheckResult.isOk) { alert('AIチェックで問題が検出されました。内容を見直してください。'); return; }

    const newPost = {
      id: Date.now(),
      author: 'あなた',
      authorIcon: '👤',
      text: postText,
      timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
      aiCheck: aiCheckResult
    };
    setPosts([...posts, newPost]);
    setPostText('');
    setAiCheckResult(null);
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const getLevelClass = (level) => {
    switch (level) {
      case 'danger': return styles.danger;
      case 'warning': return styles.warning;
      case 'info': return styles.info;
      default: return styles.safe;
    }
  };
  const canPost = aiCheckResult && aiCheckResult.isOk && !isChecking;

  return (
    <section className={`${styles.demoSNS} sectionContainer`}>
      <div className={styles.container}>
        <h2 className={styles.title}>Cotori体験版</h2>
        <p className={styles.subtitle}>
          AIチェック機能を体験してみましょう。（1日{MAX_DAILY_CHECKS}回まで）<br />
          <small style={{ color: '#666', fontSize: '0.9em' }}>
            本日の残りチェック回数: <b>{Math.max(0, MAX_DAILY_CHECKS - checkCount)}</b> 回
          </small>
        </p>
        <div className={styles.snsContainer}>
          <div className={styles.dateHeader}>{getCurrentDate()}</div>
          <div className={styles.feed}>
            {posts.length === 0 ? (
              <div className={styles.emptyState}><p>読み込み中...</p></div>
            ) : (
              <div className={styles.postsList}>
                {posts.map((post) => (
                  <div key={post.id} className={styles.postCard}>
                    <div className={styles.postHeader}>
                      <div className={styles.postAuthor}><span className={styles.avatar}>{post.authorIcon}</span><span className={styles.authorName}>{post.author}</span></div>
                      <span className={styles.postTime}>{post.timestamp}</span>
                    </div>
                    <div className={styles.postContent}>{post.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {aiCheckResult && (
            <div className={`${styles.aiResult} ${getLevelClass(aiCheckResult.level)}`}>
              <div className={styles.resultHeader}>
                <h3>🤖 AIチェック結果</h3>
                {aiCheckResult.temperature !== undefined && <div className={styles.score}><span className={styles.scoreValue}>{aiCheckResult.temperature}</span></div>}
              </div>
              <div className={styles.feedback}>
                {aiCheckResult.feedbackLines?.map((line, index) => <p key={index}>{line}</p>)}
              </div>
            </div>
          )}
          <div className={styles.inputArea}>
            <textarea
              className={styles.textarea}
              placeholder="メッセージを入力して送信"
              value={postText}
              onChange={(e) => { setPostText(e.target.value); setAiCheckResult(null); }}
              maxLength={500}
            />
            <div className={styles.buttonGroup}>
              <button className={`${styles.button} ${styles.checkButton}`} onClick={handleCheck} disabled={isChecking || !postText.trim()}>
                {isChecking ? <><span className={styles.spinner}></span>チェック中...</> : 'AIチェック'}
              </button>
              <button className={`${styles.button} ${styles.postButton}`} onClick={handlePost} disabled={!canPost}>送信</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSNS;