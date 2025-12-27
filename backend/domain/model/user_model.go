package model

// アカウント登録／ログイン機能のリクエストデータ定義
type UserReq struct {
	AccountID string `json:"accountid"`
	Password  string `json:"password"`
	Nickname  string `json:"nickname"`
	Authority int    `json:"authority"`
}

// ユーザー関連処理の標準データ定義
type UserStd struct {
	UserID       string `json:"userid"`
	UserDetailID string `json:"userdetailid"`
	UserReq
	Group []string `json:"group"`
}

// アカウント登録／ログイン機能のレスポンスデータ定義
type UserResp struct {
	UserID    string   `json:"userid"`
	AccountID string   `json:"accountid"`
	Nickname  string   `json:"nickname"`
	Authority int      `json:"authority"`
	Group     []string `json:"group"`
}
