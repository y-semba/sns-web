# Renderを使った本番環境セットアップ

## アーキテクチャ構成

```
┌─────────────────────────────────┐
│  デモ用サイト (GitHub Pages)     │
│  - フロントエンド直接接続        │
│  - APIキーは.envで管理          │
│  - サーバー不要                 │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  本番SNSアプリ (GitHub Pages)    │
│  - RenderのAPIに接続            │
│  - 認証付き                     │
│  - 本番データベース使用         │
└─────────────────────────────────┘
         ↓
┌─────────────────────────────────┐
│  Render (バックエンドAPI)        │
│  - server.jsをデプロイ          │
│  - Gemini/OpenAI APIキー管理    │
│  - Firebase接続                 │
│  - 本番データベース             │
└─────────────────────────────────┘
```

## Renderへのデプロイ手順

### 1. Renderでサービスを作成

1. [Render](https://render.com)にログイン
2. 「New +」→「Web Service」を選択
3. GitHubリポジトリを接続
4. 設定を入力：
   - **Name**: `cotori-api` (任意)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free または Paid

### 2. 環境変数を設定

Renderのダッシュボードで以下の環境変数を設定：

```
NODE_ENV=production
GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account",...}
# または
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
PORT=3002
```

### 3. RenderのURLを取得

デプロイ後、以下のようなURLが生成されます：
```
https://cotori-api.onrender.com
```

### 4. フロントエンドの設定

本番用のSNSアプリでは、`.env.production`または環境変数で設定：

```env
VITE_USE_BACKEND_API=true
VITE_API_BASE_URL=https://cotori-api.onrender.com
VITE_DEMO_MODE=false
```

## デモ用と本番用の分離

### デモ用サイト（現在のDemoSNS）

```env
# .env (デモ用)
VITE_USE_BACKEND_API=false
VITE_AI_PROVIDER=gemini
VITE_GEMINI_API_KEY=デモ用のAPIキー
VITE_DEMO_MODE=true
```

- フロントエンドから直接Gemini/OpenAIに接続
- サーバー不要
- 固定のhistoryを使用

### 本番用SNSアプリ

```env
# .env.production (本番用)
VITE_USE_BACKEND_API=true
VITE_API_BASE_URL=https://cotori-api.onrender.com
VITE_DEMO_MODE=false
```

- RenderのAPIに接続
- 認証付き（Firebase Auth等）
- 実際の会話履歴を使用
- 本番データベースに接続

## 注意事項

### Renderの無料プランの制限

- **スリープ**: 15分間リクエストがないとスリープする
- **起動時間**: スリープからの起動に30秒程度かかる
- **解決策**: 
  - Paidプランを使用
  - または、定期的にpingを送る（cron job等）

### CORS設定

`server.js`でCORSを設定：

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://your-demo-site.github.io',
    'https://your-production-site.github.io',
    'http://localhost:5173' // 開発用
  ],
  credentials: true
}));
```

### 環境変数の管理

- **Render**: バックエンドの環境変数（APIキー、Firebase認証情報等）
- **GitHub Pages**: フロントエンドの環境変数（RenderのURL等）
  - 注意: GitHub Pagesでは環境変数がビルド時に埋め込まれるため、機密情報は含めない

## デプロイフロー

### バックエンド（Render）

1. GitHubにpush
2. Renderが自動的にデプロイ
3. 環境変数はRenderのダッシュボードで管理

### フロントエンド（GitHub Pages）

1. `.env.production`を設定
2. `npm run build`
3. `dist`フォルダをGitHub Pagesにデプロイ

