CREATE TABLE IF NOT EXISTS followers (
    user_id INTEGER NOT NULL REFERENCES users(id),
    follower_id INTEGER NOT NULL REFERENCES users(id),
    CONSTRAINT followers_pk PRIMARY KEY (user_id, follower_id)
);