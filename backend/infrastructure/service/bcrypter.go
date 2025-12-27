package service

import (
	"github.com/match726/jongtas/tree/main/backend/domain/service"
	"golang.org/x/crypto/bcrypt"
)

type bcryptor struct{}

func NewBcryptor() service.Encryptor {
	return &bcryptor{}
}

// パスワードをBcryptで暗号化
func (b *bcryptor) EncryptPassword(password string) (string, error) {
	// コスト（計算負荷）はデフォルト（10）
	encr, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(encr), nil
}

// 入力されたパスワードと暗号化されたパスワードを比較
func (b *bcryptor) ComparePassword(encryptedPassword string, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(encryptedPassword), []byte(password))
}
