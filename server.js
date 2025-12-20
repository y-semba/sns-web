const express = require('express');
const cors = require('cors');
const path = require('path'); // 追加
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ★ここ重要: Reactのビルド済みファイル(distフォルダ)を静的に配信する設定
app.use(express.static(path.join(__dirname, 'dist')));

// APIエンドポイント
app.post('/api/check-message', async (req, res) => {
  try {
    const { text, history } = req.body;
    const apiKey = process.env.VITE_GEMINI_API_KEY; // サーバー側の環境変数を使用

    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // ★ここも修正: 正しいモデル名 'gemini-1.5-flash' にする
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

    // ... (プロンプト生成やgenerateContentの処理は既存のまま) ...
    // ここに既存のロジックが入ります

    // 仮のレスポンス例（実際はGeminiの結果を返す）
    // const result = await model.generateContent(prompt);
    // const response = result.response.text();
    // res.json(JSON.parse(extractJson(response))); 

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ★ここ重要: API以外のあらゆるアクセスに対してReactのindex.htmlを返す
// これがないと、画面をリロードした時に「Not Found」になります
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});