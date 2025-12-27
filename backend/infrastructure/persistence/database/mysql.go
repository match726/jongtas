package database

import (
	"database/sql"
	"fmt"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

var dbport string = os.Getenv("MYSQL_PORT")
var dbname string = os.Getenv("MYSQL_DATABASE")
var user string = os.Getenv("MYSQL_USER")
var password string = os.Getenv("MYSQL_PASSWORD")

// MySQLへのコネクションプールの作成
func NewDBConnection() (*sql.DB, error) {

	dsn := fmt.Sprintf("%s:%s@tcp(db:%s)/%s?parseTime=true", user, password, dbport, dbname)

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	// 接続確認
	if err := db.Ping(); err != nil {
		return nil, err
	}

	// 接続プールの設定
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(25)
	db.SetConnMaxLifetime(5 * time.Minute)

	return db, nil
}
