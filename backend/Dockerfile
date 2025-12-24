# Build Stage
# 1. ベースイメージの指定 (Golang v1.25.5)
FROM golang:1.25.5-alpine
# 2. 作業ディレクトリの設定
WORKDIR /backend
# 3. Airのインストール
RUN go install github.com/air-verse/air@latest
# 4. 依存関係定義のコピーとインストール
# 依存関係のみ先にコピーすることでビルドキャッシュを効率化
COPY go.mod go.sum ./
# 5. Go外部モジュールのダウンロード
RUN go mod download
COPY . .
# 6. アプリケーションのビルド
#RUN CGO_ENABLED=0 go build -o main .
CMD ["air", "-c", ".air.toml"]