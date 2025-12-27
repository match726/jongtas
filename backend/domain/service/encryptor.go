package service

type Encryptor interface {
	EncryptPassword(password string) (string, error)
	ComparePassword(password string, encryptedPassword string) error
}
