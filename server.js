import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// 環境変数の読み込み
dotenv.config();

// ES Modules環境で __dirname を使うための定型文
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Reactのビルド済みファイル(distフォルダ)を静的に配信する設定
const currentDir = process.cwd();
app.use(express.static(path.join(__dirname, 'dist')));

// APIエンドポイント
app.post('/api/check-message', async (req, res) => {
  try {
    const { text, history } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

    // プロンプトの生成
    const recentHistory = (history || []).slice(-10);
    const formattedHistory = recentHistory.map(msg => `${msg.sender}: ${msg.text}`).join('\n');

    const prompt = `
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

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // JSON抽出ロジック
    const match = responseText.match(/```json\n([\s\S]*?)\n```/);
    const jsonString = match ? match[1] : responseText;
    const jsonResponse = JSON.parse(jsonString.trim());

    res.json(jsonResponse);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});


app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});