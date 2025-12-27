package service

// 一意識別子の生成
type UIDGenerater interface {
	GetUID() (string, error)
}
