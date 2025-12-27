package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/match726/jongtas/tree/main/backend/domain/model"
	"github.com/match726/jongtas/tree/main/backend/usecase"
)

// ハンドラーのインターフェース定義
type UserHandler interface {
	LogIn(c *gin.Context)
	SignUp(c *gin.Context)
}

type userHandler struct {
	uu usecase.UserUsecase
}

func NewUserHandler(uu usecase.UserUsecase) UserHandler {
	return &userHandler{uu: uu}
}

func (uh *userHandler) LogIn(c *gin.Context) {

	var req *model.UserReq
	var resp *model.UserResp

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 2. Usecaseの呼び出し
	resp, err := uh.uu.LoginAuthentication(c.Request.Context(), req)
	if err != nil {
		// 本来はエラーの種類（NotFoundかDBエラーか）でステータスコードを分けるべきですが
		// ここでは簡易的に500にしています
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, resp)
}

func (uh *userHandler) SignUp(c *gin.Context) {

	var req *model.UserReq
	var resp *model.UserResp

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resp, err := uh.uu.UserRegistration(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, resp)
}
