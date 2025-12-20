# トラブルシューティング

## 429エラー（クォータ制限）が「何も使ってない」のに発生する場合

### 原因
- APIキーの1日の利用制限に達している
- ブラウザのキャッシュに以前のリクエストが残っている
- 開発サーバーのホットリロード時に何かが実行されている

### 対処方法

#### 1. 一時的にAPIキーを無効化（デモ用の場合）

`.env`ファイルでAPIキーをコメントアウトまたは削除：

```env
# VITE_GEMINI_API_KEY=AIzaSyC1ikCcgyEmdPzLERu8-9BeVeocvgsqYyQ
VITE_USE_BACKEND_API=false
```

これで、APIキーが設定されていない場合はエラーメッセージが表示されますが、429エラーは出なくなります。

#### 2. バックエンドAPIを使用する

`.env`ファイルを以下のように設定：

```env
VITE_USE_BACKEND_API=true
VITE_API_BASE_URL=http://localhost:3002
# または Render のURL
# VITE_API_BASE_URL=https://your-api.onrender.com
```

これで、フロントエンドから直接Gemini APIを呼ばなくなります。

#### 3. ブラウザのキャッシュをクリア

1. ブラウザの開発者ツールを開く（F12）
2. Networkタブを開く
3. 「Disable cache」にチェックを入れる
4. ページをリロード（Ctrl+Shift+R または Cmd+Shift+R）

#### 4. 開発サーバーを再起動

```bash
# 開発サーバーを停止（Ctrl+C）
# 再度起動
npm run dev
```

#### 5. 別のAPIキーを使用する

新しいGemini APIキーを取得：
1. https://aistudio.google.com/app/apikey にアクセス
2. 新しいAPIキーを作成
3. `.env`ファイルに設定

#### 6. OpenAI APIに切り替える

`.env`ファイルを以下のように設定：

```env
VITE_AI_PROVIDER=openai
VITE_OPENAI_API_KEY=あなたのOpenAI APIキー
VITE_USE_BACKEND_API=false
```

### 確認方法

1. ブラウザの開発者ツール（F12）を開く
2. Networkタブを開く
3. ページをリロード
4. `generativelanguage.googleapis.com` へのリクエストがあるか確認
   - もしリクエストがあれば、何かが自動的にAPIを呼んでいる可能性があります
   - リクエストがなければ、以前のエラーがキャッシュされているだけです

### 注意事項

- 429エラーは、APIキーの1日の利用制限に達した場合に発生します
- 無料プランの場合、1日あたりのリクエスト数に制限があります
- エラーが解消されるまで、数時間〜24時間待つ必要がある場合があります

