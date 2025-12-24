package main

import (
	"net/http"

	"github.com/gin-contrib/cors" // CORS用のパッケージ
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// ■ CORS設定 (フロントエンドのURLからのアクセスを許可)
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"} // ReactのURL
	r.Use(cors.New(config))

	// ■ テスト用APIエンドポイント
	r.GET("/hello", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Backendと繋がりました！(Go)",
		})
	})

	r.Run(":8080")
}
