# AI動作セットアップガイド

## 方法1: フロントエンドから直接接続（推奨・サーバー不要）

### 手順

1. **`.env`ファイルを作成**
   ```
   VITE_AI_PROVIDER=gemini
   VITE_GEMINI_API_KEY=あなたのAPIキー
   VITE_USE_BACKEND_API=false
   VITE_DEMO_MODE=true
   ```

2. **開発サーバーを起動**
   ```bash
   npm run dev
   ```

3. **ブラウザでアクセス**
   - 通常は `http://localhost:5173` で起動します
   - 「AIチェック」ボタンをクリックして動作確認

**メリット:**
- サーバー不要で簡単
- すぐに試せる
- デモ用に最適

---

## 方法2: バックエンドAPI経由（サーバー起動が必要）

### 手順

1. **バックエンドサーバー（server.js）を起動**
   ```bash
   # 別のターミナルで
   cd C:\Users\yuki_\Downloads\sns-for-edu\my-api-server
   node server.js
   ```

2. **`.env`ファイルを設定**
   ```
   VITE_USE_BACKEND_API=true
   VITE_API_BASE_URL=http://localhost:3002
   ```

3. **フロントエンドの開発サーバーを起動**
   ```bash
   npm run dev
   ```

**メリット:**
- APIキーをサーバー側で管理（セキュア）
- 本番環境と同じ構成
- レート制限やログ取得が可能

---

## トラブルシューティング

### APIキーが設定されていないエラーが出る場合
- `.env`ファイルが正しく作成されているか確認
- 開発サーバーを再起動（環境変数の変更を反映するため）

### CORSエラーが出る場合
- バックエンドサーバーでCORSが有効になっているか確認
- `server.js`で`app.use(cors())`が設定されているか確認

