package service

import (
	"math/rand"
	"time"

	"github.com/match726/jongtas/tree/main/backend/domain/service"
	"github.com/oklog/ulid"
)

type ulidGenerator struct {
	entropy *rand.Rand
}

func NewULIDGenerator() service.UIDGenerater {
	t := time.Now()
	entropy := rand.New(rand.NewSource(t.UnixNano()))
	return &ulidGenerator{
		entropy: entropy,
	}
}

// ULIDの生成
func (ug *ulidGenerator) GetUID() (string, error) {
	ulid, err := ulid.New(ulid.Timestamp(time.Now()), ug.entropy)
	if err != nil {
		return "", err
	}
	return ulid.String(), nil
}
