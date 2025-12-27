-- ユーザーマスタ
CREATE TABLE users (
  id         CHAR(26)    NOT NULL,
  account_id CHAR(32)    PRIMARY KEY NOT NULL,
  password   CHAR(60)    NOT NULL,
  created_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- ユーザー詳細マスタ
CREATE TABLE user_details (
  id         CHAR(26)    PRIMARY KEY,
  user_id    CHAR(26)    NOT NULL,
  nickname   VARCHAR(32) NOT NULL,
  authority  TINYINT     NOT NULL DEFAULT 1,
  created_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- 大会テーブル
CREATE TABLE tournaments (
  id         CHAR(26)    PRIMARY KEY,
  name       VARCHAR(32) NOT NULL,
  date       DATE,
  venue      GEOMETRY
  created_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
