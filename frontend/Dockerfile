# Build Stage
# 1. ベースイメージの指定 (Node.js v24.12.0)
FROM node:24.12.0-slim
# 2. 作業ディレクトリの設定
WORKDIR /frontend
# 3. パッケージ定義のコピーとインストール
# 依存関係のみ先にコピーすることでビルドキャッシュを効率化
COPY package*.json ./
# 4. Node.jsのパッケージインストール
RUN npm install
# 5.開発サーバーの起動コマンド
CMD ["npm", "run", "dev"]