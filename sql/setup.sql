DROP TABLE IF EXISTS users, contributors, works, comments;

CREATE TABLE users (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	username TEXT NOT NULL,
	email TEXT NOT NULL,
	is_contributor BOOLEAN
);

CREATE TABLE contributors (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id BIGINT NOT NULL REFERENCES users(id),
	pseudonym TEXT
);

-- CREATE TABLE works (
-- 	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
-- 	author_id BIGINT NOT NULL REFERENCES contributors(id),
-- 	work_body TEXT NOT NULL,
-- 	status TEXT NOT NULL
-- );

-- CREATE TABLE comments (
-- 	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
-- 	author_id BIGINT NOT NULL REFERENCES users(id),
-- 	work_id BIGINT NOT NULL REFERENCES works(id),
-- 	comment_body TEXT NOT NULL,
-- 	status TEXT NOT NULL
-- );
