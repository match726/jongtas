package repository

import (
	"context"

	"github.com/match726/jongtas/tree/main/backend/domain/model"
)

type LoginRepository interface {
	GetLoginUser(ctx context.Context, query string) ([]*model.Login, error)
}
