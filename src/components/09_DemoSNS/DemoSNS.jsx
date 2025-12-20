import React, { useState, useEffect } from 'react';
import styles from './DemoSNS.module.css'; // GoogleGenerativeAIのインポートは不要になりました

const DemoSNS = () => {
  const [postText, setPostText] = useState('');
  const [aiCheckResult, setAiCheckResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [posts, setPosts] = useState([]);

  // APIのURL（環境変数がなければ相対パスを使用）
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

  // 固定のhistory（太郎君の投稿のみ）
  const fixedHistory = [
    {
      sender: '太郎',
      text: '今日の数学のテスト、範囲どこだっけ？'
    }
  ];

  // 初期投稿データ
  useEffect(() => {
    const initialPosts = [
      {
        id: 1,
        author: '太郎',
        authorIcon: '👦',
        text: '今日の数学のテスト、範囲どこだっけ？',
        timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        aiCheck: { isOk: true, temperature: 95 }
      }
    ];
    setPosts(initialPosts);
  }, []);

  // AIチェック機能（バックエンド呼び出しのみ）
  const performAICheck = async (text) => {
    setIsChecking(true);
    setAiCheckResult(null);

    try {
      // サーバーのAPIエンドポイントを呼び出す
      const response = await fetch(`${API_BASE_URL}/api/check-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          history: fixedHistory
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'AIチェックに失敗しました');
      }

      const aiResponse = await response.json();

      // UI表示用にデータを整形
      let isOk = !aiResponse.isAggressive;
      const feedbackLines = [];

      if (aiResponse.isAggressive) {
        if (aiResponse.aggressiveFeedback) {
          feedbackLines.push(`⚠️ ${aiResponse.aggressiveFeedback}`);
        } else {
          feedbackLines.push(`⚠️ 相手を傷つける可能性のある言葉が含まれています。`);
        }
      } else {
        if (aiResponse.contextFeedback) {
          feedbackLines.push(`🤔 ${aiResponse.contextFeedback}`);
        }
      }

      const result = {
        isOk,
        feedbackLines,
        temperature: aiResponse.contextMatchScore || 0,
        level: isOk ? 'safe' : 'danger'
      };

      setAiCheckResult(result);
    } catch (error) {
      console.error('AIチェックエラー:', error);
      setAiCheckResult({
        isOk: false,
        feedbackLines: [`⚠️ エラーが発生しました: ${error.message}`],
        temperature: 0,
        level: 'danger',
        error: true
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleCheck = () => {
    if (!postText.trim()) {
      alert('投稿内容を入力してください');
      return;
    }
    performAICheck(postText);
  };

  const handlePost = () => {
    if (!postText.trim()) {
      alert('投稿内容を入力してください');
      return;
    }

    if (!aiCheckResult) {
      alert('まずAIチェックを実行してください');
      return;
    }

    // isOkがfalseの場合は投稿をブロック
    if (!aiCheckResult.isOk) {
      alert('AIチェックで問題が検出されました。内容を見直してください。');
      return;
    }

    const newPost = {
      id: Date.now(),
      author: 'あなた',
      authorIcon: '👤',
      text: postText,
      timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      aiCheck: {
        isOk: aiCheckResult.isOk,
        temperature: aiCheckResult.temperature
      }
    };

    setPosts([newPost, ...posts]);
    setPostText('');
    setAiCheckResult(null);
  };

  // 現在の日付を取得
  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const getLevelClass = (level) => {
    switch (level) {
      case 'danger':
        return styles.danger;
      case 'warning':
        return styles.warning;
      case 'info':
        return styles.info;
      default:
        return styles.safe;
    }
  };

  // 送信ボタンの有効/無効を判定
  const canPost = aiCheckResult && aiCheckResult.isOk && !isChecking;

  return (
    <section className={`${styles.demoSNS} sectionContainer`}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Cotori体験版
        </h2>
        <p className={styles.subtitle}>
          AIチェック機能を体験してみましょう。投稿前に、AIがあなたの言葉をチェックします。
        </p>

        {/* SNS風のメインコンテナ */}
        <div className={styles.snsContainer}>
          {/* 日付表示 */}
          <div className={styles.dateHeader}>
            {getCurrentDate()}
          </div>

          {/* 投稿フィード */}
          <div className={styles.feed}>
            {posts.length === 0 ? (
              <div className={styles.emptyState}>
                <p>まだ投稿がありません。</p>
              </div>
            ) : (
              <div className={styles.postsList}>
                {posts.map((post) => (
                  <div key={post.id} className={styles.postCard}>
                    <div className={styles.postHeader}>
                      <div className={styles.postAuthor}>
                        <span className={styles.avatar}>{post.authorIcon}</span>
                        <span className={styles.authorName}>{post.author}</span>
                      </div>
                      <span className={styles.postTime}>{post.timestamp}</span>
                    </div>
                    <div className={styles.postContent}>
                      {post.text}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AIチェック結果（投稿フィードの下） */}
          {aiCheckResult && (
            <div className={`${styles.aiResult} ${getLevelClass(aiCheckResult.level)}`}>
              <div className={styles.resultHeader}>
                <h3>🤖 AIチェック結果</h3>
                {aiCheckResult.temperature !== undefined && (
                  <div className={styles.score}>
                    <span className={styles.scoreValue}>{aiCheckResult.temperature}</span>
                  </div>
                )}
              </div>
              <div className={styles.feedback}>
                {aiCheckResult.feedbackLines && aiCheckResult.feedbackLines.length > 0 ? (
                  aiCheckResult.feedbackLines.map((line, index) => (
                    <p key={index} style={{ whiteSpace: 'pre-line' }}>{line}</p>
                  ))
                ) : (
                  <p>{aiCheckResult.isOk ? '✅ 問題ありません。このまま投稿できます。' : '⚠️ 問題が検出されました。'}</p>
                )}
              </div>
            </div>
          )}

          {/* 入力エリア（下部固定） */}
          <div className={styles.inputArea}>
            <textarea
              className={styles.textarea}
              placeholder="メッセージを入力して送信"
              value={postText}
              onChange={(e) => {
                setPostText(e.target.value);
                setAiCheckResult(null);
              }}
              maxLength={500}
            />
            <div className={styles.buttonGroup}>
              <button
                className={`${styles.button} ${styles.checkButton}`}
                onClick={handleCheck}
                disabled={isChecking || !postText.trim()}
              >
                {isChecking ? (
                  <>
                    <span className={styles.spinner}></span>
                    チェック中...
                  </>
                ) : (
                  'AIチェック'
                )}
              </button>
              <button
                className={`${styles.button} ${styles.postButton}`}
                onClick={handlePost}
                disabled={!canPost}
              >
                送信
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSNS;