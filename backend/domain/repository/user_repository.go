package repository

import (
	"context"

	"github.com/match726/jongtas/tree/main/backend/domain/model"
)

type UserRepository interface {
	GetUser(ctx context.Context, accountID string) (id string, password string, err error)
	GetUserDetail(ctx context.Context, ustd *model.UserStd) (nickname string, auth int, err error)
	AddUser(ctx context.Context, ustd *model.UserStd) (err error)
	AddUserDetail(ctx context.Context, ustd *model.UserStd) (err error)
}
