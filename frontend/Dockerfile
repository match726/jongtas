# Build Stage
# 1. ベースイメージの指定 (Node.js v24.12.0)
FROM node:24.12.0-slim
# 2. ビルド引数の取得
ARG DOCKER_FRONTEND_WORKDIR=/app
# 3. 作業ディレクトリの設定
WORKDIR ${DOCKER_FRONTEND_WORKDIR}
# 4. パッケージ定義のコピーとインストール
# 依存関係のみ先にコピーすることでビルドキャッシュを効率化
COPY package*.json ./
# 5. Node.jsのパッケージインストール
RUN npm install
# 6.開発サーバーの起動コマンド
CMD ["npm", "run", "dev"]