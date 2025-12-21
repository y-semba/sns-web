# OpenAI APIキーの取得方法

## 手順

### 1. OpenAIアカウントを作成/ログイン

1. [OpenAI Platform](https://platform.openai.com/) にアクセス
2. 「Sign up」または「Log in」をクリック
3. Googleアカウント、Microsoftアカウント、またはメールアドレスでログイン

### 2. APIキーを作成

1. ログイン後、右上のプロフィールアイコンをクリック
2. 「API keys」を選択
3. 「Create new secret key」をクリック
4. キーに名前を付ける（例：`cotori-demo`）
5. 「Create secret key」をクリック
6. **重要**: 表示されたAPIキーをコピー（この画面を閉じると二度と表示されません）

### 3. クレジットを追加（必要に応じて）

無料プランには制限があるため、使用量に応じてクレジットを追加する必要がある場合があります：

1. 右上のプロフィールアイコン → 「Billing」
2. 「Add payment method」をクリック
3. クレジットカード情報を入力
4. 使用量に応じて自動的に課金されます

### 4. .envファイルに設定

プロジェクトのルートディレクトリの`.env`ファイルに以下を追加：

```env
VITE_AI_PROVIDER=openai
VITE_OPENAI_API_KEY=sk-あなたのAPIキーをここに貼り付け
VITE_USE_BACKEND_API=false
VITE_DEMO_MODE=true
```

### 5. 開発サーバーを再起動

環境変数の変更を反映するため、開発サーバーを再起動：

```bash
# 開発サーバーを停止（Ctrl+C）
# 再度起動
npm run dev
```

## 料金について

### 無料クレジット

- 新規アカウントには通常、$5の無料クレジットが付与されます
- 無料クレジットは3ヶ月間有効

### 使用料金（gpt-4o-miniの場合）

- **入力**: $0.15 / 1M tokens
- **出力**: $0.60 / 1M tokens

例：1回のAIチェックで約500 tokens使用する場合
- 1回あたり: 約 $0.0003（約0.04円）
- 1000回: 約 $0.3（約40円）

### 使用量の確認

1. [OpenAI Platform](https://platform.openai.com/) にログイン
2. 「Usage」をクリック
3. 使用量と残高を確認

## セキュリティ注意事項

⚠️ **重要**: APIキーは絶対に公開しないでください

- `.env`ファイルは`.gitignore`に追加済み（Gitにコミットされません）
- GitHub等に公開する場合は、APIキーを含めないでください
- APIキーが漏洩した場合は、すぐに削除して新しいキーを作成してください

## トラブルシューティング

### APIキーが認識されない

1. `.env`ファイルがプロジェクトのルートにあるか確認
2. 開発サーバーを再起動
3. APIキーの前後に余分なスペースがないか確認

### エラー: "Incorrect API key provided"

- APIキーが正しくコピーされているか確認
- `sk-`で始まる完全なキーをコピーしているか確認

### エラー: "You exceeded your current quota"

- アカウントの残高を確認
- 必要に応じてクレジットを追加


