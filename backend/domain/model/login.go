package model

// ログイン機能のリクエストデータ定義
type LoginUserReq struct {
	UserID   string `json:"userid"`
	Password string `json:"password"`
}

// ログイン機能のレスポンスデータ定義
type LoginUserResp struct {
	UserID    string `json:"userid"`
	Name      string `json:"name"`
	Group     string `json:"group"`
	Authority int    `json:"authority"`
}
