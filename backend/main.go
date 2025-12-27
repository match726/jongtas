package main

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/match726/jongtas/tree/main/backend/infrastructure/persistence"
	db "github.com/match726/jongtas/tree/main/backend/infrastructure/persistence/database"
	"github.com/match726/jongtas/tree/main/backend/infrastructure/service"
	"github.com/match726/jongtas/tree/main/backend/interface/handler"
	"github.com/match726/jongtas/tree/main/backend/usecase"
)

func main() {

	// データベース接続
	dbConn, err := db.NewDBConnection()
	if err != nil {
		log.Fatalf("データベース接続失敗: %v", err)
	}

	defer dbConn.Close()

	// 依存性の注入
	encr := service.NewBcryptor()
	ug := service.NewULIDGenerator()
	up := persistence.NewUserPersistence(dbConn)
	uu := usecase.NewUserUsecase(encr, ug, up)
	uh := handler.NewUserHandler(uu)

	// CORS設定
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:  []string{"http://localhost:5173"},
		AllowMethods:  []string{"POST", "GET", "OPTIONS"},
		AllowHeaders:  []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders: []string{"Content-Length"},
	}))

	// ■ テスト用APIエンドポイント
	r.GET("/hello", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Backendと繋がりました！(Go)",
		})
	})

	r.POST("/login", uh.LogIn)
	r.POST("/signup", uh.SignUp)

	r.Run(":8080")

}
