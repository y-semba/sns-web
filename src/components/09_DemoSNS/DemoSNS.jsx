import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import styles from './DemoSNS.module.css';

const DemoSNS = () => {
  const [postText, setPostText] = useState('');
  const [aiCheckResult, setAiCheckResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [posts, setPosts] = useState([]);

  // AI設定（環境変数から取得）
  // デモ用: フロントエンドから直接AI APIに接続（USE_BACKEND_API=false）
  // 本番用: バックエンドAPI経由で接続（USE_BACKEND_API=true、認証付き）
  const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'gemini'; // 'gemini' or 'openai'
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
  const USE_BACKEND_API = import.meta.env.VITE_USE_BACKEND_API === 'true';

  // デモモードかどうか（デモ用の場合は固定history、本番用は実際の会話履歴を使用）
  const IS_DEMO_MODE = import.meta.env.VITE_DEMO_MODE !== 'true'; // デフォルトはtrue

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

  // JSONを抽出する関数（server.jsと同じ）
  const extractJson = (text) => {
    const match = text.match(/```json\n([\s\S]*?)\n```/);
    const jsonString = match ? match[1] : text;
    return JSON.parse(jsonString.trim());
  };

  // Gemini APIを呼び出す
  const callGemini = async (prompt) => {
    if (!GEMINI_API_KEY || GEMINI_API_KEY.trim() === '') {
      throw new Error('GEMINI_API_KEYが設定されていません。.envファイルにVITE_GEMINI_API_KEYを設定してください。');
    }

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY.trim());
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      return extractJson(responseText);
    } catch (error) {
      // クォータ制限エラーの場合、分かりやすいメッセージに変換
      const errorMsg = error.message || String(error);
      if (errorMsg.includes('429') || errorMsg.includes('quota') || errorMsg.includes('Quota exceeded')) {
        throw new Error('Gemini APIの利用制限に達しました。無料プランの制限に達している可能性があります。しばらく待ってから再度お試しください。または、OpenAI APIに切り替えることもできます。');
      }
      throw error;
    }
  };

  // OpenAI APIを呼び出す
  const callOpenAI = async (prompt) => {
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEYが設定されていません。.envファイルにVITE_OPENAI_API_KEYを設定してください。');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'OpenAI API呼び出しに失敗しました');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    return extractJson(content);
  };

  // server.jsと同じプロンプトを生成
  const generatePrompt = (text, history) => {
    const recentHistory = (history || []).slice(-10);
    const formattedHistory = recentHistory.map(msg => `${msg.sender}: ${msg.text}`).join('\n');

    return `
      あなたは小中学生が利用する教育用SNSの厳格な見守りAIです。
      生徒の「今回の発言」を、以下の【判定フロー】に従って厳密に審査してください。

      ## 【判定フロー】(この順番で思考してください)

      ### ステップ1: 不適切な表現の「絶対的」チェック (文脈無視)
      **文脈や過去の会話の流れは一切無視してください。**
      発言単体を見て、以下の要素が少しでも含まれる、または連想される場合は、即座に **isAggressive: true** と判定してください。
      過去の会話で同様の言葉が使われていたとしても、**今回の発言に含まれていればNG**です。

      * **性的な表現 (隠語・伏字・当て字を含む完全禁止)**
          * 直接的: 陰茎、睾丸、乳房、性交、精子、など医学的名称であっても文脈が理科の授業でなければNG。
          * 隠語・ネットスラング: ホ別、羽目鳥、4545、0721、抜き、セフレ、パパ活、など。
          * 伏字: ち〇こ、ま〇こ、など。
      * **攻撃的・暴力的・差別的な言葉**
          * 死ね、殺す、ガイジ、ゴミ、カス、うざい、キモい、消えろ。
      * **犯罪・非行の示唆**
          * 万引き、窃盗、直結（出会い目的）、違法行為の自慢。
        **残虐**
          * ISISのような残虐表現

      ### ステップ2: 文脈的な攻撃性・いじめのチェック (最重要)
      ステップ1がクリアな場合、**直前の会話の流れ（直近3〜5件）**を見て判定してください。
      言葉自体が丁寧でも、意味合いとして攻撃的、または**「攻撃的と受け取られるリスクがある」**場合はNGです。
      **「わかる」「それな」「たしかに」「いやわかる」などの同意語自体は禁止ではありません。**
      **「疑わしきはNG（ブロック）」の原則で厳しく判断してください。**
      **「可能性がある」段階で、生徒を守るためにブロックする必要があります。**

      * **同意の対象が曖昧な場合 (厳格に禁止)**
          * 直近の会話に「自虐」や「悪口」が含まれている場合、その後に「たこ焼きおいしい」などの無関係な話題が挟まっていたとしても、「それな」「わかる」などの同意語は**NG**としてください。
          * **理由**: 自虐や悪口に対する同意なのか、直前の話題への同意なのかが曖昧になり、結果として自虐・悪口を肯定しているように見え、相手を傷つける可能性があるため。
          * **例 (NG)**:
              1. A: 俺ブスじゃね？ (自虐)
              2. B: たこ焼きおいしい (無関係)
              3. C: それな (NG！ Aへの同意とも取れるため)

      * **悪口や攻撃への同調・加担**
          * 誰かが「うざい」「きもい」と言った後の「それな」「わかる」「草」などの同意。
      * **自虐やネガティブな発言への肯定**
          * 「俺ブスじゃね？」「私バカだから」への「たしかに」「いやわかる」「ドンマイ（笑）」などの肯定。

      * **冷淡な突き放し・無視**
          * 真剣な相談に対して「知らんがな」「で？」「勝手にすれば」などの冷たい反応。


      ### ステップ3: 文脈との関連性チェック (ステップ1, 2がクリアな場合のみ)
      ステップ1で問題がなかった場合のみ、会話の流れに沿っているか判断してください。

      ---

      ## フィードバック生成のルール
      * **isAggressive: true の場合**:
          * **aggressiveFeedback**: なぜその言葉がいけないのか、小学生にも分かるように優しく、しかし毅然と諭してください。「相手がどう思うか」「公共の場であること」を理由に挙げてください。文脈に関する言及は一切しないでください。
          * **contextFeedback**: 空文字列 ("") にしてください。
          * **contextMatchScore**: 強制的に 0 にしてください。
      
      * **isAggressive: false の場合**:
          * **aggressiveFeedback**: 空文字列 ("")。
          * **contextFeedback**: 会話の流れに沿っているか、誤解を招かないかのアドバイスがあれば記述。問題なければ空文字列。
          * **contextMatchScore**: 0〜100で採点。

      ---

      ## 入力データ
      [これまでの会話]
      ${formattedHistory || "なし"}

      [今回の発言]
      ${text}

      ---

      ## 出力フォーマット (JSONのみ)
      \`\`\`json
      {
        "isAggressive": boolean,
        "aggressiveFeedback": "指導コメント(NGの場合のみ)",
        "contextMatchScore": number,
        "contextFeedback": "文脈アドバイス(OKの場合のみ)"
      }
      \`\`\`
    `;
  };

  // AIチェック機能
  const performAICheck = async (text) => {
    setIsChecking(true);
    setAiCheckResult(null);

    try {
      let aiResponse;

      // バックエンドAPIを使用する場合
      if (USE_BACKEND_API) {
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
          throw new Error('AIチェックに失敗しました');
        }

        const data = await response.json();
        aiResponse = data;
      } else {
        // フロントエンドから直接AIを呼び出す
        // APIキーが設定されていない場合はエラー
        if (AI_PROVIDER === 'openai') {
          if (!OPENAI_API_KEY || OPENAI_API_KEY.trim() === '') {
            throw new Error('OpenAI APIキーが設定されていません。.envファイルにVITE_OPENAI_API_KEYを設定するか、バックエンドAPIを使用してください（VITE_USE_BACKEND_API=true）。');
          }
          const prompt = generatePrompt(text, fixedHistory);
          aiResponse = await callOpenAI(prompt);
        } else {
          // デフォルトはGemini
          if (!GEMINI_API_KEY || GEMINI_API_KEY.trim() === '') {
            throw new Error('Gemini APIキーが設定されていません。.envファイルにVITE_GEMINI_API_KEYを設定するか、バックエンドAPIを使用してください（VITE_USE_BACKEND_API=true）。');
          }
          const prompt = generatePrompt(text, fixedHistory);
          aiResponse = await callGemini(prompt);
        }

        // server.jsと同じ形式に変換
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

        aiResponse = {
          isOk,
          feedbackLines,
          temperature: aiResponse.contextMatchScore || 0
        };
      }

      // レスポンス形式: { isOk, feedbackLines, temperature }
      const result = {
        isOk: aiResponse.isOk,
        feedbackLines: aiResponse.feedbackLines || [],
        temperature: aiResponse.temperature || 0,
        level: aiResponse.isOk ? 'safe' : 'danger'
      };

      setAiCheckResult(result);
    } catch (error) {
      console.error('AIチェックエラー:', error);

      // エラーメッセージを分かりやすく変換
      let errorMessage = error.message || 'AIチェック中にエラーが発生しました。';

      // クォータ制限エラー（429）の場合、より詳しい情報を表示
      const errorMsgLower = errorMessage.toLowerCase();
      if (errorMsgLower.includes('利用制限') || errorMsgLower.includes('quota') || errorMsgLower.includes('429') || errorMsgLower.includes('exceeded')) {
        errorMessage = '⚠️ APIの利用制限に達しました\n\n' +
          '【対処方法】\n' +
          '1. しばらく待ってから再度お試しください（数分〜数時間）\n' +
          '2. OpenAI APIに切り替える（.envでVITE_AI_PROVIDER=openaiに設定）\n' +
          '3. 別のAPIキーを使用する\n' +
          '4. バックエンドAPIを使用する（VITE_USE_BACKEND_API=trueに設定）\n\n' +
          '※ このエラーは、APIキーの1日の利用制限に達した場合に表示されます。';
      }

      // APIキーが設定されていない場合のエラー
      if (errorMessage.includes('APIキーが設定されていません')) {
        errorMessage = '⚠️ APIキーが設定されていません\n\n' +
          '【対処方法】\n' +
          '1. .envファイルにAPIキーを設定する\n' +
          '   - Gemini: VITE_GEMINI_API_KEY=あなたのAPIキー\n' +
          '   - OpenAI: VITE_OPENAI_API_KEY=あなたのAPIキー\n' +
          '2. バックエンドAPIを使用する（VITE_USE_BACKEND_API=trueに設定）\n' +
          '3. 開発サーバーを再起動する（環境変数の変更を反映するため）';
      }

      setAiCheckResult({
        isOk: false,
        feedbackLines: [errorMessage],
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

  // 送信ボタンの有効/無効を判定（isOkがtrueの場合のみ送信可能）
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

