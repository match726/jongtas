package persistence

import (
	"context"
	"database/sql"

	"github.com/match726/jongtas/tree/main/backend/domain/model"
	"github.com/match726/jongtas/tree/main/backend/domain/repository"
	db "github.com/match726/jongtas/tree/main/backend/infrastructure/persistence/database"
)

type userPersistence struct {
	queries *db.Queries
}

func NewUserPersistence(conn *sql.DB) repository.UserRepository {
	return &userPersistence{
		queries: db.New(conn),
	}
}

func (up *userPersistence) AddUser(ctx context.Context, ustd *model.UserStd) (err error) {

	params := db.AddUserParams{
		ID:        ustd.UserID,
		AccountID: ustd.AccountID,
		Password:  ustd.Password,
	}

	_, err = up.queries.AddUser(ctx, params)
	if err != nil {
		return err
	}

	return nil
}

func (up *userPersistence) AddUserDetail(ctx context.Context, ustd *model.UserStd) (err error) {

	params := db.AddUserDetailParams{
		ID:        ustd.UserDetailID,
		UserID:    ustd.UserID,
		Nickname:  ustd.Nickname,
		Authority: int8(ustd.Authority),
	}

	_, err = up.queries.AddUserDetail(ctx, params)
	if err != nil {
		return err
	}

	return nil
}

func (up *userPersistence) GetUser(ctx context.Context, accountID string) (id string, password string, err error) {

	entity, err := up.queries.GetUser(ctx, accountID)
	if err != nil {
		return "", "", err
	}

	return entity.ID, entity.Password, nil
}

func (up *userPersistence) GetUserDetail(ctx context.Context, ustd *model.UserStd) (nickname string, auth int, err error) {

	entity, err := up.queries.GetUserDetails(ctx, ustd.UserID)
	if err != nil {
		return "", 0, err
	}

	return entity.Nickname, int(entity.Authority), nil
}
