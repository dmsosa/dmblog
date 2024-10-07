CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    author_id INTEGER NOT NULL,
    article_id INTEGER NOT NULL,
    body VARCHAR(5000),
    posted_at DATE,
    updated_at DATE
);