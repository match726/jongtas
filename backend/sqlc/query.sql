-- name: AddUser :execresult
INSERT INTO users (
  id, account_id, password
) VALUES (
  ?, ?, ?
);

-- name: AddUserDetail :execresult
INSERT INTO user_details (
  id, user_id, nickname, authority
) VALUES (
  ?, ?, ?, ?
);

-- name: GetUser :one
SELECT * FROM users
 WHERE account_id = ?
  AND  deleted_at IS NULL;

-- name: GetUserDetails :one
SELECT * FROM user_details
 WHERE user_id = ?
  AND  deleted_at IS NULL;