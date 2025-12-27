package usecase

import (
	"context"

	"github.com/match726/jongtas/tree/main/backend/domain/model"
	"github.com/match726/jongtas/tree/main/backend/domain/repository"
	"github.com/match726/jongtas/tree/main/backend/domain/service"
)

type UserUsecase interface {
	LoginAuthentication(ctx context.Context, urq *model.UserReq) (urp *model.UserResp, err error)
	UserRegistration(ctx context.Context, urq *model.UserReq) (urp *model.UserResp, err error)
}

type userUsecase struct {
	encr service.Encryptor
	ug   service.UIDGenerater
	ur   repository.UserRepository
}

func NewUserUsecase(encr service.Encryptor, ug service.UIDGenerater, ur repository.UserRepository) UserUsecase {
	return &userUsecase{encr: encr, ug: ug, ur: ur}
}

// ログイン処理
func (uu userUsecase) LoginAuthentication(ctx context.Context, urq *model.UserReq) (urp *model.UserResp, err error) {

	// アカウントIDからユーザー情報を取得
	uid, encrPwd, err := uu.ur.GetUser(ctx, urq.AccountID)
	if err != nil {
		return nil, err
	}

	ustd := &model.UserStd{
		UserID: uid,
		UserReq: model.UserReq{
			AccountID: urq.AccountID,
			Password:  urq.Password,
		},
	}

	// リクエストのパスワードと一致するかを検証
	err = uu.encr.ComparePassword(encrPwd, ustd.Password)
	if err != nil {
		return nil, err
	}

	// ユーザーIDからユーザー詳細情報を取得
	nickname, auth, err := uu.ur.GetUserDetail(ctx, ustd)
	if err != nil {
		return nil, err
	}

	// レスポンスデータ作成
	urp = &model.UserResp{
		UserID:    ustd.UserID,
		AccountID: ustd.AccountID,
		Nickname:  nickname,
		Authority: auth,
		Group:     nil,
	}
	return urp, err
}

// アカウント登録処理
func (uu userUsecase) UserRegistration(ctx context.Context, urq *model.UserReq) (urp *model.UserResp, err error) {

	ustd := &model.UserStd{
		UserReq: model.UserReq{
			AccountID: urq.AccountID,
			Nickname:  urq.Nickname,
			Authority: 1,
		},
	}

	// ユーザーマスタ用のUIDを生成
	ustd.UserID, err = uu.ug.GetUID()
	if err != nil {
		return nil, err
	}

	// パスワードを暗号化
	ustd.Password, err = uu.encr.EncryptPassword(urq.Password)

	// ユーザーマスタ登録
	err = uu.ur.AddUser(ctx, ustd)
	if err != nil {
		return nil, err
	}

	// ユーザー詳細マスタ用のUIDを生成
	ustd.UserDetailID, err = uu.ug.GetUID()
	if err != nil {
		return nil, err
	}

	// ユーザー詳細マスタ登録
	err = uu.ur.AddUserDetail(ctx, ustd)
	if err != nil {
		return nil, err
	}

	urp = &model.UserResp{
		UserID:    ustd.UserID,
		AccountID: ustd.AccountID,
		Nickname:  ustd.Nickname,
		Authority: ustd.Authority,
	}

	return urp, nil
}
