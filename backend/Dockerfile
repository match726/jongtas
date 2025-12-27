# Build Stage
# 1. ベースイメージの指定 (golang v1.25.5)
FROM golang:1.25.5-alpine
# 2. ビルド引数の取得
ARG DOCKER_BACKEND_WORKDIR=/app
# 3. 作業ディレクトリの設定
WORKDIR ${DOCKER_BACKEND_WORKDIR}
# 4. Airのインストール
RUN go install github.com/air-verse/air@latest
# 5. 依存関係定義のコピーとインストール
# 依存関係のみ先にコピーすることでビルドキャッシュを効率化
COPY go.mod go.sum ./
# 6. Go外部モジュールのダウンロード
RUN go mod download
COPY . .
# 7. アプリケーションのビルド
CMD ["air", "-c", ".air.toml"]